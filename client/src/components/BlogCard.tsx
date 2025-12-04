import { Link } from "wouter";
import { Clock, Calendar, ChevronRight } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { BlogPost } from "@shared/schema";
import { format } from "date-fns";

interface BlogCardProps {
  post: BlogPost;
  variant?: "default" | "featured";
}

export function BlogCard({ post, variant = "default" }: BlogCardProps) {
  const formattedDate = post.publishedAt 
    ? format(new Date(post.publishedAt), 'MMM dd, yyyy')
    : post.createdAt 
      ? format(new Date(post.createdAt), 'MMM dd, yyyy')
      : 'Draft';

  if (variant === "featured") {
    return (
      <Link href={`/blog/${post.slug}`}>
        <Card 
          className="group overflow-hidden cursor-pointer hover-elevate active-elevate-2 transition-all duration-300"
          data-testid={`card-blog-featured-${post.id}`}
        >
          <div className="grid md:grid-cols-2 gap-0">
            <div className="relative aspect-video md:aspect-auto overflow-hidden">
              {post.featuredImageUrl ? (
                <img
                  src={post.featuredImageUrl}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                  <span className="font-serif text-4xl text-primary/30">{post.title[0]}</span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent md:hidden" />
            </div>
            
            <CardContent className="p-6 flex flex-col justify-center">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                {post.tags?.slice(0, 2).map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
              
              <h2 className="font-serif text-2xl lg:text-3xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                {post.title}
              </h2>
              
              <p className="text-muted-foreground leading-relaxed mb-4 line-clamp-3">
                {post.excerpt || post.content.substring(0, 160)}
              </p>
              
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {formattedDate}
                </span>
                {post.readingTime && (
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {post.readingTime}
                  </span>
                )}
              </div>
              
              <div className="mt-4 flex items-center gap-1 text-primary font-medium text-sm group-hover:gap-2 transition-all">
                Read article
                <ChevronRight className="h-4 w-4" />
              </div>
            </CardContent>
          </div>
        </Card>
      </Link>
    );
  }

  return (
    <Link href={`/blog/${post.slug}`}>
      <Card 
        className="group h-full overflow-hidden cursor-pointer hover-elevate active-elevate-2 transition-all duration-300"
        data-testid={`card-blog-${post.id}`}
      >
        <div className="relative aspect-video overflow-hidden">
          {post.featuredImageUrl ? (
            <img
              src={post.featuredImageUrl}
              alt={post.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
              <span className="font-serif text-4xl text-primary/30">{post.title[0]}</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        
        <CardContent className="p-5">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            {post.tags?.slice(0, 2).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
            {!post.published && (
              <Badge variant="outline" className="text-xs">Draft</Badge>
            )}
          </div>
          
          <h3 className="font-serif text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
            {post.title}
          </h3>
          
          <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
            {post.excerpt || post.content.substring(0, 120)}
          </p>
        </CardContent>
        
        <CardFooter className="px-5 pb-5 pt-0 flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {formattedDate}
            </span>
            {post.readingTime && (
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {post.readingTime}
              </span>
            )}
          </div>
          
          <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
        </CardFooter>
      </Card>
    </Link>
  );
}
