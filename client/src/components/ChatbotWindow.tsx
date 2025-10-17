import { useState, useRef, useEffect } from 'react';
import { X, Send, Mic, Copy, Share2, Star, Trash2, Globe, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ChatbotWindowProps {
  isOpen: boolean;
  onClose: () => void;
  selectedLanguage?: string;
  onChangeLanguage?: () => void;
}

export default function ChatbotWindow({ isOpen, onClose, selectedLanguage = 'English', onChangeLanguage }: ChatbotWindowProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [showFeedback, setShowFeedback] = useState<string | null>(null);
  const [rating, setRating] = useState(5);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const chatMutation = useMutation({
    mutationFn: async (message: string) => {
      const response = await apiRequest('POST', '/api/chat', { 
        message, 
        language: selectedLanguage 
      });
      return await response.json();
    },
    onSuccess: (data) => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.response,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, assistantMessage]);
    },
    onError: (error) => {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'I apologize, but I encountered an error. Please try again.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    }
  });

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages([...messages, userMessage]);
    setInput('');
    chatMutation.mutate(input);
  };

  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  const handleClearChat = () => {
    setMessages([]);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed bottom-6 right-6 z-50 w-[90vw] h-[70vh] md:w-[420px] md:h-[600px] shadow-2xl rounded-2xl overflow-hidden bg-card border animate-in slide-in-from-bottom-4 duration-300 flex flex-col"
      data-testid="chatbot-window"
    >
      <div className="flex items-center justify-between p-3 border-b bg-gradient-to-r from-primary to-accent text-primary-foreground flex-shrink-0">
        <div className="flex items-center gap-2">
          <Button
            size="icon"
            variant="ghost"
            onClick={onClose}
            data-testid="button-back-chatbot"
            className="h-8 w-8 hover:bg-white/20"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h3 className="font-semibold text-sm">NYAYA MITRA AI</h3>
            <p className="text-xs opacity-90">{selectedLanguage}</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Button
            size="icon"
            variant="ghost"
            onClick={onChangeLanguage}
            data-testid="button-change-language"
            className="h-8 w-8 hover:bg-white/20"
          >
            <Globe className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            onClick={handleClearChat}
            data-testid="button-clear-chat"
            className="h-8 w-8 hover:bg-white/20"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            onClick={onClose}
            data-testid="button-close-chatbot"
            className="h-8 w-8 hover:bg-white/20"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-3 min-h-0">
        {messages.length === 0 && (
          <div className="text-center py-8">
            <p className="text-sm text-muted-foreground">
              Hello! I'm NYAYA MITRA AI. Ask me any legal question in {selectedLanguage}.
            </p>
          </div>
        )}

        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            data-testid={`message-${message.role}`}
          >
            <div className={`max-w-[80%] ${message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'} rounded-2xl p-3`}>
              <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              {message.role === 'assistant' && (
                <div className="flex items-center gap-1 mt-2 pt-2 border-t border-border/50">
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => handleCopy(message.content)}
                    data-testid={`button-copy-${message.id}`}
                    className="h-6 w-6"
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => console.log('Share message')}
                    data-testid={`button-share-${message.id}`}
                    className="h-6 w-6"
                  >
                    <Share2 className="h-3 w-3" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => setShowFeedback(message.id)}
                    data-testid={`button-rate-${message.id}`}
                    className="h-6 w-6"
                  >
                    <Star className="h-3 w-3" />
                  </Button>
                </div>
              )}
              {showFeedback === message.id && (
                <Card className="mt-2 p-2 space-y-2">
                  <p className="text-xs font-medium">Rate this response</p>
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3 w-3 cursor-pointer ${i < rating ? 'fill-yellow-500 text-yellow-500' : 'text-muted-foreground'}`}
                        onClick={() => setRating(i + 1)}
                      />
                    ))}
                  </div>
                  <Textarea
                    placeholder="Optional feedback..."
                    className="text-xs"
                    rows={2}
                  />
                  <Button
                    size="sm"
                    onClick={() => {
                      setShowFeedback(null);
                    }}
                    data-testid="button-submit-feedback"
                  >
                    Submit
                  </Button>
                </Card>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-3 border-t flex-shrink-0">
        <div className="flex items-center gap-2">
          <Button
            size="icon"
            variant={isListening ? 'default' : 'ghost'}
            onClick={() => setIsListening(!isListening)}
            data-testid="button-voice-input"
            className={`h-9 w-9 ${isListening ? 'animate-pulse' : ''}`}
          >
            <Mic className="h-4 w-4" />
          </Button>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask your legal question..."
            data-testid="input-chat-message"
            className="flex-1"
          />
          <Button
            onClick={handleSend}
            disabled={!input.trim() || chatMutation.isPending}
            data-testid="button-send-message"
            className="hover-elevate active-elevate-2 h-9"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
