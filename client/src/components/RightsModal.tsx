import { useState } from 'react';
import { X, Search, Shield, Scale, Users, FileText, Home as HomeIcon, Gavel, Heart, Briefcase, Book, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const categories = ['All', 'Constitutional', 'Criminal', 'Civil', 'Family', 'Consumer', 'Labour'];

const allRights = [
  // Constitutional Rights (1-25)
  { id: 1, title: 'Right to Equality', category: 'Constitutional', icon: Scale, rating: 5, description: 'Article 14: Equality before law and equal protection of laws' },
  { id: 2, title: 'Right to Freedom of Speech', category: 'Constitutional', icon: Shield, rating: 5, description: 'Article 19(1)(a): Freedom of speech and expression' },
  { id: 3, title: 'Right to Life and Personal Liberty', category: 'Constitutional', icon: Heart, rating: 5, description: 'Article 21: Protection of life and personal liberty' },
  { id: 4, title: 'Right Against Exploitation', category: 'Constitutional', icon: Users, rating: 5, description: 'Article 23-24: Prohibition of traffic in human beings and child labour' },
  { id: 5, title: 'Right to Freedom of Religion', category: 'Constitutional', icon: Book, rating: 5, description: 'Article 25-28: Freedom of conscience and free profession of religion' },
  { id: 6, title: 'Cultural and Educational Rights', category: 'Constitutional', icon: Book, rating: 5, description: 'Article 29-30: Protection of interests of minorities' },
  { id: 7, title: 'Right to Constitutional Remedies', category: 'Constitutional', icon: Scale, rating: 5, description: 'Article 32: Right to move Supreme Court for enforcement of rights' },
  { id: 8, title: 'Prohibition of Discrimination', category: 'Constitutional', icon: Scale, rating: 5, description: 'Article 15: Prohibition on grounds of religion, race, caste, sex or place of birth' },
  { id: 9, title: 'Equality of Opportunity', category: 'Constitutional', icon: Briefcase, rating: 5, description: 'Article 16: Equality of opportunity in matters of public employment' },
  { id: 10, title: 'Abolition of Untouchability', category: 'Constitutional', icon: Users, rating: 5, description: 'Article 17: Practice of untouchability is abolished' },
  { id: 11, title: 'Abolition of Titles', category: 'Constitutional', icon: Shield, rating: 4, description: 'Article 18: No titles except military and academic distinctions' },
  { id: 12, title: 'Freedom of Assembly', category: 'Constitutional', icon: Users, rating: 5, description: 'Article 19(1)(b): Right to assemble peaceably and without arms' },
  { id: 13, title: 'Freedom of Association', category: 'Constitutional', icon: Users, rating: 5, description: 'Article 19(1)(c): Right to form associations or unions' },
  { id: 14, title: 'Freedom of Movement', category: 'Constitutional', icon: Shield, rating: 5, description: 'Article 19(1)(d): Right to move freely throughout India' },
  { id: 15, title: 'Freedom of Residence', category: 'Constitutional', icon: HomeIcon, rating: 5, description: 'Article 19(1)(e): Right to reside and settle in any part of India' },
  { id: 16, title: 'Freedom of Profession', category: 'Constitutional', icon: Briefcase, rating: 5, description: 'Article 19(1)(g): Right to practice any profession or carry on any occupation' },
  { id: 17, title: 'Protection in Respect of Conviction', category: 'Constitutional', icon: Gavel, rating: 5, description: 'Article 20: Protection against ex post facto laws and double jeopardy' },
  { id: 18, title: 'Right to Education', category: 'Constitutional', icon: Book, rating: 5, description: 'Article 21A: Free and compulsory education for children 6-14 years' },
  { id: 19, title: 'Right Against Self-Incrimination', category: 'Constitutional', icon: Shield, rating: 5, description: 'Article 20(3): No person accused shall be compelled to be a witness against himself' },
  { id: 20, title: 'Right to Information', category: 'Constitutional', icon: FileText, rating: 5, description: 'RTI Act 2005: Right to access information from public authorities' },
  { id: 21, title: 'Right to Privacy', category: 'Constitutional', icon: Shield, rating: 5, description: 'Part of Article 21: Right to privacy is a fundamental right' },
  { id: 22, title: 'Right to Protest', category: 'Constitutional', icon: Users, rating: 5, description: 'Under Article 19: Peaceful assembly and freedom of expression' },
  { id: 23, title: 'Right to Dignified Life', category: 'Constitutional', icon: Heart, rating: 5, description: 'Article 21: Right to live with human dignity' },
  { id: 24, title: 'Right to Clean Environment', category: 'Constitutional', icon: Shield, rating: 5, description: 'Article 21: Right to healthy environment is part of right to life' },
  { id: 25, title: 'Right to Speedy Trial', category: 'Constitutional', icon: Gavel, rating: 5, description: 'Article 21: Right to speedy trial as part of right to life' },

  // Criminal Rights (26-45)
  { id: 26, title: 'Right Against Arbitrary Arrest', category: 'Criminal', icon: Gavel, rating: 5, description: 'Article 22: Protection against arrest and detention in certain cases' },
  { id: 27, title: 'Right to Know Grounds of Arrest', category: 'Criminal', icon: FileText, rating: 5, description: 'Article 22(1): Right to be informed of grounds of arrest' },
  { id: 28, title: 'Right to Legal Counsel', category: 'Criminal', icon: Scale, rating: 5, description: 'Article 22(1): Right to consult and be defended by legal practitioner' },
  { id: 29, title: 'Right to Bail', category: 'Criminal', icon: Shield, rating: 5, description: 'CrPC Section 436-450: Right to bail in bailable offenses' },
  { id: 30, title: 'Right to Free Legal Aid', category: 'Criminal', icon: Scale, rating: 5, description: 'Article 39A: Free legal aid to poor and vulnerable' },
  { id: 31, title: 'Right Against Torture', category: 'Criminal', icon: Shield, rating: 5, description: 'Article 21: Protection against custodial torture' },
  { id: 32, title: 'Right to Fair Trial', category: 'Criminal', icon: Gavel, rating: 5, description: 'Article 21: Right to fair and impartial trial' },
  { id: 33, title: 'Right to Appeal', category: 'Criminal', icon: FileText, rating: 5, description: 'CrPC: Right to appeal against conviction' },
  { id: 34, title: 'Right Against Forced Confession', category: 'Criminal', icon: Shield, rating: 5, description: 'Article 20(3): Confession by force is inadmissible' },
  { id: 35, title: 'Right to Remain Silent', category: 'Criminal', icon: Shield, rating: 5, description: 'Article 20(3): Right not to speak against oneself' },
  { id: 36, title: 'Right to Medical Examination', category: 'Criminal', icon: Heart, rating: 4, description: 'CrPC Section 54: Right to medical examination after arrest' },
  { id: 37, title: 'Right to be Produced Before Magistrate', category: 'Criminal', icon: Gavel, rating: 5, description: 'Article 22(2): Production within 24 hours of arrest' },
  { id: 38, title: 'Right Against Illegal Detention', category: 'Criminal', icon: Shield, rating: 5, description: 'Article 22: No detention beyond constitutional limits' },
  { id: 39, title: 'Right to File FIR', category: 'Criminal', icon: FileText, rating: 5, description: 'CrPC Section 154: Right to register First Information Report' },
  { id: 40, title: 'Right to Zero FIR', category: 'Criminal', icon: FileText, rating: 4, description: 'File FIR at any police station regardless of jurisdiction' },
  { id: 41, title: 'Right to Copy of FIR', category: 'Criminal', icon: FileText, rating: 4, description: 'CrPC Section 154: Free copy of FIR to complainant' },
  { id: 42, title: 'Right Against Double Jeopardy', category: 'Criminal', icon: Gavel, rating: 5, description: 'Article 20(2): No person prosecuted twice for same offense' },
  { id: 43, title: 'Right to Compensation', category: 'Criminal', icon: FileText, rating: 4, description: 'Section 357A CrPC: Victim compensation scheme' },
  { id: 44, title: 'Right to Anticipatory Bail', category: 'Criminal', icon: Shield, rating: 4, description: 'Section 438 CrPC: Bail in anticipation of arrest' },
  { id: 45, title: 'Right Against Illegal Search', category: 'Criminal', icon: Shield, rating: 5, description: 'CrPC Section 100: Protection against illegal search and seizure' },

  // Civil Rights (46-60)
  { id: 46, title: 'Right to Property', category: 'Civil', icon: HomeIcon, rating: 4, description: 'Article 300A: No person shall be deprived of property save by law' },
  { id: 47, title: 'Right to Inheritance', category: 'Civil', icon: FileText, rating: 4, description: 'Hindu Succession Act: Rights of legal heirs' },
  { id: 48, title: 'Right to Contract', category: 'Civil', icon: FileText, rating: 4, description: 'Indian Contract Act: Freedom to enter into contracts' },
  { id: 49, title: 'Right to Sue', category: 'Civil', icon: Scale, rating: 5, description: 'CPC: Right to approach court for civil remedies' },
  { id: 50, title: 'Right to Appeal in Civil Cases', category: 'Civil', icon: FileText, rating: 4, description: 'CPC Order 41: Right to appeal against civil decree' },
  { id: 51, title: 'Right to Specific Performance', category: 'Civil', icon: FileText, rating: 4, description: 'Specific Relief Act: Enforcement of contractual obligations' },
  { id: 52, title: 'Right to Injunction', category: 'Civil', icon: Shield, rating: 4, description: 'CPC Order 39: Temporary and permanent injunctions' },
  { id: 53, title: 'Right to Damages', category: 'Civil', icon: FileText, rating: 4, description: 'Right to claim compensation for civil wrongs' },
  { id: 54, title: 'Right to Partition', category: 'Civil', icon: HomeIcon, rating: 4, description: 'Right to divide jointly owned property' },
  { id: 55, title: 'Right to Easement', category: 'Civil', icon: HomeIcon, rating: 3, description: 'Easements Act: Right of way and other easements' },
  { id: 56, title: 'Right to Transfer Property', category: 'Civil', icon: FileText, rating: 4, description: 'Transfer of Property Act: Right to transfer immovable property' },
  { id: 57, title: 'Right to Mortgage', category: 'Civil', icon: HomeIcon, rating: 4, description: 'Right to create mortgage on property' },
  { id: 58, title: 'Right to Lease', category: 'Civil', icon: HomeIcon, rating: 4, description: 'Right to lease property for specified period' },
  { id: 59, title: 'Right to Gift', category: 'Civil', icon: Heart, rating: 4, description: 'Transfer of Property Act: Right to gift property' },
  { id: 60, title: 'Right to Will', category: 'Civil', icon: FileText, rating: 4, description: 'Indian Succession Act: Right to make a will' },

  // Family Rights (61-75)
  { id: 61, title: 'Right to Marriage', category: 'Family', icon: Heart, rating: 5, description: 'Article 21: Right to marry person of choice' },
  { id: 62, title: 'Right to Divorce', category: 'Family', icon: FileText, rating: 4, description: 'Various personal laws: Right to seek divorce' },
  { id: 63, title: 'Right to Maintenance', category: 'Family', icon: Heart, rating: 5, description: 'CrPC Section 125: Right to claim maintenance' },
  { id: 64, title: 'Right to Child Custody', category: 'Family', icon: Users, rating: 5, description: 'Guardians Act: Best interest of child in custody matters' },
  { id: 65, title: 'Right to Adopt', category: 'Family', icon: Heart, rating: 4, description: 'Adoption laws: Right to legally adopt a child' },
  { id: 66, title: 'Right to Guardianship', category: 'Family', icon: Users, rating: 4, description: 'Right to be appointed guardian of minor' },
  { id: 67, title: 'Right Against Domestic Violence', category: 'Family', icon: Shield, rating: 5, description: 'DV Act 2005: Protection from domestic abuse' },
  { id: 68, title: 'Right to Residence', category: 'Family', icon: HomeIcon, rating: 5, description: 'DV Act: Right to reside in shared household' },
  { id: 69, title: 'Right to Streedhan', category: 'Family', icon: Heart, rating: 4, description: "Women's right to gifts and jewelry received" },
  { id: 70, title: 'Right to Equal Share in Property', category: 'Family', icon: Scale, rating: 4, description: 'Hindu Succession Act: Equal rights for daughters' },
  { id: 71, title: 'Right to Alimony', category: 'Family', icon: FileText, rating: 4, description: 'Right to permanent alimony after divorce' },
  { id: 72, title: 'Right to Restitution of Conjugal Rights', category: 'Family', icon: Heart, rating: 3, description: 'Right to claim living together as couple' },
  { id: 73, title: 'Right to Judicial Separation', category: 'Family', icon: FileText, rating: 4, description: 'Right to live separately with court permission' },
  { id: 74, title: 'Right to Marry Outside Religion', category: 'Family', icon: Heart, rating: 5, description: 'Special Marriage Act: Inter-religious marriage' },
  { id: 75, title: 'Right Against Dowry', category: 'Family', icon: Shield, rating: 5, description: 'Dowry Prohibition Act: Protection against dowry demands' },

  // Consumer Rights (76-85)
  { id: 76, title: 'Right to Safety', category: 'Consumer', icon: Shield, rating: 5, description: 'Consumer Protection Act: Right to be protected from hazardous goods' },
  { id: 77, title: 'Right to Information', category: 'Consumer', icon: FileText, rating: 5, description: 'Right to know quality, quantity, price of goods' },
  { id: 78, title: 'Right to Choose', category: 'Consumer', icon: Users, rating: 5, description: 'Right to select from variety of goods at competitive prices' },
  { id: 79, title: 'Right to be Heard', category: 'Consumer', icon: Users, rating: 5, description: 'Right to represent interests in consumer forums' },
  { id: 80, title: 'Right to Seek Redressal', category: 'Consumer', icon: Scale, rating: 5, description: 'Right to seek compensation for unfair trade practices' },
  { id: 81, title: 'Right to Consumer Education', category: 'Consumer', icon: Book, rating: 4, description: 'Right to acquire knowledge about consumer rights' },
  { id: 82, title: 'Right to Return Defective Goods', category: 'Consumer', icon: FileText, rating: 5, description: 'Right to return or replace defective products' },
  { id: 83, title: 'Right to Refund', category: 'Consumer', icon: FileText, rating: 5, description: 'Right to get money back for defective goods/services' },
  { id: 84, title: 'Right Against Unfair Practices', category: 'Consumer', icon: Shield, rating: 5, description: 'Protection against misleading advertisements' },
  { id: 85, title: 'Right to Standard Quality', category: 'Consumer', icon: Shield, rating: 5, description: 'Right to receive goods meeting quality standards' },

  // Labour Rights (86-100)
  { id: 86, title: 'Right to Form Unions', category: 'Labour', icon: Users, rating: 5, description: 'Trade Unions Act: Right to form and join unions' },
  { id: 87, title: 'Right to Strike', category: 'Labour', icon: Users, rating: 4, description: 'Right to strike for legitimate demands' },
  { id: 88, title: 'Right to Fair Wages', category: 'Labour', icon: Briefcase, rating: 5, description: 'Minimum Wages Act: Right to minimum wages' },
  { id: 89, title: 'Right to Safe Working Conditions', category: 'Labour', icon: Shield, rating: 5, description: 'Factories Act: Right to safe and healthy workplace' },
  { id: 90, title: 'Right Against Forced Labour', category: 'Labour', icon: Shield, rating: 5, description: 'Article 23: Prohibition of forced labour' },
  { id: 91, title: 'Right to Social Security', category: 'Labour', icon: Heart, rating: 4, description: 'ESI & PF: Right to social security benefits' },
  { id: 92, title: 'Right to Equal Pay', category: 'Labour', icon: Scale, rating: 5, description: 'Equal Remuneration Act: Equal pay for equal work' },
  { id: 93, title: 'Right to Maternity Benefit', category: 'Labour', icon: Heart, rating: 5, description: 'Maternity Benefit Act: Paid maternity leave' },
  { id: 94, title: 'Right Against Discrimination at Work', category: 'Labour', icon: Scale, rating: 5, description: 'Right to non-discrimination in employment' },
  { id: 95, title: 'Right to Bonus', category: 'Labour', icon: Briefcase, rating: 4, description: 'Payment of Bonus Act: Right to annual bonus' },
  { id: 96, title: 'Right to Gratuity', category: 'Labour', icon: Briefcase, rating: 4, description: 'Payment of Gratuity Act: Right to gratuity after 5 years' },
  { id: 97, title: 'Right to Leave', category: 'Labour', icon: Heart, rating: 4, description: 'Right to paid leave and holidays' },
  { id: 98, title: 'Right Against Sexual Harassment', category: 'Labour', icon: Shield, rating: 5, description: 'POSH Act: Protection from sexual harassment at workplace' },
  { id: 99, title: 'Right to Compensation for Injury', category: 'Labour', icon: Heart, rating: 5, description: "Workmen's Compensation Act: Compensation for work injuries" },
  { id: 100, title: 'Right to Job Security', category: 'Labour', icon: Briefcase, rating: 4, description: 'Industrial Disputes Act: Protection against unfair termination' }
];

interface RightsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RightsModal({ isOpen, onClose }: RightsModalProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  if (!isOpen) return null;

  const filteredRights = allRights.filter(right => {
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
            <p className="text-sm text-muted-foreground mt-1">
              Complete guide to your rights as an Indian citizen ({filteredRights.length} rights shown)
            </p>
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
                      <div className="flex items-start gap-2">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-mono text-muted-foreground">#{right.id}</span>
                            <Badge variant="secondary" className="text-xs">{right.category}</Badge>
                          </div>
                          <CardTitle className="text-base">{right.title}</CardTitle>
                        </div>
                      </div>
                    </div>
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
          
          {filteredRights.length === 0 && (
            <div className="text-center py-12">
              <AlertCircle className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">No rights found matching your search</p>
            </div>
          )}
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
