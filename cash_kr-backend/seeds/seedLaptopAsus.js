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
  //  ASUS — All Series
  // ══════════════════════════════════════════════════════
  mkDevice({
    brand: 'Asus', modelName: 'Asus X Series', slug: 'asus-asus-x-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Budget',
    variants: [{ basePrice: 5690 }],
  }),
  mkDevice({
    brand: 'Asus', modelName: 'VivoBook Series', slug: 'asus-vivobook-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Budget',
    variants: [{ basePrice: 9250 }],
  }),
  mkDevice({
    brand: 'Asus', modelName: 'Asus K Series', slug: 'asus-asus-k-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Budget',
    variants: [{ basePrice: 10140 }],
  }),
  mkDevice({
    brand: 'Asus', modelName: 'Asus R Series', slug: 'asus-asus-r-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Budget',
    variants: [{ basePrice: 5540 }],
  }),
  mkDevice({
    brand: 'Asus', modelName: 'Asus E Series', slug: 'asus-asus-e-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Budget',
    variants: [{ basePrice: 4290 }],
  }),
  mkDevice({
    brand: 'Asus', modelName: 'ROG Series', slug: 'asus-rog-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Gaming',
    gpuType: 'NVIDIA GTX 1650', isGaming: true,
    variants: [{ basePrice: 18560 }],
  }),
  mkDevice({
    brand: 'Asus', modelName: 'EeeBook Series', slug: 'asus-eeebook-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Budget',
    variants: [{ basePrice: 3090 }],
  }),
  mkDevice({
    brand: 'Asus', modelName: 'Asus A Series', slug: 'asus-asus-a-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Budget',
    variants: [{ basePrice: 7770 }],
  }),
  mkDevice({
    brand: 'Asus', modelName: 'VivoBook S Series', slug: 'asus-vivobook-s-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Budget',
    variants: [{ basePrice: 7040 }],
  }),
  mkDevice({
    brand: 'Asus', modelName: 'Asus F Series', slug: 'asus-asus-f-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Budget',
    variants: [{ basePrice: 10240 }],
  }),
  mkDevice({
    brand: 'Asus', modelName: 'TUF Gaming Series', slug: 'asus-tuf-gaming-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Gaming',
    gpuType: 'NVIDIA GTX 1650', isGaming: true,
    variants: [{ basePrice: 25000 }],
  }),
  mkDevice({
    brand: 'Asus', modelName: 'ZenBook Series', slug: 'asus-zenbook-series',
    processorFamily: 'Intel Core i7', generation: '11th Gen', tier: 'Budget',
    variants: [{ basePrice: 9080 }],
  }),
  mkDevice({
    brand: 'Asus', modelName: 'Gaming Series', slug: 'asus-gaming-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Gaming',
    gpuType: 'NVIDIA GTX 1650', isGaming: true,
    variants: [{ basePrice: 7830 }],
  }),
  mkDevice({
    brand: 'Asus', modelName: 'Asus Q Series', slug: 'asus-asus-q-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Budget',
    variants: [{ basePrice: 5540 }],
  }),
  mkDevice({
    brand: 'Asus', modelName: 'Asus N Series', slug: 'asus-asus-n-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Budget',
    variants: [{ basePrice: 6210 }],
  }),
  mkDevice({
    brand: 'Asus', modelName: 'VivoBook Pro Series', slug: 'asus-vivobook-pro-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Budget',
    variants: [{ basePrice: 9080 }],
  }),
  mkDevice({
    brand: 'Asus', modelName: 'Asus FX Series', slug: 'asus-asus-fx-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Budget',
    variants: [{ basePrice: 5590 }],
  }),
  mkDevice({
    brand: 'Asus', modelName: 'ROG Strix Series', slug: 'asus-rog-strix-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Gaming',
    gpuType: 'NVIDIA GTX 1650', isGaming: true,
    variants: [{ basePrice: 28400 }],
  }),
  mkDevice({
    brand: 'Asus', modelName: 'AsusPro P Series', slug: 'asus-asuspro-p-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Budget',
    variants: [{ basePrice: 12920 }],
  }),
  mkDevice({
    brand: 'Asus', modelName: 'ZenBook U Series', slug: 'asus-zenbook-u-series',
    processorFamily: 'Intel Core i7', generation: '11th Gen', tier: 'Budget',
    variants: [{ basePrice: 4290 }],
  }),
  mkDevice({
    brand: 'Asus', modelName: 'ZenBook Flip Series', slug: 'asus-zenbook-flip-series',
    processorFamily: 'Intel Core i7', generation: '11th Gen', tier: 'Budget',
    variants: [{ basePrice: 15800 }],
  }),
  mkDevice({
    brand: 'Asus', modelName: 'Asus Chromebook Series', slug: 'asus-asus-chromebook-series',
    processorFamily: 'Intel Core i3', generation: '10th Gen', tier: 'Budget',
    variants: [{ basePrice: 2140 }],
  }),
  mkDevice({
    brand: 'Asus', modelName: 'VivoBook Flip Series', slug: 'asus-vivobook-flip-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Budget',
    variants: [{ basePrice: 10920 }],
  }),
  mkDevice({
    brand: 'Asus', modelName: 'Asus Chromebook Flip Series', slug: 'asus-asus-chromebook-flip-series',
    processorFamily: 'Intel Core i3', generation: '10th Gen', tier: 'Budget',
    variants: [{ basePrice: 17370 }],
  }),
  mkDevice({
    brand: 'Asus', modelName: 'Asus B Series', slug: 'asus-asus-b-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Budget',
    variants: [{ basePrice: 7550 }],
  }),
  mkDevice({
    brand: 'Asus', modelName: 'Asus NX Series', slug: 'asus-asus-nx-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Budget',
    variants: [{ basePrice: 8220 }],
  }),
  mkDevice({
    brand: 'Asus', modelName: 'Asus P series', slug: 'asus-asus-p-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Budget',
    variants: [{ basePrice: 5540 }],
  }),
  mkDevice({
    brand: 'Asus', modelName: 'ZenBook S Series', slug: 'asus-zenbook-s-series',
    processorFamily: 'Intel Core i7', generation: '11th Gen', tier: 'Budget',
    variants: [{ basePrice: 5540 }],
  }),
  mkDevice({
    brand: 'Asus', modelName: 'AsusPro B Series', slug: 'asus-asuspro-b-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Budget',
    variants: [{ basePrice: 12920 }],
  }),
  mkDevice({
    brand: 'Asus', modelName: 'Asus FZ Series', slug: 'asus-asus-fz-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Budget',
    variants: [{ basePrice: 8220 }],
  }),
  mkDevice({
    brand: 'Asus', modelName: 'ZenBook Pro Series', slug: 'asus-zenbook-pro-series',
    processorFamily: 'Intel Core i7', generation: '11th Gen', tier: 'Mid-range',
    variants: [{ basePrice: 26050 }],
  }),
  mkDevice({
    brand: 'Asus', modelName: 'ROG Zephyrus Series', slug: 'asus-rog-zephyrus-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Gaming',
    gpuType: 'NVIDIA GTX 1650', isGaming: true,
    variants: [{ basePrice: 32920 }],
  }),
  mkDevice({
    brand: 'Asus', modelName: 'Asus V Series', slug: 'asus-asus-v-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Budget',
    variants: [{ basePrice: 4290 }],
  }),
  mkDevice({
    brand: 'Asus', modelName: 'ProArt StudioBook Series', slug: 'asus-proart-studiobook-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Mid-range',
    variants: [{ basePrice: 26830 }],
  }),
  mkDevice({
    brand: 'Asus', modelName: 'Other Asus Series', slug: 'asus-other-asus-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Budget',
    variants: [{ basePrice: 4290 }],
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