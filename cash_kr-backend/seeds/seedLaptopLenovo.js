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
  //  LENOVO — All Series
  // ══════════════════════════════════════════════════════
  mkDevice({
    brand: 'Lenovo', modelName: 'IdeaPad 5 Series', slug: 'lenovo-ideapad-5-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Budget',
    variants: [{ basePrice: 12500 }],
  }),
  mkDevice({
    brand: 'Lenovo', modelName: 'Yoga Slim 7 Series', slug: 'lenovo-yoga-slim-7-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Mid-range',
    variants: [{ basePrice: 26500 }],
  }),
  mkDevice({
    brand: 'Lenovo', modelName: 'Lenovo LOQ Series', slug: 'lenovo-lenovo-loq-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Gaming',
    gpuType: 'NVIDIA GTX 1650', isGaming: true,
    variants: [{ basePrice: 27570 }],
  }),
  mkDevice({
    brand: 'Lenovo', modelName: 'Legion 5i Series', slug: 'lenovo-legion-5i-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Gaming',
    gpuType: 'NVIDIA GTX 1650', isGaming: true,
    variants: [{ basePrice: 35000 }],
  }),
  mkDevice({
    brand: 'Lenovo', modelName: 'Legion Slim 5 Series', slug: 'lenovo-legion-slim-5-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Gaming',
    gpuType: 'NVIDIA GTX 1650', isGaming: true,
    variants: [{ basePrice: 29000 }],
  }),
  mkDevice({
    brand: 'Lenovo', modelName: 'Legion Slim 5i Series', slug: 'lenovo-legion-slim-5i-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Gaming',
    gpuType: 'NVIDIA RTX 3050', isGaming: true,
    variants: [{ basePrice: 38000 }],
  }),
  mkDevice({
    brand: 'Lenovo', modelName: 'Legion 5i Pro Series', slug: 'lenovo-legion-5i-pro-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Gaming',
    gpuType: 'NVIDIA RTX 3050', isGaming: true,
    variants: [{ basePrice: 43000 }],
  }),
  mkDevice({
    brand: 'Lenovo', modelName: 'Legion Pro 5 Series', slug: 'lenovo-legion-pro-5-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Gaming',
    gpuType: 'NVIDIA RTX 3050', isGaming: true,
    variants: [{ basePrice: 40000 }],
  }),
  mkDevice({
    brand: 'Lenovo', modelName: 'Legion Pro 5i Series', slug: 'lenovo-legion-pro-5i-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Gaming',
    gpuType: 'NVIDIA RTX 3050', isGaming: true,
    variants: [{ basePrice: 39000 }],
  }),
  mkDevice({
    brand: 'Lenovo', modelName: 'Legion Pro 7i Series', slug: 'lenovo-legion-pro-7i-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Gaming',
    gpuType: 'NVIDIA RTX 3050', isGaming: true,
    variants: [{ basePrice: 50000 }],
  }),
  mkDevice({
    brand: 'Lenovo', modelName: 'IdeaPad 300 Series', slug: 'lenovo-ideapad-300-series',
    processorFamily: 'Intel Core i3', generation: '10th Gen', tier: 'Budget',
    variants: [{ basePrice: 11480 }],
  }),
  mkDevice({
    brand: 'Lenovo', modelName: 'IdeaPad 500 Series', slug: 'lenovo-ideapad-500-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Budget',
    variants: [{ basePrice: 6310 }],
  }),
  mkDevice({
    brand: 'Lenovo', modelName: 'Thinkpad T Series', slug: 'lenovo-thinkpad-t-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Budget',
    variants: [{ basePrice: 6050 }],
  }),
  mkDevice({
    brand: 'Lenovo', modelName: 'IdeaPad 100 Series', slug: 'lenovo-ideapad-100-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Budget',
    variants: [{ basePrice: 4970 }],
  }),
  mkDevice({
    brand: 'Lenovo', modelName: 'IdeaPad S Series', slug: 'lenovo-ideapad-s-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Budget',
    variants: [{ basePrice: 5540 }],
  }),
  mkDevice({
    brand: 'Lenovo', modelName: 'Yoga 500 Series', slug: 'lenovo-yoga-500-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Budget',
    variants: [{ basePrice: 10020 }],
  }),
  mkDevice({
    brand: 'Lenovo', modelName: 'Thinkpad L Series', slug: 'lenovo-thinkpad-l-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Budget',
    variants: [{ basePrice: 8690 }],
  }),
  mkDevice({
    brand: 'Lenovo', modelName: 'Lenovo Y Series', slug: 'lenovo-lenovo-y-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Budget',
    variants: [{ basePrice: 18780 }],
  }),
  mkDevice({
    brand: 'Lenovo', modelName: 'IdeaPad Flex Series', slug: 'lenovo-ideapad-flex-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Budget',
    variants: [{ basePrice: 6700 }],
  }),
  mkDevice({
    brand: 'Lenovo', modelName: 'Thinkpad E Series', slug: 'lenovo-thinkpad-e-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Budget',
    variants: [{ basePrice: 11880 }],
  }),
  mkDevice({
    brand: 'Lenovo', modelName: 'IdeaPad Slim 3i Series', slug: 'lenovo-ideapad-slim-3i-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Budget',
    variants: [{ basePrice: 17330 }],
  }),
  mkDevice({
    brand: 'Lenovo', modelName: 'Lenovo V Series', slug: 'lenovo-lenovo-v-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Budget',
    variants: [{ basePrice: 6380 }],
  }),
  mkDevice({
    brand: 'Lenovo', modelName: 'Thinkpad X Series', slug: 'lenovo-thinkpad-x-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Budget',
    variants: [{ basePrice: 7330 }],
  }),
  mkDevice({
    brand: 'Lenovo', modelName: 'Thinkpad Edge Series', slug: 'lenovo-thinkpad-edge-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Gaming',
    gpuType: 'NVIDIA GTX 1650', isGaming: true,
    variants: [{ basePrice: 5110 }],
  }),
  mkDevice({
    brand: 'Lenovo', modelName: 'Lenovo 300e Series', slug: 'lenovo-lenovo-300e-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Budget',
    variants: [{ basePrice: 5690 }],
  }),
  mkDevice({
    brand: 'Lenovo', modelName: 'Legion Series', slug: 'lenovo-legion-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Gaming',
    gpuType: 'NVIDIA GTX 1650', isGaming: true,
    variants: [{ basePrice: 16870 }],
  }),
  mkDevice({
    brand: 'Lenovo', modelName: 'Lenovo N Series', slug: 'lenovo-lenovo-n-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Budget',
    variants: [{ basePrice: 4490 }],
  }),
  mkDevice({
    brand: 'Lenovo', modelName: 'Lenovo 500e Series', slug: 'lenovo-lenovo-500e-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Budget',
    variants: [{ basePrice: 3980 }],
  }),
  mkDevice({
    brand: 'Lenovo', modelName: 'Yoga 700 Series', slug: 'lenovo-yoga-700-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Budget',
    variants: [{ basePrice: 10340 }],
  }),
  mkDevice({
    brand: 'Lenovo', modelName: 'IdeaPad Gaming Series', slug: 'lenovo-ideapad-gaming-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Gaming',
    gpuType: 'NVIDIA GTX 1650', isGaming: true,
    variants: [{ basePrice: 20110 }],
  }),
  mkDevice({
    brand: 'Lenovo', modelName: 'Thinkpad A Series', slug: 'lenovo-thinkpad-a-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Budget',
    variants: [{ basePrice: 5490 }],
  }),
  mkDevice({
    brand: 'Lenovo', modelName: 'Yoga 900 Series', slug: 'lenovo-yoga-900-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Budget',
    variants: [{ basePrice: 10340 }],
  }),
  mkDevice({
    brand: 'Lenovo', modelName: 'IdeaPad D Series', slug: 'lenovo-ideapad-d-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Budget',
    variants: [{ basePrice: 5950 }],
  }),
  mkDevice({
    brand: 'Lenovo', modelName: 'Thinkpad Twist Series', slug: 'lenovo-thinkpad-twist-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Budget',
    variants: [{ basePrice: 6460 }],
  }),
  mkDevice({
    brand: 'Lenovo', modelName: 'IdeaPad 700 Series', slug: 'lenovo-ideapad-700-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Budget',
    variants: [{ basePrice: 6980 }],
  }),
  mkDevice({
    brand: 'Lenovo', modelName: 'Yoga C Series', slug: 'lenovo-yoga-c-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Budget',
    variants: [{ basePrice: 4680 }],
  }),
  mkDevice({
    brand: 'Lenovo', modelName: 'Thinkpad 11e Series', slug: 'lenovo-thinkpad-11e-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Budget',
    variants: [{ basePrice: 5590 }],
  }),
  mkDevice({
    brand: 'Lenovo', modelName: 'Legion 5 Series', slug: 'lenovo-legion-5-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Gaming',
    gpuType: 'NVIDIA GTX 1650', isGaming: true,
    variants: [{ basePrice: 21860 }],
  }),
  mkDevice({
    brand: 'Lenovo', modelName: 'IdeaPad Slim 5i Series', slug: 'lenovo-ideapad-slim-5i-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Budget',
    variants: [{ basePrice: 22250 }],
  }),
  mkDevice({
    brand: 'Lenovo', modelName: 'ThinkBook Series', slug: 'lenovo-thinkbook-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Budget',
    variants: [{ basePrice: 5850 }],
  }),
  mkDevice({
    brand: 'Lenovo', modelName: 'Thinkpad P Series', slug: 'lenovo-thinkpad-p-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Budget',
    variants: [{ basePrice: 7620 }],
  }),
  mkDevice({
    brand: 'Lenovo', modelName: 'Lenovo 100e Series', slug: 'lenovo-lenovo-100e-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Budget',
    variants: [{ basePrice: 3980 }],
  }),
  mkDevice({
    brand: 'Lenovo', modelName: 'Lenovo 11e Series', slug: 'lenovo-lenovo-11e-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Budget',
    variants: [{ basePrice: 2880 }],
  }),
  mkDevice({
    brand: 'Lenovo', modelName: 'Thinkpad Helix Series', slug: 'lenovo-thinkpad-helix-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Budget',
    variants: [{ basePrice: 6080 }],
  }),
  mkDevice({
    brand: 'Lenovo', modelName: 'IdeaPad 900 Series', slug: 'lenovo-ideapad-900-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Budget',
    variants: [{ basePrice: 10520 }],
  }),
  mkDevice({
    brand: 'Lenovo', modelName: 'Legion 7 Series', slug: 'lenovo-legion-7-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Gaming',
    gpuType: 'NVIDIA GTX 1650', isGaming: true,
    variants: [{ basePrice: 32850 }],
  }),
  mkDevice({
    brand: 'Lenovo', modelName: 'Student Chromebooks', slug: 'lenovo-student-chromebooks',
    processorFamily: 'Intel Core i3', generation: '10th Gen', tier: 'Budget',
    variants: [{ basePrice: 1320 }],
  }),
  mkDevice({
    brand: 'Lenovo', modelName: 'Other Lenovo Series', slug: 'lenovo-other-lenovo-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Budget',
    variants: [{ basePrice: 4410 }],
  }),
  mkDevice({
    brand: 'Lenovo', modelName: 'Legion 9i Series', slug: 'lenovo-legion-9i-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Gaming',
    gpuType: 'NVIDIA RTX 4060', isGaming: true,
    variants: [{ basePrice: 60000 }],
  }),
  mkDevice({
    brand: 'Lenovo', modelName: 'Yoga 6 Series', slug: 'lenovo-yoga-6-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Mid-range',
    variants: [{ basePrice: 25000 }],
  }),
  mkDevice({
    brand: 'Lenovo', modelName: 'Yoga Slim 6i Series', slug: 'lenovo-yoga-slim-6i-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Mid-range',
    variants: [{ basePrice: 30000 }],
  }),
  mkDevice({
    brand: 'Lenovo', modelName: 'Yoga 7 Series', slug: 'lenovo-yoga-7-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Mid-range',
    variants: [{ basePrice: 26000 }],
  }),
  mkDevice({
    brand: 'Lenovo', modelName: 'Yoga 7i Series', slug: 'lenovo-yoga-7i-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Mid-range',
    variants: [{ basePrice: 35000 }],
  }),
  mkDevice({
    brand: 'Lenovo', modelName: 'Yoga Pro 7i Series', slug: 'lenovo-yoga-pro-7i-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Mid-range',
    variants: [{ basePrice: 40000 }],
  }),
  mkDevice({
    brand: 'Lenovo', modelName: 'Yoga Slim 7i Series', slug: 'lenovo-yoga-slim-7i-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Mid-range',
    variants: [{ basePrice: 38000 }],
  }),
  mkDevice({
    brand: 'Lenovo', modelName: 'Yoga 9i Series', slug: 'lenovo-yoga-9i-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Mid-range',
    variants: [{ basePrice: 50000 }],
  }),
  mkDevice({
    brand: 'Lenovo', modelName: 'Yoga Book 9i Series', slug: 'lenovo-yoga-book-9i-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Mid-range',
    variants: [{ basePrice: 55000 }],
  }),
  mkDevice({
    brand: 'Lenovo', modelName: 'Thinkpad X1 Series', slug: 'lenovo-thinkpad-x1-series',
    processorFamily: 'Intel Core i7', generation: '11th Gen', tier: 'Mid-range',
    variants: [{ basePrice: 30000 }],
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