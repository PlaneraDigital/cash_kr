import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import Device from '../models/Device.js';

const commonFunctionalDeductions = {
  keyboard: 7,
  cdDrive: 7,
  trackpad: 18,
  battery: 6,
  speakers: 3,
  wifi: 5,
  ports: 8,
  webcam: 6,
  charging: 8,
  hardDisk: 10,
  motherboard: 35,
  bluetooth: 6,
};

const commonScreenDeductions = {
  screenCracked: 18,
  lineDiscolour: 18,
};

const commonBodyDeductions = {
  minorDentTop: 8,
  minorDentBase: 8,
  majorDentTop: 35,
  majorDentBase: 40,
  minorScratch: 5,
  majorScratch: 8,
};

const ageMultipliers = {
  lessThan3: 1.0, threeToEleven: 0.88, aboveEleven: 0.75,
  lessThan1: 0.92, oneToTwo: 0.78, twoToThree: 0.62,
  threeToFour: 0.48, fourToFive: 0.36, moreThan5: 0.22,
};

const screenMultipliers = {
  noIssue: 1.0, minorScratch: 0.96, deadPixels: 0.82,
  crackedWorks: 0.68, crackedBroken: 0.45,
};

const conditionMultipliers = { likenew: 1.0, good: 0.88, fair: 0.72, poor: 0.50 };

const accessoriesBonus = { bill: 300, box: 500, charger: 800, withBoxAndCharger: 800, originalCharger: 500, thirdPartyCharger: 200, none: 0 };

function mkDevice({ brand, modelName, slug, processorFamily, generation, tier, variants, gpuType, isGaming }) {
  return {
    category: 'laptop',
    brand,
    modelName,
    slug,
    imageUrl: '',
    processorFamily: processorFamily || '',
    generation: generation || '',
    gpuType: gpuType || '',
    isGamingLaptop: !!isGaming,
    tier: tier || 'Mid-range',
    variants: variants.map(v => ({
      processor: v.processor || processorFamily || '',
      generation: v.generation || generation || '',
      ram: v.ram || '',
      storage: v.storage || '',
      storageType: v.storage?.includes('HDD') ? 'HDD' : 'SSD',
      basePrice: v.basePrice,
    })),
    conditionMultipliers,
    ageMultipliers,
    screenMultipliers,
    functionalDeductions: commonFunctionalDeductions,
    screenDeductions: commonScreenDeductions,
    bodyDeductions: commonBodyDeductions,
    accessoriesBonus,
    isActive: true,
  };
}

