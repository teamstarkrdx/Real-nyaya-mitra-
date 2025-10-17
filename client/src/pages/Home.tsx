import { useState, useEffect } from 'react';
import AnimatedBackground from '@/components/AnimatedBackground';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import LegalGuidanceHub from '@/components/LegalGuidanceHub';
import HowWeHelp from '@/components/HowWeHelp';
import RightsPreview from '@/components/RightsPreview';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import ChatbotButton from '@/components/ChatbotButton';
import ChatbotWindow from '@/components/ChatbotWindow';
import LanguageSelector from '@/components/LanguageSelector';
import RightsModal from '@/components/RightsModal';
import DocumentUpload from '@/components/DocumentUpload';
import FreeLegalAid from '@/components/FreeLegalAid';
import LawSearch from '@/components/LawSearch';
import CategoryDetailModal from '@/components/CategoryDetailModal';

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [showRightsModal, setShowRightsModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleNavigate = (section: string) => {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleStartChat = () => {
    if (!selectedLanguage || selectedLanguage === 'English') {
      setShowLanguageSelector(true);
    } else {
      setShowChatbot(true);
    }
  };

  const handleLanguageSelect = (language: string) => {
    setSelectedLanguage(language);
    setShowLanguageSelector(false);
    setShowChatbot(true);
  };

  const handleChangeLanguage = () => {
    setShowChatbot(false);
    setShowLanguageSelector(true);
  };

  const handleExploreMore = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <div className="min-h-screen">
      <AnimatedBackground />
      
      <Header
        onNavigate={handleNavigate}
        onSearch={() => handleNavigate('law-search')}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
      />

      <main>
        <Hero
          onStartChat={handleStartChat}
          onViewRights={() => setShowRightsModal(true)}
        />

        <LegalGuidanceHub onExploreMore={handleExploreMore} />

        <HowWeHelp />

        <RightsPreview onViewAll={() => setShowRightsModal(true)} />

        <DocumentUpload />

        <FreeLegalAid />

        <LawSearch />

        <Contact />

        <Footer />
      </main>

      <ChatbotButton
        onClick={handleStartChat}
        isOpen={showChatbot}
      />

      <ChatbotWindow
        isOpen={showChatbot}
        onClose={() => setShowChatbot(false)}
        selectedLanguage={selectedLanguage}
        onChangeLanguage={handleChangeLanguage}
      />

      {showLanguageSelector && (
        <LanguageSelector
          onSelect={handleLanguageSelect}
          onClose={() => setShowLanguageSelector(false)}
        />
      )}

      <RightsModal
        isOpen={showRightsModal}
        onClose={() => setShowRightsModal(false)}
      />

      <CategoryDetailModal
        category={selectedCategory}
        onClose={() => setSelectedCategory(null)}
      />
    </div>
  );
}
