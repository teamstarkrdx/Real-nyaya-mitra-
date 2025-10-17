import { useState, useRef, useEffect } from 'react';
import { X, Send, Mic, Copy, Share2, Star, Trash2, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';

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

    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `Thank you for your question. This is a design prototype. In the full version, I'll provide comprehensive legal guidance powered by AI in ${selectedLanguage}.`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, assistantMessage]);
    }, 1000);
  };

  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content);
    console.log('Copied to clipboard');
  };

  const handleClearChat = () => {
    setMessages([]);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed bottom-6 right-6 z-50 w-[90vw] h-[80vh] md:w-[540px] md:h-[720px] shadow-2xl rounded-2xl overflow-hidden bg-card border animate-in slide-in-from-bottom-4 duration-300"
      data-testid="chatbot-window"
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-primary to-accent text-primary-foreground">
          <div>
            <h3 className="font-semibold">NYAYA MITRA AI</h3>
            <p className="text-xs opacity-90">{selectedLanguage}</p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              size="icon"
              variant="ghost"
              onClick={onChangeLanguage}
              data-testid="button-change-language"
              className="hover:bg-white/20"
            >
              <Globe className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              onClick={handleClearChat}
              data-testid="button-clear-chat"
              className="hover:bg-white/20"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              onClick={onClose}
              data-testid="button-close-chatbot"
              className="hover:bg-white/20"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
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
              <div className={`max-w-[80%] ${message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'} rounded-2xl p-4`}>
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                {message.role === 'assistant' && (
                  <div className="flex items-center gap-2 mt-3 pt-3 border-t border-border/50">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => handleCopy(message.content)}
                      data-testid={`button-copy-${message.id}`}
                      className="h-7 w-7"
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => console.log('Share message')}
                      data-testid={`button-share-${message.id}`}
                      className="h-7 w-7"
                    >
                      <Share2 className="h-3 w-3" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => setShowFeedback(message.id)}
                      data-testid={`button-rate-${message.id}`}
                      className="h-7 w-7"
                    >
                      <Star className="h-3 w-3" />
                    </Button>
                  </div>
                )}
                {showFeedback === message.id && (
                  <Card className="mt-3 p-3 space-y-2">
                    <p className="text-xs font-medium">Rate this response</p>
                    <div className="flex gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 cursor-pointer ${i < rating ? 'fill-yellow-500 text-yellow-500' : 'text-muted-foreground'}`}
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
                        console.log('Feedback submitted');
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

        <div className="p-4 border-t">
          <div className="flex items-center gap-2">
            <Button
              size="icon"
              variant={isListening ? 'default' : 'ghost'}
              onClick={() => setIsListening(!isListening)}
              data-testid="button-voice-input"
              className={isListening ? 'animate-pulse' : ''}
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
              disabled={!input.trim()}
              data-testid="button-send-message"
              className="hover-elevate active-elevate-2"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
