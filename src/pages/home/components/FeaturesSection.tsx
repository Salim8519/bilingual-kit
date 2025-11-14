interface FeaturesSectionProps {
  title: string;
  features: string[];
}

export const FeaturesSection = ({ title, features }: FeaturesSectionProps) => {
  return (
    <div className="mt-20">
      <h2 className="text-2xl font-bold mb-8 text-foreground">{title}</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <div
            key={index}
            className="p-6 bg-card border border-border rounded-lg hover:shadow-lg transition-shadow"
          >
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-primary">{index + 1}</span>
            </div>
            <h3 className="font-semibold text-lg text-card-foreground">{feature}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};
