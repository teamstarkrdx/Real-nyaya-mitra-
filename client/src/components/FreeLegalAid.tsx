import { useState } from 'react';
import { Phone, Mail, MapPin, Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

const districts = [
  { name: 'Bengaluru Urban', phone: '080-22215143', mobile: '9141193926', email: 'dlsabangaloreurban2@gmail.com' },
  { name: 'Bengaluru Rural', phone: '080-22222919', mobile: '9141193927', email: 'dlsablrrural@gmail.com' },
  { name: 'Bagalkote', phone: '08354-235876', mobile: '9141193928', email: 'dlsabagalkot@gmail.com' },
  { name: 'Bellary (Ballari)', phone: '08392-278077', mobile: '9141193929', email: 'ballari.dlsa@gmail.com' },
  { name: 'Belagavi', phone: '0831-2423216', mobile: '9141193930', email: 'dlsa.belgaum2@gmail.com' },
  { name: 'Bidar', phone: '08482-226116', mobile: '9141193931', email: 'dlsabdr@gmail.com' },
  { name: 'Chamarajanagar', phone: '08226-226022', mobile: '9141193932', email: 'dlsachnagar2021@gmail.com' },
  { name: 'Chikkaballapur', phone: '08156-275080', mobile: '9141193933', email: 'cbp.dlsa@gmail.com' },
  { name: 'Chikkamagaluru', phone: '08262-295321', mobile: '9141193934', email: 'dlsa.chikkamagaluru@gmail.com' },
  { name: 'Chitradurga', phone: '08194-222322', mobile: '9141193935', email: 'dlsachitradurga1@gmail.com' },
  { name: 'D.K. Mangaluru', phone: '0824-2448111', mobile: '9141193936', email: 'dlsa.mangaluru@gmail.com' },
  { name: 'Davanagere', phone: '08192-296364', mobile: '9141193937', email: 'dlsadavangere4@gmail.com' },
  { name: 'Dharwad', phone: '0836-2740128', mobile: '9141193938', email: 'dlsa.dwd2@gmail.com' },
  { name: 'Gadag', phone: '08372-232534', mobile: '9141193940', email: 'dlsa.gadag1@gmail.com' },
  { name: 'Hassan', phone: '08172-268356', mobile: '9141193942', email: 'dlsa.hassan@gmail.com' },
  { name: 'Haveri', phone: '08375-233939', mobile: '9141193943', email: 'dlsahaveri2@gmail.com' },
  { name: 'Kalaburagi', phone: '08472-253370', mobile: '9141193944', email: 'dlsakalaburagi@gmail.com' },
  { name: 'Kodagu (Madikeri)', phone: '08272-222373', mobile: '9141193945', email: 'dlsamadikeri@gmail.com' },
  { name: 'Kolar', phone: '08152-228811', mobile: '9141193948', email: 'dlsa.kolar3@gmail.com' },
  { name: 'Koppal', phone: '08539-220233', mobile: '9141193951', email: 'dlsakoppal1@gmail.com' },
  { name: 'Mandya', phone: '08232-229345', mobile: '9141193952', email: 'dlsa.mandya@gmail.com' },
  { name: 'Mysuru (Mysore)', phone: '0821-2330040', mobile: '9141193953', email: 'mysurudlsa@gmail.com' },
  { name: 'Raichur', phone: '08532-228476', mobile: '9141193954', email: 'rcrdlsa@gmail.com' },
  { name: 'Ramanagara', phone: '080-27273445', mobile: '9141193957', email: 'msdlsaramanagara03@gmail.com' },
  { name: 'Shivamogga', phone: '08182-222218', mobile: '9141193958', email: 'dlsashivamogga@gmail.com' },
  { name: 'Tumakuru', phone: '0816-2255133', mobile: '9141193959', email: 'dlsatumkur1@gmail.com' },
  { name: 'Udupi', phone: '0820-2523355', mobile: '9141193960', email: 'dlsaudupi@gmail.com' },
  { name: 'Uttara Kannada', phone: '08382-222990', mobile: '9141193961', email: 'dlsa.karwar@gmail.com' },
  { name: 'Vijayapura', phone: '08352-276150', mobile: '9141193923', email: 'dlsavijayapura1@gmail.com' },
  { name: 'Yadgir', phone: '08473-253243', mobile: '9141193924', email: 'dlsayadgir1@gmail.com' }
];

export default function FreeLegalAid() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDistricts = districts.filter(district =>
    district.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="py-16 md:py-24 bg-muted/30" id="free-legal-aid">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">Free Legal Aid</Badge>
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
            Karnataka District Legal Services
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find free legal assistance in your district
          </p>
        </div>

        <div className="max-w-6xl mx-auto space-y-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search district..."
              className="pl-10"
              data-testid="input-search-district"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredDistricts.map((district) => (
              <Card
                key={district.name}
                className="hover-elevate transition-all"
                data-testid={`district-card-${district.name.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-1">{district.name}</CardTitle>
                      <Badge variant="secondary" className="text-xs">DLSA</Badge>
                    </div>
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <a
                      href={`tel:${district.phone}`}
                      className="hover:text-primary transition-colors"
                    >
                      {district.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <a
                      href={`tel:${district.mobile}`}
                      className="hover:text-primary transition-colors"
                    >
                      {district.mobile}
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <a
                      href={`mailto:${district.email}`}
                      className="hover:text-primary transition-colors truncate"
                    >
                      {district.email}
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredDistricts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No districts found matching "{searchTerm}"</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
