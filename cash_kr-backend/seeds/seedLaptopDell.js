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
  //  DELL — All Series
  // ══════════════════════════════════════════════════════
  mkDevice({
    brand: 'Dell', modelName: 'G15 Gaming Series', slug: 'dell-g15-gaming-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Gaming',
    gpuType: 'NVIDIA GTX 1650', isGaming: true,
    variants: [{ basePrice: 22000 }],
  }),
  mkDevice({
    brand: 'Dell', modelName: 'G16 Gaming Series', slug: 'dell-g16-gaming-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Gaming',
    gpuType: 'NVIDIA GTX 1650', isGaming: true,
    variants: [{ basePrice: 20000 }],
  }),
  mkDevice({
    brand: 'Dell', modelName: 'Vostro 3000 Series', slug: 'dell-vostro-3000-series',
    processorFamily: 'Intel Core i3', generation: '10th Gen', tier: 'Budget',
    variants: [{ basePrice: 12500 }],
  }),
  mkDevice({
    brand: 'Dell', modelName: 'Vostro 5000 Series', slug: 'dell-vostro-5000-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Budget',
    variants: [{ basePrice: 13500 }],
  }),
  mkDevice({
    brand: 'Dell', modelName: 'Vostro 7000 Series', slug: 'dell-vostro-7000-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Budget',
    variants: [{ basePrice: 14000 }],
  }),
  mkDevice({
    brand: 'Dell', modelName: 'Latitude 3000 2-in-1 Series', slug: 'dell-latitude-3000-2-in-1-series',
    processorFamily: 'Intel Core i3', generation: '10th Gen', tier: 'Budget',
    variants: [{ basePrice: 9000 }],
  }),
  mkDevice({
    brand: 'Dell', modelName: 'Latitude 5000 2-in-1 Series', slug: 'dell-latitude-5000-2-in-1-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Budget',
    variants: [{ basePrice: 10500 }],
  }),
  mkDevice({
    brand: 'Dell', modelName: 'Latitude 7000 2-in-1 Series', slug: 'dell-latitude-7000-2-in-1-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Budget',
    variants: [{ basePrice: 11500 }],
  }),
  mkDevice({
    brand: 'Dell', modelName: 'Latitude 9000 2-in-1 Series', slug: 'dell-latitude-9000-2-in-1-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Budget',
    variants: [{ basePrice: 18500 }],
  }),
  mkDevice({
    brand: 'Dell', modelName: 'Dell 15 Series', slug: 'dell-dell-15-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Budget',
    variants: [{ basePrice: 17000 }],
  }),
  mkDevice({
    brand: 'Dell', modelName: 'Inspiron Series', slug: 'dell-inspiron-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Budget',
    variants: [{ basePrice: 12690 }],
  }),
  mkDevice({
    brand: 'Dell', modelName: 'Inspiron 3000 Series', slug: 'dell-inspiron-3000-series',
    processorFamily: 'Intel Core i3', generation: '10th Gen', tier: 'Budget',
    variants: [{ basePrice: 10400 }],
  }),
  mkDevice({
    brand: 'Dell', modelName: 'Inspiron 3000 2-in-1 Series', slug: 'dell-inspiron-3000-2-in-1-series',
    processorFamily: 'Intel Core i3', generation: '10th Gen', tier: 'Budget',
    variants: [{ basePrice: 8500 }],
  }),
  mkDevice({
    brand: 'Dell', modelName: 'Inspiron 5000 Series', slug: 'dell-inspiron-5000-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Budget',
    variants: [{ basePrice: 10600 }],
  }),
  mkDevice({
    brand: 'Dell', modelName: 'Inspiron 5000 2-in-1 Series', slug: 'dell-inspiron-5000-2-in-1-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Budget',
    variants: [{ basePrice: 10800 }],
  }),
  mkDevice({
    brand: 'Dell', modelName: 'Inspiron 7000 Series', slug: 'dell-inspiron-7000-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Budget',
    variants: [{ basePrice: 13200 }],
  }),
  mkDevice({
    brand: 'Dell', modelName: 'Inspiron 7000 2-in-1 Series', slug: 'dell-inspiron-7000-2-in-1-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Budget',
    variants: [{ basePrice: 14000 }],
  }),
  mkDevice({
    brand: 'Dell', modelName: 'Inspiron N5000 Series', slug: 'dell-inspiron-n5000-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Budget',
    variants: [{ basePrice: 6500 }],
  }),
  mkDevice({
    brand: 'Dell', modelName: 'Inspiron Gaming Series', slug: 'dell-inspiron-gaming-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Gaming',
    gpuType: 'NVIDIA GTX 1650', isGaming: true,
    variants: [{ basePrice: 9800 }],
  }),
  mkDevice({
    brand: 'Dell', modelName: 'Vostro Series', slug: 'dell-vostro-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Budget',
    variants: [{ basePrice: 11590 }],
  }),
  mkDevice({
    brand: 'Dell', modelName: 'Latitude Series', slug: 'dell-latitude-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Budget',
    variants: [{ basePrice: 9790 }],
  }),
  mkDevice({
    brand: 'Dell', modelName: 'Latitude E3000 Series', slug: 'dell-latitude-e3000-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Budget',
    variants: [{ basePrice: 9000 }],
  }),
  mkDevice({
    brand: 'Dell', modelName: 'Latitude E4000 Series', slug: 'dell-latitude-e4000-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Budget',
    variants: [{ basePrice: 7000 }],
  }),
  mkDevice({
    brand: 'Dell', modelName: 'Latitude E5000 Series', slug: 'dell-latitude-e5000-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Budget',
    variants: [{ basePrice: 12000 }],
  }),
  mkDevice({
    brand: 'Dell', modelName: 'Latitude E6000 Series', slug: 'dell-latitude-e6000-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Budget',
    variants: [{ basePrice: 11000 }],
  }),
  mkDevice({
    brand: 'Dell', modelName: 'Latitude E7000 Series', slug: 'dell-latitude-e7000-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Budget',
    variants: [{ basePrice: 12500 }],
  }),
  mkDevice({
    brand: 'Dell', modelName: 'Latitude 3000 Series', slug: 'dell-latitude-3000-series',
    processorFamily: 'Intel Core i3', generation: '10th Gen', tier: 'Budget',
    variants: [{ basePrice: 9500 }],
  }),
  mkDevice({
    brand: 'Dell', modelName: 'Latitude 5000 Series', slug: 'dell-latitude-5000-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Budget',
    variants: [{ basePrice: 11100 }],
  }),
  mkDevice({
    brand: 'Dell', modelName: 'Latitude 6000 Series', slug: 'dell-latitude-6000-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Budget',
    variants: [{ basePrice: 8000 }],
  }),
  mkDevice({
    brand: 'Dell', modelName: 'Latitude 7000 Series', slug: 'dell-latitude-7000-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Budget',
    variants: [{ basePrice: 13000 }],
  }),
  mkDevice({
    brand: 'Dell', modelName: 'Latitude 9000 Series', slug: 'dell-latitude-9000-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Budget',
    variants: [{ basePrice: 19000 }],
  }),
  mkDevice({
    brand: 'Dell', modelName: 'Precision Series', slug: 'dell-precision-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Budget',
    variants: [{ basePrice: 22620 }],
  }),
  mkDevice({
    brand: 'Dell', modelName: 'Studio Series', slug: 'dell-studio-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Budget',
    variants: [{ basePrice: 5760 }],
  }),
  mkDevice({
    brand: 'Dell', modelName: 'Alienware Series', slug: 'dell-alienware-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Gaming',
    gpuType: 'NVIDIA GTX 1650', isGaming: true,
    variants: [{ basePrice: 17700 }],
  }),
  mkDevice({
    brand: 'Dell', modelName: 'Dell Chromebook Series', slug: 'dell-dell-chromebook-series',
    processorFamily: 'Intel Core i3', generation: '10th Gen', tier: 'Budget',
    variants: [{ basePrice: 3070 }],
  }),
  mkDevice({
    brand: 'Dell', modelName: 'G7 Gaming Series', slug: 'dell-g7-gaming-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Gaming',
    gpuType: 'NVIDIA GTX 1650', isGaming: true,
    variants: [{ basePrice: 25220 }],
  }),
  mkDevice({
    brand: 'Dell', modelName: 'G5 Gaming Series', slug: 'dell-g5-gaming-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Gaming',
    gpuType: 'NVIDIA GTX 1650', isGaming: true,
    variants: [{ basePrice: 16920 }],
  }),
  mkDevice({
    brand: 'Dell', modelName: 'G3 Gaming Series', slug: 'dell-g3-gaming-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Gaming',
    gpuType: 'NVIDIA GTX 1650', isGaming: true,
    variants: [{ basePrice: 16780 }],
  }),
  mkDevice({
    brand: 'Dell', modelName: 'XPS Series', slug: 'dell-xps-series',
    processorFamily: 'Intel Core i7', generation: '11th Gen', tier: 'Budget',
    variants: [{ basePrice: 11840 }],
  }),
  mkDevice({
    brand: 'Dell', modelName: 'Other Dell Series', slug: 'dell-other-dell-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Budget',
    variants: [{ basePrice: 1270 }],
  }),
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');
    await Device.deleteMany({ category: 'laptop', brand: 'Dell' });
    console.log('Cleared existing Dell laptop devices');
    await Device.insertMany(devices);
    console.log(`✅ Seeded ${devices.length} Dell laptop devices successfully`);
    process.exit(0);
  } catch (err) {
    console.error('❌ Seed failed:', err.message);
    process.exit(1);
  }
}

seed();