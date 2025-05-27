import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from '../../types';
import {
  HomeIcon, MenuAlt3Icon as MenuIcon, PhoneArrowUpRightIcon as PhoneIcon, MapIcon as LocationMarkerIcon, 
  BookOpenIcon, ShoppingBagIcon, BuildingStorefrontIcon, SparklesIcon, IdentificationIcon, XIcon 
} from '../icons/HeroIcons';
import { gsap } from 'gsap';
import { useLanguage } from '../../contexts/LanguageContext';


interface MobileNavProps {
  navLinks: NavLink[];
}

const MobileNav: React.FC<MobileNavProps> = ({ navLinks }) => {
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const submenuRefs = useRef<{[key: string]: HTMLDivElement | null}>({});
  const triggerButtonRefs = useRef<{[key: string]: HTMLButtonElement | null}>({});
  const navRef = useRef<HTMLElement>(null);
  const lastScrollY = useRef(0);
  const isNavVisible = useRef(false);
  const { t } = useLanguage();
  
  const scrollHistory = useRef<{y: number, time: number}[]>([]);
  const AGITATION_THRESHOLD_COUNT = 3;
  const AGITATION_TIME_WINDOW = 500; // ms
  const MIN_AGITATION_DELTA = 30; // px

  const HIDE_THRESHOLD = 100;
  const SCROLL_DELTA_THRESHOLD = 10;

  const scrollToSection = (sectionId: string) => {
    gsap.to(window, { duration: 1, scrollTo: { y: `#${sectionId}`, offsetY: 70 }, ease: 'power2.inOut' });
    setActiveSubmenu(null);
  };

  const toggleSubmenu = (submenuId: string) => {
    const currentlyActive = activeSubmenu;
    setActiveSubmenu(prev => {
      const newActive = prev === submenuId ? null : submenuId;
      if (newActive && submenuRefs.current[newActive]) {
        gsap.delayedCall(0.05, () => {
          const firstFocusable = submenuRefs.current[newActive]?.querySelector('a[href], button') as HTMLElement | null;
          firstFocusable?.focus();
        });
      } else if (!newActive && currentlyActive && triggerButtonRefs.current[currentlyActive]) {
         triggerButtonRefs.current[currentlyActive]?.focus();
      }
      return newActive;
    });
  };
  
  useEffect(() => {
    const currentNavRef = navRef.current;
    if (!currentNavRef) return;

    const gsapCtx = gsap.context(() => {
      Object.keys(submenuRefs.current).forEach(key => {
        const submenuEl = submenuRefs.current[key];
        if (submenuEl) {
          if (activeSubmenu === key) {
            gsap.to(submenuEl, { autoAlpha: 1, y: 0, duration: 0.35, ease: 'power2.out', overwrite: true });
            submenuEl.style.pointerEvents = 'auto';
          } else {
            gsap.to(submenuEl, { autoAlpha: 0, y: 15, duration: 0.25, ease: 'power1.in', overwrite: true });
            submenuEl.style.pointerEvents = 'none';
          }
        }
      });
    }, currentNavRef); 

    return () => gsapCtx.revert();
  }, [activeSubmenu]);

  useEffect(() => {
    const navElement = navRef.current;
    if (!navElement) return;

    let initialCheckTimeoutId: ReturnType<typeof setTimeout>;
    const gsapCtx = gsap.context(() => {
      gsap.set(navElement, { willChange: 'transform, opacity', y: '100%', autoAlpha: 0 }); // Start hidden

      const showNav = (immediate = false) => {
          gsap.to(navElement, {
              y: '0%', autoAlpha: 1, duration: immediate ? 0 : 0.4,
              ease: 'power2.out', overwrite: true, pointerEvents: 'auto'
          });
          isNavVisible.current = true;
      };

      const hideNav = (immediate = false) => {
          gsap.to(navElement, {
              y: '100%', autoAlpha: 0, duration: immediate ? 0 : 0.4,
              ease: 'power2.in', overwrite: true, pointerEvents: 'none'
          });
          isNavVisible.current = false;
          setActiveSubmenu(null); 
      };
      
      const performInitialCheck = () => {
          const currentScrollY = window.scrollY;
          const bodyHeight = document.body.offsetHeight;
          const atTop = currentScrollY <= 50;
          const atBottom = (window.innerHeight + Math.ceil(currentScrollY)) >= (bodyHeight - 50);

          if (atTop || atBottom || currentScrollY <= HIDE_THRESHOLD) {
              showNav(true);
          } else { 
              hideNav(true);
          }
          lastScrollY.current = currentScrollY;
      };

      initialCheckTimeoutId = setTimeout(performInitialCheck, 450);

      const handleScroll = () => {
        const currentScrollY = window.scrollY;
        const currentTime = Date.now();

        // Add current scroll to history
        scrollHistory.current.push({ y: currentScrollY, time: currentTime });
        // Keep history to a manageable size (e.g., last 10-15 points)
        if (scrollHistory.current.length > 15) {
          scrollHistory.current.shift();
        }

        const scrollDirection = currentScrollY > lastScrollY.current ? 'down' : 'up';
        const scrollDelta = Math.abs(currentScrollY - lastScrollY.current);
        const atTop = currentScrollY < 50; // Keep HIDE_THRESHOLD for this
        const atBottom = (window.innerHeight + Math.ceil(currentScrollY)) >= (document.body.offsetHeight - 50);

        // Agitation detection
        if (scrollHistory.current.length > AGITATION_THRESHOLD_COUNT) {
            let changesInWindow = 0;
            let lastDir = null;
            // Iterate backwards from the most recent history point
            for (let i = scrollHistory.current.length - 1; i > 0; i--) {
                const currentPoint = scrollHistory.current[i];
                const prevPoint = scrollHistory.current[i-1];
                
                if (currentTime - prevPoint.time > AGITATION_TIME_WINDOW) break; // Check against currentTime for the window

                const segmentDelta = Math.abs(currentPoint.y - prevPoint.y);
                if (segmentDelta < MIN_AGITATION_DELTA) continue; // Not a significant scroll segment

                const segmentDir = currentPoint.y > prevPoint.y ? 'down' : 'up';
                if (lastDir && segmentDir !== lastDir) {
                    changesInWindow++;
                }
                lastDir = segmentDir;
            }
            if (changesInWindow >= AGITATION_THRESHOLD_COUNT -1) { // -1 because we count changes between segments
                 if (!isNavVisible.current) showNav();
                 lastScrollY.current = currentScrollY;
                 scrollHistory.current = []; // Reset history after agitation
                 return; // Agitation overrides other rules for this tick
            }
        }
        
        // Original logic (with minor adjustments for clarity)
        if (scrollDelta < SCROLL_DELTA_THRESHOLD && !atTop && !atBottom) {
          lastScrollY.current = currentScrollY;
          return;
        }

        if (atTop || atBottom) {
          if (!isNavVisible.current) showNav();
        } else if (scrollDirection === 'down' && currentScrollY > HIDE_THRESHOLD) {
          if (isNavVisible.current) hideNav();
        } else if (scrollDirection === 'up') {
          if (!isNavVisible.current) showNav();
        }
        
        lastScrollY.current = currentScrollY;
      };
      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => {
          clearTimeout(initialCheckTimeoutId);
          window.removeEventListener('scroll', handleScroll);
      };
    }, navElement); 

    return () => gsapCtx.revert();
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && activeSubmenu) {
        const triggerButton = triggerButtonRefs.current[activeSubmenu];
        setActiveSubmenu(null);
        triggerButton?.focus();
      }

      if (event.key === 'Tab' && activeSubmenu) {
        const currentSubmenu = submenuRefs.current[activeSubmenu];
        if (!currentSubmenu) return;

        const focusableElements = Array.from(
          currentSubmenu.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')
        );
        
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

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeSubmenu]);


  const renderSubMenu = (items: {label: string, href?: string, action?: () => void, icon?: React.ElementType}[], triggerId: string) => (
    <div
        ref={el => { submenuRefs.current[triggerId] = el; }}
        id={triggerId + "-submenu"}
        role="menu"
        aria-labelledby={triggerId}
        className="absolute bottom-full mb-3 w-60 bg-gray-800 bg-opacity-95 backdrop-blur-md rounded-xl shadow-2xl p-2.5 space-y-1.5 origin-bottom opacity-0 transform translate-y-10 pointer-events-none"
    >
      {items.map((item, index) => {
        const ItemIcon = item.icon;
        return (
          <a
            key={index}
            href={item.href || '#'}
            role="menuitem"
            onClick={(e) => {
              if (item.href && item.href.startsWith('#')) { e.preventDefault(); scrollToSection(item.href.substring(1)); }
              else if (item.action) { e.preventDefault(); item.action(); }
              else if (item.href && (item.href.startsWith('tel:') || item.href.startsWith('mailto:'))) { setActiveSubmenu(null); }
              else { e.preventDefault(); }
            }}
            className="flex items-center px-3.5 py-3 text-sm text-gray-100 hover:bg-brand-green hover:text-white rounded-lg transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-brand-green-light"
          >
            {ItemIcon && <ItemIcon className="h-5 w-5 mr-3.5 text-brand-green-light flex-shrink-0" />}
            <span className="truncate">{item.label}</span>
          </a>
        );
      })}
    </div>
  );

  const menuNavItems = [
    { label: t('nav.home', 'Home'), href: '#hero', icon: HomeIcon },
    ...navLinks.map((link) => {
        let icon = IdentificationIcon; 
        if (link.id === 'storia') icon = BookOpenIcon;
        else if (link.id === 'dettaglio') icon = ShoppingBagIcon;
        else if (link.id === 'ingrosso') icon = BuildingStorefrontIcon;
        else if (link.id === 'perche-noi') icon = SparklesIcon;
        return { label: link.label, href: `#${link.id}`, icon: icon };
    })
  ];

  const contactItems = [
    { label: t('nav.banchettoContact', 'Banchetto'), href: 'tel:+393515776198', icon: PhoneIcon },
    { label: t('nav.ingrossoContact', 'Ingrosso'), href: 'tel:+390461602534', icon: PhoneIcon },
  ];

  const mapItems = [
    { label: t('nav.banchettoMap', 'Mappa Banchetto'), href: '#', icon: LocationMarkerIcon, action: () => { window.open('https://www.google.com/maps/search/?api=1&query=Banchetto+Frutta+e+Verdura+Bottamedi+Via+Cavalleggeri+Udine+Mezzolombardo+TN', '_blank'); setActiveSubmenu(null); } },
    { label: t('nav.ingrossoMap', 'Mappa Ingrosso'), href: '#', icon: LocationMarkerIcon, action: () => { window.open('https://www.google.com/maps/search/?api=1&query=Bottamedi+Ingrosso+Ortofrutta+Via+Alcide+de+Gasperi+47+Mezzolombardo', '_blank'); setActiveSubmenu(null); } },
  ];

  const dockItems = [
      { id: 'menu-dock', labelKey: 'nav.menu', defaultLabel: 'Menu', icon: MenuIcon, action: () => toggleSubmenu('menu-dock'), subMenuContent: menuNavItems },
      { id: 'contacts-dock', labelKey: 'nav.call', defaultLabel: 'Chiama', icon: PhoneIcon, action: () => toggleSubmenu('contacts-dock'), subMenuContent: contactItems },
      { id: 'maps-dock', labelKey: 'nav.maps', defaultLabel: 'Mappe', icon: LocationMarkerIcon, action: () => toggleSubmenu('maps-dock'), subMenuContent: mapItems },
  ];

  return (
    <nav ref={navRef} className="md:hidden fixed bottom-0 left-0 right-0 bg-gray-900 bg-opacity-85 backdrop-blur-xl text-white p-2.5 shadow-t-2xl z-[60] opacity-0" aria-label="Navigazione mobile principale">
      <div className="container mx-auto flex justify-around items-center">
        {dockItems.map((item) => {
          const Icon = item.icon;
          const isOpen = activeSubmenu === item.id;
          return (
            <div key={item.id} className="relative flex flex-col items-center">
              {item.subMenuContent && renderSubMenu(item.subMenuContent, item.id)}
              <button
                ref={el => { triggerButtonRefs.current[item.id] = el; }}
                id={item.id}
                onClick={item.action}
                className={`flex flex-col items-center justify-center text-xs focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-offset-gray-900 focus:ring-brand-green-light p-2 rounded-lg transition-all duration-200 w-[70px] h-[55px] ${isOpen ? 'bg-brand-green text-white scale-105' : 'hover:bg-gray-700'}`}
                aria-haspopup="true"
                aria-expanded={isOpen}
                aria-controls={item.id + "-submenu"}
                aria-label={`${t(item.labelKey, item.defaultLabel)}${isOpen ? ' (sottomenu aperto)' : ''}`}
              >
                <Icon className={`h-6 w-6 mb-0.5 transition-transform duration-200 ${isOpen ? 'text-white' : 'text-gray-300'}`} />
                <span className={`transition-colors duration-200 ${isOpen ? 'text-white font-medium' : 'text-gray-300'}`}>{t(item.labelKey, item.defaultLabel)}</span>
              </button>
            </div>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileNav;
