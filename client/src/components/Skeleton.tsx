import { Card, CardContent, CardFooter } from "@/components/ui/card";

export function BlogCardSkeleton() {
  return (
    <Card className="h-full overflow-hidden">
      <div className="aspect-video bg-muted animate-shimmer" />
      <CardContent className="p-5">
        <div className="flex gap-2 mb-3">
          <div className="h-5 w-16 rounded-full bg-muted animate-shimmer" />
          <div className="h-5 w-12 rounded-full bg-muted animate-shimmer" />
        </div>
        <div className="h-6 w-3/4 bg-muted rounded animate-shimmer mb-2" />
        <div className="h-4 w-full bg-muted rounded animate-shimmer mb-1" />
        <div className="h-4 w-2/3 bg-muted rounded animate-shimmer" />
      </CardContent>
      <CardFooter className="px-5 pb-5 pt-0">
        <div className="h-4 w-24 bg-muted rounded animate-shimmer" />
      </CardFooter>
    </Card>
  );
}

export function FeaturedBlogSkeleton() {
  return (
    <Card className="overflow-hidden">
      <div className="grid md:grid-cols-2 gap-0">
        <div className="aspect-video md:aspect-auto md:min-h-[300px] bg-muted animate-shimmer" />
        <CardContent className="p-6 flex flex-col justify-center">
          <div className="flex gap-2 mb-3">
            <div className="h-5 w-20 rounded-full bg-muted animate-shimmer" />
          </div>
          <div className="h-8 w-3/4 bg-muted rounded animate-shimmer mb-3" />
          <div className="h-4 w-full bg-muted rounded animate-shimmer mb-2" />
          <div className="h-4 w-full bg-muted rounded animate-shimmer mb-2" />
          <div className="h-4 w-2/3 bg-muted rounded animate-shimmer mb-4" />
          <div className="h-4 w-32 bg-muted rounded animate-shimmer" />
        </CardContent>
      </div>
    </Card>
  );
}

export function AuthorCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <div className="h-20 bg-muted animate-shimmer" />
      <CardContent className="pt-0 -mt-10">
        <div className="flex flex-col items-center text-center">
          <div className="h-20 w-20 rounded-full bg-muted border-4 border-background animate-shimmer" />
          <div className="mt-4 h-6 w-32 bg-muted rounded animate-shimmer" />
          <div className="mt-2 h-4 w-24 bg-muted rounded animate-shimmer" />
          <div className="mt-3 h-4 w-full bg-muted rounded animate-shimmer" />
          <div className="mt-1 h-4 w-2/3 bg-muted rounded animate-shimmer" />
          <div className="mt-4 flex gap-2">
            <div className="h-8 w-8 rounded bg-muted animate-shimmer" />
            <div className="h-8 w-8 rounded bg-muted animate-shimmer" />
            <div className="h-8 w-8 rounded bg-muted animate-shimmer" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function TableRowSkeleton() {
  return (
    <div className="flex items-center gap-4 p-4 border-b border-border">
      <div className="h-12 w-12 rounded bg-muted animate-shimmer" />
      <div className="flex-1">
        <div className="h-4 w-48 bg-muted rounded animate-shimmer mb-2" />
        <div className="h-3 w-24 bg-muted rounded animate-shimmer" />
      </div>
      <div className="h-6 w-16 rounded-full bg-muted animate-shimmer" />
      <div className="flex gap-2">
        <div className="h-8 w-8 rounded bg-muted animate-shimmer" />
        <div className="h-8 w-8 rounded bg-muted animate-shimmer" />
      </div>
    </div>
  );
}
