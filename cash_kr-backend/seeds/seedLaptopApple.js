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
  mkDevice({
    brand: 'Apple', modelName: 'Macbook Air 2025', slug: 'apple-macbook-air-2025',
    processorFamily: 'Apple M4 Pro', generation: 'M-Series', tier: 'Premium',
    variants: [{ basePrice: 70000 }],
  }),
  mkDevice({
    brand: 'Apple', modelName: 'MacBook Pro 2025', slug: 'apple-macbook-pro-2025',
    processorFamily: 'Apple M4 Pro', generation: 'M-Series', tier: 'Premium',
    variants: [{ basePrice: 95000 }],
  }),
  mkDevice({
    brand: 'Apple', modelName: 'Macbook Neo Series', slug: 'apple-macbook-neo-series',
    processorFamily: 'Apple M2', generation: 'M-Series', tier: 'Mid-range',
    variants: [{ basePrice: 36000 }],
  }),
  mkDevice({
    brand: 'Apple', modelName: 'Macbook Air 2026', slug: 'apple-macbook-air-2026',
    processorFamily: 'Apple M4 Pro', generation: 'M-Series', tier: 'Premium',
    variants: [{ basePrice: 70000 }],
  }),
  mkDevice({
    brand: 'Apple', modelName: 'MacBook Pro 2024', slug: 'apple-macbook-pro-2024',
    processorFamily: 'Apple M4', generation: 'M-Series', tier: 'Premium',
    variants: [{ basePrice: 65000 }],
  }),
  mkDevice({
    brand: 'Apple', modelName: 'MacBook Pro 2023', slug: 'apple-macbook-pro-2023',
    processorFamily: 'Apple M2', generation: 'M-Series', tier: 'Premium',
    variants: [{ basePrice: 70000 }],
  }),
  mkDevice({
    brand: 'Apple', modelName: 'MacBook Pro 2022', slug: 'apple-macbook-pro-2022',
    processorFamily: 'Apple M2', generation: 'M-Series', tier: 'Premium',
    variants: [{ basePrice: 62000 }],
  }),
  mkDevice({
    brand: 'Apple', modelName: 'MacBook Pro 2020 (Touch Bar, Four Thunderbolt 3 ports)', slug: 'apple-macbook-pro-2020-touch-bar-four-thunderbolt-3-ports',
    processorFamily: 'Intel Core i5', generation: 'Intel', tier: 'Mid-range',
    variants: [{ basePrice: 43640 }],
  }),
  mkDevice({
    brand: 'Apple', modelName: 'MacBook Pro 2021', slug: 'apple-macbook-pro-2021',
    processorFamily: 'Apple M1 Pro', generation: 'M-Series', tier: 'Premium',
    variants: [{ basePrice: 60000 }],
  }),
  mkDevice({
    brand: 'Apple', modelName: 'MacBook Pro 2020 (Touch Bar, Two Thunderbolt 3 ports)', slug: 'apple-macbook-pro-2020-touch-bar-two-thunderbolt-3-ports',
    processorFamily: 'Intel Core i5', generation: 'Intel', tier: 'Mid-range',
    variants: [{ basePrice: 35450 }],
  }),
  mkDevice({
    brand: 'Apple', modelName: 'MacBook Pro 2020', slug: 'apple-macbook-pro-2020',
    processorFamily: 'Intel Core i5', generation: 'Intel', tier: 'Mid-range',
    variants: [{ basePrice: 42000 }],
  }),
  mkDevice({
    brand: 'Apple', modelName: 'MacBook Pro 2019', slug: 'apple-macbook-pro-2019',
    processorFamily: 'Intel Core i5', generation: 'Intel', tier: 'Mid-range',
    variants: [{ basePrice: 36070 }],
  }),
  mkDevice({
    brand: 'Apple', modelName: 'MacBook Pro 2019 (Touch Bar, Four Thunderbolt 3 ports)', slug: 'apple-macbook-pro-2019-touch-bar-four-thunderbolt-3-ports',
    processorFamily: 'Intel Core i5', generation: 'Intel', tier: 'Mid-range',
    variants: [{ basePrice: 35450 }],
  }),
  mkDevice({
    brand: 'Apple', modelName: 'MacBook Pro 2019 (Touch Bar, Two Thunderbolt 3 ports)', slug: 'apple-macbook-pro-2019-touch-bar-two-thunderbolt-3-ports',
    processorFamily: 'Intel Core i5', generation: 'Intel', tier: 'Mid-range',
    variants: [{ basePrice: 33310 }],
  }),
  mkDevice({
    brand: 'Apple', modelName: 'MacBook Pro 2019 (Touch Bar)', slug: 'apple-macbook-pro-2019-touch-bar',
    processorFamily: 'Intel Core i5', generation: 'Intel', tier: 'Mid-range',
    variants: [{ basePrice: 36160 }],
  }),
  mkDevice({
    brand: 'Apple', modelName: 'MacBook Pro (Mid-2018, Touch Bar, Four Thunderbolt 3 Ports)', slug: 'apple-macbook-pro-mid-2018-touch-bar-four-thunderbolt-3-ports',
    processorFamily: 'Intel Core i5', generation: 'Intel', tier: 'Mid-range',
    variants: [{ basePrice: 32920 }],
  }),
  mkDevice({
    brand: 'Apple', modelName: 'MacBook Pro (Mid-2017, Touch Bar, Four Thunderbolt 3 Ports)', slug: 'apple-macbook-pro-mid-2017-touch-bar-four-thunderbolt-3-ports',
    processorFamily: 'Intel Core i5', generation: 'Intel', tier: 'Budget',
    variants: [{ basePrice: 27860 }],
  }),
  mkDevice({
    brand: 'Apple', modelName: 'MacBook Pro (Mid-2017, Two Thunderbolt 3 Ports)', slug: 'apple-macbook-pro-mid-2017-two-thunderbolt-3-ports',
    processorFamily: 'Intel Core i5', generation: 'Intel', tier: 'Budget',
    variants: [{ basePrice: 26170 }],
  }),
  mkDevice({
    brand: 'Apple', modelName: 'MacBook Pro (Late 2016, Touch Bar, Four Thunderbolt 3 Ports)', slug: 'apple-macbook-pro-late-2016-touch-bar-four-thunderbolt-3-ports',
    processorFamily: 'Intel Core i5', generation: 'Intel', tier: 'Budget',
    variants: [{ basePrice: 27860 }],
  }),
  mkDevice({
    brand: 'Apple', modelName: 'MacBook Pro (Late 2016, Two Thunderbolt 3 Ports)', slug: 'apple-macbook-pro-late-2016-two-thunderbolt-3-ports',
    processorFamily: 'Intel Core i5', generation: 'Intel', tier: 'Budget',
    variants: [{ basePrice: 25320 }],
  }),
  mkDevice({
    brand: 'Apple', modelName: 'MacBook Pro Retina Mid 2015', slug: 'apple-macbook-pro-retina-mid-2015',
    processorFamily: 'Intel Core i5', generation: 'Intel', tier: 'Budget',
    variants: [{ basePrice: 24890 }],
  }),
  mkDevice({
    brand: 'Apple', modelName: 'MacBook Pro Retina Early 2015', slug: 'apple-macbook-pro-retina-early-2015',
    processorFamily: 'Intel Core i5', generation: 'Intel', tier: 'Budget',
    variants: [{ basePrice: 15000 }],
  }),
  mkDevice({
    brand: 'Apple', modelName: 'MacBook Pro Retina Mid 2014', slug: 'apple-macbook-pro-retina-mid-2014',
    processorFamily: 'Intel Core i5', generation: 'Intel', tier: 'Budget',
    variants: [{ basePrice: 18440 }],
  }),
  mkDevice({
    brand: 'Apple', modelName: 'MacBook Pro Retina Late 2013', slug: 'apple-macbook-pro-retina-late-2013',
    processorFamily: 'Intel Core i5', generation: 'Intel', tier: 'Budget',
    variants: [{ basePrice: 14510 }],
  }),
  mkDevice({
    brand: 'Apple', modelName: 'MacBook Pro Retina Early 2013', slug: 'apple-macbook-pro-retina-early-2013',
    processorFamily: 'Intel Core i5', generation: 'Intel', tier: 'Budget',
    variants: [{ basePrice: 13930 }],
  }),
  mkDevice({
    brand: 'Apple', modelName: 'MacBook Air 2023', slug: 'apple-macbook-air-2023',
    processorFamily: 'Apple M2', generation: 'M-Series', tier: 'Mid-range',
    variants: [{ basePrice: 54350 }],
  }),
  mkDevice({
    brand: 'Apple', modelName: 'MacBook Air 2022', slug: 'apple-macbook-air-2022',
    processorFamily: 'Apple M2', generation: 'M-Series', tier: 'Mid-range',
    variants: [{ basePrice: 48520 }],
  }),
  mkDevice({
    brand: 'Apple', modelName: 'MacBook Air 2020', slug: 'apple-macbook-air-2020',
    processorFamily: 'Apple M1', generation: 'M-Series', tier: 'Mid-range',
    variants: [{ basePrice: 35650 }],
  }),
  mkDevice({
    brand: 'Apple', modelName: 'MacBook Air 2024', slug: 'apple-macbook-air-2024',
    processorFamily: 'Apple M3', generation: 'M-Series', tier: 'Premium',
    variants: [{ basePrice: 60000 }],
  }),
  mkDevice({
    brand: 'Apple', modelName: 'MacBook Air 2019', slug: 'apple-macbook-air-2019',
    processorFamily: 'Intel Core i5', generation: 'Intel', tier: 'Budget',
    variants: [{ basePrice: 26750 }],
  }),
  mkDevice({
    brand: 'Apple', modelName: 'MacBook Air 2018', slug: 'apple-macbook-air-2018',
    processorFamily: 'Intel Core i5', generation: 'Intel', tier: 'Budget',
    variants: [{ basePrice: 23030 }],
  }),
  mkDevice({
    brand: 'Apple', modelName: 'MacBook Air Mid 2017', slug: 'apple-macbook-air-mid-2017',
    processorFamily: 'Intel Core i5', generation: 'Intel', tier: 'Budget',
    variants: [{ basePrice: 17720 }],
  }),
  mkDevice({
    brand: 'Apple', modelName: 'MacBook Air Early 2015', slug: 'apple-macbook-air-early-2015',
    processorFamily: 'Intel Core i5', generation: 'Intel', tier: 'Budget',
    variants: [{ basePrice: 14510 }],
  }),
  mkDevice({
    brand: 'Apple', modelName: 'MacBook Air Early 2014', slug: 'apple-macbook-air-early-2014',
    processorFamily: 'Intel Core i5', generation: 'Intel', tier: 'Budget',
    variants: [{ basePrice: 11400 }],
  }),
  mkDevice({
    brand: 'Apple', modelName: 'MacBook Air Mid 2013', slug: 'apple-macbook-air-mid-2013',
    processorFamily: 'Intel Core i5', generation: 'Intel', tier: 'Budget',
    variants: [{ basePrice: 11400 }],
  }),
  mkDevice({
    brand: 'Apple', modelName: 'MacBook Retina Mid 2017', slug: 'apple-macbook-retina-mid-2017',
    processorFamily: 'Intel Core i5', generation: 'Intel', tier: 'Budget',
    variants: [{ basePrice: 18420 }],
  }),
  mkDevice({
    brand: 'Apple', modelName: 'MacBook Retina Early 2016', slug: 'apple-macbook-retina-early-2016',
    processorFamily: 'Intel Core i5', generation: 'Intel', tier: 'Budget',
    variants: [{ basePrice: 15540 }],
  }),
  mkDevice({
    brand: 'Apple', modelName: 'MacBook Retina Early 2015', slug: 'apple-macbook-retina-early-2015',
    processorFamily: 'Intel Core i5', generation: 'Intel', tier: 'Budget',
    variants: [{ basePrice: 13810 }],
  }),
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');
    await Device.deleteMany({ category: 'laptop', brand: 'Apple' });
    console.log('Cleared existing Apple laptop devices');
    await Device.insertMany(devices);
    console.log(`✅ Seeded ${devices.length} Apple laptop devices successfully`);
    process.exit(0);
  } catch (err) {
    console.error('❌ Seed failed:', err.message);
    process.exit(1);
  }
}

seed();