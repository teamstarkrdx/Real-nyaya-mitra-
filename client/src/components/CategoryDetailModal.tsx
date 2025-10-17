import { X, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const categoryDetails = {
  'Constitutional Law': {
    title: 'Constitutional Law',
    description: 'Understanding the supreme law of India',
    points: [
      'Fundamental Rights (Articles 12-35): Protection of basic human rights including equality, freedom, and protection against exploitation',
      'Directive Principles (Articles 36-51): Guidelines for the government to create a just society',
      'Fundamental Duties (Article 51A): Duties of citizens towards the nation',
      'Parliamentary System: Structure and functioning of Legislature, Executive, and Judiciary',
      'Federal Structure: Division of powers between Union and States',
      'Amendment Procedure: Process to modify the Constitution',
      'Emergency Provisions: National, state, and financial emergencies',
      'Judicial Review: Power of courts to examine laws and executive actions'
    ]
  },
  'Criminal Law': {
    title: 'Criminal Law',
    description: 'Laws dealing with crimes and punishments',
    points: [
      'Indian Penal Code (IPC): Defines criminal offenses and their punishments',
      'Code of Criminal Procedure (CrPC): Procedural law for criminal cases',
      'Rights of Arrested Person: Right to counsel, bail, and protection against torture',
      'Bailable vs Non-Bailable Offenses: Understanding when bail can be granted',
      'Cognizable vs Non-Cognizable: Police powers to arrest without warrant',
      'FIR and Complaint: How to file a First Information Report',
      'Investigation and Trial Process: Steps from arrest to judgment',
      'Appeals and Revisions: Legal remedies against conviction'
    ]
  },
  'Civil Matters': {
    title: 'Civil Law',
    description: 'Laws governing private disputes',
    points: [
      'Code of Civil Procedure: Procedural law for civil cases',
      'Property Law: Ownership, transfer, and disputes',
      'Contract Law: Formation, performance, and breach of contracts',
      'Torts: Civil wrongs and compensation',
      'Specific Relief Act: Enforcement of civil rights',
      'Limitation Act: Time limits for filing civil suits',
      'Civil Suits Process: Plaint, written statement, evidence, judgment',
      'Alternative Dispute Resolution: Mediation, arbitration, conciliation'
    ]
  },
  'Family Law': {
    title: 'Family Law',
    description: 'Laws relating to family matters',
    points: [
      'Marriage Laws: Hindu Marriage Act, Special Marriage Act, Muslim Personal Law',
      'Divorce and Separation: Grounds and procedures for divorce',
      'Maintenance: Rights of spouse and children for financial support',
      'Child Custody: Best interests of child in custody matters',
      'Adoption Laws: Legal process of adopting a child',
      'Succession and Inheritance: Distribution of property after death',
      'Domestic Violence Act: Protection against domestic abuse',
      'Guardianship: Legal guardian for minors'
    ]
  },
  'Corporate Law': {
    title: 'Corporate Law',
    description: 'Laws governing companies and businesses',
    points: [
      'Companies Act 2013: Formation, management, and dissolution of companies',
      'Partnership Act: Rules for partnership firms',
      'LLP Act: Limited Liability Partnership regulations',
      'SEBI Regulations: Securities and stock market laws',
      'Competition Act: Anti-monopoly and fair trade practices',
      'Insolvency and Bankruptcy Code: Resolution of insolvency',
      'Corporate Governance: Duties of directors and officers',
      'Mergers and Acquisitions: Legal framework for business combinations'
    ]
  },
  'Legal Education': {
    title: 'Legal Education',
    description: 'Learn about the Indian legal system',
    points: [
      'Structure of Indian Judiciary: Supreme Court, High Courts, District Courts',
      'Legal Profession: Role of advocates, judges, and legal professionals',
      'Public Interest Litigation: Access to justice for public causes',
      'Legal Aid: Free legal services for marginalized sections',
      'Consumer Protection: Rights and remedies for consumers',
      'RTI Act: Right to Information from government',
      'Human Rights: Protection of fundamental human rights',
      'Legal Research: How to research and understand laws'
    ]
  }
};

interface CategoryDetailModalProps {
  category: string | null;
  onClose: () => void;
}

export default function CategoryDetailModal({ category, onClose }: CategoryDetailModalProps) {
  if (!category) return null;

  const details = categoryDetails[category as keyof typeof categoryDetails];
  if (!details) return null;

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <Card className="w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-2xl font-bold font-heading">{details.title}</h2>
            <p className="text-sm text-muted-foreground mt-1">{details.description}</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            data-testid="button-close-category-detail"
            className="hover-elevate active-elevate-2"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <Badge variant="outline" className="mb-4">Key Topics</Badge>
          <div className="space-y-4">
            {details.points.map((point, index) => (
              <Card key={index} className="hover-elevate transition-all">
                <CardContent className="p-4">
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm font-semibold">
                      {index + 1}
                    </div>
                    <p className="text-sm text-foreground flex-1">{point}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="p-6 border-t">
          <Button
            onClick={onClose}
            className="w-full hover-elevate active-elevate-2"
            data-testid="button-back-from-detail"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Legal Guidance
          </Button>
        </div>
      </Card>
    </div>
  );
}
