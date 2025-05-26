import React from 'react';
// Corrected: Using MapPinIcon as LocationMarkerIcon is not exported. MapPinIcon is suitable for addresses.
import { PhoneIcon, MailIcon, MapPinIcon } from '../icons/HeroIcons';
import { useLanguage } from '../../contexts/LanguageContext';

// Placeholder social icons
const FacebookIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
  </svg>
);

const InstagramIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.264.058 2.147.248 2.91.558.796.326 1.456.796 2.123 1.463.666.666 1.136 1.326 1.462 2.122.31.764.5 1.647.558 2.91.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.058 1.264-.248 2.147-.558 2.91-.326.796-.796 1.456-1.462 2.123-.667.666-1.326 1.136-2.123 1.462-.764.31-1.646.5-2.91.558-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.264-.058-2.147-.248-2.91-.558-.796-.326-1.456-.796-2.123-1.462-.666-.667-1.136-1.326-1.462-2.123-.31-.764-.5-1.646-.558-2.91-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.058-1.264.248 2.147.558 2.91.326-.796.796 1.456 1.462-2.123.667-.666 1.326-1.136 2.123-1.462.764-.31 1.646.5 2.91-.558C8.416 2.175 8.796 2.163 12 2.163m0-2.163C8.74 0 8.31 0 7.053.057c-1.45.066-2.572.29-3.503.652C2.592 1.085 1.78 1.617.965 2.432.15 3.246-.383 4.058-.745 5.01c-.363.93-.586 2.052-.652 3.502C-.057 9.97 0 10.397 0 12s0 2.03.057 3.287c.066 1.45.29 2.572.652 3.503.362.952.895 1.765 1.71 2.579s1.625.847 2.579 1.71c.93.363 2.052.586 3.502.652C9.97 23.943 10.397 24 12 24s2.03-.057 3.287-.066c1.45-.066 2.572-.29 3.503-.652.952-.362 1.765-.895 2.579-1.71s.847-1.625 1.71-2.579c.363-.93.586-2.052.652-3.503.057-1.257.066-1.684.066-3.287s0-2.03-.066-3.287c-.066-1.45-.29-2.572-.652-3.503-.362-.952-.895-1.765-1.71-2.579S20.754.915 19.8.057C18.87.308 17.748.066 16.298 0 14.03 0 13.603 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.88 1.44 1.44 0 000-2.88z"/>
  </svg>
);


const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();

  return (
    <footer className="bg-brand-gray-dark text-gray-400 py-12 md:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
            <h3 className="font-display text-4xl text-white mb-2 tracking-wider">
            BOTTAMEDI
            </h3>
            <p className="text-sm">
            {t('footer.proprietor', 'Frutta e Verdura di Pierluigi Bottamedi.')} 
            </p>
            <p className="text-xs mt-1">
            &copy; {currentYear} {t('footer.rights', 'Tutti i diritti riservati.')} | P.IVA 02273530226
            </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10 text-sm text-center md:text-left">
          <div>
            <h4 className="font-semibold text-gray-200 mb-2 uppercase tracking-wider text-base">{t('footer.banchettoTitle', 'Banchetto (Dettaglio)')}</h4>
            <p className="flex items-center justify-center md:justify-start mb-1">
              <MapPinIcon className="h-4 w-4 mr-2 text-brand-green-light flex-shrink-0" />
              {t('footer.banchettoAddress', 'Via Cavalleggeri Udine, Mezzolombardo (TN)')}
            </p>
            <a href="tel:+393515776198" className="hover:text-brand-green-light flex items-center justify-center md:justify-start">
              <PhoneIcon className="h-4 w-4 mr-2 text-brand-green-light flex-shrink-0" />
              {t('footer.banchettoPhone', 'Tel: 351 577 6198')}
            </a>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-200 mb-2 uppercase tracking-wider text-base">{t('footer.ingrossoTitle', 'Ingrosso (HORECA)')}</h4>
            <p className="flex items-center justify-center md:justify-start mb-1">
              <MapPinIcon className="h-4 w-4 mr-2 text-brand-green-light flex-shrink-0" />
              {t('footer.ingrossoAddress', 'Via A. de Gasperi, 47, Mezzolombardo (TN)')}
            </p>
            <a href="tel:+390461602534" className="hover:text-brand-green-light flex items-center justify-center md:justify-start">
              <PhoneIcon className="h-4 w-4 mr-2 text-brand-green-light flex-shrink-0" />
              {t('footer.ingrossoPhone', 'Tel: 0461 602534')}
            </a>
          </div>

          <div>
            <h4 className="font-semibold text-gray-200 mb-2 uppercase tracking-wider text-base">{t('footer.contactUs', 'Contattaci')}</h4>
            <a href="mailto:info@bottamedi.it" className="hover:text-brand-green-light flex items-center justify-center md:justify-start mb-2">
              <MailIcon className="h-4 w-4 mr-2 text-brand-green-light flex-shrink-0" />
              info@bottamedi.it
            </a>
            <div className="flex justify-center md:justify-start space-x-5">
              <a href="https://www.facebook.com/profile.php?id=100063456281899" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-gray-400 hover:text-brand-green-light transition-colors">
                <FacebookIcon className="h-5 w-5" />
              </a>
              <a href="https://instagram.com/banchetto.bottamedi" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-gray-400 hover:text-brand-green-light transition-colors">
                <InstagramIcon className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
        <p className="text-xs text-gray-500 text-center border-t border-gray-700 pt-6 mt-6">
          {t('footer.credits', 'Sito web realizzato con passione.')}
        </p>
      </div>
    </footer>
  );
};

export default Footer;