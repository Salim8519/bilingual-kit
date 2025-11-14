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
    <div className="mb-8">
      <p className="text-lg text-muted-foreground mb-2">{welcome}</p>
      <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
        {appName}
      </h1>
      <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
        {description}
      </p>
      <div className="mt-8">
        <Button size="lg" onClick={onGetStarted} className="h-12 px-8 text-lg gap-2">
          {getStarted}
          <ArrowRight className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};
