import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface HeroSectionProps {
  welcome: string;
  appName: string;
  description: string;
  getStarted: string;
  onGetStarted: () => void;
}

export const HeroSection = ({ 
  welcome, 
  appName, 
  description, 
  getStarted, 
  onGetStarted 
}: HeroSectionProps) => {
  return (
    <article className="mb-8">
      <p className="text-lg text-muted-foreground mb-2">{welcome}</p>
      <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent leading-tight py-4">
        {appName}
      </h1>
      <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
        {description}
      </p>
      <nav className="mt-8" aria-label="Main navigation">
        <Button 
          size="lg" 
          onClick={onGetStarted} 
          className="h-12 px-8 text-lg gap-2"
          aria-label={getStarted}
        >
          {getStarted}
          <ArrowRight className="h-5 w-5" aria-hidden="true" />
        </Button>
      </nav>
    </article>
  );
};
