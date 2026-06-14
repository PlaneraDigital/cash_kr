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
  //  ASUS — All Series
  // ══════════════════════════════════════════════════════
  mkDevice({
    brand: 'Asus', modelName: 'Asus X Series', slug: 'asus-asus-x-series',
    processorFamily: 'Intel Core i3', generation: '6th Gen', tier: 'Budget',
    variants: [
      { ram: '4GB', storage: '256GB SSD', basePrice: 5690 },
      { ram: '8GB', storage: '256GB SSD', basePrice: 6543 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 7397 }
    ],
  }),
  mkDevice({
    brand: 'Asus', modelName: 'VivoBook Series', slug: 'asus-vivobook-series',
    processorFamily: 'AMD Ryzen 5', generation: '5000 Series', tier: 'Budget',
    variants: [
      { ram: '4GB', storage: '256GB SSD', basePrice: 9250 },
      { ram: '8GB', storage: '256GB SSD', basePrice: 10637 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 12025 }
    ],
  }),
  mkDevice({
    brand: 'Asus', modelName: 'Asus K Series', slug: 'asus-asus-k-series',
    processorFamily: 'Intel Core i5', generation: '8th Gen', tier: 'Budget',
    variants: [
      { ram: '4GB', storage: '256GB SSD', basePrice: 10140 },
      { ram: '8GB', storage: '256GB SSD', basePrice: 11661 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 13182 }
    ],
  }),
  mkDevice({
    brand: 'Asus', modelName: 'Asus R Series', slug: 'asus-asus-r-series',
    processorFamily: 'AMD A-Series', generation: 'AMD', tier: 'Budget',
    variants: [
      { ram: '4GB', storage: '256GB SSD', basePrice: 5540 },
      { ram: '8GB', storage: '256GB SSD', basePrice: 6370 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 7202 }
    ],
  }),
  mkDevice({
    brand: 'Asus', modelName: 'Asus E Series', slug: 'asus-asus-e-series',
    processorFamily: 'Intel Celeron', generation: 'N Series', tier: 'Budget',
    variants: [
      { ram: '4GB', storage: '256GB SSD', basePrice: 4290 },
      { ram: '8GB', storage: '256GB SSD', basePrice: 4933 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 5577 }
    ],
  }),
  mkDevice({
    brand: 'Asus', modelName: 'ROG Series', slug: 'asus-rog-series',
    processorFamily: 'Intel Core i7', generation: '10th Gen', tier: 'Gaming',
    gpuType: 'NVIDIA RTX 2060', isGaming: true,
    variants: [
      { processor: 'Intel Core i5', generation: '10th Gen', ram: '8GB', storage: '512GB SSD', basePrice: 18560 },
      { processor: 'Intel Core i5', generation: '10th Gen', ram: '16GB', storage: '512GB SSD', basePrice: 21344 },
      { processor: 'Intel Core i7', generation: '10th Gen', ram: '16GB', storage: '512GB SSD', basePrice: 24128 },
      { processor: 'Intel Core i7', generation: '10th Gen', ram: '16GB', storage: '1TB SSD', basePrice: 27840 },
      { processor: 'Intel Core i7', generation: '10th Gen', ram: '32GB', storage: '1TB SSD', basePrice: 32480 }
    ],
  }),
  mkDevice({
    brand: 'Asus', modelName: 'EeeBook Series', slug: 'asus-eeebook-series',
    processorFamily: 'Intel Celeron', generation: 'N Series', tier: 'Budget',
    variants: [
      { ram: '4GB', storage: '256GB SSD', basePrice: 3090 },
      { ram: '8GB', storage: '256GB SSD', basePrice: 3553 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 4017 }
    ],
  }),
  mkDevice({
    brand: 'Asus', modelName: 'Asus A Series', slug: 'asus-asus-a-series',
    processorFamily: 'Intel Core i3', generation: '7th Gen', tier: 'Budget',
    variants: [
      { ram: '4GB', storage: '256GB SSD', basePrice: 7770 },
      { ram: '8GB', storage: '256GB SSD', basePrice: 8935 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 10101 }
    ],
  }),
  mkDevice({
    brand: 'Asus', modelName: 'VivoBook S Series', slug: 'asus-vivobook-s-series',
    processorFamily: 'AMD Ryzen 5', generation: '5000 Series', tier: 'Budget',
    variants: [
      { ram: '4GB', storage: '256GB SSD', basePrice: 7040 },
      { ram: '8GB', storage: '256GB SSD', basePrice: 8095 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 9152 }
    ],
  }),
  mkDevice({
    brand: 'Asus', modelName: 'Asus F Series', slug: 'asus-asus-f-series',
    processorFamily: 'Intel Core i5', generation: '8th Gen', tier: 'Budget',
    variants: [
      { ram: '4GB', storage: '256GB SSD', basePrice: 10240 },
      { ram: '8GB', storage: '256GB SSD', basePrice: 11776 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 13312 }
    ],
  }),
  mkDevice({
    brand: 'Asus', modelName: 'TUF Gaming Series', slug: 'asus-tuf-gaming-series',
    processorFamily: 'AMD Ryzen 5', generation: '5000 Series', tier: 'Gaming',
    gpuType: 'NVIDIA RTX 3050', isGaming: true,
    variants: [
      { processor: 'AMD Ryzen 5', generation: '5000 Series', ram: '8GB', storage: '512GB SSD', basePrice: 25000 },
      { processor: 'AMD Ryzen 5', generation: '5000 Series', ram: '16GB', storage: '512GB SSD', basePrice: 28749 },
      { processor: 'AMD Ryzen 5', generation: '5000 Series', ram: '16GB', storage: '512GB SSD', basePrice: 32500 },
      { processor: 'AMD Ryzen 5', generation: '5000 Series', ram: '16GB', storage: '1TB SSD', basePrice: 37500 },
      { processor: 'AMD Ryzen 5', generation: '5000 Series', ram: '32GB', storage: '1TB SSD', basePrice: 43750 }
    ],
  }),
  mkDevice({
    brand: 'Asus', modelName: 'ZenBook Series', slug: 'asus-zenbook-series',
    processorFamily: 'Intel Core i7', generation: '12th Gen', tier: 'Budget',
    variants: [
      { ram: '4GB', storage: '256GB SSD', basePrice: 9080 },
      { ram: '8GB', storage: '256GB SSD', basePrice: 10442 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 11804 }
    ],
  }),
  mkDevice({
    brand: 'Asus', modelName: 'Gaming Series', slug: 'asus-gaming-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Gaming',
    gpuType: 'NVIDIA GTX 1650', isGaming: true,
    variants: [
      { processor: 'Intel Core i5', generation: '10th Gen', ram: '8GB', storage: '512GB SSD', basePrice: 7830 },
      { processor: 'Intel Core i5', generation: '10th Gen', ram: '16GB', storage: '512GB SSD', basePrice: 9004 },
      { processor: 'Intel Core i5', generation: '10th Gen', ram: '16GB', storage: '512GB SSD', basePrice: 10179 },
      { processor: 'Intel Core i5', generation: '10th Gen', ram: '16GB', storage: '1TB SSD', basePrice: 11745 },
      { processor: 'Intel Core i5', generation: '10th Gen', ram: '32GB', storage: '1TB SSD', basePrice: 13702 }
    ],
  }),
  mkDevice({
    brand: 'Asus', modelName: 'Asus Q Series', slug: 'asus-asus-q-series',
    processorFamily: 'Intel Core i5', generation: '6th Gen', tier: 'Budget',
    variants: [
      { ram: '4GB', storage: '256GB SSD', basePrice: 5540 },
      { ram: '8GB', storage: '256GB SSD', basePrice: 6370 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 7202 }
    ],
  }),
  mkDevice({
    brand: 'Asus', modelName: 'Asus N Series', slug: 'asus-asus-n-series',
    processorFamily: 'Intel Core i5', generation: '8th Gen', tier: 'Budget',
    variants: [
      { ram: '4GB', storage: '256GB SSD', basePrice: 6210 },
      { ram: '8GB', storage: '256GB SSD', basePrice: 7141 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 8073 }
    ],
  }),
  mkDevice({
    brand: 'Asus', modelName: 'VivoBook Pro Series', slug: 'asus-vivobook-pro-series',
    processorFamily: 'Intel Core i5', generation: '11th Gen', tier: 'Budget',
    variants: [
      { ram: '4GB', storage: '256GB SSD', basePrice: 9080 },
      { ram: '8GB', storage: '256GB SSD', basePrice: 10442 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 11804 }
    ],
  }),
  mkDevice({
    brand: 'Asus', modelName: 'Asus FX Series', slug: 'asus-asus-fx-series',
    processorFamily: 'Intel Core i5', generation: '9th Gen', tier: 'Budget',
    gpuType: 'NVIDIA GTX 1650', isGaming: true,
    variants: [
      { processor: 'Intel Core i5', generation: '9th Gen', ram: '8GB', storage: '512GB SSD', basePrice: 5590 },
      { processor: 'Intel Core i5', generation: '9th Gen', ram: '16GB', storage: '512GB SSD', basePrice: 6428 },
      { processor: 'Intel Core i5', generation: '9th Gen', ram: '16GB', storage: '512GB SSD', basePrice: 7267 },
      { processor: 'Intel Core i5', generation: '9th Gen', ram: '16GB', storage: '1TB SSD', basePrice: 8385 },
      { processor: 'Intel Core i5', generation: '9th Gen', ram: '32GB', storage: '1TB SSD', basePrice: 9782 }
    ],
  }),
  mkDevice({
    brand: 'Asus', modelName: 'ROG Strix Series', slug: 'asus-rog-strix-series',
    processorFamily: 'Intel Core i7', generation: '12th Gen', tier: 'Gaming',
    gpuType: 'NVIDIA RTX 3070', isGaming: true,
    variants: [
      { processor: 'Intel Core i5', generation: '12th Gen', ram: '8GB', storage: '512GB SSD', basePrice: 28400 },
      { processor: 'Intel Core i5', generation: '12th Gen', ram: '16GB', storage: '512GB SSD', basePrice: 32659 },
      { processor: 'Intel Core i7', generation: '12th Gen', ram: '16GB', storage: '512GB SSD', basePrice: 36920 },
      { processor: 'Intel Core i7', generation: '12th Gen', ram: '16GB', storage: '1TB SSD', basePrice: 42600 },
      { processor: 'Intel Core i7', generation: '12th Gen', ram: '32GB', storage: '1TB SSD', basePrice: 49700 }
    ],
  }),
  mkDevice({
    brand: 'Asus', modelName: 'AsusPro P Series', slug: 'asus-asuspro-p-series',
    processorFamily: 'Intel Core i5', generation: '8th Gen', tier: 'Budget',
    variants: [
      { ram: '4GB', storage: '256GB SSD', basePrice: 12920 },
      { ram: '8GB', storage: '256GB SSD', basePrice: 14857 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 16796 }
    ],
  }),
  mkDevice({
    brand: 'Asus', modelName: 'ZenBook U Series', slug: 'asus-zenbook-u-series',
    processorFamily: 'Intel Core i5', generation: '6th Gen', tier: 'Budget',
    variants: [
      { ram: '4GB', storage: '256GB SSD', basePrice: 4290 },
      { ram: '8GB', storage: '256GB SSD', basePrice: 4933 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 5577 }
    ],
  }),
  mkDevice({
    brand: 'Asus', modelName: 'ZenBook Flip Series', slug: 'asus-zenbook-flip-series',
    processorFamily: 'Intel Core i7', generation: '11th Gen', tier: 'Budget',
    variants: [
      { ram: '4GB', storage: '256GB SSD', basePrice: 15800 },
      { ram: '8GB', storage: '256GB SSD', basePrice: 18170 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 20540 }
    ],
  }),
  mkDevice({
    brand: 'Asus', modelName: 'Asus Chromebook Series', slug: 'asus-asus-chromebook-series',
    processorFamily: 'Intel Celeron', generation: 'N Series', tier: 'Budget',
    variants: [
      { ram: '4GB', storage: '256GB SSD', basePrice: 2140 },
      { ram: '8GB', storage: '256GB SSD', basePrice: 2461 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 2782 }
    ],
  }),
  mkDevice({
    brand: 'Asus', modelName: 'VivoBook Flip Series', slug: 'asus-vivobook-flip-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Budget',
    variants: [
      { ram: '4GB', storage: '256GB SSD', basePrice: 10920 },
      { ram: '8GB', storage: '256GB SSD', basePrice: 12557 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 14196 }
    ],
  }),
  mkDevice({
    brand: 'Asus', modelName: 'Asus Chromebook Flip Series', slug: 'asus-asus-chromebook-flip-series',
    processorFamily: 'Intel Core i3', generation: '10th Gen', tier: 'Budget',
    variants: [
      { ram: '4GB', storage: '256GB SSD', basePrice: 17370 },
      { ram: '8GB', storage: '256GB SSD', basePrice: 19975 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 22581 }
    ],
  }),
  mkDevice({
    brand: 'Asus', modelName: 'Asus B Series', slug: 'asus-asus-b-series',
    processorFamily: 'Intel Core i3', generation: '7th Gen', tier: 'Budget',
    variants: [
      { ram: '4GB', storage: '256GB SSD', basePrice: 7550 },
      { ram: '8GB', storage: '256GB SSD', basePrice: 8682 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 9815 }
    ],
  }),
  mkDevice({
    brand: 'Asus', modelName: 'Asus NX Series', slug: 'asus-asus-nx-series',
    processorFamily: 'Intel Core i5', generation: '8th Gen', tier: 'Budget',
    variants: [
      { ram: '4GB', storage: '256GB SSD', basePrice: 8220 },
      { ram: '8GB', storage: '256GB SSD', basePrice: 9453 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 10686 }
    ],
  }),
  mkDevice({
    brand: 'Asus', modelName: 'Asus P series', slug: 'asus-asus-p-series',
    processorFamily: 'Intel Core i5', generation: '7th Gen', tier: 'Budget',
    variants: [
      { ram: '4GB', storage: '256GB SSD', basePrice: 5540 },
      { ram: '8GB', storage: '256GB SSD', basePrice: 6370 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 7202 }
    ],
  }),
  mkDevice({
    brand: 'Asus', modelName: 'ZenBook S Series', slug: 'asus-zenbook-s-series',
    processorFamily: 'Intel Core i7', generation: '12th Gen', tier: 'Budget',
    variants: [
      { ram: '4GB', storage: '256GB SSD', basePrice: 5540 },
      { ram: '8GB', storage: '256GB SSD', basePrice: 6370 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 7202 }
    ],
  }),
  mkDevice({
    brand: 'Asus', modelName: 'AsusPro B Series', slug: 'asus-asuspro-b-series',
    processorFamily: 'Intel Core i5', generation: '8th Gen', tier: 'Budget',
    variants: [
      { ram: '4GB', storage: '256GB SSD', basePrice: 12920 },
      { ram: '8GB', storage: '256GB SSD', basePrice: 14857 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 16796 }
    ],
  }),
  mkDevice({
    brand: 'Asus', modelName: 'Asus FZ Series', slug: 'asus-asus-fz-series',
    processorFamily: 'Intel Core i5', generation: '8th Gen', tier: 'Budget',
    variants: [
      { ram: '4GB', storage: '256GB SSD', basePrice: 8220 },
      { ram: '8GB', storage: '256GB SSD', basePrice: 9453 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 10686 }
    ],
  }),
  mkDevice({
    brand: 'Asus', modelName: 'ZenBook Pro Series', slug: 'asus-zenbook-pro-series',
    processorFamily: 'Intel Core i9', generation: '12th Gen', tier: 'Mid-range',
    variants: [
      { ram: '8GB', storage: '256GB SSD', basePrice: 26050 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 29176 },
      { ram: '16GB', storage: '512GB SSD', basePrice: 32562 }
    ],
  }),
  mkDevice({
    brand: 'Asus', modelName: 'ROG Zephyrus Series', slug: 'asus-rog-zephyrus-series',
    processorFamily: 'AMD Ryzen 9', generation: '6000 Series', tier: 'Gaming',
    gpuType: 'NVIDIA RTX 3080', isGaming: true,
    variants: [
      { processor: 'AMD Ryzen 5', generation: '6000 Series', ram: '8GB', storage: '512GB SSD', basePrice: 32920 },
      { processor: 'AMD Ryzen 5', generation: '6000 Series', ram: '16GB', storage: '512GB SSD', basePrice: 37858 },
      { processor: 'AMD Ryzen 9', generation: '6000 Series', ram: '16GB', storage: '512GB SSD', basePrice: 42796 },
      { processor: 'AMD Ryzen 9', generation: '6000 Series', ram: '16GB', storage: '1TB SSD', basePrice: 49380 },
      { processor: 'AMD Ryzen 9', generation: '6000 Series', ram: '32GB', storage: '1TB SSD', basePrice: 57610 }
    ],
  }),
  mkDevice({
    brand: 'Asus', modelName: 'Asus V Series', slug: 'asus-asus-v-series',
    processorFamily: 'AMD A-Series', generation: 'AMD', tier: 'Budget',
    variants: [
      { ram: '4GB', storage: '256GB SSD', basePrice: 4290 },
      { ram: '8GB', storage: '256GB SSD', basePrice: 4933 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 5577 }
    ],
  }),
  mkDevice({
    brand: 'Asus', modelName: 'ProArt StudioBook Series', slug: 'asus-proart-studiobook-series',
    processorFamily: 'Intel Core i9', generation: '12th Gen', tier: 'Mid-range',
    variants: [
      { ram: '8GB', storage: '256GB SSD', basePrice: 26830 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 30049 },
      { ram: '16GB', storage: '512GB SSD', basePrice: 33537 }
    ],
  }),
  mkDevice({
    brand: 'Asus', modelName: 'Other Asus Series', slug: 'asus-other-asus-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Budget',
    variants: [
      { ram: '4GB', storage: '256GB SSD', basePrice: 4290 },
      { ram: '8GB', storage: '256GB SSD', basePrice: 4933 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 5577 }
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