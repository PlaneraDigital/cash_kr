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
  //  ACER — All Series
  // ══════════════════════════════════════════════════════
  mkDevice({
    brand: 'Acer', modelName: 'TravelMate P4 Series', slug: 'acer-travelmate-p4-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Budget',
    variants: [{ basePrice: 17000 }],
  }),
  mkDevice({
    brand: 'Acer', modelName: 'TravelMate P2 Series', slug: 'acer-travelmate-p2-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Budget',
    variants: [{ basePrice: 15000 }],
  }),
  mkDevice({
    brand: 'Acer', modelName: 'TravelMate P6 Series', slug: 'acer-travelmate-p6-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Budget',
    variants: [{ basePrice: 19000 }],
  }),
  mkDevice({
    brand: 'Acer', modelName: 'Aspire Series', slug: 'acer-aspire-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Budget',
    variants: [{ basePrice: 7670 }],
  }),
  mkDevice({
    brand: 'Acer', modelName: 'Aspire One Series', slug: 'acer-aspire-one-series',
    processorFamily: 'Intel Core i3', generation: '10th Gen', tier: 'Budget',
    variants: [{ basePrice: 3570 }],
  }),
  mkDevice({
    brand: 'Acer', modelName: 'Aspire E Series', slug: 'acer-aspire-e-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Budget',
    variants: [{ basePrice: 9240 }],
  }),
  mkDevice({
    brand: 'Acer', modelName: 'Aspire 5 Series', slug: 'acer-aspire-5-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Budget',
    variants: [{ basePrice: 13740 }],
  }),
  mkDevice({
    brand: 'Acer', modelName: 'Aspire 3 Series', slug: 'acer-aspire-3-series',
    processorFamily: 'Intel Core i3', generation: '10th Gen', tier: 'Budget',
    variants: [{ basePrice: 8320 }],
  }),
  mkDevice({
    brand: 'Acer', modelName: 'Predator Series', slug: 'acer-predator-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Gaming',
    gpuType: 'NVIDIA GTX 1650', isGaming: true,
    variants: [{ basePrice: 13980 }],
  }),
  mkDevice({
    brand: 'Acer', modelName: 'Switch Series', slug: 'acer-switch-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Budget',
    variants: [{ basePrice: 11070 }],
  }),
  mkDevice({
    brand: 'Acer', modelName: 'Nitro Spin Series', slug: 'acer-nitro-spin-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Gaming',
    gpuType: 'NVIDIA GTX 1650', isGaming: true,
    variants: [{ basePrice: 13320 }],
  }),
  mkDevice({
    brand: 'Acer', modelName: 'Spin Series', slug: 'acer-spin-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Budget',
    variants: [{ basePrice: 11070 }],
  }),
  mkDevice({
    brand: 'Acer', modelName: 'Acer Chromebook Series', slug: 'acer-acer-chromebook-series',
    processorFamily: 'Intel Core i3', generation: '10th Gen', tier: 'Budget',
    variants: [{ basePrice: 3860 }],
  }),
  mkDevice({
    brand: 'Acer', modelName: 'Swift Series', slug: 'acer-swift-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Budget',
    variants: [{ basePrice: 11640 }],
  }),
  mkDevice({
    brand: 'Acer', modelName: 'Nitro 5 Series', slug: 'acer-nitro-5-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Gaming',
    gpuType: 'NVIDIA GTX 1650', isGaming: true,
    variants: [{ basePrice: 15390 }],
  }),
  mkDevice({
    brand: 'Acer', modelName: 'Aspire 7 Series', slug: 'acer-aspire-7-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Budget',
    variants: [{ basePrice: 17140 }],
  }),
  mkDevice({
    brand: 'Acer', modelName: 'Predator Helios 300 Series', slug: 'acer-predator-helios-300-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Gaming',
    gpuType: 'NVIDIA GTX 1650', isGaming: true,
    variants: [{ basePrice: 20930 }],
  }),
  mkDevice({
    brand: 'Acer', modelName: 'Swift 5 Series', slug: 'acer-swift-5-series',
    processorFamily: 'Intel Core i7', generation: '11th Gen', tier: 'Budget',
    variants: [{ basePrice: 19610 }],
  }),
  mkDevice({
    brand: 'Acer', modelName: 'Extensa Series', slug: 'acer-extensa-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Budget',
    variants: [{ basePrice: 5000 }],
  }),
  mkDevice({
    brand: 'Acer', modelName: 'Swift 3 Series', slug: 'acer-swift-3-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Budget',
    variants: [{ basePrice: 9170 }],
  }),
  mkDevice({
    brand: 'Acer', modelName: 'Nitro 5 Spin Series', slug: 'acer-nitro-5-spin-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Gaming',
    gpuType: 'NVIDIA GTX 1650', isGaming: true,
    variants: [{ basePrice: 15100 }],
  }),
  mkDevice({
    brand: 'Acer', modelName: 'Spin 1 Series', slug: 'acer-spin-1-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Budget',
    variants: [{ basePrice: 4240 }],
  }),
  mkDevice({
    brand: 'Acer', modelName: 'Spin 5 Series', slug: 'acer-spin-5-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Budget',
    variants: [{ basePrice: 9840 }],
  }),
  mkDevice({
    brand: 'Acer', modelName: 'Switch 5 Series', slug: 'acer-switch-5-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Budget',
    variants: [{ basePrice: 11620 }],
  }),
  mkDevice({
    brand: 'Acer', modelName: 'Spin 3 Series', slug: 'acer-spin-3-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Budget',
    variants: [{ basePrice: 8320 }],
  }),
  mkDevice({
    brand: 'Acer', modelName: 'Predator 15 Series', slug: 'acer-predator-15-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Gaming',
    gpuType: 'NVIDIA GTX 1650', isGaming: true,
    variants: [{ basePrice: 16860 }],
  }),
  mkDevice({
    brand: 'Acer', modelName: 'Nitro 7 Series', slug: 'acer-nitro-7-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Gaming',
    gpuType: 'NVIDIA GTX 1650', isGaming: true,
    variants: [{ basePrice: 15910 }],
  }),
  mkDevice({
    brand: 'Acer', modelName: 'Spin 7 Series', slug: 'acer-spin-7-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Budget',
    variants: [{ basePrice: 17240 }],
  }),
  mkDevice({
    brand: 'Acer', modelName: 'Swift 7 Series', slug: 'acer-swift-7-series',
    processorFamily: 'Intel Core i7', generation: '11th Gen', tier: 'Budget',
    variants: [{ basePrice: 18920 }],
  }),
  mkDevice({
    brand: 'Acer', modelName: 'Swift X Series', slug: 'acer-swift-x-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Budget',
    variants: [{ basePrice: 18190 }],
  }),
  mkDevice({
    brand: 'Acer', modelName: 'Swift 3x Series', slug: 'acer-swift-3x-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Budget',
    variants: [{ basePrice: 21510 }],
  }),
  mkDevice({
    brand: 'Acer', modelName: 'ConceptD 3 Series', slug: 'acer-conceptd-3-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Mid-range',
    variants: [{ basePrice: 26730 }],
  }),
  mkDevice({
    brand: 'Acer', modelName: 'ConceptD 5 Series', slug: 'acer-conceptd-5-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Mid-range',
    variants: [{ basePrice: 28290 }],
  }),
  mkDevice({
    brand: 'Acer', modelName: 'ConceptD 7 Series', slug: 'acer-conceptd-7-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Mid-range',
    variants: [{ basePrice: 30670 }],
  }),
  mkDevice({
    brand: 'Acer', modelName: 'ConceptD 9 Series', slug: 'acer-conceptd-9-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Mid-range',
    variants: [{ basePrice: 31780 }],
  }),
  mkDevice({
    brand: 'Acer', modelName: 'Predator Triton 300 Series', slug: 'acer-predator-triton-300-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Gaming',
    gpuType: 'NVIDIA GTX 1650', isGaming: true,
    variants: [{ basePrice: 18760 }],
  }),
  mkDevice({
    brand: 'Acer', modelName: 'Predator Triton 500 Series', slug: 'acer-predator-triton-500-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Gaming',
    gpuType: 'NVIDIA GTX 1650', isGaming: true,
    variants: [{ basePrice: 21130 }],
  }),
  mkDevice({
    brand: 'Acer', modelName: 'Predator Triton 700 Series', slug: 'acer-predator-triton-700-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Gaming',
    gpuType: 'NVIDIA GTX 1650', isGaming: true,
    variants: [{ basePrice: 21500 }],
  }),
  mkDevice({
    brand: 'Acer', modelName: 'Predator Triton 900 Series', slug: 'acer-predator-triton-900-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Gaming',
    gpuType: 'NVIDIA GTX 1650', isGaming: true,
    variants: [{ basePrice: 24230 }],
  }),
  mkDevice({
    brand: 'Acer', modelName: 'Predator Helios 500 Series', slug: 'acer-predator-helios-500-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Gaming',
    gpuType: 'NVIDIA GTX 1650', isGaming: true,
    variants: [{ basePrice: 23730 }],
  }),
  mkDevice({
    brand: 'Acer', modelName: 'Predator Helios 700 Series', slug: 'acer-predator-helios-700-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Gaming',
    gpuType: 'NVIDIA GTX 1650', isGaming: true,
    variants: [{ basePrice: 28100 }],
  }),
  mkDevice({
    brand: 'Acer', modelName: 'Predator 17 Series', slug: 'acer-predator-17-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Gaming',
    gpuType: 'NVIDIA GTX 1650', isGaming: true,
    variants: [{ basePrice: 17710 }],
  }),
  mkDevice({
    brand: 'Acer', modelName: 'Predator 21x Series', slug: 'acer-predator-21x-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Gaming',
    gpuType: 'NVIDIA GTX 1650', isGaming: true,
    variants: [{ basePrice: 18660 }],
  }),
  mkDevice({
    brand: 'Acer', modelName: 'Other Acer Series', slug: 'acer-other-acer-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Budget',
    variants: [{ basePrice: 4240 }],
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