import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from '../../types';
import { gsap } from 'gsap';
import { useLanguage } from '../../contexts/LanguageContext';

interface HeaderProps {
  navLinks: NavLink[];
}

const Header: React.FC<HeaderProps> = ({ navLinks }) => {
  const headerRef = useRef<HTMLElement>(null);
  const { t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const lastScrollY = useRef(0);
  const headerHeight = useRef(0); 
  const isHidden = useRef(false); 

  useEffect(() => {
    const headerElement = headerRef.current;
    if (!headerElement) return;

    const gsapCtx = gsap.context(() => {
      let resizeTimeout: ReturnType<typeof setTimeout>;
      const updateHeaderHeight = () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
          if (headerRef.current) {
            headerHeight.current = headerRef.current.offsetHeight;
          }
        }, 100);
      };

      gsap.delayedCall(0.1, updateHeaderHeight);
      
      const handleScroll = () => {
        const currentScrollY = window.scrollY;
        const localHeaderHeight = headerHeight.current || (headerRef.current?.offsetHeight ?? 70); 

        setIsScrolled(currentScrollY > 50);

        if (currentScrollY < localHeaderHeight * 0.5) { 
          if (isHidden.current) {
            gsap.to(headerElement, { y: '0%', duration: 0.3, ease: 'power2.out', overwrite: true });
            isHidden.current = false;
          }
        } else if (currentScrollY > lastScrollY.current && currentScrollY > localHeaderHeight) { 
          if (!isHidden.current) {
            gsap.to(headerElement, { y: '-100%', duration: 0.4, ease: 'power2.inOut', overwrite: true });
            isHidden.current = true;
          }
        } else if (currentScrollY < lastScrollY.current) { 
          if (isHidden.current) {
            gsap.to(headerElement, { y: '0%', duration: 0.4, ease: 'power2.out', overwrite: true });
            isHidden.current = false;
          }
        }
        lastScrollY.current = currentScrollY;
      };

      window.addEventListener('scroll', handleScroll, { passive: true });
      window.addEventListener('resize', updateHeaderHeight, { passive: true });
      
      if (window.scrollY <= 50) {
          gsap.set(headerElement, { y: '0%' });
          isHidden.current = false;
      }
      return () => {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', updateHeaderHeight);
        clearTimeout(resizeTimeout);
      };
    }, headerElement); 

    return () => gsapCtx.revert();
  }, []);

  const scrollToSection = (sectionId: string) => {
    let offsetY = 70; 
    if (headerRef.current) {
        const headerVisibleHeight = isHidden.current ? 0 : (headerHeight.current || headerRef.current.offsetHeight);
        offsetY = headerVisibleHeight > 0 ? headerVisibleHeight + (isScrolled ? 10 : 20) : (isScrolled ? 30 : 50) ;
    }
    gsap.to(window, { duration: 1.2, scrollTo: { y: `#${sectionId}`, offsetY: offsetY }, ease: 'power3.inOut' });
  };

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out 
                  ${isScrolled ? 'bg-white shadow-lg py-3' : 'bg-transparent py-5 md:py-6'}`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <a href="#hero" onClick={(e) => { e.preventDefault(); scrollToSection('hero'); }} className="block transform transition-transform duration-300 hover:scale-105">
          <img 
            src="/images/bottamedi_logo_solofrutta_glow.jpg" 
            alt={t('header.logoAlt', 'Bottamedi Frutta e Verdura Logo')}
            width={isScrolled ? 130 : 150} 
            height={isScrolled ? 40 : 56}  
            className={`transition-all duration-300 ${isScrolled ? 'h-10' : 'h-12 md:h-14'}`} 
            style={{ filter: isScrolled ? 'none' : 'brightness(1.1) drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}
          />
        </a>
        <nav className="hidden md:flex space-x-5 lg:space-x-7">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => { e.preventDefault(); scrollToSection(link.id); }}
              className={`relative group hover:text-brand-green transition-colors text-base font-medium 
                          ${isScrolled ? 'text-brand-gray-dark' : 'text-gray-100 hover:text-brand-green-light'}`}
            >
              {link.label}
              <span className={`absolute bottom-[-5px] left-0 w-full h-[3px] bg-brand-green origin-left transform scale-x-0 
                               transition-transform duration-300 ease-out group-hover:scale-x-100 
                               ${isScrolled ? 'bg-brand-green' : 'bg-brand-green-light'}`}></span>
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
