import { useEffect, useRef } from 'react';

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const shapes = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 40 + Math.random() * 120,
      rotation: Math.random() * 360,
      duration: 20 + Math.random() * 10,
      delay: Math.random() * 5,
      shape: ['circle', 'square', 'triangle'][Math.floor(Math.random() * 3)]
    }));

    const shapesHtml = shapes.map(s => `
      <div 
        class="absolute rounded-full blur-2xl opacity-20"
        style="
          left: ${s.x}%;
          top: ${s.y}%;
          width: ${s.size}px;
          height: ${s.size}px;
          background: linear-gradient(135deg, hsl(280 70% 75%), hsl(330 65% 70%));
          animation: float${s.id} ${s.duration}s ease-in-out infinite;
          animation-delay: ${s.delay}s;
          transform: rotate(${s.rotation}deg);
        "
      ></div>
    `).join('');

    const keyframesStyle = shapes.map(s => `
      @keyframes float${s.id} {
        0%, 100% {
          transform: translate(0, 0) rotate(${s.rotation}deg) scale(1);
        }
        25% {
          transform: translate(30px, -30px) rotate(${s.rotation + 90}deg) scale(1.1);
        }
        50% {
          transform: translate(-20px, 20px) rotate(${s.rotation + 180}deg) scale(0.9);
        }
        75% {
          transform: translate(40px, 10px) rotate(${s.rotation + 270}deg) scale(1.05);
        }
      }
    `).join('\n');

    const styleEl = document.createElement('style');
    styleEl.textContent = keyframesStyle;
    document.head.appendChild(styleEl);

    if (canvasRef.current) {
      canvasRef.current.innerHTML = shapesHtml;
    }

    return () => {
      document.head.removeChild(styleEl);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-gradient-to-br from-white via-purple-50/30 to-pink-50/20 dark:from-[hsl(270,6%,8%)] dark:via-[hsl(270,20%,12%)] dark:to-[hsl(280,15%,10%)]">
      <div ref={canvasRef} className="absolute inset-0" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-200/20 via-transparent to-transparent dark:from-purple-900/20" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-pink-200/20 via-transparent to-transparent dark:from-pink-900/20" />
    </div>
  );
}
