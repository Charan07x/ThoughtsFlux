import { useQuery } from "@tanstack/react-query";
import { Search, Filter } from "lucide-react";
import { useState, useMemo } from "react";
import { Navigation } from "@/components/Navigation";
import { BlogCard } from "@/components/BlogCard";
import { BlogCardSkeleton, FeaturedBlogSkeleton } from "@/components/Skeleton";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import type { BlogPost } from "@shared/schema";

export default function Blog() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const { data: posts, isLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/posts/published"],
  });

  const publishedPosts = posts || [];
  
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    publishedPosts.forEach(post => {
      post.tags?.forEach(tag => tags.add(tag));
    });
    return Array.from(tags);
  }, [publishedPosts]);

  const filteredPosts = useMemo(() => {
    return publishedPosts.filter(post => {
      const matchesSearch = searchQuery === "" || 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesTag = !selectedTag || post.tags?.includes(selectedTag);
      
      return matchesSearch && matchesTag;
    });
  }, [publishedPosts, searchQuery, selectedTag]);

  const featuredPost = filteredPosts[0];
  const otherPosts = filteredPosts.slice(1);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-muted/50 to-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-foreground mb-4 animate-fade-in-up opacity-0">
              Blog Articles
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-fade-in-up opacity-0 stagger-1">
              Explore our collection of thoughtfully crafted articles covering a wide range of topics.
            </p>
          </div>

          <div className="max-w-2xl mx-auto mb-8 animate-fade-in-up opacity-0 stagger-2">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 text-base"
                data-testid="input-search"
              />
            </div>
          </div>

          {allTags.length > 0 && (
            <div className="flex flex-wrap items-center justify-center gap-2 animate-fade-in-up opacity-0 stagger-3">
              <Filter className="h-4 w-4 text-muted-foreground mr-2" />
              <Badge
                variant={selectedTag === null ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setSelectedTag(null)}
                data-testid="filter-all"
              >
                All
              </Badge>
              {allTags.map(tag => (
                <Badge
                  key={tag}
                  variant={selectedTag === tag ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => setSelectedTag(tag)}
                  data-testid={`filter-tag-${tag}`}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>

      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {isLoading ? (
            <>
              <div className="mb-12">
                <FeaturedBlogSkeleton />
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <BlogCardSkeleton />
                <BlogCardSkeleton />
                <BlogCardSkeleton />
              </div>
            </>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-6">
                <Search className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="font-serif text-2xl font-semibold text-foreground mb-2">
                No articles found
              </h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                {searchQuery || selectedTag 
                  ? "Try adjusting your search or filter to find what you're looking for."
                  : "No articles have been published yet. Check back soon!"}
              </p>
            </div>
          ) : (
            <>
              {featuredPost && (
                <div className="mb-12 animate-fade-in-up opacity-0">
                  <BlogCard post={featuredPost} variant="featured" />
                </div>
              )}

              {otherPosts.length > 0 && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {otherPosts.map((post, index) => (
                    <div 
                      key={post.id}
                      className="animate-fade-in-up opacity-0"
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      <BlogCard post={post} />
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>

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
