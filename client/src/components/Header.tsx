import { useState } from 'react';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  onNavigate?: (section: string) => void;
  darkMode?: boolean;
  onToggleDarkMode?: () => void;
}

export default function Header({ onNavigate, darkMode, onToggleDarkMode }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    'Home',
    'Legal Rights',
    'AI Legal Chat',
    'Legal Guidance',
    'Free Legal Aid',
    'Contact Us',
    'About Us'
  ];

  const handleNavClick = (item: string) => {
    setIsMenuOpen(false);
    onNavigate?.(item.toLowerCase().replace(/\s+/g, '-'));
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-lg">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <Button
            size="icon"
            variant="ghost"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            data-testid="button-menu-toggle"
            className="hover-elevate active-elevate-2"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
          <h1 className="text-xl font-bold font-heading bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            NYAYA MITRA AI
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="icon"
            variant="ghost"
            onClick={onToggleDarkMode}
            data-testid="button-theme-toggle"
            className="hover-elevate active-elevate-2"
          >
            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-card/95 backdrop-blur-lg border-b shadow-lg animate-in slide-in-from-top-2 duration-200">
          <nav className="container mx-auto py-4 px-4">
            <ul className="flex flex-col gap-2">
              {menuItems.map((item) => (
                <li key={item}>
                  <button
                    onClick={() => handleNavClick(item)}
                    data-testid={`link-${item.toLowerCase().replace(/\s+/g, '-')}`}
                    className="w-full text-left px-4 py-3 rounded-lg hover-elevate active-elevate-2 transition-all text-foreground font-medium"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}
