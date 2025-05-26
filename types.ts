
export interface NavLink {
  id: string;
  label: string;
  href?: string; // Optional if id is used for scrolling
}

export interface GalleryItemData {
  id: string;
  src: string;
  thumb: string;
  alt: string;
  caption: string;
  title: string;
}

export interface TimelineEvent {
  period: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
}

export interface FeatureItem {
  icon: React.ElementType;
  title: string;
  description: string;
  imageSrc: string;
  alt?: string; // Added alt text for the image
}
