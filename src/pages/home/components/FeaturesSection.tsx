interface FeaturesSectionProps {
  title: string;
  features: string[];
}

export const FeaturesSection = ({ title, features }: FeaturesSectionProps) => {
  return (
    <article className="mt-20">
      <h2 className="text-2xl font-bold mb-8 text-foreground">{title}</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6" role="list">
        {features.map((feature, index) => (
          <article
            key={index}
            className="p-6 bg-card border border-border rounded-lg hover:shadow-lg transition-shadow"
            role="listitem"
          >
            <div 
              className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4"
              aria-hidden="true"
            >
              <span className="text-2xl font-bold text-primary">{index + 1}</span>
            </div>
            <h3 className="font-semibold text-lg text-card-foreground">{feature}</h3>
          </article>
        ))}
      </div>
    </article>
  );
};
