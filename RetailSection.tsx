import React, { useState, useEffect, useRef } from 'react';
import Section from '../ui/Section';
import Gallery from '../ui/Gallery';
import Lightbox from '../ui/Lightbox';
import Button from '../ui/Button';
import { GalleryItemData } from '../../types';
import { gsap } from 'gsap';
import { useLanguage } from '../../contexts/LanguageContext';

interface RetailGalleryItem {
  id: string;
  src: string;
  thumb: string;
  altKey: string;
  defaultAlt: string;
  captionKey: string;
  defaultCaption: string;
  titleKey: string;
  defaultTitle: string;
}

const retailGalleryItemsData: RetailGalleryItem[] = [
  { id: '1', src: '/images/agrumi_datteri_castagne.jpg', thumb: '/images/agrumi_datteri_castagne.jpg', altKey: 'gallery.alt.stagione', defaultAlt: 'Frutta fresca di stagione al banchetto', captionKey: 'gallery.caption.stagione', defaultCaption: 'Un arcobaleno di freschezza: frutta di stagione, verdure locali e delizie tipiche ti aspettano al nostro Banchetto.', titleKey: 'gallery.title.stagione', defaultTitle: 'Tesori di Stagione' },
  { id: '2', src: '/images/pomodori_cuore_bue.jpg', thumb: '/images/pomodori_cuore_bue.jpg', altKey: 'gallery.alt.pomodori', defaultAlt: 'Pomodori cuore di bue rossi e maturi', captionKey: 'gallery.caption.pomodori', defaultCaption: 'Il vero sapore dell\'orto: pomodori cuore di bue coltivati con passione, per sughi e insalate indimenticabili.', titleKey: 'gallery.title.pomodori', defaultTitle: 'Rosso Passione' },
  { id: '3', src: '/images/melinda_golden.jpg', thumb: '/images/melinda_golden.jpg', altKey: 'gallery.alt.melinda', defaultAlt: 'Mele Golden Melinda del Trentino', captionKey: 'gallery.caption.melinda', defaultCaption: 'L\'oro del Trentino: le inconfondibili Mele Golden Melinda, un classico di dolcezza e croccantezza.', titleKey: 'gallery.title.melinda', defaultTitle: 'Golden Melinda DOC' },
  { id: '4', src: '/images/angurie.jpg', thumb: '/images/angurie.jpg', altKey: 'gallery.alt.angurie', defaultAlt: 'Angurie fresche e succose', captionKey: 'gallery.caption.angurie', defaultCaption: 'Un\'esplosione di freschezza estiva: le nostre angurie, dolci e dissetanti, perfette per ogni momento.', titleKey: 'gallery.title.angurie', defaultTitle: 'Regine dell\'Estate' },
  { id: '5', src: '/images/meloni_sattin.jpg', thumb: '/images/meloni_sattin.jpg', altKey: 'gallery.alt.meloni', defaultAlt: 'Meloni Sattin dolci e profumati', captionKey: 'gallery.caption.meloni', defaultCaption: 'Meloni Sattin "Dolce Passione": un profumo avvolgente e una dolcezza che conquista, coltivati con amore.', titleKey: 'gallery.title.meloni', defaultTitle: 'Meloni Sublimi' },
  { id: '6', src: '/images/frutta_disidratata_display.jpg', thumb: '/images/frutta_disidratata_dettaglio.jpg', altKey: 'gallery.alt.disidratata', defaultAlt: 'Selezione di frutta disidratata e secca', captionKey: 'gallery.caption.disidratata', defaultCaption: 'Oltre il fresco: scopri un mondo di sapori concentrati nella nostra selezione di frutta disidratata e specialità secche.', titleKey: 'gallery.title.disidratata', defaultTitle: 'Gioielli Essiccati' },
];


