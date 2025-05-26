import React, { useEffect, useRef } from 'react';
import Button from '../ui/Button';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { ScrollTrigger } from 'gsap/ScrollTrigger'; 
import { useLanguage } from '../../contexts/LanguageContext';

interface Particle {
  x: number;
  y: number;
  radius: number;
  color: string;
  vx: number;
  vy: number;
  opacity: number;
  type: 'leaf' | 'seed' | 'sparkle'; 
  rotation: number;
  rotationSpeed: number;
  baseRadius: number;
}

const HeroSection: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null); 
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();
  const mousePos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });

  useEffect(() => {
    const currentHeroRef = heroRef.current;
    if (!titleRef.current || !subtitleRef.current || !paragraphRef.current || !buttonsRef.current || !bgRef.current || !canvasRef.current || !currentHeroRef) return;

    const canvas = canvasRef.current;
    let ctx: CanvasRenderingContext2D | null = null;
    let animationFrameId: number;
    const particles: Particle[] = [];
    
    const gsapCtx = gsap.context(() => {
      ScrollTrigger.matchMedia({
        "(min-width: 768px)": function() {
          ctx = canvas.getContext('2d'); 
          if (!ctx) return;
          if (canvas) canvas.style.display = 'block';


          const numParticles = 70; 
          
          const resizeCanvas = () => {
            if (!canvas) return;
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles();
          };

          const particleColors = {
              leaf: ['rgba(120,180,120,0.5)', 'rgba(160,214,187,0.6)', 'rgba(100,150,100,0.4)'],
              seed: ['rgba(253,224,71,0.5)', 'rgba(251,191,36,0.6)', 'rgba(245,158,11,0.4)'],
              sparkle: ['rgba(255,255,255,0.7)', 'rgba(220,220,255,0.6)']
          };
          const particleTypes: Particle['type'][] = ['leaf', 'seed', 'sparkle'];

          const initParticles = () => {
            if (!canvas || !ctx) return;
            particles.length = 0;
            for (let i = 0; i < numParticles; i++) {
              const type = particleTypes[Math.floor(Math.random() * particleTypes.length)];
              const baseRadius = type === 'leaf' ? Math.random() * 4 + 2.5 : (type === 'seed' ? Math.random() * 2 + 1.5 : Math.random() * 1.5 + 1);
              particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                baseRadius: baseRadius, radius: baseRadius,
                color: particleColors[type][Math.floor(Math.random() * particleColors[type].length)],
                vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3,
                opacity: Math.random() * 0.5 + 0.3, type: type,
                rotation: Math.random() * Math.PI * 2,
                rotationSpeed: (Math.random() - 0.5) * 0.008
              });
            }
          };
          
          const drawParticleShape = (p: Particle) => {
            if (!ctx) return;
            ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rotation);
            ctx.beginPath(); ctx.globalAlpha = p.opacity;
            if (p.type === 'leaf') { 
                ctx.moveTo(0, -p.radius);
                ctx.bezierCurveTo(p.radius*0.7, -p.radius, p.radius*0.8, -p.radius*0.3, p.radius, 0);
                ctx.bezierCurveTo(p.radius*0.8, p.radius*0.3, p.radius*0.7, p.radius, 0, p.radius);
                ctx.bezierCurveTo(-p.radius*0.7, p.radius, -p.radius*0.8, p.radius*0.3, -p.radius, 0);
                ctx.bezierCurveTo(-p.radius*0.8, -p.radius*0.3, -p.radius*0.7, -p.radius, 0, -p.radius);
            } else if (p.type === 'seed') { 
                ctx.arc(0, 0, p.radius, 0, Math.PI * 2);
            } else { 
                for (let i = 0; i < 4; i++) {
                    const angle = (i*90 - 45) * Math.PI/180; ctx.lineTo(Math.cos(angle)*p.radius, Math.sin(angle)*p.radius);
                    const innerAngle = (i*90) * Math.PI/180; ctx.lineTo(Math.cos(innerAngle)*(p.radius/2.5), Math.sin(innerAngle)*(p.radius/2.5));
                }
            }
            ctx.closePath(); ctx.fillStyle = p.color; ctx.fill(); ctx.restore();
          };

          const drawParticles = () => { if(ctx) { ctx.clearRect(0, 0, canvas.width, canvas.height); particles.forEach(p => drawParticleShape(p)); }};
          const updateParticles = () => {
            particles.forEach(p => {
              p.x += p.vx; p.y += p.vy; p.rotation += p.rotationSpeed;
              const dx = p.x - mousePos.current.x, dy = p.y - mousePos.current.y;
              const distance = Math.sqrt(dx*dx + dy*dy);
              const interactionRadius = 130;
              if (distance < interactionRadius) {
                const forceDirX = dx/distance, forceDirY = dy/distance;
                const maxF = 1.8, force = (interactionRadius - distance) / interactionRadius * maxF;
                p.vx += forceDirX * force * 0.06; p.vy += forceDirY * force * 0.06;
                p.radius = p.baseRadius * (1 + (force/maxF)*0.5);
              } else { p.radius = gsap.utils.interpolate(p.radius, p.baseRadius, 0.1); }
              p.vx *= 0.97; p.vy *= 0.97;
              if (p.x < -p.radius*3 || p.x > canvas.width+p.radius*3) p.x = p.vx > 0 ? -p.radius*2 : canvas.width+p.radius*2;
              if (p.y < -p.radius*3 || p.y > canvas.height+p.radius*3) p.y = p.vy > 0 ? -p.radius*2 : canvas.height+p.radius*2;
              p.opacity += (Math.random()-0.5)*0.01; p.opacity = Math.max(0.15, Math.min(0.75,p.opacity));
            });
          };
          const animateParticles = () => { updateParticles(); drawParticles(); animationFrameId = requestAnimationFrame(animateParticles); };
          
          resizeCanvas(); 
          animateParticles();
          window.addEventListener('resize', resizeCanvas);
          return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationFrameId);
            if(ctx && canvas) ctx.clearRect(0, 0, canvas.width, canvas.height); 
            particles.length = 0; 
          }
        },
        "(max-width: 767px)": function() {
          if (canvas && canvas.style) canvas.style.display = 'none';
           return () => { if (canvas && canvas.style) canvas.style.display = ''; } 
        }
      });

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' }});
      
      let titleSplit: SplitText | null = null;
      if (titleRef.current && titleRef.current.innerText.trim() !== "") {
        titleSplit = new SplitText(titleRef.current, { type: 'chars,words', charsClass: "hero_title_char" });
        gsap.set(titleSplit.chars, { autoAlpha: 0, yPercent: 70, rotationZ: gsap.utils.random(-15, 15, 2), scale: 0.7, skewX:-5 });
        tl.to(titleSplit.chars, {
          autoAlpha: 1, yPercent: 0, rotationZ: 0, scale:1, skewX:0, duration: 1.1, stagger: { each: 0.05, from: "random" }, delay: 0.5, ease: "expo.out"
        });
      } else {
        gsap.set(titleRef.current, {autoAlpha: 0});
        tl.to(titleRef.current, {autoAlpha:1, duration: 1, delay: 0.5});
      }

      let subtitleSplit: SplitText | null = null;
      if (subtitleRef.current && subtitleRef.current.innerText.trim() !== "") {
        subtitleSplit = new SplitText(subtitleRef.current, {type: "lines", linesClass: "hero_subtitle_line"});
        gsap.set(subtitleSplit.lines, {autoAlpha: 0, y:50, skewX:8, rotationX:-10});
        tl.to(subtitleSplit.lines, {
            autoAlpha: 1, y: 0, skewX:0, rotationX:0, duration: 0.9, stagger: 0.18, ease: 'expo.out'
        }, titleSplit ? "-=0.7" : "<+=0.2");
      } else {
        gsap.set(subtitleRef.current, {autoAlpha: 0});
        tl.to(subtitleRef.current, {autoAlpha:1, duration: 0.8}, titleSplit ? "-=0.7" : "<+=0.2");
      }
      
      gsap.set(paragraphRef.current, { autoAlpha: 0, y: 40 });
      tl.to(paragraphRef.current, { autoAlpha: 1, y: 0, duration: 0.9, ease: 'power3.out' }, "-=0.6");

      if (buttonsRef.current) {
        const buttonsArray = gsap.utils.toArray<Element>(buttonsRef.current.children || []);
        if (buttonsArray.length > 0) {
          gsap.set(buttonsArray, { autoAlpha: 0, y: 40, scale: 0.85 });
          tl.to(buttonsArray, {
              autoAlpha: 1, y: 0, scale: 1, pointerEvents: 'auto', duration: 0.7, stagger: 0.18, ease: 'back.out(1.7)', overwrite: true
            }, "-=0.5");
          tl.set(buttonsRef.current, { autoAlpha: 1, pointerEvents: 'auto', overflow: 'visible' }, ">");
        }
      }

      const parallaxHandler = (e: MouseEvent) => {
        if (window.innerWidth < 768 || !currentHeroRef || !bgRef.current) return;
        const { clientX, clientY } = e;
        mousePos.current = { x: clientX, y: clientY };
        const xPercent = (clientX / window.innerWidth - 0.5) * 2;
        const yPercent = (clientY / window.innerHeight - 0.5) * 2;
        gsap.to(bgRef.current, { x: xPercent * -25, y: yPercent * -20, duration: 0.8, ease: 'power1.out' });
      };
      currentHeroRef.addEventListener('mousemove', parallaxHandler);

      return () => { 
        currentHeroRef.removeEventListener('mousemove', parallaxHandler);
        if (titleSplit) titleSplit.revert();
        if (subtitleSplit) subtitleSplit.revert();
      };
    }, currentHeroRef); 

    return () => {
      gsapCtx.revert();
    };
  }, [t]);

  const scrollToSection = (sectionId: string) => {
    const headerElement = document.querySelector('header');
    let offsetY = 70;
    if (headerElement) {
        const headerStyle = window.getComputedStyle(headerElement);
        const matrixTry = new DOMMatrixReadOnly(headerStyle.transform);
        const headerTransformY = matrixTry.m42; 
        const currentHeaderHeight = headerElement.offsetHeight;

        if (headerTransformY === 0 && currentHeaderHeight > 0) {
             offsetY = currentHeaderHeight + (headerStyle.paddingTop.includes('px') && parseInt(headerStyle.paddingTop) > 10 ? 20 : 10); 
        } else { 
            offsetY = currentHeaderHeight > 0 ? 30 : 60; 
        }
    }
    gsap.to(window, { duration: 1.3, scrollTo: { y: `#${sectionId}`, offsetY: offsetY }, ease: 'power3.inOut' });
  };

  return (
    <section id="hero" ref={heroRef} className="relative h-screen flex items-center justify-center text-white overflow-hidden">
      <div
        ref={bgRef}
        className="absolute inset-[-30px] bg-cover bg-center will-change-transform"
        style={{ backgroundImage: "url('/images/agrumi_datteri_castagne.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/45 to-transparent"></div>
      </div>
      <canvas ref={canvasRef} id="hero-particle-canvas" width={window.innerWidth} height={window.innerHeight}></canvas>
      <div className="relative z-10 text-center p-4">
        <h1 ref={titleRef} className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold font-display mb-3 md:mb-4 leading-tight tracking-tighter" style={{ textShadow: '0 3px 12px rgba(0,0,0,0.6)' }}>
          {t('hero.title', 'BOTTAMEDI')}
        </h1>
        <h2 ref={subtitleRef} className="text-2xl sm:text-3xl md:text-4xl font-serif mb-6 md:mb-8" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
          {t('hero.subtitle', 'Frutta e Verdura')}
        </h2>
        <p ref={paragraphRef} className="text-lg sm:text-xl md:text-2xl mb-8 md:mb-10 max-w-xl md:max-w-2xl mx-auto font-light">
          {t('hero.tagline', 'L\'essenza del Trentino, dal 1950. Freschezza che ispira, qualità che conquista.')}
        </p>
        <div ref={buttonsRef} className="space-y-3.5 md:space-y-0 md:space-x-4 flex flex-col md:flex-row justify-center items-center">
          <Button onClick={() => scrollToSection('dettaglio')} variant="primary" size="lg" className="shadow-lg hover:shadow-xl">
            {t('hero.cta.banchetto', 'Scopri il Banchetto')}
          </Button>
          <Button onClick={() => scrollToSection('ingrosso')} variant="secondary" size="lg" className="shadow-lg hover:shadow-xl border-2 border-white text-white hover:bg-white hover:text-brand-green">
             {t('hero.cta.ingrosso', 'Servizi HORECA')}
          </Button>
           <Button
              onClick={() => scrollToSection('storia')}
              variant="ghost"
              size="lg"
              className="shadow-lg hover:shadow-xl text-white border-2 border-white/60 hover:border-white hover:bg-white/15 backdrop-blur-sm transition-all duration-300 ease-out focus:ring-white/70"
            >
            {t('hero.cta.storia', 'La Nostra Storia')}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
