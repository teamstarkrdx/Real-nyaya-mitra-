import ChatbotWindow from '../ChatbotWindow';
import { useState } from 'react';

export default function ChatbotWindowExample() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="h-screen">
      <ChatbotWindow
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        selectedLanguage="English"
        onChangeLanguage={() => console.log('Change language')}
      />
    </div>
  );
}
