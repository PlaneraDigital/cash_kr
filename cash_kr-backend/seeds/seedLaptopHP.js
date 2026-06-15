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
      storage: v.storage || 'Standard',
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
  //  HP — All Series
  // ══════════════════════════════════════════════════════
  mkDevice({
    brand: 'HP', modelName: 'ZBook 8 Series', slug: 'hp-zbook-8-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Mid-range',
    variants: [{ basePrice: 35000 }],
  }),
  mkDevice({
    brand: 'HP', modelName: 'ZBook Firefly Series', slug: 'hp-zbook-firefly-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Mid-range',
    variants: [{ basePrice: 40000 }],
  }),
  mkDevice({
    brand: 'HP', modelName: 'ZBook Fury Series', slug: 'hp-zbook-fury-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Mid-range',
    variants: [{ basePrice: 45000 }],
  }),
  mkDevice({
    brand: 'HP', modelName: 'ZBook Power Series', slug: 'hp-zbook-power-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Mid-range',
    variants: [{ basePrice: 45000 }],
  }),
  mkDevice({
    brand: 'HP', modelName: 'ZBook Studio Series', slug: 'hp-zbook-studio-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Mid-range',
    variants: [{ basePrice: 45000 }],
  }),
  mkDevice({
    brand: 'HP', modelName: 'ZBook X Series', slug: 'hp-zbook-x-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Mid-range',
    variants: [{ basePrice: 40000 }],
  }),
  mkDevice({
    brand: 'HP', modelName: 'Pavilion Series', slug: 'hp-pavilion-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Budget',
    variants: [{ basePrice: 6680 }],
  }),
  mkDevice({
    brand: 'HP', modelName: 'HP 15 Series', slug: 'hp-hp-15-series',
    processorFamily: 'Intel Core i3', generation: '10th Gen', tier: 'Budget',
    variants: [{ basePrice: 13390 }],
  }),
  mkDevice({
    brand: 'HP', modelName: 'HP Notebook Series', slug: 'hp-hp-notebook-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Budget',
    variants: [{ basePrice: 11210 }],
  }),
  mkDevice({
    brand: 'HP', modelName: 'Probook Series', slug: 'hp-probook-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Budget',
    variants: [{ basePrice: 10700 }],
  }),
  mkDevice({
    brand: 'HP', modelName: 'Elitebook Series', slug: 'hp-elitebook-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Budget',
    variants: [{ basePrice: 15030 }],
  }),
  mkDevice({
    brand: 'HP', modelName: 'G Series', slug: 'hp-g-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Budget',
    variants: [{ basePrice: 7830 }],
  }),
  mkDevice({
    brand: 'HP', modelName: 'Envy Series', slug: 'hp-envy-series',
    processorFamily: 'Intel Core i7', generation: '11th Gen', tier: 'Budget',
    variants: [{ basePrice: 12610 }],
  }),
  mkDevice({
    brand: 'HP', modelName: 'HP 14 Series', slug: 'hp-hp-14-series',
    processorFamily: 'Intel Core i3', generation: '10th Gen', tier: 'Budget',
    variants: [{ basePrice: 11710 }],
  }),
  mkDevice({
    brand: 'HP', modelName: 'Pavilion Power Series', slug: 'hp-pavilion-power-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Budget',
    variants: [{ basePrice: 6310 }],
  }),
  mkDevice({
    brand: 'HP', modelName: 'HP 300 Series', slug: 'hp-hp-300-series',
    processorFamily: 'Intel Core i3', generation: '10th Gen', tier: 'Budget',
    variants: [{ basePrice: 11100 }],
  }),
  mkDevice({
    brand: 'HP', modelName: 'Spectre Series', slug: 'hp-spectre-series',
    processorFamily: 'Intel Core i7', generation: '11th Gen', tier: 'Budget',
    variants: [{ basePrice: 16780 }],
  }),
  mkDevice({
    brand: 'HP', modelName: 'Split Series', slug: 'hp-split-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Budget',
    variants: [{ basePrice: 2130 }],
  }),
  mkDevice({
    brand: 'HP', modelName: 'HP Chromebook Series', slug: 'hp-hp-chromebook-series',
    processorFamily: 'Intel Core i3', generation: '10th Gen', tier: 'Budget',
    variants: [{ basePrice: 4150 }],
  }),
  mkDevice({
    brand: 'HP', modelName: 'Omen Series', slug: 'hp-omen-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Gaming',
    gpuType: 'NVIDIA GTX 1650', isGaming: true,
    variants: [{ basePrice: 15860 }],
  }),
  mkDevice({
    brand: 'HP', modelName: '200 Series', slug: 'hp-200-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Budget',
    variants: [{ basePrice: 9590 }],
  }),
  mkDevice({
    brand: 'HP', modelName: 'HP 17 Series', slug: 'hp-hp-17-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Budget',
    variants: [{ basePrice: 10920 }],
  }),
  mkDevice({
    brand: 'HP', modelName: 'Stream Series', slug: 'hp-stream-series',
    processorFamily: 'Intel Core i3', generation: '10th Gen', tier: 'Budget',
    variants: [{ basePrice: 2610 }],
  }),
  mkDevice({
    brand: 'HP', modelName: 'ZBook Series', slug: 'hp-zbook-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Budget',
    variants: [{ basePrice: 22730 }],
  }),
  mkDevice({
    brand: 'HP', modelName: 'Pavilion Gaming Series', slug: 'hp-pavilion-gaming-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Gaming',
    gpuType: 'NVIDIA GTX 1650', isGaming: true,
    variants: [{ basePrice: 23280 }],
  }),
  mkDevice({
    brand: 'HP', modelName: 'SlateBook Series', slug: 'hp-slatebook-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Budget',
    variants: [{ basePrice: 2650 }],
  }),
  mkDevice({
    brand: 'HP', modelName: 'Victus Series', slug: 'hp-victus-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Gaming',
    gpuType: 'NVIDIA GTX 1650', isGaming: true,
    variants: [{ basePrice: 23950 }],
  }),
  mkDevice({
    brand: 'HP', modelName: 'Other HP Series', slug: 'hp-other-hp-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Budget',
    variants: [{ basePrice: 4690 }],
  }),
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');
    await Device.deleteMany({ category: 'laptop', brand: 'HP' });
    console.log('Cleared existing HP laptop devices');
    await Device.insertMany(devices);
    console.log(`✅ Seeded ${devices.length} HP laptop devices successfully`);
    process.exit(0);
  } catch (err) {
    console.error('❌ Seed failed:', err.message);
    process.exit(1);
  }
}

seed();