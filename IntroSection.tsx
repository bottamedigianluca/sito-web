import React, { useEffect, useRef } from 'react';
import Section from '../ui/Section';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { useLanguage } from '../../contexts/LanguageContext';

const IntroSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    const currentSectionRef = sectionRef.current;
    if (!titleRef.current || !paragraphRef.current || !currentSectionRef) return;

    const gsapCtx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: currentSectionRef,
          start: "top 75%", 
          toggleActions: "play none none none", 
        }
      });

      let titleSplit: SplitText | null = null;
      if (titleRef.current && titleRef.current.innerText.trim() !== "") {
        titleSplit = new SplitText(titleRef.current, { type: 'words,chars' });
        gsap.set(titleSplit.chars, {autoAlpha:0}); 
        tl.from(titleSplit.chars, {
          autoAlpha: 0, yPercent: 50, scale: 0.8, rotationX: -45,
          skewX: gsap.utils.wrap([-10, 10]), duration: 0.8,
          stagger: { each: 0.03, from: "random" },
          ease: 'expo.out'
        });
      }

      let paragraphSplit: SplitText | null = null;
      if (paragraphRef.current && paragraphRef.current.innerText.trim() !== "") {
        paragraphSplit = new SplitText(paragraphRef.current, { type: 'lines' });
        gsap.set(paragraphSplit.lines, {autoAlpha:0});
        tl.from(paragraphSplit.lines, {
          autoAlpha: 0, y: 30, rotationX: -10, duration: 0.7,
          stagger: 0.12, ease: 'power2.out'
        }, "-=0.5");
      }
      
      return () => {
        if (titleSplit?.revert) titleSplit.revert();
        if (paragraphSplit?.revert) paragraphSplit.revert();
      }
    }, currentSectionRef); 

    return () => gsapCtx.revert(); 
  }, [t]); 

  const annoNonno = t('intro.annoNonno', '[ANNO NONNO]'); 
  const nomeNonno = t('intro.nomeNonno', '[NOME NONNO]');

  return (
    <Section id="intro" ref={sectionRef} aria-labelledby="intro-title" className="bg-brand-gray-extralight">
      <div className="text-center">
        <h2 ref={titleRef} id="intro-title" className="text-3xl md:text-4xl lg:text-5xl font-bold font-serif text-brand-green-dark mb-8 leading-tight">
          {t('intro.title', 'Bottamedi: Dove la Natura Incontra la Passione da Tre Generazioni.')}
        </h2>
        <p ref={paragraphRef} className="text-lg md:text-xl text-brand-gray-dark max-w-3xl mx-auto leading-relaxed">
          {t('intro.paragraph1', `Un viaggio iniziato nel cuore del Trentino nel ${annoNonno}, quando nonno ${nomeNonno} piantò il primo seme di una visione: portare sulla vostra tavola non solo frutta e verdura, ma l'essenza stessa della nostra terra. `).replace('{{annoNonno}}', annoNonno).replace('{{nomeNonno}}', nomeNonno)}
          {t('intro.paragraph2', 'Oggi, quella visione fiorisce nel nostro vivace Banchetto a Mezzolombardo e nel servizio HORECA dedicato, testimoni di una freschezza che si tocca e di una qualità che si assapora, giorno dopo giorno.')}
        </p>
      </div>
    </Section>
  );
};

export default IntroSection;