const RetailSection: React.FC = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState<GalleryItemData | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const mainImageRef = useRef<HTMLImageElement>(null);
  const ctaButtonRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  const galleryItems: GalleryItemData[] = retailGalleryItemsData.map(item => ({
    id: item.id,
    src: item.src,
    thumb: item.thumb,
    title: t(item.titleKey, item.defaultTitle),
    caption: t(item.captionKey, item.defaultCaption),
    alt: t(item.altKey, item.defaultAlt),
  }));

  const openLightbox = (item: GalleryItemData) => {
    setCurrentImage(item);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setCurrentImage(null);
  };

  const scrollToSection = (sectionId: string) => {
     gsap.to(window, { duration: 1.2, scrollTo: { y: `#${sectionId}`, offsetY: 70 }, ease: 'power3.inOut' });
  };
  
  useEffect(() => {
    const currentSectionRef = sectionRef.current;
    if (!currentSectionRef || !titleRef.current || !paragraphRef.current || !mainImageRef.current || !ctaButtonRef.current) return;
    
    const gsapCtx = gsap.context(() => {
      const tl = gsap.timeline({
          scrollTrigger: {
              trigger: currentSectionRef,
              start: "top 70%", 
              toggleActions: "play none none none"
          }
      });

      tl.from(mainImageRef.current, { autoAlpha:0, scale:0.9, y:30, duration: 1, ease: 'expo.out'})
        .from(titleRef.current, { autoAlpha: 0, y: 25, duration: 0.8, ease: 'power2.out' }, "-=0.7")
        .from(paragraphRef.current, { autoAlpha: 0, y: 20, duration: 0.7, ease: 'power2.out' }, "-=0.6")
        .from(ctaButtonRef.current, { autoAlpha: 0, y: 20, scale:0.9, duration: 0.6, ease: 'back.out(1.7)' }, "-=0.4");
    }, currentSectionRef); 

    return () => gsapCtx.revert();
  }, [t]); 

  return (
    <Section id="dettaglio" ref={sectionRef} aria-labelledby="dettaglio-title" className="bg-brand-gray-extralight">
      <div className="text-center">
        <img 
          ref={mainImageRef} 
          src="/images/zucche_decorate.jpg" 
          alt={t('retail.mainImageAlt', 'Il colorato ed accogliente banchetto di Bottamedi Frutta e Verdura a Mezzolombardo')} 
          width={1024} 
          height={682} 
          className="w-full max-w-4xl mx-auto rounded-xl shadow-2xl mb-8 md:mb-10 h-64 md:h-96 lg:h-[500px] object-cover"/>
        <h2 ref={titleRef} id="dettaglio-title" className="text-3xl md:text-4xl lg:text-5xl font-bold font-serif text-brand-green-dark mb-4">
          {t('retail.title', 'L\'Eden del Gusto Quotidiano: Il Nostro Banchetto')}
        </h2>
        <p ref={paragraphRef} className="text-lg md:text-xl text-brand-gray-dark max-w-3xl mx-auto mb-10 md:mb-12 leading-relaxed">
          {t('retail.description', 'Immergiti in un\'esplosione di colori e profumi al nostro storico Banchetto in Via Cavalleggeri Udine, Mezzolombardo. Ogni giorno, selezioniamo per te solo il meglio: frutta succosa, verdure croccanti e specialità locali, presentate con la passione e la cura che ci definiscono da generazioni.')}
        </p>
      </div>
      <Gallery items={galleryItems} onItemClick={openLightbox} />
      {lightboxOpen && currentImage && (
        <Lightbox item={currentImage} onClose={closeLightbox} />
      )}
      <div ref={ctaButtonRef} className="text-center mt-12 md:mt-16">
        <Button onClick={() => scrollToSection('contatti')} variant="secondary" size="lg" className="shadow-md hover:shadow-lg">
            {t('retail.cta', 'Orari e Contatti del Banchetto')}
        </Button>
      </div>
    </Section>
  );
};

export default RetailSection;
