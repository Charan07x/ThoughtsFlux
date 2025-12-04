import { useQuery } from "@tanstack/react-query";
import { useRoute, Link } from "wouter";
import { ArrowLeft, Calendar, Clock, Tag, Share2 } from "lucide-react";
import { format } from "date-fns";
import { Navigation } from "@/components/Navigation";
import { AuthorCard } from "@/components/AuthorCard";
import { AuthorCardSkeleton } from "@/components/Skeleton";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import type { BlogPost as BlogPostType, AuthorProfile, User } from "@shared/schema";

export default function BlogPost() {
  const [, params] = useRoute("/blog/:slug");
  const slug = params?.slug;
  const { toast } = useToast();

  const { data: post, isLoading: postLoading, error } = useQuery<BlogPostType>({
    queryKey: [`/api/posts/slug/${slug}`],
    enabled: !!slug,
  });

  const { data: author, isLoading: authorLoading } = useQuery<AuthorProfile>({
    queryKey: ["/api/author"],
  });

  const { data: user } = useQuery<User>({
    queryKey: ["/api/auth/user"],
  });

  if (postLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="animate-pulse">
              <div className="h-8 w-32 bg-muted rounded mb-8" />
              <div className="h-12 w-3/4 bg-muted rounded mb-4" />
              <div className="h-6 w-1/2 bg-muted rounded mb-8" />
              <div className="aspect-video bg-muted rounded-lg mb-8" />
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

  if (error || !post) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center py-20">
            <h1 className="font-serif text-3xl font-bold text-foreground mb-4">
              Article Not Found
            </h1>
            <p className="text-muted-foreground mb-8">
              The article you're looking for doesn't exist or has been removed.
            </p>
            <Link href="/blog">
              <Button className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Blog
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const formattedDate = post.publishedAt 
    ? format(new Date(post.publishedAt), 'MMMM dd, yyyy')
    : post.createdAt 
      ? format(new Date(post.createdAt), 'MMMM dd, yyyy')
      : 'Draft';

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt || post.content.substring(0, 160),
          url: window.location.href,
        });
      } catch (err) {
        // User cancelled or error
      }
    } else {
      await navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied",
        description: "Article link has been copied to clipboard.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation showAdminLinks />

      <article className="pt-24 pb-20">
        <header className="px-4 sm:px-6 lg:px-8 mb-10">
          <div className="max-w-4xl mx-auto">
            <Link href="/blog">
              <Button variant="ghost" className="gap-2 mb-6 -ml-2" data-testid="link-back-to-blog">
                <ArrowLeft className="h-4 w-4" />
                Back to Blog
              </Button>
            </Link>

            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4 animate-fade-in-up opacity-0">
                {post.tags.map(tag => (
                  <Badge key={tag} variant="secondary" className="gap-1">
                    <Tag className="h-3 w-3" />
                    {tag}
                  </Badge>
                ))}
              </div>
            )}

            <h1 
              className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight animate-fade-in-up opacity-0 stagger-1"
              data-testid="text-post-title"
            >
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-muted-foreground animate-fade-in-up opacity-0 stagger-2">
              <span className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {formattedDate}
              </span>
              {post.readingTime && (
                <span className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {post.readingTime}
                </span>
              )}
              <Button 
                variant="ghost" 
                size="sm" 
                className="gap-2 ml-auto"
                onClick={handleShare}
                data-testid="button-share"
              >
                <Share2 className="h-4 w-4" />
                Share
              </Button>
            </div>
          </div>
        </header>

        {post.featuredImageUrl && (
          <div className="px-4 sm:px-6 lg:px-8 mb-12">
            <div className="max-w-5xl mx-auto">
              <div className="aspect-video rounded-xl overflow-hidden animate-fade-in-up opacity-0 stagger-3">
                <img
                  src={post.featuredImageUrl}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        )}

        <div className="px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="lg:grid lg:grid-cols-3 lg:gap-12">
              <div className="lg:col-span-2">
                <div 
                  className="prose prose-lg dark:prose-invert prose-crimson max-w-none animate-fade-in-up opacity-0 stagger-4"
                  data-testid="text-post-content"
                >
                  <div className="whitespace-pre-wrap leading-relaxed text-foreground">
                    {post.content.split('\n').map((paragraph, i) => (
                      paragraph.trim() ? <p key={i} className="mb-4">{paragraph}</p> : <br key={i} />
                    ))}
                  </div>
                </div>

                <Separator className="my-12" />

                <div className="lg:hidden mb-12">
                  <h3 className="font-serif text-xl font-semibold text-foreground mb-4">
                    About the Author
                  </h3>
                  {authorLoading ? (
                    <AuthorCardSkeleton />
                  ) : (
                    <AuthorCard author={author} user={user} variant="full" />
                  )}
                </div>
              </div>

              <aside className="hidden lg:block">
                <div className="sticky top-24">
                  <h3 className="font-serif text-lg font-semibold text-foreground mb-4">
                    About the Author
                  </h3>
                  {authorLoading ? (
                    <AuthorCardSkeleton />
                  ) : (
                    <AuthorCard author={author} user={user} variant="full" />
                  )}
                </div>
              </aside>
            </div>
          </div>
        </div>
      </article>

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
