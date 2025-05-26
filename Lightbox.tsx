import React, { useEffect, useRef } from 'react';
import { GalleryItemData } from '../../types';
import { XIcon } from '../icons/HeroIcons';
import { gsap } from 'gsap';

interface LightboxProps {
  item: GalleryItemData;
  onClose: () => void;
}

const Lightbox: React.FC<LightboxProps> = ({ item, onClose }) => {
  const lightboxRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const currentLightboxRef = lightboxRef.current;
    if (!currentLightboxRef) return;

    const gsapCtx = gsap.context(() => {
      gsap.set(currentLightboxRef, { autoAlpha: 0 });
      gsap.to(currentLightboxRef, { autoAlpha: 1, duration: 0.3, ease: 'power2.out' });
      gsap.from(contentRef.current, { scale: 0.9, y: 20, duration: 0.4, ease: 'expo.out', delay: 0.1 });
      
      closeButtonRef.current?.focus(); 
    }, currentLightboxRef);

    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Tab' && contentRef.current) {
        const focusableElements = Array.from(
          contentRef.current.querySelectorAll<HTMLElement>('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')
        ).filter(el => el.offsetParent !== null); 

        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (event.shiftKey) { 
          if (document.activeElement === firstElement) {
            lastElement.focus();
            event.preventDefault();
          }
        } else { 
          if (document.activeElement === lastElement) {
            firstElement.focus();
            event.preventDefault();
          }
        }
      }
    };
    
    window.addEventListener('keydown', handleEsc);
    currentLightboxRef.addEventListener('keydown', handleKeyDown); 
    document.body.style.overflow = 'hidden';

    return () => {
      gsapCtx.revert();
      window.removeEventListener('keydown', handleEsc);
      currentLightboxRef?.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);

  const handleCloseAnimation = () => {
    if (lightboxRef.current) {
      gsap.to(lightboxRef.current, { 
        autoAlpha: 0, 
        duration: 0.2, 
        ease: 'power1.in',
        onComplete: onClose 
      });
    } else {
      onClose();
    }
  };

  // Determine aspect ratio for placeholder width/height
  // This is a heuristic. Ideally, aspect ratio would come from data.
  const img = new Image();
  img.src = item.src;
  const aspectRatio = img.width && img.height ? img.width / img.height : 16/9; // Default to 16:9
  let placeholderWidth = 1200;
  let placeholderHeight = Math.round(placeholderWidth / aspectRatio);
  if (placeholderHeight > 900) { // Max height constraint
    placeholderHeight = 900;
    placeholderWidth = Math.round(placeholderHeight * aspectRatio);
  }


  return (
    <div 
      ref={lightboxRef}
      className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
      onClick={handleCloseAnimation}
      role="dialog"
      aria-modal="true"
      aria-labelledby="lightbox-main-title" 
    >
      <div 
        ref={contentRef}
        className="bg-white p-4 rounded-lg shadow-2xl max-w-3xl max-h-[90vh] relative overflow-auto"
        onClick={(e) => e.stopPropagation()} 
      >
        <h2 id="lightbox-main-title" className="sr-only">{item.title || item.caption || 'Immagine ingrandita'}</h2>
        <button
          ref={closeButtonRef}
          onClick={handleCloseAnimation}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 z-10 bg-white bg-opacity-50 rounded-full p-1 focus:outline-none focus:ring-2 focus:ring-brand-green"
          aria-label="Chiudi lightbox"
        >
          <XIcon className="h-6 w-6" />
        </button>
        <img 
          src={item.src} 
          alt={item.alt} 
          className="w-full h-auto max-h-[75vh] object-contain rounded-md" 
          width={placeholderWidth} 
          height={placeholderHeight}
        />
        {item.caption && <p className="mt-3 text-center text-gray-700">{item.caption}</p>}
      </div>
    </div>
  );
};

export default Lightbox;
