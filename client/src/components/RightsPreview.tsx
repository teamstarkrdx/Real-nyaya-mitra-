import { Shield, Scale, Users, FileText, Home as HomeIcon, Briefcase } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const previewRights = [
  {
    title: 'Right to Equality',
    category: 'Constitutional',
    icon: Scale,
    rating: 5,
    description: 'Article 14-18: Equality before law, prohibition of discrimination, equal opportunity'
  },
  {
    title: 'Right to Freedom',
    category: 'Constitutional',
    icon: Shield,
    rating: 5,
    description: 'Article 19-22: Freedom of speech, assembly, movement, and protection of life'
  },
  {
    title: 'Right Against Arrest',
    category: 'Criminal',
    icon: Users,
    rating: 5,
    description: 'Know your rights during arrest including right to counsel and bail'
  },
  {
    title: 'Property Rights',
    category: 'Civil',
    icon: HomeIcon,
    rating: 4,
    description: 'Rights related to property ownership, transfer, and inheritance'
  },
  {
    title: 'Consumer Rights',
    category: 'Civil',
    icon: Briefcase,
    rating: 4,
    description: 'Protection against unfair trade practices and defective goods'
  },
  {
    title: 'Right to Information',
    category: 'Constitutional',
    icon: FileText,
    rating: 5,
    description: 'RTI Act 2005: Access information from public authorities'
  }
];

interface RightsPreviewProps {
  onViewAll?: () => void;
}

export default function RightsPreview({ onViewAll }: RightsPreviewProps) {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">Know Your Rights</Badge>
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
            Essential Legal Rights
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Understanding your fundamental rights as an Indian citizen
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {previewRights.map((right) => {
            const Icon = right.icon;
            return (
              <Card
                key={right.title}
                className="hover-elevate transition-all duration-300"
                data-testid={`card-right-${right.title.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <Badge variant="secondary">{right.category}</Badge>
                  </div>
                  <CardTitle className="text-lg">{right.title}</CardTitle>
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span
                        key={i}
                        className={`text-sm ${i < right.rating ? 'text-yellow-500' : 'text-muted-foreground/30'}`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{right.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center">
          <Button
            size="lg"
            onClick={onViewAll}
            data-testid="button-view-all-rights"
            className="hover-elevate active-elevate-2"
          >
            View All 100 Rights
          </Button>
        </div>
      </div>
    </section>
  );
}
