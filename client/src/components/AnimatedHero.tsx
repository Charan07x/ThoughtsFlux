import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

interface AnimatedHeroProps {
  title: string;
  subtitle?: string;
  ctaText?: string;
  ctaHref?: string;
  showParticles?: boolean;
}

export function AnimatedHero({
  title,
  subtitle,
  ctaText,
  ctaHref,
  showParticles = true,
}: AnimatedHeroProps) {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-primary/10" />
      
      {showParticles && (
        <>
          <div className="absolute top-20 left-10 w-4 h-4 rounded-full bg-primary/30 animate-float" />
          <div className="absolute top-40 right-20 w-6 h-6 rounded-full bg-primary/20 animate-float-delayed" />
          <div className="absolute bottom-40 left-1/4 w-3 h-3 rounded-full bg-primary/40 animate-float" />
          <div className="absolute bottom-20 right-1/3 w-5 h-5 rounded-full bg-primary/25 animate-float-delayed" />
          <div className="absolute top-1/3 left-1/3 w-2 h-2 rounded-full bg-primary/50 animate-pulse-glow" />
          <div className="absolute top-1/2 right-1/4 w-8 h-8 rounded-full bg-primary/15 animate-float" />
          
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-pulse-glow" />
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1.5s' }} />
          </div>
        </>
      )}

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 mb-8 animate-fade-in-up opacity-0">
          <Sparkles className="h-4 w-4 text-primary" />
          <span className="text-sm text-gray-300">Welcome to Thoughtsflux</span>
        </div>
        
        <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 animate-fade-in-up opacity-0 stagger-1 leading-tight">
          {title.split(' ').map((word, i) => (
            <span key={i}>
              {i === 0 ? (
                <span className="text-primary">{word}</span>
              ) : (
                <span>{word}</span>
              )}
              {' '}
            </span>
          ))}
        </h1>
        
        {subtitle && (
          <p className="text-lg sm:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-in-up opacity-0 stagger-2">
            {subtitle}
          </p>
        )}
        
        {ctaText && ctaHref && (
          <div className="animate-fade-in-up opacity-0 stagger-3">
            <a href={ctaHref}>
              <Button
                size="lg"
                className="group gap-2 px-8 py-6 text-lg bg-primary hover:bg-primary/90 text-primary-foreground"
                data-testid="button-hero-cta"
              >
                {ctaText}
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </a>
          </div>
        )}
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
