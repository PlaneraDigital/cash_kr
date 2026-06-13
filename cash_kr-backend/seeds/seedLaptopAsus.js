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
    brand: 'Asus', modelName: 'Asus ZenBook Pro 16X (2024)', slug: 'asus-zenbook-pro-16x-2024',
    processorFamily: 'Intel Core i9', generation: '14th Gen', tier: 'Premium',
    gpuType: 'NVIDIA RTX 4070',
    variants: [
      { ram: '32GB', storage: '1TB SSD', basePrice: 155000 },
      { ram: '64GB', storage: '2TB SSD', basePrice: 185000 },
    ],
  }),
  mkDevice({
    brand: 'Asus', modelName: 'Asus ZenBook 14 OLED (2024)', slug: 'asus-zenbook-14-oled-2024',
    processorFamily: 'Intel Core Ultra 7', generation: 'Ultra Gen', tier: 'Mid-range',
    variants: [
      { ram: '16GB', storage: '512GB SSD', basePrice: 58000 },
      { ram: '32GB', storage: '1TB SSD', basePrice: 72000 },
    ],
  }),
  mkDevice({
    brand: 'Asus', modelName: 'Asus VivoBook 16 (2024)', slug: 'asus-vivobook-16-2024',
    processorFamily: 'AMD Ryzen 5', generation: '7000 Series', tier: 'Mid-range',
    variants: [
      { ram: '8GB', storage: '512GB SSD', basePrice: 28000 },
      { ram: '16GB', storage: '512GB SSD', basePrice: 34000 },
    ],
  }),
  mkDevice({
    brand: 'Asus', modelName: 'Asus VivoBook 15 (2024)', slug: 'asus-vivobook-15-2024',
    processorFamily: 'Intel Core i3', generation: '12th Gen', tier: 'Budget',
    variants: [
      { ram: '8GB', storage: '256GB SSD', basePrice: 18000 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 22000 },
    ],
  }),
  mkDevice({
    brand: 'Asus', modelName: 'Asus ROG Zephyrus G16 (2024)', slug: 'asus-rog-zephyrus-g16-2024',
    processorFamily: 'Intel Core Ultra 9', generation: 'Ultra Gen', tier: 'Gaming',
    gpuType: 'NVIDIA RTX 4090', isGaming: true,
    variants: [
      { ram: '32GB', storage: '1TB SSD', basePrice: 225000 },
      { ram: '64GB', storage: '2TB SSD', basePrice: 265000 },
    ],
  }),
  mkDevice({
    brand: 'Asus', modelName: 'Asus ROG Strix G16 (2024)', slug: 'asus-rog-strix-g16-2024',
    processorFamily: 'Intel Core i9', generation: '14th Gen', tier: 'Gaming',
    gpuType: 'NVIDIA RTX 4080', isGaming: true,
    variants: [
      { ram: '16GB', storage: '512GB SSD', basePrice: 145000 },
      { ram: '32GB', storage: '1TB SSD', basePrice: 168000 },
    ],
  }),
  mkDevice({
    brand: 'Asus', modelName: 'Asus TUF Gaming A15 (2024)', slug: 'asus-tuf-gaming-a15-2024',
    processorFamily: 'AMD Ryzen 7', generation: '7000 Series', tier: 'Gaming',
    gpuType: 'NVIDIA RTX 4060', isGaming: true,
    variants: [
      { ram: '16GB', storage: '512GB SSD', basePrice: 62000 },
      { ram: '16GB', storage: '1TB SSD', basePrice: 70000 },
    ],
  }),
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');
    await Device.deleteMany({ category: 'laptop', brand: 'Asus' });
    console.log('Cleared existing Asus laptop devices');
    await Device.insertMany(devices);
    console.log(`✅ Seeded ${devices.length} Asus laptop devices successfully`);
    process.exit(0);
  } catch (err) {
    console.error('❌ Seed failed:', err.message);
    process.exit(1);
  }
}

seed();
