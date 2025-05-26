import React, { useEffect, useRef } from 'react';
import Section from '../ui/Section';
import Button from '../ui/Button';
import { CheckCircleIcon, TruckIcon, StarIcon, UserGroupIcon as HandShakeIcon } from '../icons/HeroIcons'; 
import { gsap } from 'gsap';
import { useLanguage } from '../../contexts/LanguageContext';

const WholesaleSection: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const textContentRef = useRef<HTMLDivElement>(null);
    const imageContentRef = useRef<HTMLDivElement>(null);
    const { t } = useLanguage();
    
    const scrollToSection = (sectionId: string) => {
    gsap.to(window, { duration: 1.2, scrollTo: { y: `#${sectionId}`, offsetY: 70 }, ease: 'power3.inOut' });
  };

  const featuresData = [
    { icon: CheckCircleIcon, textKey: "wholesale.feature1", defaultText: "Approvvigionamento d'eccellenza: solo produttori fidati e mercati selezionati per garantire qualità superiore e freschezza impareggiabile." },
    { icon: TruckIcon, textKey: "wholesale.feature2", defaultText: "Logistica su misura: consegne flessibili e puntuali, 6 giorni su 7, in aree concordate. La tua attività non rimarrà mai senza il meglio." },
    { icon: StarIcon, textKey: "wholesale.feature3", defaultText: "Controllo qualità maniacale: ogni prodotto è ispezionato per assicurare sapore intenso, aspetto invitante e presentazione impeccabile." },
    { icon: HandShakeIcon, textKey: "wholesale.feature4", defaultText: "Consulenza personalizzata HORECA: Pierluigi è il tuo referente diretto per prezzi competitivi, consigli esperti e un rapporto di fiducia solido e duraturo." },
  ];

  const features = featuresData.map(f => ({ ...f, text: t(f.textKey, f.defaultText) }));

  useEffect(() => {
    const currentSectionRef = sectionRef.current;
    if (!textContentRef.current || !imageContentRef.current || !currentSectionRef) return;
    
    const gsapCtx = gsap.context(() => {
      const tl = gsap.timeline({
          scrollTrigger: {
              trigger: currentSectionRef,
              start: "top 65%", 
              toggleActions: "play none none none"
          }
      });

      const title = textContentRef.current?.querySelector('h2');
      const subtitle = textContentRef.current?.querySelector('h3');
      const paragraph = textContentRef.current?.querySelector('p');
      const listItems = gsap.utils.toArray<HTMLLIElement>('ul li', textContentRef.current);
      const contactPierluigiText = textContentRef.current?.querySelector('.contact-pierluigi-text');
      const ctaButton = textContentRef.current?.querySelector('button');

      gsap.set([title, subtitle, paragraph, ...listItems, contactPierluigiText, ctaButton], {autoAlpha:0});

      tl.from([title, subtitle], { autoAlpha: 0, x: -60, stagger: 0.18, duration: 0.8, ease: 'power3.out' })
      .from(paragraph, { autoAlpha:0, x: -50, duration: 0.7, ease: 'power2.out'}, "-=0.5")
      .from(listItems, { autoAlpha: 0, x: -40, stagger: 0.12, duration: 0.6, ease: 'power2.out' }, "-=0.4")
      .from([contactPierluigiText, ctaButton], { autoAlpha: 0, y: 25, stagger: 0.15, duration: 0.6, ease: 'back.out(1.4)' }, "-=0.3");

      tl.from(imageContentRef.current, {
          autoAlpha: 0, scale: 0.8, x: 60, rotationZ: 5,
          duration: 1.1, ease: 'elastic.out(1, 0.65)'
      }, 0.2);
    }, currentSectionRef); 

    return () => gsapCtx.revert();
  }, [t]);


  return (
    <Section id="ingrosso" ref={sectionRef} aria-labelledby="ingrosso-title" className="bg-white">
      <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
        <div ref={textContentRef} className="md:pr-8">
          <h2 id="ingrosso-title" className="text-3xl md:text-4xl lg:text-5xl font-bold font-serif text-brand-green-dark mb-4">
            {t('wholesale.title', 'Partner d\'Eccellenza per la Tua Cucina Professionale')}
          </h2>
          <h3 className="text-xl lg:text-2xl text-brand-gray-dark font-semibold mb-6">
            {t('wholesale.subtitle', 'Servizio HORECA: Freschezza Insuperabile, Affidabilità Totale.')}
          </h3>
          <p className="text-brand-gray-dark mb-8 leading-relaxed">
           {t('wholesale.description', 'Professionisti della ristorazione, hotel, catering e negozi alimentari del Trentino: elevate la vostra offerta con la qualità Bottamedi. Tre generazioni di esperienza per forniture ortofrutticole impeccabili, prodotti freschissimi e un servizio di consegna personalizzato che rispetta i vostri tempi e le vostre esigenze.')}
          </p>
          <ul className="space-y-5 mb-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <li key={index} className="flex items-start">
                  <Icon className="h-7 w-7 text-brand-orange mr-4 mt-0.5 flex-shrink-0" />
                  <span className="text-brand-gray-dark text-base">{feature.text}</span>
                </li>
              );
            })}
          </ul>
           <p className="text-brand-gray-dark font-medium mb-6 contact-pierluigi-text">
            {t('wholesale.contactPierluigi', 'Per listini su misura e consulenza diretta, contatta')} <strong>Pierluigi</strong>: 
            <a href="tel:0461602534" className="text-brand-green hover:underline ml-1 font-semibold">0461 602534</a>.
          </p>
          <Button onClick={() => scrollToSection('contatti')} variant="primary" size="lg" className="shadow-md hover:shadow-lg">
            {t('wholesale.cta', 'Richiedi Info Ingrosso')}
          </Button>
        </div>
        <div ref={imageContentRef}>
          <img 
            src="/images/albicocche_ingrosso.jpg" 
            alt={t('wholesale.imageAlt', 'Casse di albicocche fresche e ordinate, pronte per la fornitura ingrosso HORECA da Bottamedi')} 
            width={600} 
            height={800} 
            className="rounded-xl shadow-2xl w-full h-auto object-cover aspect-[4/5] md:aspect-[3/4.2] transform hover:shadow-brand-green/30 transition-shadow duration-300" />
        </div>
      </div>
    </Section>
  );
};

export default WholesaleSection;
