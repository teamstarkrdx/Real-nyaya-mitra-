import robotIcon from '@assets/generated_images/Legal_AI_chatbot_robot_head_c5a3009b.png';

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
      } bg-gradient-to-r from-primary to-accent hover-elevate active-elevate-2`}
      aria-label="Open chatbot"
    >
      <img
        src={robotIcon}
        alt="NYAYA MITRA AI Chatbot"
        className="w-full h-full object-contain p-2"
      />
      <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background animate-pulse" />
    </button>
  );
}
