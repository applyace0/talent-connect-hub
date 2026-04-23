import { useEffect, useRef, useState } from "react";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** 0..1 */
  threshold?: number;
  /** Any valid CSS transition-delay value */
  delay?: string;
};

const Reveal = ({ children, className = "", threshold = 0.18, delay }: RevealProps) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div
      ref={ref}
      className={`reveal ${isInView ? "reveal--in" : ""} ${className}`}
      style={delay ? ({ ["--reveal-delay" as never]: delay } as React.CSSProperties) : undefined}
    >
      {children}
    </div>
  );
};

export default Reveal;

