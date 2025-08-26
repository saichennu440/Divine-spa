// src/data/servicesData.ts
// Full typed services data (all items converted to `variants` per service).
// This file was generated from the data you provided — every service entry from your last paste is included.

export type Variant = {
  duration: string; // minutes as string, e.g. "60"
  price: string;    // price string including currency symbol, e.g. "₹2,800"
};

export type ServiceItem = {
  name: string;
  description?: string;
  features?: string[];
  image?: string;
  variants?: Variant[]; // one or more duration/price options
};

export interface ServicesData {
  therapies: {
    'signature-therapies': ServiceItem[];
    'classic-therapies': ServiceItem[];
    'targeted-therapies': ServiceItem[];
  };
  facials: {
    'classic-facials': ServiceItem[];
    'premium-facials': ServiceItem[];
  };
  'full-body-polishing': {
    'full-body-polishing': ServiceItem[];
  };
  'foot-pedicure': {
    'foot-pedicure': ServiceItem[];
  };
}

const servicesData: ServicesData = {
  therapies: {
    'signature-therapies': [
      {
        name: 'Signature Therapy',
        description: 'Our Signature Therapy is the ultimate indulgence, a harmonious fusion of traditional and contemporary techniques designed for complete relaxation and renewal. Every detail, from the choice of oils to the rhythm of touch, is designed for a journey of exquisite relaxation.',
        image: 'https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg',
        variants: [
          { duration: '90', price: '₹5300' },
          { duration: '120', price: '₹6000' }
        ]
      },
      {
        name: 'Tandem (Four Hands) Therapy',
        description: 'Indulge in the pinnacle of relaxation as two expert therapists move in perfect synchrony, melting tension, enhancing circulation, and delivering an unparalleled sense of serenity. Every stroke is harmonized to soothe both body and mind, where time seems to pause, and every sense is delighted.',
        image: 'https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg',
        variants: [
          { duration: '60', price: '₹5300' },
          { duration: '90', price: '₹6000' }
        ]
      },
      {
        name: 'Herbal Potli Therapy',
        description: 'A warm, soothing therapy using herbal poultices infused with medicinal herbs glide over your body, melting tension, uplifting the senses, and infusing your skin with nature’s restorative essence',
        image: 'https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg',
        variants: [
          { duration: '60', price: '₹4100' },
          { duration: '90', price: '₹5300' }
        ]
      },
      {
        name: 'Hot Stone Therapy',
        description: 'Smooth, heated stones meet skilled hands to glide over your body, penetrating deep into tired muscles. This therapy warms your muscles from within, releasing deep-seated stress and and tension while restoring deep inner harmony.',
        image: '/FootSpa_images/Hot_Stone_Foot_Treatment.jpg',
        variants: [
          { duration: '60', price: '₹4100' },
          { duration: '90', price: '₹5300' }
        ]
      }
    ],

    'classic-therapies': [
      {
        name: 'Swedish Therapy',
        description:
          'Our Swedish Therapy is a timeless European technique that moves like a slow, soothing current across the body - long gliding strokes to melt tension, stimulate lymphatic flow, and refresh the senses.',
        image: 'https://images.pexels.com/photos/3997991/pexels-photo-3997991.jpeg',
        variants: [
          { duration: '60', price: '₹2800' },
          { duration: '90', price: '₹3800' },
          { duration: '120', price: '₹4500' }
        ]
      },
      {
        name: 'Aromatic Therapy',
        description: 'A sensory journey that combines expert massage techniques with pure essential oils. This indulgent experience calms the mind, nurtures the body, and restores emotional balance. Breathe deep while our therapists deliver sumptuous strokes that relax body and mind.',
        image: '/FootSpa_images/Aromatherapy_Foot_Massage.jpg',
        variants: [
          { duration: '60', price: '₹3000' },
          { duration: '90', price: '₹4300' },
          { duration: '120', price: '₹5300' }
        ]
      },
      {
        name: 'Deep Tissue Therapy',
        description: 'A therapeutic massage that targets deep layers of muscle and connective tissue. This therapy renews your body from within, restoring flexibility, improving posture, and delivering unmatched comfort long after the session ends.',
        image: 'https://images.pexels.com/photos/3997991/pexels-photo-3997991.jpeg',
        variants: [
          { duration: '60', price: '₹3600' },
          { duration: '90', price: '₹4800' },
          { duration: '120', price: '₹5800' }
        ]
      },
      {
        name: 'Balinese Therapy',
        description: 'Experience the time-honoured secrets of Balinese therapy, a traditional Indonesian healing with exotic fusion of acupressure, gentle stretches, and rhythmic movements that bring balance and serenity to both body and soul - straight from the healing traditions of Bali.',
        image: 'https://images.pexels.com/photos/3997991/pexels-photo-3997991.jpeg',
        variants: [
          { duration: '60', price: '₹3600' },
          { duration: '90', price: '₹4800' },
          { duration: '120', price: '₹5800' }
        ]
      },
      {
        name: 'Dry Thai Therapy',
        description: 'This ancient therapy uses a fusion of deep pressure points and assisted stretches. Our expert therapists guide your body to improve circulation, relieve stiffness, and recharge your vital energy—without the use of oils.',
        image: 'https://images.pexels.com/photos/3997991/pexels-photo-3997991.jpeg',
        variants: [
          { duration: '60', price: '₹3600' },
          { duration: '90', price: '₹3900' },
          { duration: '120', price: '₹4800' }
        ]
      }
    ],

    'targeted-therapies': [
      {
        name: 'Foot Reflexology',
        description: 'Calming leg & foot massage targeting reflex points to promote whole-body wellness.',
        image: '/FootSpa_images/Foot_Reflexology.jpg',
        variants: [{ duration: '30', price: '₹1000' }]
      },
      {
        name: 'Back (without shower)',
        description: 'Targeted back work to release knots and stiffness.',
        image: 'https://images.pexels.com/photos/3985329/pexels-photo-3985329.jpeg',
        variants: [{ duration: '30', price: '₹1700' }]
      },
      {
        name: 'Head, Neck & Shoulder',
        description: 'Rejuvenating head, neck and shoulder sequence to ease tension.',
        image: '/FacialTreatment_images/Neck_Shoulder_Therapy.jpg',
        variants: [{ duration: '30', price: '₹1200' }]
      }
    ]
  },

  facials: {
    'classic-facials': [
      {
        name: 'Facial Clean-up (Watermelon / Strawberry)',
        description: 'A burst of hydration/Antioxidant-rich cleanse for tired, stressed skin.',
        image: 'https://images.pexels.com/photos/3985360/pexels-photo-3985360.jpeg',
        variants: [{ duration: '30', price: '₹1200' }]
      },
      {
        name: 'Hydra Dew (Dry & Dehydrated)',
        description: 'Immerse your delicate skin in exquisite moisture, calming and protecting it with every touch',
        image: 'https://images.pexels.com/photos/3985360/pexels-photo-3985360.jpeg',
        variants: [{ duration: '60', price: '₹1500' }]
      },
      {
        name: 'Rejuvenating (All skin types)',
        description: 'Reveal your skin’s natural radiance through meticulous care that enhances texture, tone, and vitality.',
        image: 'https://images.pexels.com/photos/3985360/pexels-photo-3985360.jpeg',
        variants: [{ duration: '60', price: '₹1700' }]
      },
      {
        name: 'Herbal Pearl',
        description: 'Indulge in the healing touch of nature’s finest herbs, and reveal skin that feels renewed and luminous.',
        image: 'https://images.pexels.com/photos/3985329/pexels-photo-3985329.jpeg',
        variants: [{ duration: '60', price: '₹2700' }]
      }
    ],

    'premium-facials': [
      {
        name: 'Deep Pore Cleansing (Oily Skin)',
        description: 'An expertly crafted extract that refreshes oily skin while maintaining its natural balance. Enriched with skin-loving nutrients to smooth, nourish, and reveal a clear, radiant glow.',
        image: 'https://images.pexels.com/photos/3985329/pexels-photo-3985329.jpeg',
        variants: [{ duration: '60', price: '₹3100' }]
      },
      {
        name: 'Whitening Facial (Dull & Uneven)',
        description: 'Harness the power of advanced sun filters to reduce melanin formation, protect against UV rays, and unveil a naturally bright, balanced skin tone.',
        image: 'https://images.pexels.com/photos/3985329/pexels-photo-3985329.jpeg',
        variants: [{ duration: '60', price: '₹3300' }]
      },
      {
        name: 'Herbal Gold (Signature)',
        description: 'Nature’s touch, meticulously crafted from herbal essences, delivering visible transformation from the first touch.',
        image: 'https://images.pexels.com/photos/3985329/pexels-photo-3985329.jpeg',
        variants: [{ duration: '60', price: '₹4500' }]
      }
    ]
  },

  'full-body-polishing': {
    'full-body-polishing': [
      {
        name: 'Scrub (with shower)',
        description: 'Energize your skin with the power of Vitamin C. This vibrant polish works to lighten sun damage, boost collagen, and enhance natural luminosity—perfect for reviving dull or tanned skin into a bright, youthful glow. ',
        image: 'https://images.pexels.com/photos/3997991/pexels-photo-3997991.jpeg',
        variants: [{ duration: '60', price: '₹2800' }]
      },
      {
        name: 'Black Currant Polish (Dry Skin)',
        description: 'A sumptuous blend of black currant extracts rich in antioxidants to deeply nourish and hydrate parched skin. This luxurious polish restores elasticity, replenishes moisture, and helps slow the signs of aging—leaving your skin supple and youthful.',
        image: 'https://images.pexels.com/photos/3997991/pexels-photo-3997991.jpeg',
        variants: [{ duration: '60', price: '₹4500' }]
      },
      {
        name: 'Chocolate (Brightening & Nourishing)',
        description: 'Delight in the rich essence of cocoa as this treatment detoxifies, smoothens, and brightens your skin. Packed with antioxidants and essential minerals, it delivers deep hydration and a silky-soft finish for a radiant, healthy glow.',
        image: 'https://images.pexels.com/photos/3997991/pexels-photo-3997991.jpeg',
        variants: [{ duration: '60', price: '₹4500' }]
      },
      {
        name: 'Orange (De-Tan)',
        description: 'Energize your skin with the power of Vitamin C. This vibrant polish works to lighten sun damage, boost collagen, and enhance natural luminosity—perfect for reviving dull or tanned skin into a bright, youthful glow. ',
        image: 'https://images.pexels.com/photos/3997991/pexels-photo-3997991.jpeg',
        variants: [{ duration: '60', price: '₹4500' }]
      }
    ]
  },

  'foot-pedicure': {
    'foot-pedicure': [
      {
        name: 'Classic Pedicure (Watermelon & Litchi)',
        description: 'Delight in the sumptuous blend of fruit essences and revitalizing moisture. Each touch restores suppleness, rejuvenates your skin, and leaves behind an aura of natural vitality and freshness',
        image: 'https://images.pexels.com/photos/3985360/pexels-photo-3985360.jpeg',
        variants: [{ duration: '60', price: '₹1200' }]
      },
      {
        name: 'Anti-Oxidant Pedicure (Orange & Chocolate)',
        description: 'An indulgent foot treatment crafted to detoxify and invigorate, relieving heaviness and swelling while restoring energy and comfort to fatigued feet',
        image: 'https://images.pexels.com/photos/3985360/pexels-photo-3985360.jpeg',
        variants: [{ duration: '60', price: '₹1200' }]
      },
      {
        name: 'Moisturising Exotic Pedicure (Kiwi & Strawberry)',
        description: 'Immerse your feet in a lavish blend of strawberry and kiwi extracts. This exquisite pedicure hydrates, softens, and rejuvenates, leaving your feet velvety smooth and radiant.',
        image: '/FootSpa_images/Moisturising_Exotic_Pedicure_Kiwi_Strawberry.jpg',
        variants: [{ duration: '60', price: '₹1400' }]
      },
      {
        name: 'Brightening & De-Tan Pedicure',
        description: 'This pampering ritual, enriched with vibrant fruit extracts, gently exfoliates and detoxifies, transforming dull, tired feet into a brighter, softer, and more radiant version of themselves',
        image: '/FootSpa_images/Sports_Massage_Feet.jpg',
        variants: [{ duration: '60', price: '₹1700' }]
      },
      {
        name: 'De-Stress Refreshment (Cucumber & Peppermint)',
        description: 'Escape into a cooling haven as peppermint awakens and cucumber soothes. This detoxifying ritual releases stress, restores balance, and infuses your feet with a crisp, invigorating freshness.',
        image: 'https://images.pexels.com/photos/3985360/pexels-photo-3985360.jpeg',
        variants: [{ duration: '60', price: '₹1500' }]
      }
    ]
  }
} as ServicesData;

export default servicesData;
