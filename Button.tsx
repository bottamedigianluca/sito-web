import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const baseStyles = "font-semibold rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-300 ease-in-out transform hover:scale-105 relative overflow-hidden";

  const variantStyles = {
    primary: "bg-brand-green text-white hover:bg-brand-green-dark focus:ring-brand-green",
    secondary: "bg-white text-brand-green border-2 border-brand-green hover:bg-brand-green-light hover:text-white focus:ring-brand-green",
    ghost: "bg-transparent text-white hover:bg-white hover:bg-opacity-20 focus:ring-white",
  };

  const sizeStyles = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-2.5 text-base",
    lg: "px-8 py-3 text-lg",
  };
  
  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    const gsapCtx = gsap.context(() => {
      const createRipple = (event: MouseEvent) => {
          const ripple = document.createElement("span");
          const rect = button.getBoundingClientRect();
          const diameter = Math.max(rect.width, rect.height) * 1.5;
          const x = event.clientX - rect.left - diameter / 2;
          const y = event.clientY - rect.top - diameter / 2;

          ripple.style.width = ripple.style.height = `${diameter}px`;
          ripple.style.left = `${x}px`;
          ripple.style.top = `${y}px`;
          ripple.classList.add("button-ripple"); 
          
          let rippleColor = 'rgba(255, 255, 255, 0.3)'; 
          if (variant === 'secondary') {
              rippleColor = 'rgba(26, 122, 76, 0.2)'; 
          }
          ripple.style.backgroundColor = rippleColor;
          
          button.appendChild(ripple);

          gsap.fromTo(ripple, 
              { scale: 0, autoAlpha: 0.7 },
              { 
                  scale: 2, autoAlpha: 0, duration: 0.6, 
                  ease: "power2.out", onComplete: () => ripple.remove()
              }
          );
      };
      button.addEventListener('click', createRipple);
      return () => button.removeEventListener('click', createRipple);
    }, button); 

    return () => gsapCtx.revert();
  }, [variant]);


  return (
    <button
      ref={buttonRef}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      <span className="relative z-10">{children}</span>
    </button>
  );
};

export default Button;
