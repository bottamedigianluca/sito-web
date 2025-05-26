import React, {useEffect, useRef} from 'react';
import Section from '../ui/Section';
import { PhoneIcon, MailIcon, MapPinIcon, ExternalLinkIcon } from '../icons/HeroIcons';
import { useLanguage } from '../../contexts/LanguageContext';
import { gsap } from 'gsap';

const ContactSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const contactBlocksRef = useRef<(HTMLDivElement | null)[]>([]);
  const mapPreviewsRef = useRef<(HTMLDivElement | null)[]>([]);
  const { t } = useLanguage();

  useEffect(() => {
    const currentSectionRef = sectionRef.current;
    if (!currentSectionRef || !titleRef.current || !subtitleRef.current) return;

    const gsapCtx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: currentSectionRef,
          start: "top 70%",
          toggleActions: "play none none none"
        }
      });
      
      gsap.set([titleRef.current, subtitleRef.current], {autoAlpha:0});
      tl.from([titleRef.current, subtitleRef.current], {
        autoAlpha: 0, y: 40, stagger: 0.2, duration: 0.9, ease: 'power3.out'
      });

      contactBlocksRef.current.forEach((block, index) => {
        if(block) {
          gsap.set(block, {autoAlpha:0});
          gsap.from(block, {
            autoAlpha: 0, x: -60, duration: 0.8, ease: 'expo.out', delay: index * 0.1,
            scrollTrigger: { trigger: block, start: "top 85%", toggleActions: "play none none none" }
          });
        }
      });
      
      mapPreviewsRef.current.forEach((map, index) => {
        if(map) {
          gsap.set(map, {autoAlpha:0});
          gsap.from(map, {
            autoAlpha: 0, scale: 0.85, rotationY: 15, duration: 0.9, ease: 'back.out(1.6)', delay: index * 0.1,
            scrollTrigger: { trigger: map, start: "top 85%", toggleActions: "play none none none" }
          });
        }
      });
    }, currentSectionRef); 

    return () => gsapCtx.revert(); 
  }, [t]); 

  return (
    <Section id="contatti" ref={sectionRef} aria-labelledby="contatti-title" className="bg-white">
      <div className="text-center mb-12 md:mb-16">
        <h2 ref={titleRef} id="contatti-title" className="text-3xl md:text-4xl lg:text-5xl font-bold font-serif text-brand-green-dark mb-4">
         {t('contact.title', 'Restiamo in Contatto: Trovaci, Chiamaci, Scrivici!')}
        </h2>
        <p ref={subtitleRef} className="text-lg md:text-xl text-brand-gray-dark max-w-3xl mx-auto leading-relaxed">
          {t('contact.subtitle', 'Il sapore autentico del Trentino è più vicino di quanto pensi. Vieni a scoprire la qualità Bottamedi al nostro Banchetto, o contatta Pierluigi per le esigenze HORECA. La nostra famiglia è pronta ad accoglierti!')}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-start">
        <div className="space-y-8">
          <div ref={el => { contactBlocksRef.current[0] = el; }} className="bg-brand-gray-extralight p-6 md:p-8 rounded-xl shadow-lg hover:shadow-brand-green/15 transition-shadow duration-300 hover:-translate-y-1 transform">
            <h3 className="text-2xl font-serif font-semibold text-brand-green-dark mb-4">{t('contact.banchettoTitle', 'Banchetto: Il Cuore della Freschezza')}</h3>
            <address className="not-italic space-y-3 text-brand-gray-dark">
              <p className="flex items-start">
                <MapPinIcon className="h-5 w-5 text-brand-orange mr-3 mt-1 flex-shrink-0" />
                <span>{t('contact.banchettoAddress', 'Via Cavalleggeri Udine, 38017 Mezzolombardo (TN)')}</span>
              </p>
              <p className="flex items-center">
                <PhoneIcon className="h-5 w-5 text-brand-orange mr-3 flex-shrink-0" />
                <a href="tel:+393515776198" className="hover:text-brand-green transition-colors">{t('contact.banchettoPhone', 'Banchetto: 351 577 6198')}</a>
              </p>
              <p className="text-sm"><strong className="font-medium">{t('contact.banchettoHours', 'Orari:')}</strong> Lunedì - Sabato: 07:00 – 19:30</p>
            </address>
          </div>

          <div ref={el => { contactBlocksRef.current[1] = el; }} className="bg-brand-gray-extralight p-6 md:p-8 rounded-xl shadow-lg hover:shadow-brand-green/15 transition-shadow duration-300 hover:-translate-y-1 transform">
            <h3 className="text-2xl font-serif font-semibold text-brand-green-dark mb-4">{t('contact.ingrossoTitle', 'Ingrosso HORECA: Qualità per Professionisti')}</h3>
            <address className="not-italic space-y-3 text-brand-gray-dark">
              <p className="flex items-start">
                <MapPinIcon className="h-5 w-5 text-brand-orange mr-3 mt-1 flex-shrink-0" />
                <span>{t('contact.ingrossoAddress', 'Magazzino: Via Alcide de Gasperi, 47, 38017 Mezzolombardo (TN)')}</span>
              </p>
              <p className="flex items-center">
                <PhoneIcon className="h-5 w-5 text-brand-orange mr-3 flex-shrink-0" />
                <a href="tel:+390461602534" className="hover:text-brand-green transition-colors">{t('contact.ingrossoPhone', 'Ingrosso HORECA: 0461 602534')}</a>
              </p>
              <p className="flex items-center">
                <MailIcon className="h-5 w-5 text-brand-orange mr-3 flex-shrink-0" />
                <a href="mailto:bottamedipierluigi@virgilio.it" className="hover:text-brand-green break-all transition-colors">{t('contact.ingrossoEmail', 'bottamedipierluigi@virgilio.it')}</a>
              </p>
            </address>
          </div>
        </div>

        <div className="space-y-8">
          <h3 className="text-2xl font-serif font-semibold text-brand-gray-dark text-center md:text-left">{t('contact.mapTitle', 'Le Nostre Radici, a Portata di Click')}</h3>
          
          <div ref={el => { mapPreviewsRef.current[0] = el; }} className="bg-white p-4 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 transform">
            <a href="https://www.google.com/maps/search/?api=1&query=Banchetto+Frutta+e+Verdura+Bottamedi+Via+Cavalleggeri+Udine+Mezzolombardo+TN" target="_blank" rel="noopener noreferrer" className="group block">
              <div className="overflow-hidden rounded-lg mb-3">
                <img src="/images/map_banchetto.png" alt={t('contact.mapBanchettoCta', 'Mappa Banchetto')} 
                     width="500" height="256" 
                     className="w-full h-64 object-cover border transform group-hover:scale-110 transition-transform duration-400 ease-out"/>
              </div>
              <h4 className="text-lg font-semibold text-brand-green-dark mb-1 group-hover:text-brand-orange transition-colors">{t('contact.banchettoTitle', 'Il Banchetto (Dettaglio)')}</h4>
              <p className="text-sm text-brand-gray-dark flex items-center group-hover:text-brand-orange transition-colors">
                {t('global.viewOnMap', 'Visualizza su Google Maps')} <ExternalLinkIcon className="h-4 w-4 ml-1.5"/>
              </p>
            </a>
          </div>
          
           <div ref={el => { mapPreviewsRef.current[1] = el; }} className="bg-white p-4 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 transform">
            <a href="https://www.google.com/maps/search/?api=1&query=Bottamedi+Ingrosso+Ortofrutta+Via+Alcide+de+Gasperi+47+Mezzolombardo" target="_blank" rel="noopener noreferrer" className="group block">
              <div className="overflow-hidden rounded-lg mb-3">
                <img src="/images/map_ingrosso.png" alt={t('contact.mapIngrossoCta', 'Mappa Ingrosso')} 
                     width="500" height="256" 
                     className="w-full h-64 object-cover border transform group-hover:scale-110 transition-transform duration-400 ease-out"/>
              </div>
              <h4 className="text-lg font-semibold text-brand-green-dark mb-1 group-hover:text-brand-orange transition-colors">{t('contact.ingrossoTitle', 'L\'Ingrosso (HORECA)')}</h4>
              <p className="text-sm text-brand-gray-dark flex items-center group-hover:text-brand-orange transition-colors">
                 {t('global.viewOnMap', 'Visualizza su Google Maps')} <ExternalLinkIcon className="h-4 w-4 ml-1.5"/>
              </p>
            </a>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default ContactSection;
