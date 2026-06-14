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
  //  MICROSOFT — All Series
  // ══════════════════════════════════════════════════════
  mkDevice({
    brand: 'Microsoft', modelName: 'Surface Pro Series', slug: 'microsoft-surface-pro-series',
    processorFamily: 'Intel Core i5', generation: '11th Gen', tier: 'Budget',
    variants: [
      { ram: '4GB', storage: '256GB SSD', basePrice: 7520 },
      { ram: '8GB', storage: '256GB SSD', basePrice: 8648 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 9776 }
    ],
  }),
  mkDevice({
    brand: 'Microsoft', modelName: 'Surface Pro 4 Series', slug: 'microsoft-surface-pro-4-series',
    processorFamily: 'Intel Core i5', generation: '6th Gen', tier: 'Budget',
    variants: [
      { ram: '4GB', storage: '256GB SSD', basePrice: 12810 },
      { ram: '8GB', storage: '256GB SSD', basePrice: 14731 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 16653 }
    ],
  }),
  mkDevice({
    brand: 'Microsoft', modelName: 'Surface Series', slug: 'microsoft-surface-series',
    processorFamily: 'Intel Core i5', generation: '11th Gen', tier: 'Budget',
    variants: [
      { ram: '4GB', storage: '256GB SSD', basePrice: 4800 },
      { ram: '8GB', storage: '256GB SSD', basePrice: 5520 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 6240 }
    ],
  }),
  mkDevice({
    brand: 'Microsoft', modelName: 'Surface Book Series', slug: 'microsoft-surface-book-series',
    processorFamily: 'Intel Core i5', generation: '6th Gen', tier: 'Budget',
    variants: [
      { ram: '4GB', storage: '256GB SSD', basePrice: 12350 },
      { ram: '8GB', storage: '256GB SSD', basePrice: 14202 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 16055 }
    ],
  }),
  mkDevice({
    brand: 'Microsoft', modelName: 'Surface Pro 3 Series', slug: 'microsoft-surface-pro-3-series',
    processorFamily: 'Intel Core i5', generation: '4th Gen', tier: 'Budget',
    variants: [
      { ram: '4GB', storage: '256GB SSD', basePrice: 10270 },
      { ram: '8GB', storage: '256GB SSD', basePrice: 11810 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 13351 }
    ],
  }),
  mkDevice({
    brand: 'Microsoft', modelName: 'Surface Book 2 Series', slug: 'microsoft-surface-book-2-series',
    processorFamily: 'Intel Core i7', generation: '8th Gen', tier: 'Budget',
    variants: [
      { ram: '4GB', storage: '256GB SSD', basePrice: 14260 },
      { ram: '8GB', storage: '256GB SSD', basePrice: 16399 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 18538 }
    ],
  }),
  mkDevice({
    brand: 'Microsoft', modelName: 'Surface Go Series', slug: 'microsoft-surface-go-series',
    processorFamily: 'Intel Pentium Gold', generation: '4415Y', tier: 'Budget',
    variants: [
      { ram: '4GB', storage: '256GB SSD', basePrice: 3560 },
      { ram: '8GB', storage: '256GB SSD', basePrice: 4093 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 4628 }
    ],
  }),
  mkDevice({
    brand: 'Microsoft', modelName: 'Surface Pro 5 Series', slug: 'microsoft-surface-pro-5-series',
    processorFamily: 'Intel Core i5', generation: '7th Gen', tier: 'Budget',
    variants: [
      { ram: '4GB', storage: '256GB SSD', basePrice: 14130 },
      { ram: '8GB', storage: '256GB SSD', basePrice: 16249 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 18369 }
    ],
  }),
  mkDevice({
    brand: 'Microsoft', modelName: 'Surface Laptop 2 Series', slug: 'microsoft-surface-laptop-2-series',
    processorFamily: 'Intel Core i5', generation: '8th Gen', tier: 'Budget',
    variants: [
      { ram: '4GB', storage: '256GB SSD', basePrice: 14260 },
      { ram: '8GB', storage: '256GB SSD', basePrice: 16399 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 18538 }
    ],
  }),
  mkDevice({
    brand: 'Microsoft', modelName: 'Surface Pro 2 Series', slug: 'microsoft-surface-pro-2-series',
    processorFamily: 'Intel Core i5', generation: '4th Gen', tier: 'Budget',
    variants: [
      { ram: '4GB', storage: '256GB SSD', basePrice: 8400 },
      { ram: '8GB', storage: '256GB SSD', basePrice: 9660 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 10920 }
    ],
  }),
  mkDevice({
    brand: 'Microsoft', modelName: 'Surface Laptop 3 Series', slug: 'microsoft-surface-laptop-3-series',
    processorFamily: 'AMD Ryzen 5', generation: '3000 Series', tier: 'Budget',
    variants: [
      { ram: '4GB', storage: '256GB SSD', basePrice: 17420 },
      { ram: '8GB', storage: '256GB SSD', basePrice: 20033 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 22646 }
    ],
  }),
  mkDevice({
    brand: 'Microsoft', modelName: 'Surface 2 Series', slug: 'microsoft-surface-2-series',
    processorFamily: 'NVIDIA Tegra 4', generation: 'ARM', tier: 'Budget',
    variants: [
      { ram: '4GB', storage: '256GB SSD', basePrice: 4890 },
      { ram: '8GB', storage: '256GB SSD', basePrice: 5623 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 6357 }
    ],
  }),
  mkDevice({
    brand: 'Microsoft', modelName: 'Surface 3 Series', slug: 'microsoft-surface-3-series',
    processorFamily: 'Intel Atom x7', generation: 'Atom', tier: 'Budget',
    variants: [
      { ram: '4GB', storage: '256GB SSD', basePrice: 5490 },
      { ram: '8GB', storage: '256GB SSD', basePrice: 6313 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 7137 }
    ],
  }),
  mkDevice({
    brand: 'Microsoft', modelName: 'Surface Pro 6 Series', slug: 'microsoft-surface-pro-6-series',
    processorFamily: 'Intel Core i5', generation: '8th Gen', tier: 'Budget',
    variants: [
      { ram: '4GB', storage: '256GB SSD', basePrice: 16330 },
      { ram: '8GB', storage: '256GB SSD', basePrice: 18779 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 21229 }
    ],
  }),
  mkDevice({
    brand: 'Microsoft', modelName: 'Surface Laptop 4 Series', slug: 'microsoft-surface-laptop-4-series',
    processorFamily: 'AMD Ryzen 5', generation: '4000 Series', tier: 'Mid-range',
    variants: [
      { ram: '8GB', storage: '256GB SSD', basePrice: 19340 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 21660 },
      { ram: '16GB', storage: '512GB SSD', basePrice: 24175 }
    ],
  }),
  mkDevice({
    brand: 'Microsoft', modelName: 'Surface Pro 7 Series', slug: 'microsoft-surface-pro-7-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Mid-range',
    variants: [
      { ram: '8GB', storage: '256GB SSD', basePrice: 19970 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 22366 },
      { ram: '16GB', storage: '512GB SSD', basePrice: 24962 }
    ],
  }),
  mkDevice({
    brand: 'Microsoft', modelName: 'Surface Laptop Series', slug: 'microsoft-surface-laptop-series',
    processorFamily: 'Intel Core i5', generation: '7th Gen', tier: 'Budget',
    variants: [
      { ram: '4GB', storage: '256GB SSD', basePrice: 12350 },
      { ram: '8GB', storage: '256GB SSD', basePrice: 14202 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 16055 }
    ],
  }),
  mkDevice({
    brand: 'Microsoft', modelName: 'Surface Book 3 Series', slug: 'microsoft-surface-book-3-series',
    processorFamily: 'Intel Core i7', generation: '10th Gen', tier: 'Budget',
    variants: [
      { ram: '4GB', storage: '256GB SSD', basePrice: 17420 },
      { ram: '8GB', storage: '256GB SSD', basePrice: 20033 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 22646 }
    ],
  }),
  mkDevice({
    brand: 'Microsoft', modelName: 'Surface Pro X Series', slug: 'microsoft-surface-pro-x-series',
    processorFamily: 'Microsoft SQ2', generation: 'ARM', tier: 'Mid-range',
    variants: [
      { ram: '8GB', storage: '256GB SSD', basePrice: 23170 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 25950 },
      { ram: '16GB', storage: '512GB SSD', basePrice: 28962 }
    ],
  }),
  mkDevice({
    brand: 'Microsoft', modelName: 'Surface Go 2 Series', slug: 'microsoft-surface-go-2-series',
    processorFamily: 'Intel Core m3', generation: '10th Gen', tier: 'Budget',
    variants: [
      { ram: '4GB', storage: '256GB SSD', basePrice: 8880 },
      { ram: '8GB', storage: '256GB SSD', basePrice: 10212 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 11544 }
    ],
  }),
  mkDevice({
    brand: 'Microsoft', modelName: 'Other Microsoft Series', slug: 'microsoft-other-microsoft-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Budget',
    variants: [
      { ram: '4GB', storage: '256GB SSD', basePrice: 10720 },
      { ram: '8GB', storage: '256GB SSD', basePrice: 12327 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 13936 }
    ],
  }),
];


async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');
    await Device.deleteMany({ category: 'laptop', brand: 'Microsoft' });
    console.log('Cleared existing Microsoft laptop devices');
    await Device.insertMany(devices);
    console.log(`✅ Seeded ${devices.length} Microsoft laptop devices successfully`);
    process.exit(0);
  } catch (err) {
    console.error('❌ Seed failed:', err.message);
    process.exit(1);
  }
}

seed();