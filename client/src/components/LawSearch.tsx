import { useState } from 'react';
import { Search, FileText, Scale, Gavel } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface SearchResult {
  title: string;
  category: string;
  description: string;
  reference: string;
}

export default function LawSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = () => {
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    setTimeout(() => {
      const mockResults: SearchResult[] = [
        {
          title: 'Right to Equality',
          category: 'Constitution',
          description: 'Article 14 - Equality before law and equal protection of laws',
          reference: 'Article 14, Constitution of India'
        },
        {
          title: 'Theft',
          category: 'IPC',
          description: 'Whoever intends to take dishonestly any movable property',
          reference: 'Section 378, Indian Penal Code, 1860'
        },
        {
          title: 'Arrest',
          category: 'CrPC',
          description: 'Manner of arrest and duties of officer making arrest',
          reference: 'Section 46, Code of Criminal Procedure, 1973'
        }
      ];
      setResults(mockResults);
      setIsSearching(false);
    }, 1000);
  };

  return (
    <section className="py-16 md:py-24" id="law-search">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">Law Search Engine</Badge>
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
            Search Indian Laws
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find information about Constitution, IPC, CrPC, and other Indian acts
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    placeholder="Search for articles, sections, or acts..."
                    className="pl-10"
                    data-testid="input-law-search"
                  />
                </div>
                <Button
                  onClick={handleSearch}
                  disabled={!searchQuery.trim() || isSearching}
                  data-testid="button-search-law"
                  className="hover-elevate active-elevate-2"
                >
                  {isSearching ? 'Searching...' : 'Search'}
                </Button>
              </div>
            </CardContent>
          </Card>

          {results.length > 0 && (
            <div className="space-y-4">
              {results.map((result, index) => {
                const icons = {
                  Constitution: Scale,
                  IPC: Gavel,
                  CrPC: FileText
                };
                const Icon = icons[result.category as keyof typeof icons] || FileText;

                return (
                  <Card
                    key={index}
                    className="hover-elevate transition-all"
                    data-testid={`search-result-${index}`}
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3 flex-1">
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <Icon className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <CardTitle className="text-lg mb-1">{result.title}</CardTitle>
                            <Badge variant="secondary">{result.category}</Badge>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <p className="text-sm text-muted-foreground">{result.description}</p>
                      <p className="text-xs font-mono text-muted-foreground bg-muted/50 p-2 rounded">
                        {result.reference}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
