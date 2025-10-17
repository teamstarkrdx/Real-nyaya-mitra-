import { MessageSquare, Scale, Globe, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface HeroProps {
  onStartChat?: () => void;
  onViewRights?: () => void;
}

export default function Hero({ onStartChat, onViewRights }: HeroProps) {
  const features = [
    { icon: Shield, label: '24/7 Support' },
    { icon: Globe, label: '11 Languages' },
    { icon: MessageSquare, label: '100% Confidential' },
    { icon: Scale, label: 'AI-Powered' }
  ];

  return (
    <section className="relative py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <Badge variant="outline" className="mb-4">
            India's Premier Legal AI Assistant
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-bold font-heading leading-tight">
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              India's AI Legal Assistant
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            Get instant legal guidance in your language, 24/7
          </p>

          <div className="flex flex-wrap justify-center gap-3 pt-4">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <Card key={feature.label} className="px-4 py-2 flex items-center gap-2">
                  <Icon className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">{feature.label}</span>
                </Card>
              );
            })}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <Button
              size="lg"
              onClick={onStartChat}
              data-testid="button-start-chat"
              className="text-lg px-8 hover-elevate active-elevate-2"
            >
              <MessageSquare className="mr-2 h-5 w-5" />
              Start Chat
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={onViewRights}
              data-testid="button-view-rights"
              className="text-lg px-8 hover-elevate active-elevate-2 bg-background/50 backdrop-blur-sm"
            >
              <Scale className="mr-2 h-5 w-5" />
              View Legal Rights
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
