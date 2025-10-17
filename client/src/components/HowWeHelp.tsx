import { Clock, DollarSign, Smartphone, BookOpen, Globe } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const benefits = [
  {
    icon: Clock,
    title: '24/7 Availability',
    description: 'Get legal guidance anytime, anywhere, even during holidays'
  },
  {
    icon: DollarSign,
    title: 'Free Basic Guidance',
    description: 'Access fundamental legal information at no cost'
  },
  {
    icon: Smartphone,
    title: 'Mobile-Friendly',
    description: 'Optimized for seamless experience on all devices'
  },
  {
    icon: BookOpen,
    title: 'Easy to Understand',
    description: 'Legal jargon translated into simple language'
  },
  {
    icon: Globe,
    title: 'Multi-Language Support',
    description: 'Communicate in your preferred Indian language'
  }
];

export default function HowWeHelp() {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
            How We Help You
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Making legal assistance accessible and understandable for everyone
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <Card
                key={benefit.title}
                className="hover-elevate transition-all duration-300"
                data-testid={`card-benefit-${benefit.title.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
