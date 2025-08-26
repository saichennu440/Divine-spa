// src/data/servicesData.ts
// Auto-generated TypeScript data module (images added for every item)

export type ServiceItem = {
  name: string;
  duration: string;     // kept as string (e.g. "60")
  price: string;        // price string with currency symbol
  description?: string;
  features?: string[];
  image?: string;
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
        duration: '90',
        price: '₹5300',
        description: 'Aroma Signature Therapy',
        image: 'https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg'
      },
      {
        name: 'Signature Therapy',
        duration: '120',
        price: '₹6000',
        description: 'Aroma Signature Therapy',
        image: 'https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg'
      },
       {
        name: 'Tandem (Four Hands) Therapy',
        duration: '60',
        price: '₹5300',
        description: 'Tandem (Four Hands) Therapy',
        image: 'https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg'
      },
            {
        name: 'Tandem (Four Hands) Therapy',
        duration: '90',
        price: '₹6000',
        description: 'Tandem (Four Hands) Therapy',
        image: 'https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg'
      },
      {
        name: 'Herbal Potli Therapy',
        duration: '60',
        price: '₹4100',
        description: 'Herbal Potli Therapy',
        image: 'https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg'
      },
           {
        name: 'Herbal Potli Therapy',
        duration: '90',
        price: '₹5300',
        description: 'Herbal Potli Therapy',
        image: 'https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg'
      },
      {
        name: 'Hot Stone Therapy',
        duration: '60',
        price: '₹4100',
        description: 'Herbal Potli Therapy',
        image: 'https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg'
      },

      {
        name: 'Hot Stone Therapy',
        duration: '90',
        price: '₹5300',
        description: 'Herbal Potli Therapy',
        image: 'https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg'
      }
    ],
    'classic-therapies': [
      {
        name: 'Classic Swedish Therapy',
        duration: '60',
        price: '₹2800',
        description: 'Classic Swedish Therapy',
        image: 'https://images.pexels.com/photos/3997991/pexels-photo-3997991.jpeg'
      },
                  {
        name: 'Classic Swedish Therapy',
        duration: '90',
        price: '₹3800',
        description: 'Classic Swedish Therapy',
        image: 'https://images.pexels.com/photos/3997991/pexels-photo-3997991.jpeg'
      },
                  {
        name: 'Classic Swedish Therapy',
        duration: '120',
        price: '₹4500',
        description: 'Classic Swedish Therapy',
        image: 'https://images.pexels.com/photos/3997991/pexels-photo-3997991.jpeg'
      },
      {
        name: 'Aromatic Therapy',
        duration: '60',
        price: '₹3000',
        description: 'Aromatic Therapy',
        image: 'https://images.pexels.com/photos/3997991/pexels-photo-3997991.jpeg'
      },
            {
        name: 'Aromatic Therapy',
        duration: '90',
        price: '₹4300',
        description: 'Aromatic Therapy',
        image: 'https://images.pexels.com/photos/3997991/pexels-photo-3997991.jpeg'
      },
            {
        name: 'Aromatic Therapy',
        duration: '120',
        price: '₹5300',
        description: 'Aromatic Therapy',
        image: 'https://images.pexels.com/photos/3997991/pexels-photo-3997991.jpeg'
      },
      {
        name: 'Deep Tissue Therapy',
        duration: '60',
        price: '₹3600',
        description: 'Deep Tissue Therapy',
        image: 'https://images.pexels.com/photos/3997991/pexels-photo-3997991.jpeg'
      },
           {
        name: 'Deep Tissue Therapy',
        duration: '90',
        price: '₹4800',
        description: 'Deep Tissue Therapy',
        image: 'https://images.pexels.com/photos/3997991/pexels-photo-3997991.jpeg'
      },
            {
        name: 'Deep Tissue Therapy',
        duration: '120',
        price: '₹5800',
        description: 'Deep Tissue Therapy',
        image: 'https://images.pexels.com/photos/3997991/pexels-photo-3997991.jpeg'
      },
      {
        name: 'Balinese Therapy',
        duration: '60',
        price: '₹3600',
        description: 'Balinese Therapy',
        image: 'https://images.pexels.com/photos/3997991/pexels-photo-3997991.jpeg'
      },
            {
        name: 'Balinese Therapy',
        duration: '90',
        price: '₹4800',
        description: 'Balinese Therapy',
        image: 'https://images.pexels.com/photos/3997991/pexels-photo-3997991.jpeg'
      },
       {
        name: 'Balinese Therapy',
        duration: '120',
        price: '₹5800',
        description: 'Balinese Therapy',
        image: 'https://images.pexels.com/photos/3997991/pexels-photo-3997991.jpeg'
      },
      {
        name: 'Dry Thai Therapy',
        duration: '60',
        price: '₹3600',
        description: 'Dry Thai Therapy',
        image: 'https://images.pexels.com/photos/3997991/pexels-photo-3997991.jpeg'
      },

      {
        name: 'Dry Thai Therapy',
        duration: '90',
        price: '₹3900',
        description: 'Dry Thai Therapy',
        image: 'https://images.pexels.com/photos/3997991/pexels-photo-3997991.jpeg'
      },

      {
        name: 'Dry Thai Therapy',
        duration: '120',
        price: '₹4800',
        description: 'Dry Thai Therapy',
        image: 'https://images.pexels.com/photos/3997991/pexels-photo-3997991.jpeg'
      }
    ],
    'targeted-therapies': [
      {
        name: 'Foot Reflexology',
        duration: '30',
        price: '₹1000',
        description: 'Foot Reflexology',
        image: 'https://images.pexels.com/photos/3985329/pexels-photo-3985329.jpeg'
      },
       {
        name: 'Back (without shower)',
        duration: '30',
        price: '₹1700',
        description: 'Foot Reflexology',
        image: 'https://images.pexels.com/photos/3985329/pexels-photo-3985329.jpeg'
      },
       {
        name: 'Head Neck & Shoulder',
        duration: '30',
        price: '₹1200',
        description: 'Foot Reflexology',
        image: 'https://images.pexels.com/photos/3985329/pexels-photo-3985329.jpeg'
      },
    ]
  },

  facials: {
    'classic-facials': [
      {
        name: 'Clean-up (Watermelon / Strawberry)',
        duration: '30',
        price: '₹1200',
        description: 'Clean-up (Watermelon / Strawberry)',
        image: 'https://images.pexels.com/photos/3985360/pexels-photo-3985360.jpeg'
      },
      {
        name: 'Hydra Dew (Dry & Dehydrated)',
        duration: '60',
        price: '₹1500',
        description: 'Hydra Dew (Dry & Dehydrated)',
        image: 'https://images.pexels.com/photos/3985360/pexels-photo-3985360.jpeg'
      },
      {
        name: 'Rejuvenating (All skin types)',
        duration: '60',
        price: '₹1700',
        description: 'Rejuvenating (All skin types)',
        image: 'https://images.pexels.com/photos/3985360/pexels-photo-3985360.jpeg'
      },
         {
        name: 'Herbal Pearl',
        duration: '60',
        price: '₹2700',
        description: 'Herbal Pearl',
        image: 'https://images.pexels.com/photos/3985329/pexels-photo-3985329.jpeg'
      }
    ],
    'premium-facials': [
      {
        name: 'Deep Pore Cleansing (Oily Skin)',
        duration: '60',
        price: '₹3100',
        description: 'Deep Pore Cleansing (Oily Skin)',
        image: 'https://images.pexels.com/photos/3985329/pexels-photo-3985329.jpeg'
      },
      {
        name: 'Whitening Facial (Dull & Uneven)',
        duration: '60',
        price: '₹3300',
        description: 'Whitening Facial (Dull & Uneven)',
        image: 'https://images.pexels.com/photos/3985329/pexels-photo-3985329.jpeg'
      },
      {
        name: 'Herbal Gold (Signature)',
        duration: '60',
        price: '₹4500',
        description: 'Herbal Gold (Signature)',
        image: 'https://images.pexels.com/photos/3985329/pexels-photo-3985329.jpeg'
      }
    ]
  },

  'full-body-polishing': {
    'full-body-polishing': [
      {
        name: 'Scrub (with shower)',
        duration: '60',
        price: '₹2800',
        description: 'Scrub with shower',
        image: 'https://images.pexels.com/photos/3997991/pexels-photo-3997991.jpeg'
      },
      {
        name: 'Black Currant Polish (Dry Skin)',
        duration: '60',
        price: '₹4500',
        description: 'Black Currant Polish (Dry Skin)',
        image: 'https://images.pexels.com/photos/3997991/pexels-photo-3997991.jpeg'
      },
      {
        name: 'Chocolate (Brightening & Nourishing)',
        duration: '60',
        price: '₹4500',
        description: 'Chocolate Polish (Brightening)',
        image: 'https://images.pexels.com/photos/3997991/pexels-photo-3997991.jpeg'
      },
      {
        name: 'Orange (De-Tan)',
        duration: '60',
        price: '₹4500',
        description: 'Orange (De-Tan)',
        image: 'https://images.pexels.com/photos/3997991/pexels-photo-3997991.jpeg'
      }
    ]
  },

  'foot-pedicure': {
    'foot-pedicure': [
      
       {
        name: 'Classic Pedicure (Watermelon & Litchi)',
        duration: '60',
        price: '₹1200',
        description: 'Classic Pedicure (Watermelon & Litchi)',
        image: 'https://images.pexels.com/photos/3985360/pexels-photo-3985360.jpeg'
      },
      {
        name: 'Anti-Oxidant Pedicure (Orange & Chocolate)',
        duration: '60',
        price: '₹1200',
        description: 'Anti-Oxidant Pedicure (Orange & Chocolate)',
        image: 'https://images.pexels.com/photos/3985360/pexels-photo-3985360.jpeg'
      },
      {
        name: 'Moisturising Exotic Pedicure (Kiwi & Strawberry)',
        duration: '60',
        price: '₹1400',
        description: 'Moisturising Exotic Pedicure (Kiwi & Strawberry)',
        image: 'https://images.pexels.com/photos/3985360/pexels-photo-3985360.jpeg'
      },
      {
        name: 'Brightening & De-Tan Pedicure',
        duration: '60',
        price: '₹1700',
        description: 'Brightening & De-Tan Pedicure',
        image: 'https://images.pexels.com/photos/3985360/pexels-photo-3985360.jpeg'
      },
      {
        name: 'De-Stress Refreshment (Cucumber & Peppermint)',
        duration: '60',
        price: '₹1500',
        description: 'Refreshment & De-stress ',
        image: 'https://images.pexels.com/photos/3985360/pexels-photo-3985360.jpeg'
      }
      
    ]
  }
};

export default servicesData;
