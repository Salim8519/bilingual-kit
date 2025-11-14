import { Button } from '@/components/ui/button';
import { Github, GitFork, Download, ExternalLink } from 'lucide-react';

interface GitHubSectionProps {
  title: string;
  description: string;
  cloneText: string;
  forkText: string;
  downloadText: string;
  viewButtonText: string;
  madeByText: string;
  developerName: string;
  repoUrl: string;
}

export const GitHubSection = ({
  title,
  description,
  cloneText,
  forkText,
  downloadText,
  viewButtonText,
  madeByText,
  developerName,
  repoUrl,
}: GitHubSectionProps) => {
  return (
    <article className="mt-20 p-8 bg-card border-2 border-primary/20 rounded-2xl">
      <header className="flex items-center justify-center gap-3 mb-6">
        <Github className="h-8 w-8 text-primary" aria-hidden="true" />
        <h2 className="text-2xl font-bold text-foreground">{title}</h2>
      </header>
      <p className="text-muted-foreground mb-6 text-lg">{description}</p>
      
      <div className="grid md:grid-cols-3 gap-4 mb-8" role="list">
        <div className="p-4 bg-muted/50 rounded-lg" role="listitem">
          <Github className="h-6 w-6 text-primary mx-auto mb-2" aria-label="Clone repository" />
          <p className="font-medium text-sm">{cloneText}</p>
        </div>
        <div className="p-4 bg-muted/50 rounded-lg" role="listitem">
          <GitFork className="h-6 w-6 text-primary mx-auto mb-2" aria-label="Fork repository" />
          <p className="font-medium text-sm">{forkText}</p>
        </div>
        <div className="p-4 bg-muted/50 rounded-lg" role="listitem">
          <Download className="h-6 w-6 text-primary mx-auto mb-2" aria-label="Download ZIP" />
          <p className="font-medium text-sm">{downloadText}</p>
        </div>
      </div>

      <Button 
        size="lg" 
        variant="outline"
        className="h-12 px-8 text-lg gap-2 border-primary/50 hover:bg-primary hover:text-primary-foreground"
        onClick={() => window.open(repoUrl, '_blank')}
        aria-label={`${viewButtonText} (opens in new tab)`}
      >
        <Github className="h-5 w-5" aria-hidden="true" />
        {viewButtonText}
        <ExternalLink className="h-4 w-4" aria-hidden="true" />
      </Button>

      <footer className="mt-8 pt-6 border-t border-border">
        <p className="text-muted-foreground text-sm">
          {madeByText} <span className="font-semibold text-foreground">{developerName}</span>
        </p>
      </footer>
    </article>
  );
};
