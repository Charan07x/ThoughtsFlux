import { Link } from "wouter";
import { MapPin, Globe, Twitter, Linkedin, Github } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { AuthorProfile, User } from "@shared/schema";

interface AuthorCardProps {
  author?: AuthorProfile | null;
  user?: User | null;
  variant?: "compact" | "full";
  className?: string;
}

export function AuthorCard({ author, user, variant = "full", className = "" }: AuthorCardProps) {
  const displayName = author?.displayName || `${user?.firstName || ''} ${user?.lastName || ''}`.trim() || "Anonymous Author";
  const avatarUrl = author?.avatarUrl || user?.profileImageUrl;
  const bio = author?.bio || "No bio available";
  const initials = displayName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

  if (variant === "compact") {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        <Avatar className="h-10 w-10 border-2 border-primary/20">
          <AvatarImage src={avatarUrl || undefined} alt={displayName} className="object-cover" />
          <AvatarFallback className="bg-primary text-primary-foreground text-sm">
            {initials}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="font-medium text-foreground" data-testid="text-author-name">{displayName}</p>
          {author?.location && (
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {author.location}
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <Card className={`overflow-hidden ${className}`}>
      <div className="h-20 bg-gradient-to-r from-primary/20 via-primary/10 to-transparent" />
      <CardContent className="pt-0 -mt-10">
        <div className="flex flex-col items-center text-center">
          <Avatar className="h-20 w-20 border-4 border-background ring-2 ring-primary/20">
            <AvatarImage src={avatarUrl || undefined} alt={displayName} className="object-cover" />
            <AvatarFallback className="bg-primary text-primary-foreground text-xl font-medium">
              {initials}
            </AvatarFallback>
          </Avatar>
          
          <h3 className="mt-4 font-serif text-xl font-semibold text-foreground" data-testid="text-author-display-name">
            {displayName}
          </h3>
          
          {author?.location && (
            <p className="mt-1 text-sm text-muted-foreground flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {author.location}
            </p>
          )}
          
          <p className="mt-3 text-sm text-muted-foreground leading-relaxed" data-testid="text-author-bio">
            {bio}
          </p>
          
          <div className="mt-4 flex items-center gap-2">
            {author?.website && (
              <a href={author.website} target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon" className="h-8 w-8" data-testid="link-author-website">
                  <Globe className="h-4 w-4" />
                </Button>
              </a>
            )}
            {author?.twitter && (
              <a href={`https://twitter.com/${author.twitter}`} target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon" className="h-8 w-8" data-testid="link-author-twitter">
                  <Twitter className="h-4 w-4" />
                </Button>
              </a>
            )}
            {author?.linkedin && (
              <a href={`https://linkedin.com/in/${author.linkedin}`} target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon" className="h-8 w-8" data-testid="link-author-linkedin">
                  <Linkedin className="h-4 w-4" />
                </Button>
              </a>
            )}
            {author?.github && (
              <a href={`https://github.com/${author.github}`} target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon" className="h-8 w-8" data-testid="link-author-github">
                  <Github className="h-4 w-4" />
                </Button>
              </a>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
