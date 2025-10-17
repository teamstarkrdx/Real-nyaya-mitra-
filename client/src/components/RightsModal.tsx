import { useState } from 'react';
import { X, Search, Shield, Scale, Users, FileText, Home as HomeIcon, Gavel } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const categories = ['All', 'Constitutional', 'Criminal', 'Civil', 'Family', 'Procedural'];

const sampleRights = [
  { id: 1, title: 'Right to Equality', category: 'Constitutional', icon: Scale, rating: 5, description: 'Article 14-18: Equality before law and equal protection' },
  { id: 2, title: 'Right to Freedom', category: 'Constitutional', icon: Shield, rating: 5, description: 'Article 19-22: Freedom of speech, assembly, and movement' },
  { id: 3, title: 'Right Against Arrest', category: 'Criminal', icon: Gavel, rating: 5, description: 'Protection against arbitrary arrest and detention' },
  { id: 4, title: 'Right to Bail', category: 'Criminal', icon: Users, rating: 4, description: 'Provisions for bail in bailable and non-bailable offenses' },
  { id: 5, title: 'Property Rights', category: 'Civil', icon: HomeIcon, rating: 4, description: 'Rights related to property ownership and inheritance' },
  { id: 6, title: 'Right to Information', category: 'Constitutional', icon: FileText, rating: 5, description: 'RTI Act 2005: Access to government information' }
];

interface RightsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RightsModal({ isOpen, onClose }: RightsModalProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  if (!isOpen) return null;

  const filteredRights = sampleRights.filter(right => {
    const matchesSearch = right.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         right.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || right.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-card w-full max-w-6xl h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden border">
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-2xl font-bold font-heading">100 Essential Legal Rights</h2>
            <p className="text-sm text-muted-foreground mt-1">Know your rights as an Indian citizen</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            data-testid="button-close-rights-modal"
            className="hover-elevate active-elevate-2"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="p-6 border-b space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search rights..."
              className="pl-10"
              data-testid="input-search-rights"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Badge
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                className="cursor-pointer toggle-elevate"
                onClick={() => setSelectedCategory(category)}
                data-testid={`filter-${category.toLowerCase()}`}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredRights.map((right) => {
              const Icon = right.icon;
              return (
                <Card
                  key={right.id}
                  className="hover-elevate transition-all"
                  data-testid={`right-card-${right.id}`}
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
        </div>

        <div className="p-6 border-t">
          <Button
            onClick={onClose}
            className="w-full hover-elevate active-elevate-2"
            data-testid="button-back-to-home"
          >
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
}
