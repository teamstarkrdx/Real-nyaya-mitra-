import { Scale, Gavel, Home as HomeIcon, Users, Briefcase, BookOpen } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface GuidanceCategory {
  title: string;
  description: string;
  icon: React.ElementType;
  gradient: string;
}

interface LegalGuidanceHubProps {
  onExploreMore?: (category: string) => void;
}

const categories: GuidanceCategory[] = [
  {
    title: 'Constitutional Law',
    description: 'Fundamental rights, directive principles, and constitutional remedies',
    icon: Scale,
    gradient: 'from-purple-500 to-blue-500'
  },
  {
    title: 'Criminal Law',
    description: 'IPC sections, criminal procedures, and your rights during arrest',
    icon: Gavel,
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    title: 'Civil Matters',
    description: 'Property disputes, contracts, and civil procedure codes',
    icon: HomeIcon,
    gradient: 'from-cyan-500 to-teal-500'
  },
  {
    title: 'Family Law',
    description: 'Marriage, divorce, custody, and inheritance matters',
    icon: Users,
    gradient: 'from-teal-500 to-green-500'
  },
  {
    title: 'Corporate Law',
    description: 'Company formation, compliance, and business regulations',
    icon: Briefcase,
    gradient: 'from-green-500 to-emerald-500'
  },
  {
    title: 'Legal Education',
    description: 'Learn about Indian legal system and your fundamental rights',
    icon: BookOpen,
    gradient: 'from-emerald-500 to-purple-500'
  }
];

export default function LegalGuidanceHub({ onExploreMore }: LegalGuidanceHubProps) {
  return (
    <section className="py-16 md:py-24" id="legal-guidance">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">Legal Guidance Hub</Badge>
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
            Comprehensive Legal Assistance
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Expert guidance across all major areas of Indian law
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Card
                key={category.title}
                className="group hover-elevate transition-all duration-300 hover:shadow-xl"
                data-testid={`card-${category.title.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <CardHeader>
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${category.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">{category.title}</CardTitle>
                  <CardDescription className="text-base">
                    {category.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    variant="ghost"
                    className="w-full hover-elevate active-elevate-2"
                    onClick={() => onExploreMore?.(category.title)}
                    data-testid={`button-explore-${category.title.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    Explore More →
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