const devices = [
  // ══════════════════════════════════════════════════════
  //  MSI — All Series
  // ══════════════════════════════════════════════════════
  mkDevice({
    brand: 'MSI', modelName: 'GL Series', slug: 'msi-gl-series',
    processorFamily: 'Intel Core i7', generation: '10th Gen', tier: 'Gaming',
    gpuType: 'NVIDIA GTX 1660 Ti', isGaming: true,
    variants: [
      { processor: 'Intel Core i5', generation: '10th Gen', ram: '8GB', storage: '512GB SSD', basePrice: 23690 },
      { processor: 'Intel Core i5', generation: '10th Gen', ram: '16GB', storage: '512GB SSD', basePrice: 27243 },
      { processor: 'Intel Core i7', generation: '10th Gen', ram: '16GB', storage: '512GB SSD', basePrice: 30797 },
      { processor: 'Intel Core i7', generation: '10th Gen', ram: '16GB', storage: '1TB SSD', basePrice: 35535 },
      { processor: 'Intel Core i7', generation: '10th Gen', ram: '32GB', storage: '1TB SSD', basePrice: 41457 }
    ],
  }),
  mkDevice({
    brand: 'MSI', modelName: 'GF Series', slug: 'msi-gf-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Gaming',
    gpuType: 'NVIDIA GTX 1650', isGaming: true,
    variants: [
      { processor: 'Intel Core i5', generation: '10th Gen', ram: '8GB', storage: '512GB SSD', basePrice: 20820 },
      { processor: 'Intel Core i5', generation: '10th Gen', ram: '16GB', storage: '512GB SSD', basePrice: 23942 },
      { processor: 'Intel Core i5', generation: '10th Gen', ram: '16GB', storage: '512GB SSD', basePrice: 27066 },
      { processor: 'Intel Core i5', generation: '10th Gen', ram: '16GB', storage: '1TB SSD', basePrice: 31230 },
      { processor: 'Intel Core i5', generation: '10th Gen', ram: '32GB', storage: '1TB SSD', basePrice: 36435 }
    ],
  }),
  mkDevice({
    brand: 'MSI', modelName: 'Modern Series', slug: 'msi-modern-series',
    processorFamily: 'Intel Core i5', generation: '11th Gen', tier: 'Mid-range',
    variants: [
      { ram: '8GB', storage: '256GB SSD', basePrice: 21730 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 24337 },
      { ram: '16GB', storage: '512GB SSD', basePrice: 27162 }
    ],
  }),
  mkDevice({
    brand: 'MSI', modelName: 'GP Leopard Series', slug: 'msi-gp-leopard-series',
    processorFamily: 'Intel Core i7', generation: '10th Gen', tier: 'Gaming',
    gpuType: 'NVIDIA RTX 2060', isGaming: true,
    variants: [
      { processor: 'Intel Core i5', generation: '10th Gen', ram: '8GB', storage: '512GB SSD', basePrice: 23690 },
      { processor: 'Intel Core i5', generation: '10th Gen', ram: '16GB', storage: '512GB SSD', basePrice: 27243 },
      { processor: 'Intel Core i7', generation: '10th Gen', ram: '16GB', storage: '512GB SSD', basePrice: 30797 },
      { processor: 'Intel Core i7', generation: '10th Gen', ram: '16GB', storage: '1TB SSD', basePrice: 35535 },
      { processor: 'Intel Core i7', generation: '10th Gen', ram: '32GB', storage: '1TB SSD', basePrice: 41457 }
    ],
  }),
  mkDevice({
    brand: 'MSI', modelName: 'GE Raider Series', slug: 'msi-ge-raider-series',
    processorFamily: 'Intel Core i9', generation: '11th Gen', tier: 'Gaming',
    gpuType: 'NVIDIA RTX 3080', isGaming: true,
    variants: [
      { processor: 'Intel Core i5', generation: '11th Gen', ram: '8GB', storage: '512GB SSD', basePrice: 24660 },
      { processor: 'Intel Core i5', generation: '11th Gen', ram: '16GB', storage: '512GB SSD', basePrice: 28358 },
      { processor: 'Intel Core i9', generation: '11th Gen', ram: '16GB', storage: '512GB SSD', basePrice: 32058 },
      { processor: 'Intel Core i9', generation: '11th Gen', ram: '16GB', storage: '1TB SSD', basePrice: 36990 },
      { processor: 'Intel Core i9', generation: '11th Gen', ram: '32GB', storage: '1TB SSD', basePrice: 43155 }
    ],
  }),
  mkDevice({
    brand: 'MSI', modelName: 'Prestige Series', slug: 'msi-prestige-series',
    processorFamily: 'Intel Core i9', generation: '11th Gen', tier: 'Mid-range',
    gpuType: 'NVIDIA RTX 3080', isGaming: true,
    variants: [
      { processor: 'Intel Core i5', generation: '11th Gen', ram: '8GB', storage: '512GB SSD', basePrice: 21730 },
      { processor: 'Intel Core i5', generation: '11th Gen', ram: '16GB', storage: '512GB SSD', basePrice: 24989 },
      { processor: 'Intel Core i9', generation: '11th Gen', ram: '16GB', storage: '512GB SSD', basePrice: 28249 },
      { processor: 'Intel Core i9', generation: '11th Gen', ram: '16GB', storage: '1TB SSD', basePrice: 32595 },
      { processor: 'Intel Core i9', generation: '11th Gen', ram: '32GB', storage: '1TB SSD', basePrice: 38027 }
    ],
  }),
  mkDevice({
    brand: 'MSI', modelName: 'GS Steath Series', slug: 'msi-gs-steath-series',
    processorFamily: 'Intel Core i7', generation: '11th Gen', tier: 'Gaming',
    gpuType: 'NVIDIA RTX 3060', isGaming: true,
    variants: [
      { processor: 'Intel Core i5', generation: '11th Gen', ram: '8GB', storage: '512GB SSD', basePrice: 20820 },
      { processor: 'Intel Core i5', generation: '11th Gen', ram: '16GB', storage: '512GB SSD', basePrice: 23942 },
      { processor: 'Intel Core i7', generation: '11th Gen', ram: '16GB', storage: '512GB SSD', basePrice: 27066 },
      { processor: 'Intel Core i7', generation: '11th Gen', ram: '16GB', storage: '1TB SSD', basePrice: 31230 },
      { processor: 'Intel Core i7', generation: '11th Gen', ram: '32GB', storage: '1TB SSD', basePrice: 36435 }
    ],
  }),
  mkDevice({
    brand: 'MSI', modelName: 'GT Titan Series', slug: 'msi-gt-titan-series',
    processorFamily: 'Intel Core i9', generation: '9th Gen', tier: 'Gaming',
    gpuType: 'NVIDIA RTX 2080', isGaming: true,
    variants: [
      { processor: 'Intel Core i5', generation: '9th Gen', ram: '8GB', storage: '512GB SSD', basePrice: 20820 },
      { processor: 'Intel Core i5', generation: '9th Gen', ram: '16GB', storage: '512GB SSD', basePrice: 23942 },
      { processor: 'Intel Core i9', generation: '9th Gen', ram: '16GB', storage: '512GB SSD', basePrice: 27066 },
      { processor: 'Intel Core i9', generation: '9th Gen', ram: '16GB', storage: '1TB SSD', basePrice: 31230 },
      { processor: 'Intel Core i9', generation: '9th Gen', ram: '32GB', storage: '1TB SSD', basePrice: 36435 }
    ],
  }),
  mkDevice({
    brand: 'MSI', modelName: 'Alpha Series', slug: 'msi-alpha-series',
    processorFamily: 'AMD Ryzen 7', generation: '3000 Series', tier: 'Gaming',
    gpuType: 'AMD Radeon RX 5600M', isGaming: true,
    variants: [
      { processor: 'AMD Ryzen 5', generation: '3000 Series', ram: '8GB', storage: '512GB SSD', basePrice: 17250 },
      { processor: 'AMD Ryzen 5', generation: '3000 Series', ram: '16GB', storage: '512GB SSD', basePrice: 19837 },
      { processor: 'AMD Ryzen 7', generation: '3000 Series', ram: '16GB', storage: '512GB SSD', basePrice: 22425 },
      { processor: 'AMD Ryzen 7', generation: '3000 Series', ram: '16GB', storage: '1TB SSD', basePrice: 25875 },
      { processor: 'AMD Ryzen 7', generation: '3000 Series', ram: '32GB', storage: '1TB SSD', basePrice: 30187 }
    ],
  }),
  mkDevice({
    brand: 'MSI', modelName: 'Creator Series', slug: 'msi-creator-series',
    processorFamily: 'Intel Core i7', generation: '11th Gen', tier: 'Mid-range',
    variants: [
      { ram: '8GB', storage: '256GB SSD', basePrice: 19970 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 22366 },
      { ram: '16GB', storage: '512GB SSD', basePrice: 24962 }
    ],
  }),
  mkDevice({
    brand: 'MSI', modelName: 'WP Series', slug: 'msi-wp-series',
    processorFamily: 'Intel Core i7', generation: '10th Gen', tier: 'Budget',
    variants: [
      { ram: '4GB', storage: '256GB SSD', basePrice: 8950 },
      { ram: '8GB', storage: '256GB SSD', basePrice: 10292 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 11635 }
    ],
  }),
  mkDevice({
    brand: 'MSI', modelName: 'Delta Series', slug: 'msi-delta-series',
    processorFamily: 'AMD Ryzen 9', generation: '5000 Series', tier: 'Gaming',
    gpuType: 'AMD Radeon RX 6700M', isGaming: true,
    variants: [
      { processor: 'AMD Ryzen 5', generation: '5000 Series', ram: '8GB', storage: '512GB SSD', basePrice: 17950 },
      { processor: 'AMD Ryzen 5', generation: '5000 Series', ram: '16GB', storage: '512GB SSD', basePrice: 20642 },
      { processor: 'AMD Ryzen 9', generation: '5000 Series', ram: '16GB', storage: '512GB SSD', basePrice: 23335 },
      { processor: 'AMD Ryzen 9', generation: '5000 Series', ram: '16GB', storage: '1TB SSD', basePrice: 26925 },
      { processor: 'AMD Ryzen 9', generation: '5000 Series', ram: '32GB', storage: '1TB SSD', basePrice: 31412 }
    ],
  }),
  mkDevice({
    brand: 'MSI', modelName: 'WT Series', slug: 'msi-wt-series',
    processorFamily: 'Intel Core i7', generation: '10th Gen', tier: 'Budget',
    variants: [
      { ram: '4GB', storage: '256GB SSD', basePrice: 8950 },
      { ram: '8GB', storage: '256GB SSD', basePrice: 10292 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 11635 }
    ],
  }),
  mkDevice({
    brand: 'MSI', modelName: 'WS Series', slug: 'msi-ws-series',
    processorFamily: 'Intel Core i7', generation: '10th Gen', tier: 'Budget',
    variants: [
      { ram: '4GB', storage: '256GB SSD', basePrice: 8950 },
      { ram: '8GB', storage: '256GB SSD', basePrice: 10292 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 11635 }
    ],
  }),
  mkDevice({
    brand: 'MSI', modelName: 'WF Series', slug: 'msi-wf-series',
    processorFamily: 'Intel Core i7', generation: '10th Gen', tier: 'Budget',
    variants: [
      { ram: '4GB', storage: '256GB SSD', basePrice: 8950 },
      { ram: '8GB', storage: '256GB SSD', basePrice: 10292 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 11635 }
    ],
  }),
  mkDevice({
    brand: 'MSI', modelName: 'WE Series', slug: 'msi-we-series',
    processorFamily: 'Intel Core i7', generation: '10th Gen', tier: 'Budget',
    variants: [
      { ram: '4GB', storage: '256GB SSD', basePrice: 8950 },
      { ram: '8GB', storage: '256GB SSD', basePrice: 10292 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 11635 }
    ],
  }),
  mkDevice({
    brand: 'MSI', modelName: 'Bravo Series', slug: 'msi-bravo-series',
    processorFamily: 'AMD Ryzen 7', generation: '5000 Series', tier: 'Gaming',
    gpuType: 'AMD Radeon RX 5500M', isGaming: true,
    variants: [
      { processor: 'AMD Ryzen 5', generation: '5000 Series', ram: '8GB', storage: '512GB SSD', basePrice: 17950 },
      { processor: 'AMD Ryzen 5', generation: '5000 Series', ram: '16GB', storage: '512GB SSD', basePrice: 20642 },
      { processor: 'AMD Ryzen 7', generation: '5000 Series', ram: '16GB', storage: '512GB SSD', basePrice: 23335 },
      { processor: 'AMD Ryzen 7', generation: '5000 Series', ram: '16GB', storage: '1TB SSD', basePrice: 26925 },
      { processor: 'AMD Ryzen 7', generation: '5000 Series', ram: '32GB', storage: '1TB SSD', basePrice: 31412 }
    ],
  }),
  mkDevice({
    brand: 'MSI', modelName: 'Summit Series', slug: 'msi-summit-series',
    processorFamily: 'Intel Core i7', generation: '11th Gen', tier: 'Mid-range',
    variants: [
      { ram: '8GB', storage: '256GB SSD', basePrice: 27130 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 30385 },
      { ram: '16GB', storage: '512GB SSD', basePrice: 33912 }
    ],
  }),
  mkDevice({
    brand: 'Avita', modelName: 'Essential Series', slug: 'avita-essential-series',
    processorFamily: 'AMD Ryzen 3', generation: '3000 Series', tier: 'Budget',
    variants: [
      { ram: '4GB', storage: '256GB SSD', basePrice: 3520 },
      { ram: '8GB', storage: '256GB SSD', basePrice: 4047 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 4576 }
    ],
  }),
  mkDevice({
    brand: 'Avita', modelName: 'Liber Series', slug: 'avita-liber-series',
    processorFamily: 'AMD Ryzen 3', generation: '3000 Series', tier: 'Budget',
    variants: [
      { ram: '4GB', storage: '256GB SSD', basePrice: 8130 },
      { ram: '8GB', storage: '256GB SSD', basePrice: 9349 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 10569 }
    ],
  }),
  mkDevice({
    brand: 'Avita', modelName: 'Pura Series', slug: 'avita-pura-series',
    processorFamily: 'AMD Ryzen 3', generation: '3000 Series', tier: 'Budget',
    variants: [
      { ram: '4GB', storage: '256GB SSD', basePrice: 7360 },
      { ram: '8GB', storage: '256GB SSD', basePrice: 8464 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 9568 }
    ],
  }),
  mkDevice({
    brand: 'Avita', modelName: 'Cosmos Series', slug: 'avita-cosmos-series',
    processorFamily: 'AMD Ryzen 3', generation: '3000 Series', tier: 'Budget',
    variants: [
      { ram: '4GB', storage: '256GB SSD', basePrice: 8390 },
      { ram: '8GB', storage: '256GB SSD', basePrice: 9648 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 10907 }
    ],
  }),
  mkDevice({
    brand: 'Avita', modelName: 'Magus Lite', slug: 'avita-magus-lite',
    processorFamily: 'AMD Ryzen 3', generation: '3000 Series', tier: 'Budget',
    variants: [
      { ram: '4GB', storage: '256GB SSD', basePrice: 1870 },
      { ram: '8GB', storage: '256GB SSD', basePrice: 2150 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 2431 }
    ],
  }),
  mkDevice({
    brand: 'Avita', modelName: 'Admiror Series', slug: 'avita-admiror-series',
    processorFamily: 'AMD Ryzen 3', generation: '3000 Series', tier: 'Budget',
    variants: [
      { ram: '4GB', storage: '256GB SSD', basePrice: 10810 },
      { ram: '8GB', storage: '256GB SSD', basePrice: 12431 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 14053 }
    ],
  }),
];


async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');
    await Device.deleteMany({ category: 'laptop', brand: 'MSI' });
    console.log('Cleared existing MSI laptop devices');
    await Device.insertMany(devices);
    console.log(`✅ Seeded ${devices.length} MSI laptop devices successfully`);
    process.exit(0);
  } catch (err) {
    console.error('❌ Seed failed:', err.message);
    process.exit(1);
  }
}

seed();