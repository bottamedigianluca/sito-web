import React, { useEffect, useRef } from 'react';
import { GalleryItemData } from '../../types';
import { gsap } from 'gsap';

interface GalleryProps {
  items: GalleryItemData[];
  onItemClick: (item: GalleryItemData) => void;
}

const Gallery: React.FC<GalleryProps> = ({ items, onItemClick }) => {
  const galleryContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentGalleryContainerRef = galleryContainerRef.current;
    if (!currentGalleryContainerRef) return;

    const gsapCtx = gsap.context(() => {
      const galleryItems = gsap.utils.toArray<HTMLDivElement>(".gallery-item", currentGalleryContainerRef);

      galleryItems.forEach((itemEl, index) => {
        if (!itemEl) return;

        const image = itemEl.querySelector('img');
        const overlayContent = itemEl.querySelector('.gallery-item-overlay-content');
        
        gsap.set(itemEl, {autoAlpha:0});
        gsap.from(itemEl, {
          autoAlpha: 0, y: 60, scale: 0.85, rotationZ: gsap.utils.random(-5, 5),
          duration: 0.7, delay: index * 0.1, ease: 'expo.out',
          scrollTrigger: {
            trigger: itemEl, start: "top 90%", toggleActions: "play none none none"
          }
        });

        const tl = gsap.timeline({ paused: true });
        tl.to(image, { scale: 1.12, duration: 0.45, ease: 'power2.out' })
          .to(itemEl, { 
              z: 30, rotationY: index % 2 === 0 ? -6 : 6, rotationX: 4,
              boxShadow: "0px 20px 35px rgba(0,0,0,0.25)",
              duration: 0.35, ease: 'power1.out'
          }, 0)
          .to(overlayContent, { autoAlpha: 1, y: 0, duration: 0.35, ease: 'power2.out' }, 0.05);

        itemEl.addEventListener('mouseenter', () => tl.play());
        itemEl.addEventListener('mouseleave', () => tl.reverse());
      });
    }, currentGalleryContainerRef);

    return () => gsapCtx.revert();
  }, [items]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>, item: GalleryItemData) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onItemClick(item);
    }
  };

  return (
    <div ref={galleryContainerRef} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 md:gap-8" style={{ perspective: "1200px" }}>
      {items.map((item) => (
        <div
          key={item.id}
          className="gallery-item group relative rounded-xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-shadow duration-300 aspect-[4/3] will-change-transform focus:outline-none focus:ring-2 focus:ring-brand-green focus:ring-offset-2"
          onClick={() => onItemClick(item)}
          onKeyDown={(e) => handleKeyDown(e, item)}
          tabIndex={0} 
          role="button" 
          aria-label={`Visualizza ${item.title}`}
          style={{ transformStyle: "preserve-3d" }} 
        >
          <img 
            src={item.thumb} 
            alt={item.alt} 
            width={400} 
            height={300} 
            className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent flex items-end p-4 md:p-5 gallery-item-overlay-content opacity-0 transform translate-y-5">
            <h3 className="text-white text-lg md:text-xl font-semibold">
              {item.title}
            </h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Gallery;
