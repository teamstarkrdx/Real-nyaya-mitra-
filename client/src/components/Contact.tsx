import { Phone, Mail, MapPin, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const emergencyContacts = [
  {
    name: 'Police Emergency',
    number: '100',
    description: 'For immediate police assistance',
    icon: AlertCircle,
    color: 'text-red-500'
  },
  {
    name: 'Legal Aid Helpline',
    number: '15100',
    description: 'Free legal assistance',
    icon: Phone,
    color: 'text-blue-500'
  },
  {
    name: 'Women Helpline',
    number: '181',
    description: '24x7 support for women',
    icon: Phone,
    color: 'text-purple-500'
  }
];

export default function Contact() {
  return (
    <section className="py-16 md:py-24 bg-muted/30" id="contact-us">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">Contact Us</Badge>
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
            Need Immediate Help?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Reach out to us or use emergency services
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
          <Card className="hover-elevate transition-all">
            <CardHeader>
              <CardTitle>Emergency Legal Contacts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {emergencyContacts.map((contact) => {
                const Icon = contact.icon;
                return (
                  <div
                    key={contact.number}
                    className="flex items-start gap-4 p-4 rounded-lg bg-muted/50"
                    data-testid={`contact-${contact.name.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    <div className={`w-10 h-10 rounded-full bg-background flex items-center justify-center ${contact.color}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{contact.name}</h3>
                      <p className="text-2xl font-bold text-primary">{contact.number}</p>
                      <p className="text-sm text-muted-foreground">{contact.description}</p>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          <Card className="hover-elevate transition-all">
            <CardHeader>
              <CardTitle>Support Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-start gap-4">
                <Mail className="h-5 w-5 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Email Support</h3>
                  <p className="text-sm text-muted-foreground">support@nyayamitra.ai</p>
                  <p className="text-xs text-muted-foreground mt-1">Response within 24 hours</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <MapPin className="h-5 w-5 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Location</h3>
                  <p className="text-sm text-muted-foreground">Karnataka, India</p>
                  <p className="text-xs text-muted-foreground mt-1">Serving all of India</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Phone className="h-5 w-5 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Support Hours</h3>
                  <p className="text-sm text-muted-foreground">AI Chat: 24/7 Available</p>
                  <p className="text-xs text-muted-foreground mt-1">Human Support: Mon-Fri, 9 AM - 6 PM IST</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
