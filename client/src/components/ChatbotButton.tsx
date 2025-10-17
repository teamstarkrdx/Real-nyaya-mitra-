import { MessageCircle } from 'lucide-react';

interface ChatbotButtonProps {
  onClick?: () => void;
  isOpen?: boolean;
}

export default function ChatbotButton({ onClick, isOpen }: ChatbotButtonProps) {
  return (
    <button
      onClick={onClick}
      data-testid="button-chatbot-toggle"
      className={`fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 ${
        isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
      } bg-gradient-to-r from-primary to-accent hover-elevate active-elevate-2 flex items-center justify-center`}
      aria-label="Open chatbot"
    >
      <MessageCircle className="w-8 h-8 text-primary-foreground" />
      <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background animate-pulse" />
    </button>
  );
}
