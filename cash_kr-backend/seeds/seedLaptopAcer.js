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
    brand: 'Acer', modelName: 'Acer Nitro 7 Series', slug: 'acer-nitro-7-series',
    processorFamily: 'Intel Core i7', generation: '9th Gen', tier: 'Gaming',
    gpuType: 'NVIDIA GTX 1660 Ti', isGaming: true,
    variants: [
      { processor: 'Intel Core i3', generation: '10th Gen', ram: '8GB', storage: '256GB SSD', basePrice: 22000 },
      { processor: 'Intel Core i5', generation: '9th Gen', ram: '8GB', storage: '1TB HDD', basePrice: 28000 },
      { processor: 'Intel Core i5', generation: '10th Gen', ram: '8GB', storage: '512GB SSD', basePrice: 32000 },
      { processor: 'Intel Core i5', generation: '11th Gen', ram: '16GB', storage: '512GB SSD', basePrice: 38000 },
      { processor: 'Intel Core i7', generation: '9th Gen', ram: '16GB', storage: '1TB HDD', basePrice: 38000 },
      { processor: 'Intel Core i7', generation: '10th Gen', ram: '16GB', storage: '512GB SSD', basePrice: 45000 },
      { processor: 'Intel Core i7', generation: '11th Gen', ram: '16GB', storage: '1TB SSD', basePrice: 52000 },
      { processor: 'Intel Core i7', generation: '12th Gen', ram: '32GB', storage: '1TB SSD', basePrice: 65000 },
      { processor: 'AMD Ryzen 3', generation: '5th Gen', ram: '8GB', storage: '256GB SSD', basePrice: 20000 },
      { processor: 'AMD Ryzen 3', generation: '5th Gen', ram: '8GB', storage: '512GB SSD', basePrice: 24000 },
      { processor: 'AMD Ryzen 5', generation: '5000 Series', ram: '8GB', storage: '512GB SSD', basePrice: 30000 },
      { processor: 'AMD Ryzen 5', generation: '5000 Series', ram: '16GB', storage: '512GB SSD', basePrice: 35000 },
      { processor: 'AMD Ryzen 7', generation: '7000 Series', ram: '16GB', storage: '512GB SSD', basePrice: 42000 },
      { processor: 'AMD Ryzen 7', generation: '7000 Series', ram: '32GB', storage: '1TB SSD', basePrice: 55000 },
    ],
  }),
  mkDevice({
    brand: 'Acer', modelName: 'Acer Swift 14 AI (2024)', slug: 'acer-swift-14-ai-2024',
    processorFamily: 'Intel Core Ultra 7', generation: 'Ultra Gen', tier: 'Mid-range',
    variants: [
      { ram: '16GB', storage: '512GB SSD', basePrice: 52000 },
      { ram: '32GB', storage: '1TB SSD', basePrice: 65000 },
    ],
  }),
  mkDevice({
    brand: 'Acer', modelName: 'Acer Aspire 5 (2024)', slug: 'acer-aspire-5-2024',
    processorFamily: 'Intel Core i5', generation: '12th Gen', tier: 'Budget',
    variants: [
      { ram: '8GB', storage: '512GB SSD', basePrice: 22000 },
      { ram: '16GB', storage: '512GB SSD', basePrice: 28000 },
      { ram: '16GB', storage: '1TB SSD', basePrice: 34000 },
    ],
  }),
  mkDevice({
    brand: 'Acer', modelName: 'Acer Aspire 3 (2024)', slug: 'acer-aspire-3-2024',
    processorFamily: 'Intel Core i3', generation: '12th Gen', tier: 'Budget',
    variants: [
      { ram: '8GB', storage: '256GB SSD', basePrice: 15000 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 18000 },
    ],
  }),
  mkDevice({
    brand: 'Acer', modelName: 'Acer Nitro V 15 (2024)', slug: 'acer-nitro-v-15-2024',
    processorFamily: 'Intel Core i5', generation: '13th Gen', tier: 'Gaming',
    gpuType: 'NVIDIA RTX 4060', isGaming: true,
    variants: [
      { ram: '8GB', storage: '512GB SSD', basePrice: 52000 },
      { ram: '16GB', storage: '512GB SSD', basePrice: 60000 },
      { ram: '16GB', storage: '1TB SSD', basePrice: 68000 },
    ],
  }),
  mkDevice({
    brand: 'Acer', modelName: 'Acer Predator Helios Neo 16 (2024)', slug: 'acer-predator-helios-neo-16-2024',
    processorFamily: 'Intel Core i7', generation: '13th Gen', tier: 'Gaming',
    gpuType: 'NVIDIA RTX 4070', isGaming: true,
    variants: [
      { ram: '16GB', storage: '512GB SSD', basePrice: 88000 },
      { ram: '32GB', storage: '1TB SSD', basePrice: 105000 },
    ],
  }),
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');
    await Device.deleteMany({ category: 'laptop', brand: 'Acer' });
    console.log('Cleared existing Acer laptop devices');
    await Device.insertMany(devices);
    console.log(`✅ Seeded ${devices.length} Acer laptop devices successfully`);
    process.exit(0);
  } catch (err) {
    console.error('❌ Seed failed:', err.message);
    process.exit(1);
  }
}

seed();
