import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import { useAuth } from "@/hooks/useAuth";
import NotFound from "@/pages/not-found";
import Landing from "@/pages/Landing";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import Dashboard from "@/pages/Dashboard";
import BlogEditor from "@/pages/BlogEditor";
import AuthorProfile from "@/pages/AuthorProfile";
import AboutAuthor from "@/pages/AboutAuthor";
import Contact from "@/pages/Contact";

function Router() {
  const { isAuthenticated, isLoading } = useAuth();

  return (
    <Switch>
      <Route path="/" component={Landing} />
      <Route path="/blog" component={Blog} />
      <Route path="/blog/:slug" component={BlogPost} />
      <Route path="/about" component={AboutAuthor} />
      <Route path="/contact" component={Contact} />
      {(isAuthenticated || isLoading) && (
        <>
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/dashboard/new" component={BlogEditor} />
          <Route path="/dashboard/edit/:id" component={BlogEditor} />
          <Route path="/dashboard/profile" component={AuthorProfile} />
        </>
      )}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="crimson-blog-theme">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
