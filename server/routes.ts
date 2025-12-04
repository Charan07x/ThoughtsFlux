import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import { insertBlogPostSchema, insertAuthorProfileSchema, insertContactMessageSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Setup Replit Auth
  await setupAuth(app);

  // Auth routes
  app.get("/api/auth/user", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Public routes - get published posts
  app.get("/api/posts/published", async (req, res) => {
    try {
      const posts = await storage.getPublishedPosts();
      res.json(posts);
    } catch (error) {
      console.error("Error fetching published posts:", error);
      res.status(500).json({ message: "Failed to fetch posts" });
    }
  });

  // Get single post by slug (public)
  app.get("/api/posts/slug/:slug", async (req, res) => {
    try {
      const post = await storage.getPostBySlug(req.params.slug);
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
      // Only return published posts for public access
      if (!post.published) {
        return res.status(404).json({ message: "Post not found" });
      }
      res.json(post);
    } catch (error) {
      console.error("Error fetching post:", error);
      res.status(500).json({ message: "Failed to fetch post" });
    }
  });

  // Get author profile (public)
  app.get("/api/author", async (req, res) => {
    try {
      const profile = await storage.getAuthorProfile();
      if (!profile) {
        return res.json(null);
      }
      res.json(profile);
    } catch (error) {
      console.error("Error fetching author profile:", error);
      res.status(500).json({ message: "Failed to fetch author profile" });
    }
  });

  // Protected routes - require authentication

  // Get all posts (admin)
  app.get("/api/posts", isAuthenticated, async (req, res) => {
    try {
      const posts = await storage.getAllPosts();
      res.json(posts);
    } catch (error) {
      console.error("Error fetching posts:", error);
      res.status(500).json({ message: "Failed to fetch posts" });
    }
  });

  // Get single post by ID (admin)
  app.get("/api/posts/:id", isAuthenticated, async (req, res) => {
    try {
      const post = await storage.getPostById(req.params.id);
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
      res.json(post);
    } catch (error) {
      console.error("Error fetching post:", error);
      res.status(500).json({ message: "Failed to fetch post" });
    }
  });

  // Create post (admin)
  app.post("/api/posts", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const validatedData = insertBlogPostSchema.parse({
        ...req.body,
        authorId: userId,
      });
      
      const post = await storage.createPost(validatedData);
      res.status(201).json(post);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Validation error", errors: error.errors });
      }
      console.error("Error creating post:", error);
      res.status(500).json({ message: "Failed to create post" });
    }
  });

  // Update post (admin)
  app.put("/api/posts/:id", isAuthenticated, async (req, res) => {
    try {
      const validatedData = insertBlogPostSchema.partial().parse(req.body);
      const post = await storage.updatePost(req.params.id, validatedData);
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
      res.json(post);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Validation error", errors: error.errors });
      }
      console.error("Error updating post:", error);
      res.status(500).json({ message: "Failed to update post" });
    }
  });

  // Toggle publish status (admin)
  app.patch("/api/posts/:id", isAuthenticated, async (req, res) => {
    try {
      const { published } = req.body;
      if (typeof published !== "boolean") {
        return res.status(400).json({ message: "published must be a boolean" });
      }
      
      const post = await storage.updatePost(req.params.id, { published });
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
      res.json(post);
    } catch (error) {
      console.error("Error updating post:", error);
      res.status(500).json({ message: "Failed to update post" });
    }
  });

  // Delete post (admin)
  app.delete("/api/posts/:id", isAuthenticated, async (req, res) => {
    try {
      await storage.deletePost(req.params.id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting post:", error);
      res.status(500).json({ message: "Failed to delete post" });
    }
  });

  // Update author profile (admin)
  app.put("/api/author", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const validatedData = insertAuthorProfileSchema.parse({
        ...req.body,
        userId,
      });
      
      const profile = await storage.upsertAuthorProfile(validatedData);
      res.json(profile);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Validation error", errors: error.errors });
      }
      console.error("Error updating author profile:", error);
      res.status(500).json({ message: "Failed to update author profile" });
    }
  });

  // Image routes

  // Get all images (admin)
  app.get("/api/images", isAuthenticated, async (req, res) => {
    try {
      const allImages = await storage.getAllImages();
      res.json(allImages);
    } catch (error) {
      console.error("Error fetching images:", error);
      res.status(500).json({ message: "Failed to fetch images" });
    }
  });

  // Get single image by ID (public - for displaying images)
  app.get("/api/images/:id", async (req, res) => {
    try {
      const image = await storage.getImageById(req.params.id);
      if (!image) {
        return res.status(404).json({ message: "Image not found" });
      }
      
      const buffer = Buffer.from(image.data.split(",")[1] || image.data, "base64");
      res.set("Content-Type", image.mimeType);
      res.set("Cache-Control", "public, max-age=31536000");
      res.send(buffer);
    } catch (error) {
      console.error("Error fetching image:", error);
      res.status(500).json({ message: "Failed to fetch image" });
    }
  });

  // Upload image (admin)
  app.post("/api/images", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { filename, mimeType, data } = req.body;
      
      if (!filename || !mimeType || !data) {
        return res.status(400).json({ message: "Missing required fields: filename, mimeType, data" });
      }

      const allowedMimeTypes = ["image/jpeg", "image/png", "image/gif", "image/webp", "image/svg+xml"];
      if (!allowedMimeTypes.includes(mimeType)) {
        return res.status(400).json({ message: "Invalid file type. Allowed: JPEG, PNG, GIF, WebP, SVG" });
      }

      const base64Regex = /^data:image\/[a-zA-Z+]+;base64,/;
      const cleanData = data.replace(base64Regex, "");
      
      if (!/^[A-Za-z0-9+/=]+$/.test(cleanData)) {
        return res.status(400).json({ message: "Invalid base64 data" });
      }

      const maxSizeBytes = 5 * 1024 * 1024;
      const estimatedSize = (cleanData.length * 3) / 4;
      if (estimatedSize > maxSizeBytes) {
        return res.status(400).json({ message: "Image too large. Maximum size is 5MB" });
      }

      const sanitizedFilename = filename.replace(/[^a-zA-Z0-9._-]/g, "_").substring(0, 255);

      const image = await storage.createImage({
        filename: sanitizedFilename,
        mimeType,
        data,
        uploadedBy: userId,
      });
      
      res.status(201).json(image);
    } catch (error) {
      console.error("Error uploading image:", error);
      res.status(500).json({ message: "Failed to upload image" });
    }
  });

  // Delete image (admin)
  app.delete("/api/images/:id", isAuthenticated, async (req, res) => {
    try {
      await storage.deleteImage(req.params.id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting image:", error);
      res.status(500).json({ message: "Failed to delete image" });
    }
  });

  // Contact message routes

  // Submit contact message (public)
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactMessageSchema.parse(req.body);
      const message = await storage.createContactMessage(validatedData);
      res.status(201).json({ message: "Message sent successfully", id: message.id });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Validation error", errors: error.errors });
      }
      console.error("Error submitting contact message:", error);
      res.status(500).json({ message: "Failed to send message" });
    }
  });

  // Get all contact messages (admin)
  app.get("/api/contact", isAuthenticated, async (req, res) => {
    try {
      const messages = await storage.getAllContactMessages();
      res.json(messages);
    } catch (error) {
      console.error("Error fetching contact messages:", error);
      res.status(500).json({ message: "Failed to fetch messages" });
    }
  });

  // Mark contact message as read (admin)
  app.patch("/api/contact/:id/read", isAuthenticated, async (req, res) => {
    try {
      const message = await storage.markContactMessageAsRead(req.params.id);
      if (!message) {
        return res.status(404).json({ message: "Message not found" });
      }
      res.json(message);
    } catch (error) {
      console.error("Error marking message as read:", error);
      res.status(500).json({ message: "Failed to update message" });
    }
  });

  // Delete contact message (admin)
  app.delete("/api/contact/:id", isAuthenticated, async (req, res) => {
    try {
      await storage.deleteContactMessage(req.params.id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting contact message:", error);
      res.status(500).json({ message: "Failed to delete message" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
