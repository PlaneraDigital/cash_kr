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
  mkDevice({
    brand: 'Lenovo', modelName: 'Lenovo ThinkPad X1 Carbon Gen 12', slug: 'lenovo-thinkpad-x1-carbon-gen12',
    processorFamily: 'Intel Core Ultra 7', generation: 'Ultra Gen', tier: 'Premium',
    variants: [
      { ram: '16GB', storage: '512GB SSD', basePrice: 98000 },
      { ram: '32GB', storage: '1TB SSD', basePrice: 125000 },
      { ram: '64GB', storage: '2TB SSD', basePrice: 158000 },
    ],
  }),
  mkDevice({
    brand: 'Lenovo', modelName: 'Lenovo ThinkPad E14 Gen 5', slug: 'lenovo-thinkpad-e14-gen5',
    processorFamily: 'Intel Core i5', generation: '13th Gen', tier: 'Mid-range',
    variants: [
      { ram: '8GB', storage: '256GB SSD', basePrice: 35000 },
      { ram: '16GB', storage: '512GB SSD', basePrice: 44000 },
      { ram: '16GB', storage: '1TB SSD', basePrice: 52000 },
    ],
  }),
  mkDevice({
    brand: 'Lenovo', modelName: 'Lenovo IdeaPad Slim 5 (2024)', slug: 'lenovo-ideapad-slim-5-2024',
    processorFamily: 'Intel Core i7', generation: '13th Gen', tier: 'Mid-range',
    variants: [
      { ram: '16GB', storage: '512GB SSD', basePrice: 42000 },
      { ram: '16GB', storage: '1TB SSD', basePrice: 50000 },
    ],
  }),
  mkDevice({
    brand: 'Lenovo', modelName: 'Lenovo IdeaPad Slim 3 (2024)', slug: 'lenovo-ideapad-slim-3-2024',
    processorFamily: 'Intel Core i3', generation: '12th Gen', tier: 'Budget',
    variants: [
      { ram: '8GB', storage: '256GB SSD', basePrice: 20000 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 24000 },
      { ram: '16GB', storage: '512GB SSD', basePrice: 28000 },
    ],
  }),
  mkDevice({
    brand: 'Lenovo', modelName: 'Lenovo Legion Pro 7i Gen 9', slug: 'lenovo-legion-pro-7i-gen9',
    processorFamily: 'Intel Core i9', generation: '14th Gen', tier: 'Gaming',
    gpuType: 'NVIDIA RTX 4080', isGaming: true,
    variants: [
      { ram: '32GB', storage: '1TB SSD', basePrice: 195000 },
      { ram: '32GB', storage: '2TB SSD', basePrice: 220000 },
      { ram: '64GB', storage: '2TB SSD', basePrice: 250000 },
    ],
  }),
  mkDevice({
    brand: 'Lenovo', modelName: 'Lenovo Legion 5 Pro Gen 9', slug: 'lenovo-legion-5-pro-gen9',
    processorFamily: 'AMD Ryzen 9', generation: '7000 Series', tier: 'Gaming',
    gpuType: 'NVIDIA RTX 4070', isGaming: true,
    variants: [
      { ram: '16GB', storage: '512GB SSD', basePrice: 95000 },
      { ram: '32GB', storage: '1TB SSD', basePrice: 115000 },
    ],
  }),
  mkDevice({
    brand: 'Lenovo', modelName: 'Lenovo Legion 5i Gen 9', slug: 'lenovo-legion-5i-gen9',
    processorFamily: 'Intel Core i7', generation: '14th Gen', tier: 'Gaming',
    gpuType: 'NVIDIA RTX 4060', isGaming: true,
    variants: [
      { ram: '16GB', storage: '512GB SSD', basePrice: 72000 },
      { ram: '32GB', storage: '1TB SSD', basePrice: 88000 },
    ],
  }),
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');
    await Device.deleteMany({ category: 'laptop', brand: 'Lenovo' });
    console.log('Cleared existing Lenovo laptop devices');
    await Device.insertMany(devices);
    console.log(`✅ Seeded ${devices.length} Lenovo laptop devices successfully`);
    process.exit(0);
  } catch (err) {
    console.error('❌ Seed failed:', err.message);
    process.exit(1);
  }
}

seed();
