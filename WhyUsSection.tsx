import React, { useEffect, useRef } from 'react';
import Section from '../ui/Section';
import { FeatureItem } from '../../types';
import { LeafIcon, StarIcon as MedalIcon, HeartIcon as UsersIcon, MapPinIcon } from '../icons/HeroIcons'; 
import { gsap } from 'gsap';
import { useLanguage } from '../../contexts/LanguageContext';

interface FeatureDataItem {
  icon: React.ElementType; 
  imageSrc: string; 
  alt?: string; 
  titleKey: string;
  defaultTitle: string;
  descriptionKey: string;
  defaultDescription: string;
  altKey: string;
  defaultAlt: string;
}

const WhyUsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const { t } = useLanguage();

  const featuresData: FeatureDataItem[] = [
    {
      icon: LeafIcon,
      titleKey: "whyus.feature1.title", defaultTitle: "Freschezza Assoluta: Il Nostro Credo",
      descriptionKey: "whyus.feature1.description", defaultDescription: "Ogni mattina, selezioniamo personalmente solo il meglio. Collaborazioni dirette con produttori di fiducia per garantirti un prodotto che profuma ancora di campo, vibrante di sapore e nutrimento.",
      imageSrc: "/images/kiwi_gialli_pattern.jpg",
      altKey: "whyus.feature1.alt", defaultAlt: "Pattern ipnotico di kiwi gialli freschi, simbolo di freschezza assoluta"
    },
    {
      icon: MedalIcon,
      titleKey: "whyus.feature2.title", defaultTitle: "Qualità d'Eccellenza: L'Arte della Scelta",
      descriptionKey: "whyus.feature2.description", defaultDescription: "L'esperienza di tre generazioni si traduce in un occhio infallibile per l'eccellenza. Solo i prodotti che superano i nostri rigorosi standard arrivano sulla tua tavola o nella tua attività.",
      imageSrc: "/images/mele_montagna.jpg",
      altKey: "whyus.feature2.alt", defaultAlt: "Splendide mele di montagna in cassetta, simbolo di qualità d'eccellenza"
    },
    {
      icon: UsersIcon,
      titleKey: "whyus.feature3.title", defaultTitle: "Cuore di Famiglia: Passione Contagiosa",
      descriptionKey: "whyus.feature3.description", defaultDescription: "Non siamo solo fornitori, siamo una famiglia che condivide una passione. Ti accogliamo con un sorriso, ti consigliamo con sincerità, perché la tua soddisfazione è la nostra più grande ricompensa.",
      imageSrc: "/images/kiwi_cuore.jpg",
      altKey: "whyus.feature3.alt", defaultAlt: "Kiwi di varie tonalità disposti a formare un cuore, simbolo della passione familiare"
    },
    {
      icon: MapPinIcon,
      titleKey: "whyus.feature4.title", defaultTitle: "Radici Trentine: Autenticità Garantita",
      descriptionKey: "whyus.feature4.description", defaultDescription: "Amiamo profondamente il nostro Trentino. Valorizziamo i suoi produttori e ti offriamo l'autenticità dei sapori locali, per un'esperienza di gusto genuina e indimenticabile.",
      imageSrc: "/images/bottamedi_logo_solofrutta_glow.jpg",
      altKey: "whyus.feature4.alt", defaultAlt: "Logo luminoso di Bottamedi Frutta e Verdura, che simboleggia le radici nel territorio trentino"
    }
  ];

  const features: FeatureItem[] = featuresData.map(f => ({
    icon: f.icon,
    imageSrc: f.imageSrc,
    title: t(f.titleKey, f.defaultTitle),
    description: t(f.descriptionKey, f.defaultDescription),
    alt: t(f.altKey, f.defaultAlt),
  }));

  useEffect(() => {
    const currentSectionRef = sectionRef.current;
    if (!currentSectionRef || !titleRef.current || !subtitleRef.current) return;
    
    const gsapCtx = gsap.context(() => {
      gsap.set([titleRef.current, subtitleRef.current], {autoAlpha:0});
      gsap.from([titleRef.current, subtitleRef.current], {
        autoAlpha:0, y:40, stagger: 0.2, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: currentSectionRef, start: 'top 75%', toggleActions: 'play none none none' }
      });
      
      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        const image = card.querySelector('img');
        gsap.set(card, {autoAlpha:0});

        gsap.from(card, {
          autoAlpha: 0, y: 60, scale: 0.9, rotationX: -15, 
          duration: 0.9, ease: 'expo.out', stagger: 0.15 * index,
          scrollTrigger: { trigger: card, start: "top 85%", toggleActions: "play none none none" }
        });

        if(image && window.innerWidth > 768) { 
          gsap.to(image, {
              yPercent: -20, ease: "none",
              scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: 1.5 }
          });
        }
      });
    }, currentSectionRef); 

    return () => gsapCtx.revert();
  }, [t]); 


  return (
    <Section id="perche-noi" ref={sectionRef} aria-labelledby="perche-noi-title" className="bg-brand-gray-extralight overflow-hidden">
      <div className="text-center mb-12 md:mb-16">
        <h2 ref={titleRef} id="perche-noi-title" className="text-3xl md:text-4xl lg:text-5xl font-bold font-serif text-brand-green-dark mb-4">
          {t('whyus.title', 'Il Segreto della Nostra Unicità')}
        </h2>
        <p ref={subtitleRef} className="text-lg md:text-xl text-brand-gray-dark max-w-3xl mx-auto leading-relaxed">
          {t('whyus.subtitle', 'Scegliere Bottamedi non è solo acquistare frutta e verdura. È abbracciare una filosofia di freschezza impareggiabile, qualità certificata e un\'attenzione al cliente che solo una famiglia appassionata può offrirti.')}
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div 
              key={index} 
              ref={el => { cardsRef.current[index] = el; }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden group transform transition-all duration-300 hover:shadow-brand-green/25 hover:-translate-y-2.5 hover:shadow-2xl"
            >
              <div className="h-64 w-full overflow-hidden"> 
                <img 
                  src={feature.imageSrc} 
                  alt={feature.alt || feature.title} 
                  width={600} 
                  height={400} 
                  className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110 ease-out" />
              </div>
              <div className="p-6 md:p-8">
                <div className="flex items-center mb-4">
                  <Icon className="h-10 w-10 text-brand-orange mr-4 flex-shrink-0" />
                  <h3 className="text-2xl lg:text-3xl font-serif font-semibold text-brand-gray-dark">{feature.title}</h3>
                </div>
                <p className="text-brand-gray-dark leading-relaxed text-base">{feature.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
};

export default WhyUsSection;
