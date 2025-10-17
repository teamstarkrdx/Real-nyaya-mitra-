import ChatbotButton from '../ChatbotButton';
import { useState } from 'react';

export default function ChatbotButtonExample() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="h-screen relative">
      <ChatbotButton
        onClick={() => setIsOpen(!isOpen)}
        isOpen={isOpen}
      />
      <div className="flex items-center justify-center h-full">
        <p className="text-muted-foreground">
          {isOpen ? 'Chatbot is open' : 'Click the button to open chatbot'}
        </p>
      </div>
    </div>
  );
}
