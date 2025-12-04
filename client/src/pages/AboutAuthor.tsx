import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { MapPin, Globe, Twitter, Linkedin, Github, Mail, ArrowRight, BookOpen } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import type { AuthorProfile, BlogPost } from "@shared/schema";

export default function AboutAuthor() {
  const { data: author, isLoading: authorLoading } = useQuery<AuthorProfile>({
    queryKey: ["/api/author"],
  });

  const { data: posts } = useQuery<BlogPost[]>({
    queryKey: ["/api/posts/published"],
  });

  const publishedCount = posts?.length || 0;

  if (authorLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="animate-pulse space-y-8">
              <div className="flex flex-col items-center gap-6">
                <div className="w-32 h-32 rounded-full bg-muted" />
                <div className="h-8 w-48 bg-muted rounded" />
                <div className="h-4 w-64 bg-muted rounded" />
              </div>
              <div className="space-y-4">
                <div className="h-4 w-full bg-muted rounded" />
                <div className="h-4 w-full bg-muted rounded" />
                <div className="h-4 w-3/4 bg-muted rounded" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="pt-24 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fade-in-up opacity-0">
            <Avatar className="w-32 h-32 mx-auto mb-6 border-4 border-primary/20">
              <AvatarImage
                src={author?.avatarUrl || undefined}
                alt={author?.displayName || "Author"}
                className="object-cover"
              />
              <AvatarFallback className="bg-primary text-primary-foreground text-4xl font-serif">
                {author?.displayName?.[0] || "A"}
              </AvatarFallback>
            </Avatar>

            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-foreground mb-4">
              {author?.displayName || "About the Author"}
            </h1>

            {author?.location && (
              <div className="flex items-center justify-center gap-2 text-muted-foreground mb-4">
                <MapPin className="h-4 w-4" />
                <span>{author.location}</span>
              </div>
            )}

            <div className="flex items-center justify-center gap-4">
              {author?.website && (
                <a
                  href={author.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Globe className="h-5 w-5" />
                </a>
              )}
              {author?.twitter && (
                <a
                  href={`https://twitter.com/${author.twitter}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Twitter className="h-5 w-5" />
                </a>
              )}
              {author?.linkedin && (
                <a
                  href={`https://linkedin.com/in/${author.linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              )}
              {author?.github && (
                <a
                  href={`https://github.com/${author.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Github className="h-5 w-5" />
                </a>
              )}
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="text-center animate-fade-in-up opacity-0 stagger-1">
              <CardContent className="pt-6">
                <BookOpen className="h-8 w-8 mx-auto text-primary mb-2" />
                <div className="text-3xl font-bold text-foreground">{publishedCount}</div>
                <div className="text-sm text-muted-foreground">Published Articles</div>
              </CardContent>
            </Card>
            <Card className="text-center animate-fade-in-up opacity-0 stagger-2">
              <CardContent className="pt-6">
                <Mail className="h-8 w-8 mx-auto text-primary mb-2" />
                <div className="text-lg font-semibold text-foreground">Get in Touch</div>
                <div className="text-sm text-muted-foreground">Available for collaborations</div>
              </CardContent>
            </Card>
            <Card className="text-center animate-fade-in-up opacity-0 stagger-3">
              <CardContent className="pt-6">
                <Globe className="h-8 w-8 mx-auto text-primary mb-2" />
                <div className="text-lg font-semibold text-foreground">Worldwide</div>
                <div className="text-sm text-muted-foreground">Content for everyone</div>
              </CardContent>
            </Card>
          </div>

          <Separator className="my-12" />

          <div className="prose prose-lg dark:prose-invert max-w-none animate-fade-in-up opacity-0 stagger-4">
            <h2 className="font-serif text-2xl font-bold text-foreground mb-6">
              About Me
            </h2>
            {author?.bio ? (
              <div className="text-foreground leading-relaxed whitespace-pre-wrap">
                {author.bio}
              </div>
            ) : (
              <p className="text-muted-foreground">
                Welcome to my corner of the internet. I'm passionate about sharing knowledge 
                and insights that can help others grow and learn. Every article is crafted 
                with care, aiming to provide value and spark meaningful conversations.
              </p>
            )}
          </div>

          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up opacity-0 stagger-5">
            <Link href="/blog">
              <Button size="lg" className="gap-2">
                <BookOpen className="h-5 w-5" />
                Read My Articles
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="gap-2">
                <Mail className="h-5 w-5" />
                Get in Touch
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-border">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-serif font-bold text-sm">T</span>
            </div>
            <span className="font-serif font-semibold text-foreground">Thoughtsflux</span>
          </div>
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Thoughtsflux. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
