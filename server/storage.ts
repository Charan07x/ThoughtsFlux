import {
  users,
  blogPosts,
  authorProfile,
  images,
  contactMessages,
  type User,
  type UpsertUser,
  type BlogPost,
  type InsertBlogPost,
  type AuthorProfile,
  type InsertAuthorProfile,
  type Image,
  type InsertImage,
  type ContactMessage,
  type InsertContactMessage,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  // User operations (required for Replit Auth)
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  
  // Blog post operations
  getAllPosts(): Promise<BlogPost[]>;
  getPublishedPosts(): Promise<BlogPost[]>;
  getPostById(id: string): Promise<BlogPost | undefined>;
  getPostBySlug(slug: string): Promise<BlogPost | undefined>;
  createPost(post: InsertBlogPost): Promise<BlogPost>;
  updatePost(id: string, post: Partial<InsertBlogPost>): Promise<BlogPost | undefined>;
  deletePost(id: string): Promise<boolean>;
  
  // Author profile operations
  getAuthorProfile(): Promise<AuthorProfile | undefined>;
  upsertAuthorProfile(profile: InsertAuthorProfile): Promise<AuthorProfile>;
  
  // Image operations
  getAllImages(): Promise<Image[]>;
  getImageById(id: string): Promise<Image | undefined>;
  createImage(image: InsertImage): Promise<Image>;
  deleteImage(id: string): Promise<boolean>;
  
  // Contact message operations
  getAllContactMessages(): Promise<ContactMessage[]>;
  getContactMessageById(id: string): Promise<ContactMessage | undefined>;
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  markContactMessageAsRead(id: string): Promise<ContactMessage | undefined>;
  deleteContactMessage(id: string): Promise<boolean>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  // Blog post operations
  async getAllPosts(): Promise<BlogPost[]> {
    return db.select().from(blogPosts).orderBy(desc(blogPosts.createdAt));
  }

  async getPublishedPosts(): Promise<BlogPost[]> {
    return db
      .select()
      .from(blogPosts)
      .where(eq(blogPosts.published, true))
      .orderBy(desc(blogPosts.publishedAt));
  }

  async getPostById(id: string): Promise<BlogPost | undefined> {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.id, id));
    return post;
  }

  async getPostBySlug(slug: string): Promise<BlogPost | undefined> {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug));
    return post;
  }

  async createPost(post: InsertBlogPost): Promise<BlogPost> {
    const readingTime = this.calculateReadingTime(post.content);
    const [newPost] = await db
      .insert(blogPosts)
      .values({
        ...post,
        readingTime,
        publishedAt: post.published ? new Date() : null,
      })
      .returning();
    return newPost;
  }

  async updatePost(id: string, post: Partial<InsertBlogPost>): Promise<BlogPost | undefined> {
    const existingPost = await this.getPostById(id);
    if (!existingPost) return undefined;

    const updateData: any = {
      ...post,
      updatedAt: new Date(),
    };

    if (post.content) {
      updateData.readingTime = this.calculateReadingTime(post.content);
    }

    // Set publishedAt when publishing for the first time
    if (post.published === true && !existingPost.published) {
      updateData.publishedAt = new Date();
    }

    const [updatedPost] = await db
      .update(blogPosts)
      .set(updateData)
      .where(eq(blogPosts.id, id))
      .returning();
    return updatedPost;
  }

  async deletePost(id: string): Promise<boolean> {
    const result = await db.delete(blogPosts).where(eq(blogPosts.id, id));
    return true;
  }

  // Author profile operations
  async getAuthorProfile(): Promise<AuthorProfile | undefined> {
    const [profile] = await db.select().from(authorProfile).limit(1);
    return profile;
  }

  async upsertAuthorProfile(profile: InsertAuthorProfile): Promise<AuthorProfile> {
    const existingProfile = await this.getAuthorProfile();
    
    if (existingProfile) {
      const [updated] = await db
        .update(authorProfile)
        .set({
          ...profile,
          updatedAt: new Date(),
        })
        .where(eq(authorProfile.id, existingProfile.id))
        .returning();
      return updated;
    } else {
      const [newProfile] = await db
        .insert(authorProfile)
        .values(profile)
        .returning();
      return newProfile;
    }
  }

  // Helper function to calculate reading time
  private calculateReadingTime(content: string): string {
    const wordsPerMinute = 200;
    const words = content.trim().split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  }

  // Image operations
  async getAllImages(): Promise<Image[]> {
    return db.select().from(images).orderBy(desc(images.createdAt));
  }

  async getImageById(id: string): Promise<Image | undefined> {
    const [image] = await db.select().from(images).where(eq(images.id, id));
    return image;
  }

  async createImage(image: InsertImage): Promise<Image> {
    const [newImage] = await db.insert(images).values(image).returning();
    return newImage;
  }

  async deleteImage(id: string): Promise<boolean> {
    await db.delete(images).where(eq(images.id, id));
    return true;
  }

  // Contact message operations
  async getAllContactMessages(): Promise<ContactMessage[]> {
    return db.select().from(contactMessages).orderBy(desc(contactMessages.createdAt));
  }

  async getContactMessageById(id: string): Promise<ContactMessage | undefined> {
    const [message] = await db.select().from(contactMessages).where(eq(contactMessages.id, id));
    return message;
  }

  async createContactMessage(message: InsertContactMessage): Promise<ContactMessage> {
    const [newMessage] = await db.insert(contactMessages).values(message).returning();
    return newMessage;
  }

  async markContactMessageAsRead(id: string): Promise<ContactMessage | undefined> {
    const [updated] = await db
      .update(contactMessages)
      .set({ read: true })
      .where(eq(contactMessages.id, id))
      .returning();
    return updated;
  }

  async deleteContactMessage(id: string): Promise<boolean> {
    await db.delete(contactMessages).where(eq(contactMessages.id, id));
    return true;
  }
}

export const storage = new DatabaseStorage();
