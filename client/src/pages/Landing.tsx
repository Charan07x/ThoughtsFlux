import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, BookOpen, PenSquare, UserCircle } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { AnimatedHero } from "@/components/AnimatedHero";
import { BlogCard } from "@/components/BlogCard";
import { AuthorCard } from "@/components/AuthorCard";
import { BlogCardSkeleton, AuthorCardSkeleton } from "@/components/Skeleton";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { BlogPost, AuthorProfile } from "@shared/schema";

export default function Landing() {
  const { data: posts, isLoading: postsLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/posts/published"],
  });

  const { data: author, isLoading: authorLoading } = useQuery<AuthorProfile>({
    queryKey: ["/api/author"],
  });

  const publishedPosts = posts || [];
  const featuredPost = publishedPosts[0];
  const recentPosts = publishedPosts.slice(1, 4);

  const features = [
    {
      icon: BookOpen,
      title: "Expert Insights",
      description: "Thoughtfully crafted articles covering the latest trends and timeless wisdom."
    },
    {
      icon: PenSquare,
      title: "Quality Content",
      description: "Every post is carefully researched and written to provide real value."
    },
    {
      icon: UserCircle,
      title: "Personal Touch",
      description: "Direct from the author with authentic perspectives and experiences."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <AnimatedHero
        title="Thoughts Worth Reading"
        subtitle="Discover insightful articles, expert perspectives, and thoughtful commentary on topics that matter. Join me on a journey through ideas that inspire and inform."
        ctaText="Explore Articles"
        ctaHref="/blog"
        showParticles
      />

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-4 animate-fade-in-up opacity-0">
              Why Read This Blog?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto animate-fade-in-up opacity-0 stagger-1">
              A space dedicated to sharing knowledge, sparking curiosity, and fostering meaningful discussions.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={feature.title} 
                className="text-center hover-elevate active-elevate-2 transition-all duration-300 animate-fade-in-up opacity-0"
                style={{ animationDelay: `${0.1 + index * 0.1}s` }}
              >
                <CardContent className="pt-8 pb-6">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary mb-5">
                    <feature.icon className="h-7 w-7" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-foreground mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {(featuredPost || postsLoading) && (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="font-serif text-3xl font-bold text-foreground mb-2">
                  Featured Article
                </h2>
                <p className="text-muted-foreground">
                  Our latest highlighted piece
                </p>
              </div>
            </div>

            {postsLoading ? (
              <BlogCardSkeleton />
            ) : featuredPost ? (
              <BlogCard post={featuredPost} variant="featured" />
            ) : null}
          </div>
        </section>
      )}

      {(recentPosts.length > 0 || postsLoading) && (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="font-serif text-3xl font-bold text-foreground mb-2">
                  Recent Articles
                </h2>
                <p className="text-muted-foreground">
                  Fresh perspectives and insights
                </p>
              </div>
              <Link href="/blog">
                <Button variant="outline" className="gap-2" data-testid="link-view-all-posts">
                  View All
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {postsLoading ? (
                <>
                  <BlogCardSkeleton />
                  <BlogCardSkeleton />
                  <BlogCardSkeleton />
                </>
              ) : (
                recentPosts.map((post, index) => (
                  <div 
                    key={post.id} 
                    className="animate-fade-in-up opacity-0"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <BlogCard post={post} />
                  </div>
                ))
              )}
            </div>
          </div>
        </section>
      )}

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-6">
                About the Author
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Welcome to my corner of the internet. I'm passionate about sharing knowledge and insights 
                that can help others grow and learn. Every article is crafted with care, aiming to provide 
                value and spark meaningful conversations.
              </p>
              <a href="/api/login">
                <Button className="gap-2" data-testid="button-get-started">
                  Get Started
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </a>
            </div>
            <div className="lg:max-w-sm lg:ml-auto">
              {authorLoading ? (
                <AuthorCardSkeleton />
              ) : (
                <AuthorCard author={author} variant="full" />
              )}
            </div>
          </div>
        </div>
      </section>

      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-border bg-background">
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
