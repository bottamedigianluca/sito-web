import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin'; 
import { useLanguage } from '../../contexts/LanguageContext';


const Preloader: React.FC = () => {
  const logoRef = useRef<HTMLImageElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const preloaderRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    const currentPreloaderRef = preloaderRef.current;
    if (!logoRef.current || !currentPreloaderRef || !textRef.current) return;

    const gsapCtx = gsap.context(() => {
      gsap.set(logoRef.current, { autoAlpha: 0, scale: 0.4, rotation: -180, y: -50 });
      gsap.set(textRef.current, { autoAlpha: 0, y: 20 });
      gsap.set(currentPreloaderRef, { autoAlpha: 1 });

      const loadingText = t('preloader.loading', "Esplosione di freschezza in arrivo...");
      
      const tl = gsap.timeline();

      tl.to(logoRef.current, {
        autoAlpha: 1, scale: 1, rotation: 0, y: 0,
        duration: 1.4, ease: 'elastic.out(1, 0.5)', delay: 0.2
      })
      .to(logoRef.current, {
        scale: 1.08, duration: 0.35, yoyo: true, repeat: 1, ease: 'power1.inOut'
      }, "-=0.5")
      .to(textRef.current, { 
          autoAlpha: 1, y: 0, duration: 0.6, ease: 'power2.out'
      }, "-=1.2")
      .to(textRef.current, { 
          duration: loadingText.length * 0.04,
          text: { value: loadingText, delimiter: "" }, 
          ease: "none"
      }, "<+=0.2");
    }, currentPreloaderRef); 

    return () => gsapCtx.revert();
  }, [t]);

  return (
    <div ref={preloaderRef} className="fixed inset-0 bg-white flex flex-col items-center justify-center z-[200] overflow-hidden">
      <img 
        ref={logoRef}
        src="/images/bottamedi_logo_solofrutta_glow.jpg" 
        alt={t('header.logoAlt', 'Bottamedi Logo')}
        width={128} 
        height={128} 
        className="w-24 h-24 md:w-32 md:h-32"
      />
      <p ref={textRef} className="text-brand-green-dark font-medium mt-6 text-lg md:text-xl tracking-wide"></p>
    </div>
  );
};

export default Preloader;
