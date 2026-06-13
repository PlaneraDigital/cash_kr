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
  //  DELL — All Series
  // ══════════════════════════════════════════════════════
  mkDevice({
    brand: 'Dell', modelName: 'G15 Gaming Series', slug: 'dell-g15-gaming-series',
    processorFamily: 'AMD Ryzen 7', generation: '6000 Series', tier: 'Gaming',
    gpuType: 'NVIDIA RTX 3060', isGaming: true,
    variants: [
      { processor: 'AMD Ryzen 5', generation: '6000 Series', ram: '8GB', storage: '512GB SSD', basePrice: 22000 },
      { processor: 'AMD Ryzen 5', generation: '6000 Series', ram: '16GB', storage: '512GB SSD', basePrice: 25299 },
      { processor: 'AMD Ryzen 7', generation: '6000 Series', ram: '16GB', storage: '512GB SSD', basePrice: 28600 },
      { processor: 'AMD Ryzen 7', generation: '6000 Series', ram: '16GB', storage: '1TB SSD', basePrice: 33000 },
      { processor: 'AMD Ryzen 7', generation: '6000 Series', ram: '32GB', storage: '1TB SSD', basePrice: 38500 }
    ],
  }),
  mkDevice({
    brand: 'Dell', modelName: 'G16 Gaming Series', slug: 'dell-g16-gaming-series',
    processorFamily: 'AMD Ryzen 7', generation: '6000 Series', tier: 'Gaming',
    gpuType: 'NVIDIA RTX 3060', isGaming: true,
    variants: [
      { processor: 'AMD Ryzen 5', generation: '6000 Series', ram: '8GB', storage: '512GB SSD', basePrice: 20000 },
      { processor: 'AMD Ryzen 5', generation: '6000 Series', ram: '16GB', storage: '512GB SSD', basePrice: 23000 },
      { processor: 'AMD Ryzen 7', generation: '6000 Series', ram: '16GB', storage: '512GB SSD', basePrice: 26000 },
      { processor: 'AMD Ryzen 7', generation: '6000 Series', ram: '16GB', storage: '1TB SSD', basePrice: 30000 },
      { processor: 'AMD Ryzen 7', generation: '6000 Series', ram: '32GB', storage: '1TB SSD', basePrice: 35000 }
    ],
  }),
  mkDevice({
    brand: 'Dell', modelName: 'Vostro 3000 Series', slug: 'dell-vostro-3000-series',
    processorFamily: 'Intel Core i3', generation: '11th Gen', tier: 'Budget',
    variants: [
      { ram: '4GB', storage: '256GB SSD', basePrice: 12500 },
      { ram: '8GB', storage: '256GB SSD', basePrice: 14374 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 16250 }
    ],
  }),
  mkDevice({
    brand: 'Dell', modelName: 'Vostro 5000 Series', slug: 'dell-vostro-5000-series',
    processorFamily: 'Intel Core i5', generation: '11th Gen', tier: 'Budget',
    variants: [
      { ram: '4GB', storage: '256GB SSD', basePrice: 13500 },
      { ram: '8GB', storage: '256GB SSD', basePrice: 15524 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 17550 }
    ],
  }),
  mkDevice({
    brand: 'Dell', modelName: 'Vostro 7000 Series', slug: 'dell-vostro-7000-series',
    processorFamily: 'Intel Core i7', generation: '12th Gen', tier: 'Budget',
    variants: [
      { ram: '4GB', storage: '256GB SSD', basePrice: 14000 },
      { ram: '8GB', storage: '256GB SSD', basePrice: 16099 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 18200 }
    ],
  }),
  mkDevice({
    brand: 'Dell', modelName: 'Latitude 3000 2-in-1 Series', slug: 'dell-latitude-3000-2-in-1-series',
    processorFamily: 'Intel Core i3', generation: '10th Gen', tier: 'Budget',
    variants: [
      { ram: '4GB', storage: '256GB SSD', basePrice: 9000 },
      { ram: '8GB', storage: '256GB SSD', basePrice: 10350 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 11700 }
    ],
  }),
  mkDevice({
    brand: 'Dell', modelName: 'Latitude 5000 2-in-1 Series', slug: 'dell-latitude-5000-2-in-1-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Budget',
    variants: [
      { ram: '4GB', storage: '256GB SSD', basePrice: 10500 },
      { ram: '8GB', storage: '256GB SSD', basePrice: 12074 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 13650 }
    ],
  }),
  mkDevice({
    brand: 'Dell', modelName: 'Latitude 7000 2-in-1 Series', slug: 'dell-latitude-7000-2-in-1-series',
    processorFamily: 'Intel Core i7', generation: '10th Gen', tier: 'Budget',
    variants: [
      { ram: '4GB', storage: '256GB SSD', basePrice: 11500 },
      { ram: '8GB', storage: '256GB SSD', basePrice: 13224 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 14950 }
    ],
  }),
  mkDevice({
    brand: 'Dell', modelName: 'Latitude 9000 2-in-1 Series', slug: 'dell-latitude-9000-2-in-1-series',
    processorFamily: 'Intel Core i7', generation: '11th Gen', tier: 'Mid-range',
    variants: [
      { ram: '8GB', storage: '256GB SSD', basePrice: 18500 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 20720 },
      { ram: '16GB', storage: '512GB SSD', basePrice: 23125 }
    ],
  }),
  mkDevice({
    brand: 'Dell', modelName: 'Dell 15 Series', slug: 'dell-dell-15-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Budget',
    variants: [
      { ram: '4GB', storage: '256GB SSD', basePrice: 17000 },
      { ram: '8GB', storage: '256GB SSD', basePrice: 19550 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 22100 }
    ],
  }),
  mkDevice({
    brand: 'Dell', modelName: 'Inspiron Series', slug: 'dell-inspiron-series',
    processorFamily: 'Intel Core i5', generation: '11th Gen', tier: 'Budget',
    variants: [
      { ram: '4GB', storage: '256GB SSD', basePrice: 12690 },
      { ram: '8GB', storage: '256GB SSD', basePrice: 14593 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 16497 }
    ],
  }),
  mkDevice({
    brand: 'Dell', modelName: 'Inspiron 3000 Series', slug: 'dell-inspiron-3000-series',
    processorFamily: 'Intel Core i3', generation: '10th Gen', tier: 'Budget',
    variants: [
      { ram: '4GB', storage: '256GB SSD', basePrice: 10400 },
      { ram: '8GB', storage: '256GB SSD', basePrice: 11959 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 13520 }
    ],
  }),
  mkDevice({
    brand: 'Dell', modelName: 'Inspiron 3000 2-in-1 Series', slug: 'dell-inspiron-3000-2-in-1-series',
    processorFamily: 'Intel Core i3', generation: '10th Gen', tier: 'Budget',
    variants: [
      { ram: '4GB', storage: '256GB SSD', basePrice: 8500 },
      { ram: '8GB', storage: '256GB SSD', basePrice: 9775 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 11050 }
    ],
  }),
  mkDevice({
    brand: 'Dell', modelName: 'Inspiron 5000 Series', slug: 'dell-inspiron-5000-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Budget',
    variants: [
      { ram: '4GB', storage: '256GB SSD', basePrice: 10600 },
      { ram: '8GB', storage: '256GB SSD', basePrice: 12189 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 13780 }
    ],
  }),
  mkDevice({
    brand: 'Dell', modelName: 'Inspiron 5000 2-in-1 Series', slug: 'dell-inspiron-5000-2-in-1-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Budget',
    variants: [
      { ram: '4GB', storage: '256GB SSD', basePrice: 10800 },
      { ram: '8GB', storage: '256GB SSD', basePrice: 12419 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 14040 }
    ],
  }),
  mkDevice({
    brand: 'Dell', modelName: 'Inspiron 7000 Series', slug: 'dell-inspiron-7000-series',
    processorFamily: 'Intel Core i7', generation: '11th Gen', tier: 'Budget',
    variants: [
      { ram: '4GB', storage: '256GB SSD', basePrice: 13200 },
      { ram: '8GB', storage: '256GB SSD', basePrice: 15179 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 17160 }
    ],
  }),
  mkDevice({
    brand: 'Dell', modelName: 'Inspiron 7000 2-in-1 Series', slug: 'dell-inspiron-7000-2-in-1-series',
    processorFamily: 'Intel Core i7', generation: '11th Gen', tier: 'Budget',
    variants: [
      { ram: '4GB', storage: '256GB SSD', basePrice: 14000 },
      { ram: '8GB', storage: '256GB SSD', basePrice: 16099 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 18200 }
    ],
  }),
  mkDevice({
    brand: 'Dell', modelName: 'Inspiron N5000 Series', slug: 'dell-inspiron-n5000-series',
    processorFamily: 'Intel Core i5', generation: '5th Gen', tier: 'Budget',
    variants: [
      { ram: '4GB', storage: '256GB SSD', basePrice: 6500 },
      { ram: '8GB', storage: '256GB SSD', basePrice: 7474 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 8450 }
    ],
  }),
  mkDevice({
    brand: 'Dell', modelName: 'Inspiron Gaming Series', slug: 'dell-inspiron-gaming-series',
    processorFamily: 'Intel Core i5', generation: '7th Gen', tier: 'Gaming',
    gpuType: 'NVIDIA GTX 1050', isGaming: true,
    variants: [
      { processor: 'Intel Core i5', generation: '7th Gen', ram: '8GB', storage: '512GB SSD', basePrice: 9800 },
      { processor: 'Intel Core i5', generation: '7th Gen', ram: '16GB', storage: '512GB SSD', basePrice: 11270 },
      { processor: 'Intel Core i5', generation: '7th Gen', ram: '16GB', storage: '512GB SSD', basePrice: 12740 },
      { processor: 'Intel Core i5', generation: '7th Gen', ram: '16GB', storage: '1TB SSD', basePrice: 14700 },
      { processor: 'Intel Core i5', generation: '7th Gen', ram: '32GB', storage: '1TB SSD', basePrice: 17150 }
    ],
  }),
  mkDevice({
    brand: 'Dell', modelName: 'Vostro Series', slug: 'dell-vostro-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Budget',
    variants: [
      { ram: '4GB', storage: '256GB SSD', basePrice: 11590 },
      { ram: '8GB', storage: '256GB SSD', basePrice: 13328 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 15067 }
    ],
  }),
  mkDevice({
    brand: 'Dell', modelName: 'Latitude Series', slug: 'dell-latitude-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Budget',
    variants: [
      { ram: '4GB', storage: '256GB SSD', basePrice: 9790 },
      { ram: '8GB', storage: '256GB SSD', basePrice: 11258 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 12727 }
    ],
  }),
  mkDevice({
    brand: 'Dell', modelName: 'Latitude E3000 Series', slug: 'dell-latitude-e3000-series',
    processorFamily: 'Intel Core i3', generation: '10th Gen', tier: 'Budget',
    variants: [
      { ram: '4GB', storage: '256GB SSD', basePrice: 9000 },
      { ram: '8GB', storage: '256GB SSD', basePrice: 10350 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 11700 }
    ],
  }),
  mkDevice({
    brand: 'Dell', modelName: 'Latitude E4000 Series', slug: 'dell-latitude-e4000-series',
    processorFamily: 'Intel Core i5', generation: '2nd Gen', tier: 'Budget',
    variants: [
      { ram: '4GB', storage: '256GB SSD', basePrice: 7000 },
      { ram: '8GB', storage: '256GB SSD', basePrice: 8049 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 9100 }
    ],
  }),
  mkDevice({
    brand: 'Dell', modelName: 'Latitude E5000 Series', slug: 'dell-latitude-e5000-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Budget',
    variants: [
      { ram: '4GB', storage: '256GB SSD', basePrice: 12000 },
      { ram: '8GB', storage: '256GB SSD', basePrice: 13799 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 15600 }
    ],
  }),
  mkDevice({
    brand: 'Dell', modelName: 'Latitude E6000 Series', slug: 'dell-latitude-e6000-series',
    processorFamily: 'Intel Core i5', generation: '3rd Gen', tier: 'Budget',
    variants: [
      { ram: '4GB', storage: '256GB SSD', basePrice: 11000 },
      { ram: '8GB', storage: '256GB SSD', basePrice: 12649 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 14300 }
    ],
  }),
  mkDevice({
    brand: 'Dell', modelName: 'Latitude E7000 Series', slug: 'dell-latitude-e7000-series',
    processorFamily: 'Intel Core i7', generation: '10th Gen', tier: 'Budget',
    variants: [
      { ram: '4GB', storage: '256GB SSD', basePrice: 12500 },
      { ram: '8GB', storage: '256GB SSD', basePrice: 14374 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 16250 }
    ],
  }),
  mkDevice({
    brand: 'Dell', modelName: 'Latitude 3000 Series', slug: 'dell-latitude-3000-series',
    processorFamily: 'Intel Core i3', generation: '10th Gen', tier: 'Budget',
    variants: [
      { ram: '4GB', storage: '256GB SSD', basePrice: 9500 },
      { ram: '8GB', storage: '256GB SSD', basePrice: 10925 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 12350 }
    ],
  }),
  mkDevice({
    brand: 'Dell', modelName: 'Latitude 5000 Series', slug: 'dell-latitude-5000-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Budget',
    variants: [
      { ram: '4GB', storage: '256GB SSD', basePrice: 11100 },
      { ram: '8GB', storage: '256GB SSD', basePrice: 12764 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 14430 }
    ],
  }),
  mkDevice({
    brand: 'Dell', modelName: 'Latitude 6000 Series', slug: 'dell-latitude-6000-series',
    processorFamily: 'Intel Core i5', generation: '3rd Gen', tier: 'Budget',
    variants: [
      { ram: '4GB', storage: '256GB SSD', basePrice: 8000 },
      { ram: '8GB', storage: '256GB SSD', basePrice: 9200 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 10400 }
    ],
  }),
  mkDevice({
    brand: 'Dell', modelName: 'Latitude 7000 Series', slug: 'dell-latitude-7000-series',
    processorFamily: 'Intel Core i7', generation: '10th Gen', tier: 'Budget',
    variants: [
      { ram: '4GB', storage: '256GB SSD', basePrice: 13000 },
      { ram: '8GB', storage: '256GB SSD', basePrice: 14949 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 16900 }
    ],
  }),
  mkDevice({
    brand: 'Dell', modelName: 'Latitude 9000 Series', slug: 'dell-latitude-9000-series',
    processorFamily: 'Intel Core i7', generation: '11th Gen', tier: 'Mid-range',
    variants: [
      { ram: '8GB', storage: '256GB SSD', basePrice: 19000 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 21280 },
      { ram: '16GB', storage: '512GB SSD', basePrice: 23750 }
    ],
  }),
  mkDevice({
    brand: 'Dell', modelName: 'Precision Series', slug: 'dell-precision-series',
    processorFamily: 'Intel Core i7', generation: '11th Gen', tier: 'Mid-range',
    variants: [
      { ram: '8GB', storage: '256GB SSD', basePrice: 22620 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 25334 },
      { ram: '16GB', storage: '512GB SSD', basePrice: 28275 }
    ],
  }),
  mkDevice({
    brand: 'Dell', modelName: 'Studio Series', slug: 'dell-studio-series',
    processorFamily: 'Intel Core i5', generation: '7th Gen', tier: 'Budget',
    variants: [
      { ram: '4GB', storage: '256GB SSD', basePrice: 5760 },
      { ram: '8GB', storage: '256GB SSD', basePrice: 6623 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 7488 }
    ],
  }),
  mkDevice({
    brand: 'Dell', modelName: 'Alienware Series', slug: 'dell-alienware-series',
    processorFamily: 'Intel Core i7', generation: '10th Gen', tier: 'Gaming',
    gpuType: 'NVIDIA RTX 2070', isGaming: true,
    variants: [
      { processor: 'Intel Core i5', generation: '10th Gen', ram: '8GB', storage: '512GB SSD', basePrice: 17700 },
      { processor: 'Intel Core i5', generation: '10th Gen', ram: '16GB', storage: '512GB SSD', basePrice: 20355 },
      { processor: 'Intel Core i7', generation: '10th Gen', ram: '16GB', storage: '512GB SSD', basePrice: 23010 },
      { processor: 'Intel Core i7', generation: '10th Gen', ram: '16GB', storage: '1TB SSD', basePrice: 26550 },
      { processor: 'Intel Core i7', generation: '10th Gen', ram: '32GB', storage: '1TB SSD', basePrice: 30975 }
    ],
  }),
  mkDevice({
    brand: 'Dell', modelName: 'Dell Chromebook Series', slug: 'dell-dell-chromebook-series',
    processorFamily: 'Intel Celeron', generation: 'N Series', tier: 'Budget',
    variants: [
      { ram: '4GB', storage: '256GB SSD', basePrice: 3070 },
      { ram: '8GB', storage: '256GB SSD', basePrice: 3530 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 3991 }
    ],
  }),
  mkDevice({
    brand: 'Dell', modelName: 'G7 Gaming Series', slug: 'dell-g7-gaming-series',
    processorFamily: 'Intel Core i7', generation: '10th Gen', tier: 'Gaming',
    gpuType: 'NVIDIA RTX 2060', isGaming: true,
    variants: [
      { processor: 'Intel Core i5', generation: '10th Gen', ram: '8GB', storage: '512GB SSD', basePrice: 25220 },
      { processor: 'Intel Core i5', generation: '10th Gen', ram: '16GB', storage: '512GB SSD', basePrice: 29002 },
      { processor: 'Intel Core i7', generation: '10th Gen', ram: '16GB', storage: '512GB SSD', basePrice: 32786 },
      { processor: 'Intel Core i7', generation: '10th Gen', ram: '16GB', storage: '1TB SSD', basePrice: 37830 },
      { processor: 'Intel Core i7', generation: '10th Gen', ram: '32GB', storage: '1TB SSD', basePrice: 44135 }
    ],
  }),
  mkDevice({
    brand: 'Dell', modelName: 'G5 Gaming Series', slug: 'dell-g5-gaming-series',
    processorFamily: 'Intel Core i7', generation: '9th Gen', tier: 'Gaming',
    gpuType: 'NVIDIA GTX 1660 Ti', isGaming: true,
    variants: [
      { processor: 'Intel Core i5', generation: '9th Gen', ram: '8GB', storage: '512GB SSD', basePrice: 16920 },
      { processor: 'Intel Core i5', generation: '9th Gen', ram: '16GB', storage: '512GB SSD', basePrice: 19458 },
      { processor: 'Intel Core i7', generation: '9th Gen', ram: '16GB', storage: '512GB SSD', basePrice: 21996 },
      { processor: 'Intel Core i7', generation: '9th Gen', ram: '16GB', storage: '1TB SSD', basePrice: 25380 },
      { processor: 'Intel Core i7', generation: '9th Gen', ram: '32GB', storage: '1TB SSD', basePrice: 29610 }
    ],
  }),
  mkDevice({
    brand: 'Dell', modelName: 'G3 Gaming Series', slug: 'dell-g3-gaming-series',
    processorFamily: 'Intel Core i5', generation: '9th Gen', tier: 'Gaming',
    gpuType: 'NVIDIA GTX 1650', isGaming: true,
    variants: [
      { processor: 'Intel Core i5', generation: '9th Gen', ram: '8GB', storage: '512GB SSD', basePrice: 16780 },
      { processor: 'Intel Core i5', generation: '9th Gen', ram: '16GB', storage: '512GB SSD', basePrice: 19297 },
      { processor: 'Intel Core i5', generation: '9th Gen', ram: '16GB', storage: '512GB SSD', basePrice: 21814 },
      { processor: 'Intel Core i5', generation: '9th Gen', ram: '16GB', storage: '1TB SSD', basePrice: 25170 },
      { processor: 'Intel Core i5', generation: '9th Gen', ram: '32GB', storage: '1TB SSD', basePrice: 29365 }
    ],
  }),
  mkDevice({
    brand: 'Dell', modelName: 'XPS Series', slug: 'dell-xps-series',
    processorFamily: 'Intel Core i7', generation: '12th Gen', tier: 'Budget',
    variants: [
      { ram: '4GB', storage: '256GB SSD', basePrice: 11840 },
      { ram: '8GB', storage: '256GB SSD', basePrice: 13615 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 15392 }
    ],
  }),
  mkDevice({
    brand: 'Dell', modelName: 'Other Dell Series', slug: 'dell-other-dell-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Budget',
    variants: [
      { ram: '4GB', storage: '256GB SSD', basePrice: 1270 },
      { ram: '8GB', storage: '256GB SSD', basePrice: 1460 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 1651 }
    ],
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