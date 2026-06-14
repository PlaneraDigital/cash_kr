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
  //  HP — All Series
  // ══════════════════════════════════════════════════════
  mkDevice({
    brand: 'HP', modelName: 'ZBook 8 Series', slug: 'hp-zbook-8-series',
    processorFamily: 'Intel Core i7', generation: '13th Gen', tier: 'Mid-range',
    variants: [
      { ram: '16GB', storage: '512GB SSD', basePrice: 35000 },
      { ram: '16GB', storage: '1TB SSD', basePrice: 40250 },
      { ram: '32GB', storage: '1TB SSD', basePrice: 45500 }
    ],
  }),
  mkDevice({
    brand: 'HP', modelName: 'ZBook Firefly Series', slug: 'hp-zbook-firefly-series',
    processorFamily: 'Intel Core i7', generation: '12th Gen', tier: 'Premium',
    variants: [
      { ram: '16GB', storage: '512GB SSD', basePrice: 40000 },
      { ram: '16GB', storage: '1TB SSD', basePrice: 46000 },
      { ram: '32GB', storage: '1TB SSD', basePrice: 52000 }
    ],
  }),
  mkDevice({
    brand: 'HP', modelName: 'ZBook Fury Series', slug: 'hp-zbook-fury-series',
    processorFamily: 'Intel Core i9', generation: '12th Gen', tier: 'Premium',
    variants: [
      { ram: '16GB', storage: '512GB SSD', basePrice: 45000 },
      { ram: '16GB', storage: '1TB SSD', basePrice: 51749 },
      { ram: '32GB', storage: '1TB SSD', basePrice: 58500 }
    ],
  }),
  mkDevice({
    brand: 'HP', modelName: 'ZBook Power Series', slug: 'hp-zbook-power-series',
    processorFamily: 'Intel Core i7', generation: '12th Gen', tier: 'Premium',
    variants: [
      { ram: '16GB', storage: '512GB SSD', basePrice: 45000 },
      { ram: '16GB', storage: '1TB SSD', basePrice: 51749 },
      { ram: '32GB', storage: '1TB SSD', basePrice: 58500 }
    ],
  }),
  mkDevice({
    brand: 'HP', modelName: 'ZBook Studio Series', slug: 'hp-zbook-studio-series',
    processorFamily: 'Intel Core i9', generation: '12th Gen', tier: 'Premium',
    variants: [
      { ram: '16GB', storage: '512GB SSD', basePrice: 45000 },
      { ram: '16GB', storage: '1TB SSD', basePrice: 51749 },
      { ram: '32GB', storage: '1TB SSD', basePrice: 58500 }
    ],
  }),
  mkDevice({
    brand: 'HP', modelName: 'ZBook X Series', slug: 'hp-zbook-x-series',
    processorFamily: 'Intel Core i7', generation: '13th Gen', tier: 'Premium',
    variants: [
      { ram: '16GB', storage: '512GB SSD', basePrice: 40000 },
      { ram: '16GB', storage: '1TB SSD', basePrice: 46000 },
      { ram: '32GB', storage: '1TB SSD', basePrice: 52000 }
    ],
  }),
  mkDevice({
    brand: 'HP', modelName: 'Pavilion Series', slug: 'hp-pavilion-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Budget',
    variants: [
      { ram: '4GB', storage: '256GB SSD', basePrice: 6680 },
      { ram: '8GB', storage: '256GB SSD', basePrice: 7681 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 8684 }
    ],
  }),
  mkDevice({
    brand: 'HP', modelName: 'HP 15 Series', slug: 'hp-hp-15-series',
    processorFamily: 'Intel Core i3', generation: '10th Gen', tier: 'Budget',
    variants: [
      { ram: '4GB', storage: '256GB SSD', basePrice: 13390 },
      { ram: '8GB', storage: '256GB SSD', basePrice: 15398 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 17407 }
    ],
  }),
  mkDevice({
    brand: 'HP', modelName: 'HP Notebook Series', slug: 'hp-hp-notebook-series',
    processorFamily: 'Intel Core i3', generation: '10th Gen', tier: 'Budget',
    variants: [
      { ram: '4GB', storage: '256GB SSD', basePrice: 11210 },
      { ram: '8GB', storage: '256GB SSD', basePrice: 12891 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 14573 }
    ],
  }),
  mkDevice({
    brand: 'HP', modelName: 'Probook Series', slug: 'hp-probook-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Budget',
    variants: [
      { ram: '4GB', storage: '256GB SSD', basePrice: 10700 },
      { ram: '8GB', storage: '256GB SSD', basePrice: 12304 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 13910 }
    ],
  }),
  mkDevice({
    brand: 'HP', modelName: 'Elitebook Series', slug: 'hp-elitebook-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Budget',
    variants: [
      { ram: '4GB', storage: '256GB SSD', basePrice: 15030 },
      { ram: '8GB', storage: '256GB SSD', basePrice: 17284 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 19539 }
    ],
  }),
  mkDevice({
    brand: 'HP', modelName: 'G Series', slug: 'hp-g-series',
    processorFamily: 'Intel Core i5', generation: '8th Gen', tier: 'Budget',
    variants: [
      { ram: '4GB', storage: '256GB SSD', basePrice: 7830 },
      { ram: '8GB', storage: '256GB SSD', basePrice: 9004 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 10179 }
    ],
  }),
  mkDevice({
    brand: 'HP', modelName: 'Envy Series', slug: 'hp-envy-series',
    processorFamily: 'Intel Core i5', generation: '11th Gen', tier: 'Budget',
    variants: [
      { ram: '4GB', storage: '256GB SSD', basePrice: 12610 },
      { ram: '8GB', storage: '256GB SSD', basePrice: 14501 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 16393 }
    ],
  }),
  mkDevice({
    brand: 'HP', modelName: 'HP 14 Series', slug: 'hp-hp-14-series',
    processorFamily: 'Intel Core i3', generation: '10th Gen', tier: 'Budget',
    variants: [
      { ram: '4GB', storage: '256GB SSD', basePrice: 11710 },
      { ram: '8GB', storage: '256GB SSD', basePrice: 13466 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 15223 }
    ],
  }),
  mkDevice({
    brand: 'HP', modelName: 'Pavilion Power Series', slug: 'hp-pavilion-power-series',
    processorFamily: 'Intel Core i5', generation: '7th Gen', tier: 'Budget',
    gpuType: 'NVIDIA GTX 1050', isGaming: true,
    variants: [
      { processor: 'Intel Core i5', generation: '7th Gen', ram: '8GB', storage: '512GB SSD', basePrice: 6310 },
      { processor: 'Intel Core i5', generation: '7th Gen', ram: '16GB', storage: '512GB SSD', basePrice: 7256 },
      { processor: 'Intel Core i5', generation: '7th Gen', ram: '16GB', storage: '512GB SSD', basePrice: 8203 },
      { processor: 'Intel Core i5', generation: '7th Gen', ram: '16GB', storage: '1TB SSD', basePrice: 9465 },
      { processor: 'Intel Core i5', generation: '7th Gen', ram: '32GB', storage: '1TB SSD', basePrice: 11042 }
    ],
  }),
  mkDevice({
    brand: 'HP', modelName: 'HP 300 Series', slug: 'hp-hp-300-series',
    processorFamily: 'Intel Core i3', generation: '10th Gen', tier: 'Budget',
    variants: [
      { ram: '4GB', storage: '256GB SSD', basePrice: 11100 },
      { ram: '8GB', storage: '256GB SSD', basePrice: 12764 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 14430 }
    ],
  }),
  mkDevice({
    brand: 'HP', modelName: 'Spectre Series', slug: 'hp-spectre-series',
    processorFamily: 'Intel Core i7', generation: '11th Gen', tier: 'Budget',
    variants: [
      { ram: '4GB', storage: '256GB SSD', basePrice: 16780 },
      { ram: '8GB', storage: '256GB SSD', basePrice: 19297 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 21814 }
    ],
  }),
  mkDevice({
    brand: 'HP', modelName: 'Split Series', slug: 'hp-split-series',
    processorFamily: 'Intel Core i3', generation: '4th Gen', tier: 'Budget',
    variants: [
      { ram: '4GB', storage: '256GB SSD', basePrice: 2130 },
      { ram: '8GB', storage: '256GB SSD', basePrice: 2449 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 2769 }
    ],
  }),
  mkDevice({
    brand: 'HP', modelName: 'HP Chromebook Series', slug: 'hp-hp-chromebook-series',
    processorFamily: 'Intel Celeron', generation: 'N Series', tier: 'Budget',
    variants: [
      { ram: '4GB', storage: '256GB SSD', basePrice: 4150 },
      { ram: '8GB', storage: '256GB SSD', basePrice: 4772 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 5395 }
    ],
  }),
  mkDevice({
    brand: 'HP', modelName: 'Omen Series', slug: 'hp-omen-series',
    processorFamily: 'Intel Core i7', generation: '10th Gen', tier: 'Gaming',
    gpuType: 'NVIDIA RTX 3060', isGaming: true,
    variants: [
      { processor: 'Intel Core i5', generation: '10th Gen', ram: '8GB', storage: '512GB SSD', basePrice: 15860 },
      { processor: 'Intel Core i5', generation: '10th Gen', ram: '16GB', storage: '512GB SSD', basePrice: 18239 },
      { processor: 'Intel Core i7', generation: '10th Gen', ram: '16GB', storage: '512GB SSD', basePrice: 20618 },
      { processor: 'Intel Core i7', generation: '10th Gen', ram: '16GB', storage: '1TB SSD', basePrice: 23790 },
      { processor: 'Intel Core i7', generation: '10th Gen', ram: '32GB', storage: '1TB SSD', basePrice: 27755 }
    ],
  }),
  mkDevice({
    brand: 'HP', modelName: '200 Series', slug: 'hp-200-series',
    processorFamily: 'AMD A-Series', generation: 'AMD', tier: 'Budget',
    variants: [
      { ram: '4GB', storage: '256GB SSD', basePrice: 9590 },
      { ram: '8GB', storage: '256GB SSD', basePrice: 11028 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 12467 }
    ],
  }),
  mkDevice({
    brand: 'HP', modelName: 'HP 17 Series', slug: 'hp-hp-17-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Budget',
    variants: [
      { ram: '4GB', storage: '256GB SSD', basePrice: 10920 },
      { ram: '8GB', storage: '256GB SSD', basePrice: 12557 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 14196 }
    ],
  }),
  mkDevice({
    brand: 'HP', modelName: 'Stream Series', slug: 'hp-stream-series',
    processorFamily: 'Intel Celeron', generation: 'N Series', tier: 'Budget',
    variants: [
      { ram: '4GB', storage: '256GB SSD', basePrice: 2610 },
      { ram: '8GB', storage: '256GB SSD', basePrice: 3001 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 3393 }
    ],
  }),
  mkDevice({
    brand: 'HP', modelName: 'ZBook Series', slug: 'hp-zbook-series',
    processorFamily: 'Intel Core i7', generation: '10th Gen', tier: 'Mid-range',
    variants: [
      { ram: '8GB', storage: '256GB SSD', basePrice: 22730 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 25457 },
      { ram: '16GB', storage: '512GB SSD', basePrice: 28412 }
    ],
  }),
  mkDevice({
    brand: 'HP', modelName: 'Pavilion Gaming Series', slug: 'hp-pavilion-gaming-series',
    processorFamily: 'AMD Ryzen 5', generation: '5000 Series', tier: 'Gaming',
    gpuType: 'NVIDIA GTX 1650', isGaming: true,
    variants: [
      { processor: 'AMD Ryzen 5', generation: '5000 Series', ram: '8GB', storage: '512GB SSD', basePrice: 23280 },
      { processor: 'AMD Ryzen 5', generation: '5000 Series', ram: '16GB', storage: '512GB SSD', basePrice: 26771 },
      { processor: 'AMD Ryzen 5', generation: '5000 Series', ram: '16GB', storage: '512GB SSD', basePrice: 30264 },
      { processor: 'AMD Ryzen 5', generation: '5000 Series', ram: '16GB', storage: '1TB SSD', basePrice: 34920 },
      { processor: 'AMD Ryzen 5', generation: '5000 Series', ram: '32GB', storage: '1TB SSD', basePrice: 40740 }
    ],
  }),
  mkDevice({
    brand: 'HP', modelName: 'SlateBook Series', slug: 'hp-slatebook-series',
    processorFamily: 'NVIDIA Tegra 4', generation: 'ARM', tier: 'Budget',
    variants: [
      { ram: '4GB', storage: '256GB SSD', basePrice: 2650 },
      { ram: '8GB', storage: '256GB SSD', basePrice: 3047 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 3445 }
    ],
  }),
  mkDevice({
    brand: 'HP', modelName: 'Victus Series', slug: 'hp-victus-series',
    processorFamily: 'AMD Ryzen 5', generation: '5000 Series', tier: 'Mid-range',
    gpuType: 'NVIDIA RTX 3050', isGaming: true,
    variants: [
      { processor: 'AMD Ryzen 5', generation: '5000 Series', ram: '8GB', storage: '512GB SSD', basePrice: 23950 },
      { processor: 'AMD Ryzen 5', generation: '5000 Series', ram: '16GB', storage: '512GB SSD', basePrice: 27542 },
      { processor: 'AMD Ryzen 5', generation: '5000 Series', ram: '16GB', storage: '512GB SSD', basePrice: 31135 },
      { processor: 'AMD Ryzen 5', generation: '5000 Series', ram: '16GB', storage: '1TB SSD', basePrice: 35925 },
      { processor: 'AMD Ryzen 5', generation: '5000 Series', ram: '32GB', storage: '1TB SSD', basePrice: 41912 }
    ],
  }),
  mkDevice({
    brand: 'HP', modelName: 'Other HP Series', slug: 'hp-other-hp-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Budget',
    variants: [
      { ram: '4GB', storage: '256GB SSD', basePrice: 4690 },
      { ram: '8GB', storage: '256GB SSD', basePrice: 5393 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 6097 }
    ],
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