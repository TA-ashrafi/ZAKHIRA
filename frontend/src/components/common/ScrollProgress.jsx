import { useState, useEffect } from 'react';

const ScrollProgress = () => {
  const [scrollPercentage, setScrollPercentage] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      
      if (documentHeight - windowHeight > 0) {
        const percentage = (scrollTop / (documentHeight - windowHeight)) * 100;
        setScrollPercentage(percentage);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-1 bg-white/10 z-[100] pointer-events-none">
      <div 
        className="h-full bg-gradient-to-r from-[#C9A86C] via-[#E2C792] to-[#C9A86C] transition-all duration-150 ease-out shadow-[0_0_10px_#C9A86C]" 
        style={{ width: `${scrollPercentage}%` }}
      />
    </div>
  );
};

export default ScrollProgress;
