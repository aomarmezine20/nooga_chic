export interface Product {
  id: string;
  name: {
    fr: string;
    en: string;
    ar: string;
  };
  description: {
    fr: string;
    en: string;
    ar: string;
  };
  price: number;
  discountPrice?: number;
  images: string[];
  category: 'heels' | 'bags';
  sizes?: number[];
  stock?: Record<number, number>;
  featured?: boolean;
  isNew?: boolean;
  isHot?: boolean;
  isPromo?: boolean;
}

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: {
      fr: 'Talons Dorés Élégants',
      en: 'Elegant Gold Heels',
      ar: 'حذاء كعب عالي ذهبي أنيق'
    },
    description: {
      fr: 'Une paire de talons dorés minimalistes, parfaits pour vos soirées chic.',
      en: 'Minimalist gold heels, perfect for your chic evenings.',
      ar: 'حذاء بكعب ذهبي بسيط، مثالي لسهراتك الأنيقة.'
    },
    price: 450,
    images: ['/images/gold_heels.png'],
    category: 'heels',
    sizes: [36, 37, 38, 39, 40],
    stock: { 36: 5, 37: 10, 38: 0, 39: 2, 40: 1 },
    featured: true,
    isNew: true
  },
  {
    id: '2',
    name: {
      fr: 'Sac à Main Chic Beige',
      en: 'Chic Beige Handbag',
      ar: 'حقيبة يد بيج أنيقة'
    },
    description: {
      fr: 'Sac à main structuré en cuir beige, idéal pour le quotidien.',
      en: 'Structured beige leather handbag, ideal for daily use.',
      ar: 'حقيبة يد بيج منظمة، مثالية للاستخدام اليومي.'
    },
    price: 380,
    discountPrice: 299,
    images: ['/images/bags_cat.png'],
    category: 'bags',
    featured: true,
    isPromo: true
  },
  {
    id: '3',
    name: {
      fr: 'Talons Stiletto Beige',
      en: 'Beige Stiletto Heels',
      ar: 'حذاء كعب عالي ستيلتو بيج'
    },
    description: {
      fr: 'Talons stiletto classiques, confortables et élégants.',
      en: 'Classic stiletto heels, comfortable and elegant.',
      ar: 'حذاء ستيلتو كلاسيكي، مريح وأنيق.'
    },
    price: 420,
    images: ['/images/heels_cat.png'],
    category: 'heels',
    sizes: [36, 37, 38, 39, 40, 41],
    featured: false,
    isHot: true
  },
  {
    id: '4',
    name: {
      fr: 'Sac Noir Minimal',
      en: 'Minimal Black Bag',
      ar: 'حقيبة سوداء بسيطة'
    },
    description: {
      fr: 'Petit sac noir minimaliste, la touche finale parfaite.',
      en: 'Small minimalist black bag, the perfect final touch.',
      ar: 'حقيبة سوداء صغيرة بسيطة، اللمسة النهائية المثالية.'
    },
    price: 320,
    images: ['/images/bags_cat.png'],
    category: 'bags',
    featured: true
  },
];
