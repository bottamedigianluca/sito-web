import React, { useEffect, useRef } from 'react';
import Section from '../ui/Section';
import { TimelineEvent } from '../../types';
import { gsap } from 'gsap';
import { useLanguage } from '../../contexts/LanguageContext';

interface TimelineEventDataItem {
  imageSrc: string; 
  periodKey: string;
  defaultPeriod: string;
  titleKey: string;
  defaultTitle: string;
  descriptionKey: string;
  defaultDescription: string;
  imageAltKey: string;
  defaultImageAlt: string;
}

const StorySection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const mainTitleRef = useRef<HTMLHeadingElement>(null);
  const closingThoughtRef = useRef<HTMLParagraphElement>(null);
  const timelineContainerRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  const timelineEventsData: TimelineEventDataItem[] = [
    {
      periodKey: "story.event1.period", defaultPeriod: "Anni '[ANNO INIZIO ATTIVITA' NONNO - DA INSERIRE]'",
      titleKey: "story.event1.title", defaultTitle: "Le Radici del Sapore: L'Inizio di un Sogno",
      descriptionKey: "story.event1.description", defaultDescription: "Tutto ebbe inizio con nonno [Nome Nonno - DA INSERIRE]. Con mani sapienti e un cuore colmo di dedizione per la terra trentina, piantò il seme di un'attività destinata a fiorire, fondata su qualità autentica e fiducia incrollabile.",
      imageSrc: "/images/melinda_golden.jpg",
      imageAltKey: "story.event1.imageAlt", defaultImageAlt: "Nonno Bottamedi con le prime mele Golden, simbolo di tradizione e inizio attività"
    },
    {
      periodKey: "story.event2.period", defaultPeriod: "Anni '[ANNI ATTIVITA' PAPA' - DA INSERIRE]'",
      titleKey: "story.event2.title", defaultTitle: "L'Orizzonte si Allarga: Crescita e Innovazione",
      descriptionKey: "story.event2.description", defaultDescription: "L'eredità sbocciò ulteriormente con papà [Nome Papà - DA INSERIRE]. Le albe trascorse ai mercati, la ricerca instancabile delle primizie più prelibate e il consolidamento dei rapporti trasformarono la passione in un servizio ortofrutticolo strutturato e apprezzato in tutto il Trentino.",
      imageSrc: "/images/pomodori_cuore_bue.jpg",
      imageAltKey: "story.event2.imageAlt", defaultImageAlt: "Papà Bottamedi tra cassette di pomodori cuore di bue, simbolo di espansione"
    },
    {
      periodKey: "story.event3.period", defaultPeriod: "Oggi: Un Legame Indissolubile",
      titleKey: "story.event3.title", defaultTitle: "Il Futuro nelle Nostre Mani: Passione che Continua",
      descriptionKey: "story.event3.description", defaultDescription: "Oggi, Pierluigi [Eventuali altri nomi - DA INSERIRE] e tutta la famiglia Bottamedi custodiscono questa fiamma. Freschezza assoluta, genuinità incontaminata e un rapporto diretto e trasparente, sia al dettaglio nel nostro Banchetto che all'ingrosso per il settore HORECA, proiettano la nostra storia nel futuro.",
      imageSrc: "/images/kiwi_cuore.jpg",
      imageAltKey: "story.event3.imageAlt", defaultImageAlt: "La famiglia Bottamedi oggi, con un cuore di kiwi freschi a simboleggiare la passione continua"
    }
  ];

  const timelineEvents: TimelineEvent[] = timelineEventsData.map(event => ({
    imageSrc: event.imageSrc, 
    period: t(event.periodKey, event.defaultPeriod),
    title: t(event.titleKey, event.defaultTitle),
    description: t(event.descriptionKey, event.defaultDescription),
    imageAlt: t(event.imageAltKey, event.defaultImageAlt),
  }));


  useEffect(() => {
    const currentSectionRef = sectionRef.current;
    if (!timelineContainerRef.current || !mainTitleRef.current || !closingThoughtRef.current || !currentSectionRef) return;
    
    const gsapCtx = gsap.context(() => {
      gsap.from(mainTitleRef.current, {
          autoAlpha: 0, y: 30, duration: 0.8, ease: 'power2.out',
          scrollTrigger: { trigger: mainTitleRef.current, start: "top 85%", toggleActions: "play none none none" }
      });

      const items = gsap.utils.toArray<HTMLDivElement>(".timeline-item", timelineContainerRef.current);
      const line = timelineContainerRef.current.querySelector<HTMLDivElement>(".timeline-line-draw");

      if(line){
          gsap.set(line, {scaleY: 0, transformOrigin: 'top center'});
          gsap.to(line, {
              scaleY: 1, duration: items.length * 0.7, ease: 'none',
              scrollTrigger: {
                  trigger: timelineContainerRef.current, start: "top center",
                  end: "bottom center+=150", scrub: 1.2,
              }
          });
      }

      items.forEach((item, index) => {
        const imageContainer = item.querySelector<HTMLDivElement>('.timeline-image-container');
        const image = item.querySelector('img');
        const content = item.querySelector<HTMLDivElement>('.timeline-content-container');
        const dot = item.querySelector<HTMLDivElement>('.timeline-dot-outer');

        const tl = gsap.timeline({
          scrollTrigger: { trigger: item, start: "top 80%", toggleActions: "play none none none" }
        });
        
        tl.from(dot, { scale: 0, autoAlpha: 0, duration: 0.6, ease: 'back.out(2)' }, index * 0.1);

        if(imageContainer && image){
          tl.from(imageContainer, {
              autoAlpha: 0, scale: 0.85, rotationZ: index % 2 === 0 ? -8 : 8,
              duration: 0.9, ease: 'expo.out'
          }, "-=0.4")
          .from(image, { scale: 1.2, duration: 1.2, ease: 'power2.out' }, "<");
        }
        
        if(content){
          const periodText = content.querySelector('.timeline-period');
          const titleText = content.querySelector('h3');
          const descText = content.querySelector('p');
          gsap.set([periodText, titleText, descText], {autoAlpha:0});
          tl.from([periodText, titleText, descText], {
              autoAlpha: 0, y: 25, x: index % 2 === 0 ? -15 : 15,
              stagger: 0.15, duration: 0.7, ease: 'power2.out'
          }, "-=0.6");
        }
      });
      
      gsap.from(closingThoughtRef.current, {
          autoAlpha: 0, y: 30, duration: 0.8, ease: 'power2.out',
          scrollTrigger: { trigger: closingThoughtRef.current, start: "top 90%", toggleActions: "play none none none" }
      });
    }, currentSectionRef); 

    return () => gsapCtx.revert();
  }, [t, timelineEvents]); 

  return (
    <Section id="storia" ref={sectionRef} aria-labelledby="storia-title-main" className="overflow-hidden bg-brand-gray-light">
      <div className="text-center mb-12 md:mb-16">
        <h2 ref={mainTitleRef} id="storia-title-main" className="text-3xl md:text-4xl lg:text-5xl font-bold font-serif text-brand-green-dark mb-4">
          {t('story.mainTitle', 'La Saga dei Sapori: Tre Generazioni, Un\'Unica Passione.')}
        </h2>
      </div>
      <div ref={timelineContainerRef} className="relative max-w-4xl mx-auto px-2 md:px-4">
        <div className="hidden md:block absolute top-0 bottom-0 left-1/2 w-1 bg-brand-green-light transform -translate-x-1/2 rounded-full">
           <div className="timeline-line-draw absolute top-0 left-0 w-full h-full bg-brand-green transform scale-y-0 rounded-full"></div>
        </div>

        {timelineEvents.map((event, index) => (
          <div key={index} className={`timeline-item md:flex items-center my-10 md:my-24 relative ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
            <div className="timeline-dot-outer hidden md:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-6 h-6 bg-brand-orange rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
              </div>
            </div>
            
            <div className="md:w-5/12 p-2 md:p-0 timeline-image-container">
              <img 
                src={event.imageSrc} 
                alt={event.imageAlt} 
                width={500} 
                height={312} 
                className="rounded-xl shadow-2xl w-full h-auto object-cover aspect-[16/10] transform transition-all duration-500 hover:scale-105" 
              />
            </div>
            <div className={`md:w-7/12 p-4 timeline-content-container ${index % 2 !== 0 ? 'md:pl-12 lg:pl-20' : 'md:pr-12 lg:pr-20'}`}>
               <span className="timeline-period block text-sm text-brand-orange font-semibold mb-1.5 uppercase tracking-wider">{event.period}</span>
               <h3 className="text-2xl lg:text-3xl font-serif font-bold text-brand-gray-dark mb-3">{event.title}</h3>
               <p className="text-brand-gray-dark leading-relaxed text-base lg:text-lg">{event.description}</p>
            </div>
          </div>
        ))}
      </div>
       <p ref={closingThoughtRef} className="mt-16 md:mt-24 text-center text-lg italic text-brand-gray-dark max-w-3xl mx-auto px-4">
          {t('story.closingThought', 'Bottamedi: una sinfonia di famiglia, coltivata con la melodia della natura, per orchestrare ogni giorno il capolavoro del gusto sulla vostra tavola.')}
        </p>
    </Section>
  );
};

export default StorySection;
