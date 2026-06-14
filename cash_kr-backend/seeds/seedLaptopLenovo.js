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
  //  LENOVO — All Series
  // ══════════════════════════════════════════════════════
  mkDevice({
    brand: 'Lenovo', modelName: 'IdeaPad 5 Series', slug: 'lenovo-ideapad-5-series',
    processorFamily: 'AMD Ryzen 5', generation: '5000 Series', tier: 'Budget',
    variants: [
      { ram: '4GB', storage: '256GB SSD', basePrice: 12500 },
      { ram: '8GB', storage: '256GB SSD', basePrice: 14374 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 16250 }
    ],
  }),
  mkDevice({
    brand: 'Lenovo', modelName: 'Yoga Slim 7 Series', slug: 'lenovo-yoga-slim-7-series',
    processorFamily: 'AMD Ryzen 7', generation: '6000 Series', tier: 'Mid-range',
    variants: [
      { ram: '8GB', storage: '256GB SSD', basePrice: 26500 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 29680 },
      { ram: '16GB', storage: '512GB SSD', basePrice: 33125 }
    ],
  }),
  mkDevice({
    brand: 'Lenovo', modelName: 'Lenovo LOQ Series', slug: 'lenovo-lenovo-loq-series',
    processorFamily: 'Intel Core i5', generation: '13th Gen', tier: 'Mid-range',
    gpuType: 'NVIDIA RTX 4060', isGaming: true,
    variants: [
      { processor: 'Intel Core i5', generation: '13th Gen', ram: '8GB', storage: '512GB SSD', basePrice: 27570 },
      { processor: 'Intel Core i5', generation: '13th Gen', ram: '16GB', storage: '512GB SSD', basePrice: 31705 },
      { processor: 'Intel Core i5', generation: '13th Gen', ram: '16GB', storage: '512GB SSD', basePrice: 35841 },
      { processor: 'Intel Core i5', generation: '13th Gen', ram: '16GB', storage: '1TB SSD', basePrice: 41355 },
      { processor: 'Intel Core i5', generation: '13th Gen', ram: '32GB', storage: '1TB SSD', basePrice: 48247 }
    ],
  }),
  mkDevice({
    brand: 'Lenovo', modelName: 'Legion 5i Series', slug: 'lenovo-legion-5i-series',
    processorFamily: 'Intel Core i7', generation: '12th Gen', tier: 'Gaming',
    gpuType: 'NVIDIA RTX 3070', isGaming: true,
    variants: [
      { processor: 'Intel Core i5', generation: '12th Gen', ram: '8GB', storage: '512GB SSD', basePrice: 35000 },
      { processor: 'Intel Core i5', generation: '12th Gen', ram: '16GB', storage: '512GB SSD', basePrice: 40250 },
      { processor: 'Intel Core i7', generation: '12th Gen', ram: '16GB', storage: '512GB SSD', basePrice: 45500 },
      { processor: 'Intel Core i7', generation: '12th Gen', ram: '16GB', storage: '1TB SSD', basePrice: 52500 },
      { processor: 'Intel Core i7', generation: '12th Gen', ram: '32GB', storage: '1TB SSD', basePrice: 61250 }
    ],
  }),
  mkDevice({
    brand: 'Lenovo', modelName: 'Legion Slim 5 Series', slug: 'lenovo-legion-slim-5-series',
    processorFamily: 'AMD Ryzen 7', generation: '7000 Series', tier: 'Gaming',
    gpuType: 'NVIDIA RTX 4060', isGaming: true,
    variants: [
      { processor: 'AMD Ryzen 5', generation: '7000 Series', ram: '8GB', storage: '512GB SSD', basePrice: 29000 },
      { processor: 'AMD Ryzen 5', generation: '7000 Series', ram: '16GB', storage: '512GB SSD', basePrice: 33350 },
      { processor: 'AMD Ryzen 7', generation: '7000 Series', ram: '16GB', storage: '512GB SSD', basePrice: 37700 },
      { processor: 'AMD Ryzen 7', generation: '7000 Series', ram: '16GB', storage: '1TB SSD', basePrice: 43500 },
      { processor: 'AMD Ryzen 7', generation: '7000 Series', ram: '32GB', storage: '1TB SSD', basePrice: 50750 }
    ],
  }),
  mkDevice({
    brand: 'Lenovo', modelName: 'Legion Slim 5i Series', slug: 'lenovo-legion-slim-5i-series',
    processorFamily: 'Intel Core i7', generation: '13th Gen', tier: 'Gaming',
    gpuType: 'NVIDIA RTX 4060', isGaming: true,
    variants: [
      { processor: 'Intel Core i5', generation: '13th Gen', ram: '8GB', storage: '512GB SSD', basePrice: 38000 },
      { processor: 'Intel Core i5', generation: '13th Gen', ram: '16GB', storage: '512GB SSD', basePrice: 43700 },
      { processor: 'Intel Core i7', generation: '13th Gen', ram: '16GB', storage: '512GB SSD', basePrice: 49400 },
      { processor: 'Intel Core i7', generation: '13th Gen', ram: '16GB', storage: '1TB SSD', basePrice: 57000 },
      { processor: 'Intel Core i7', generation: '13th Gen', ram: '32GB', storage: '1TB SSD', basePrice: 66500 }
    ],
  }),
  mkDevice({
    brand: 'Lenovo', modelName: 'Legion 5i Pro Series', slug: 'lenovo-legion-5i-pro-series',
    processorFamily: 'Intel Core i7', generation: '12th Gen', tier: 'Gaming',
    gpuType: 'NVIDIA RTX 3070', isGaming: true,
    variants: [
      { processor: 'Intel Core i5', generation: '12th Gen', ram: '8GB', storage: '512GB SSD', basePrice: 43000 },
      { processor: 'Intel Core i5', generation: '12th Gen', ram: '16GB', storage: '512GB SSD', basePrice: 49449 },
      { processor: 'Intel Core i7', generation: '12th Gen', ram: '16GB', storage: '512GB SSD', basePrice: 55900 },
      { processor: 'Intel Core i7', generation: '12th Gen', ram: '16GB', storage: '1TB SSD', basePrice: 64500 },
      { processor: 'Intel Core i7', generation: '12th Gen', ram: '32GB', storage: '1TB SSD', basePrice: 75250 }
    ],
  }),
  mkDevice({
    brand: 'Lenovo', modelName: 'Legion Pro 5 Series', slug: 'lenovo-legion-pro-5-series',
    processorFamily: 'Intel Core i7', generation: '13th Gen', tier: 'Gaming',
    gpuType: 'NVIDIA RTX 4070', isGaming: true,
    variants: [
      { processor: 'Intel Core i5', generation: '13th Gen', ram: '8GB', storage: '512GB SSD', basePrice: 40000 },
      { processor: 'Intel Core i5', generation: '13th Gen', ram: '16GB', storage: '512GB SSD', basePrice: 46000 },
      { processor: 'Intel Core i7', generation: '13th Gen', ram: '16GB', storage: '512GB SSD', basePrice: 52000 },
      { processor: 'Intel Core i7', generation: '13th Gen', ram: '16GB', storage: '1TB SSD', basePrice: 60000 },
      { processor: 'Intel Core i7', generation: '13th Gen', ram: '32GB', storage: '1TB SSD', basePrice: 70000 }
    ],
  }),
  mkDevice({
    brand: 'Lenovo', modelName: 'Legion Pro 5i Series', slug: 'lenovo-legion-pro-5i-series',
    processorFamily: 'Intel Core i7', generation: '13th Gen', tier: 'Gaming',
    gpuType: 'NVIDIA RTX 4070', isGaming: true,
    variants: [
      { processor: 'Intel Core i5', generation: '13th Gen', ram: '8GB', storage: '512GB SSD', basePrice: 39000 },
      { processor: 'Intel Core i5', generation: '13th Gen', ram: '16GB', storage: '512GB SSD', basePrice: 44850 },
      { processor: 'Intel Core i7', generation: '13th Gen', ram: '16GB', storage: '512GB SSD', basePrice: 50700 },
      { processor: 'Intel Core i7', generation: '13th Gen', ram: '16GB', storage: '1TB SSD', basePrice: 58500 },
      { processor: 'Intel Core i7', generation: '13th Gen', ram: '32GB', storage: '1TB SSD', basePrice: 68250 }
    ],
  }),
  mkDevice({
    brand: 'Lenovo', modelName: 'Legion Pro 7i Series', slug: 'lenovo-legion-pro-7i-series',
    processorFamily: 'Intel Core i9', generation: '13th Gen', tier: 'Gaming',
    gpuType: 'NVIDIA RTX 4080', isGaming: true,
    variants: [
      { processor: 'Intel Core i5', generation: '13th Gen', ram: '8GB', storage: '512GB SSD', basePrice: 50000 },
      { processor: 'Intel Core i5', generation: '13th Gen', ram: '16GB', storage: '512GB SSD', basePrice: 57499 },
      { processor: 'Intel Core i9', generation: '13th Gen', ram: '16GB', storage: '512GB SSD', basePrice: 65000 },
      { processor: 'Intel Core i9', generation: '13th Gen', ram: '16GB', storage: '1TB SSD', basePrice: 75000 },
      { processor: 'Intel Core i9', generation: '13th Gen', ram: '32GB', storage: '1TB SSD', basePrice: 87500 }
    ],
  }),
  mkDevice({
    brand: 'Lenovo', modelName: 'IdeaPad 300 Series', slug: 'lenovo-ideapad-300-series',
    processorFamily: 'Intel Core i3', generation: '6th Gen', tier: 'Budget',
    variants: [
      { ram: '4GB', storage: '256GB SSD', basePrice: 11480 },
      { ram: '8GB', storage: '256GB SSD', basePrice: 13201 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 14924 }
    ],
  }),
  mkDevice({
    brand: 'Lenovo', modelName: 'IdeaPad 500 Series', slug: 'lenovo-ideapad-500-series',
    processorFamily: 'AMD Ryzen 5', generation: '5000 Series', tier: 'Budget',
    variants: [
      { ram: '4GB', storage: '256GB SSD', basePrice: 6310 },
      { ram: '8GB', storage: '256GB SSD', basePrice: 7256 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 8203 }
    ],
  }),
  mkDevice({
    brand: 'Lenovo', modelName: 'Thinkpad T Series', slug: 'lenovo-thinkpad-t-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Budget',
    variants: [
      { ram: '4GB', storage: '256GB SSD', basePrice: 6050 },
      { ram: '8GB', storage: '256GB SSD', basePrice: 6957 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 7865 }
    ],
  }),
  mkDevice({
    brand: 'Lenovo', modelName: 'IdeaPad 100 Series', slug: 'lenovo-ideapad-100-series',
    processorFamily: 'Intel Celeron', generation: 'N Series', tier: 'Budget',
    variants: [
      { ram: '4GB', storage: '256GB SSD', basePrice: 4970 },
      { ram: '8GB', storage: '256GB SSD', basePrice: 5715 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 6461 }
    ],
  }),
  mkDevice({
    brand: 'Lenovo', modelName: 'IdeaPad S Series', slug: 'lenovo-ideapad-s-series',
    processorFamily: 'Intel Core i3', generation: '10th Gen', tier: 'Budget',
    variants: [
      { ram: '4GB', storage: '256GB SSD', basePrice: 5540 },
      { ram: '8GB', storage: '256GB SSD', basePrice: 6370 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 7202 }
    ],
  }),
  mkDevice({
    brand: 'Lenovo', modelName: 'Yoga 500 Series', slug: 'lenovo-yoga-500-series',
    processorFamily: 'Intel Core i5', generation: '5th Gen', tier: 'Budget',
    variants: [
      { ram: '4GB', storage: '256GB SSD', basePrice: 10020 },
      { ram: '8GB', storage: '256GB SSD', basePrice: 11523 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 13026 }
    ],
  }),
  mkDevice({
    brand: 'Lenovo', modelName: 'Thinkpad L Series', slug: 'lenovo-thinkpad-l-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Budget',
    variants: [
      { ram: '4GB', storage: '256GB SSD', basePrice: 8690 },
      { ram: '8GB', storage: '256GB SSD', basePrice: 9993 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 11297 }
    ],
  }),
  mkDevice({
    brand: 'Lenovo', modelName: 'Lenovo Y Series', slug: 'lenovo-lenovo-y-series',
    processorFamily: 'Intel Core i7', generation: '7th Gen', tier: 'Mid-range',
    gpuType: 'NVIDIA GTX 1060', isGaming: true,
    variants: [
      { processor: 'Intel Core i5', generation: '7th Gen', ram: '8GB', storage: '512GB SSD', basePrice: 18780 },
      { processor: 'Intel Core i5', generation: '7th Gen', ram: '16GB', storage: '512GB SSD', basePrice: 21597 },
      { processor: 'Intel Core i7', generation: '7th Gen', ram: '16GB', storage: '512GB SSD', basePrice: 24414 },
      { processor: 'Intel Core i7', generation: '7th Gen', ram: '16GB', storage: '1TB SSD', basePrice: 28170 },
      { processor: 'Intel Core i7', generation: '7th Gen', ram: '32GB', storage: '1TB SSD', basePrice: 32865 }
    ],
  }),
  mkDevice({
    brand: 'Lenovo', modelName: 'IdeaPad Flex Series', slug: 'lenovo-ideapad-flex-series',
    processorFamily: 'Intel Core i3', generation: '10th Gen', tier: 'Budget',
    variants: [
      { ram: '4GB', storage: '256GB SSD', basePrice: 6700 },
      { ram: '8GB', storage: '256GB SSD', basePrice: 7704 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 8710 }
    ],
  }),
  mkDevice({
    brand: 'Lenovo', modelName: 'Thinkpad E Series', slug: 'lenovo-thinkpad-e-series',
    processorFamily: 'Intel Core i5', generation: '11th Gen', tier: 'Budget',
    variants: [
      { ram: '4GB', storage: '256GB SSD', basePrice: 11880 },
      { ram: '8GB', storage: '256GB SSD', basePrice: 13661 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 15444 }
    ],
  }),
  mkDevice({
    brand: 'Lenovo', modelName: 'IdeaPad Slim 3i Series', slug: 'lenovo-ideapad-slim-3i-series',
    processorFamily: 'Intel Core i3', generation: '12th Gen', tier: 'Budget',
    variants: [
      { ram: '4GB', storage: '256GB SSD', basePrice: 17330 },
      { ram: '8GB', storage: '256GB SSD', basePrice: 19929 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 22529 }
    ],
  }),
  mkDevice({
    brand: 'Lenovo', modelName: 'Lenovo V Series', slug: 'lenovo-lenovo-v-series',
    processorFamily: 'Intel Core i3', generation: '10th Gen', tier: 'Budget',
    variants: [
      { ram: '4GB', storage: '256GB SSD', basePrice: 6380 },
      { ram: '8GB', storage: '256GB SSD', basePrice: 7336 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 8294 }
    ],
  }),
  mkDevice({
    brand: 'Lenovo', modelName: 'Thinkpad X Series', slug: 'lenovo-thinkpad-x-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Budget',
    variants: [
      { ram: '4GB', storage: '256GB SSD', basePrice: 7330 },
      { ram: '8GB', storage: '256GB SSD', basePrice: 8429 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 9529 }
    ],
  }),
  mkDevice({
    brand: 'Lenovo', modelName: 'Thinkpad Edge Series', slug: 'lenovo-thinkpad-edge-series',
    processorFamily: 'Intel Core i9', generation: '11th Gen', tier: 'Budget',
    gpuType: 'NVIDIA RTX 3080', isGaming: true,
    variants: [
      { processor: 'Intel Core i5', generation: '11th Gen', ram: '8GB', storage: '512GB SSD', basePrice: 5110 },
      { processor: 'Intel Core i5', generation: '11th Gen', ram: '16GB', storage: '512GB SSD', basePrice: 5876 },
      { processor: 'Intel Core i9', generation: '11th Gen', ram: '16GB', storage: '512GB SSD', basePrice: 6643 },
      { processor: 'Intel Core i9', generation: '11th Gen', ram: '16GB', storage: '1TB SSD', basePrice: 7665 },
      { processor: 'Intel Core i9', generation: '11th Gen', ram: '32GB', storage: '1TB SSD', basePrice: 8942 }
    ],
  }),
  mkDevice({
    brand: 'Lenovo', modelName: 'Lenovo 300e Series', slug: 'lenovo-lenovo-300e-series',
    processorFamily: 'Intel Celeron', generation: 'N Series', tier: 'Budget',
    variants: [
      { ram: '4GB', storage: '256GB SSD', basePrice: 5690 },
      { ram: '8GB', storage: '256GB SSD', basePrice: 6543 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 7397 }
    ],
  }),
  mkDevice({
    brand: 'Lenovo', modelName: 'Legion Series', slug: 'lenovo-legion-series',
    processorFamily: 'Intel Core i7', generation: '10th Gen', tier: 'Gaming',
    gpuType: 'NVIDIA GTX 1660 Ti', isGaming: true,
    variants: [
      { processor: 'Intel Core i5', generation: '10th Gen', ram: '8GB', storage: '512GB SSD', basePrice: 16870 },
      { processor: 'Intel Core i5', generation: '10th Gen', ram: '16GB', storage: '512GB SSD', basePrice: 19400 },
      { processor: 'Intel Core i7', generation: '10th Gen', ram: '16GB', storage: '512GB SSD', basePrice: 21931 },
      { processor: 'Intel Core i7', generation: '10th Gen', ram: '16GB', storage: '1TB SSD', basePrice: 25305 },
      { processor: 'Intel Core i7', generation: '10th Gen', ram: '32GB', storage: '1TB SSD', basePrice: 29522 }
    ],
  }),
  mkDevice({
    brand: 'Lenovo', modelName: 'Lenovo N Series', slug: 'lenovo-lenovo-n-series',
    processorFamily: 'Intel Core i3', generation: '10th Gen', tier: 'Budget',
    variants: [
      { ram: '4GB', storage: '256GB SSD', basePrice: 4490 },
      { ram: '8GB', storage: '256GB SSD', basePrice: 5163 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 5837 }
    ],
  }),
  mkDevice({
    brand: 'Lenovo', modelName: 'Lenovo 500e Series', slug: 'lenovo-lenovo-500e-series',
    processorFamily: 'Intel Celeron', generation: 'N Series', tier: 'Budget',
    variants: [
      { ram: '4GB', storage: '256GB SSD', basePrice: 3980 },
      { ram: '8GB', storage: '256GB SSD', basePrice: 4577 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 5174 }
    ],
  }),
  mkDevice({
    brand: 'Lenovo', modelName: 'Yoga 700 Series', slug: 'lenovo-yoga-700-series',
    processorFamily: 'AMD Ryzen 7', generation: '5000 Series', tier: 'Budget',
    variants: [
      { ram: '4GB', storage: '256GB SSD', basePrice: 10340 },
      { ram: '8GB', storage: '256GB SSD', basePrice: 11890 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 13442 }
    ],
  }),
  mkDevice({
    brand: 'Lenovo', modelName: 'IdeaPad Gaming Series', slug: 'lenovo-ideapad-gaming-series',
    processorFamily: 'AMD Ryzen 5', generation: '5000 Series', tier: 'Gaming',
    gpuType: 'NVIDIA GTX 1650', isGaming: true,
    variants: [
      { processor: 'AMD Ryzen 5', generation: '5000 Series', ram: '8GB', storage: '512GB SSD', basePrice: 20110 },
      { processor: 'AMD Ryzen 5', generation: '5000 Series', ram: '16GB', storage: '512GB SSD', basePrice: 23126 },
      { processor: 'AMD Ryzen 5', generation: '5000 Series', ram: '16GB', storage: '512GB SSD', basePrice: 26143 },
      { processor: 'AMD Ryzen 5', generation: '5000 Series', ram: '16GB', storage: '1TB SSD', basePrice: 30165 },
      { processor: 'AMD Ryzen 5', generation: '5000 Series', ram: '32GB', storage: '1TB SSD', basePrice: 35192 }
    ],
  }),
  mkDevice({
    brand: 'Lenovo', modelName: 'Thinkpad A Series', slug: 'lenovo-thinkpad-a-series',
    processorFamily: 'AMD A-Series', generation: 'AMD', tier: 'Budget',
    variants: [
      { ram: '4GB', storage: '256GB SSD', basePrice: 5490 },
      { ram: '8GB', storage: '256GB SSD', basePrice: 6313 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 7137 }
    ],
  }),
  mkDevice({
    brand: 'Lenovo', modelName: 'Yoga 900 Series', slug: 'lenovo-yoga-900-series',
    processorFamily: 'Intel Core i7', generation: '6th Gen', tier: 'Budget',
    variants: [
      { ram: '4GB', storage: '256GB SSD', basePrice: 10340 },
      { ram: '8GB', storage: '256GB SSD', basePrice: 11890 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 13442 }
    ],
  }),
  mkDevice({
    brand: 'Lenovo', modelName: 'IdeaPad D Series', slug: 'lenovo-ideapad-d-series',
    processorFamily: 'AMD A-Series', generation: 'AMD', tier: 'Budget',
    variants: [
      { ram: '4GB', storage: '256GB SSD', basePrice: 5950 },
      { ram: '8GB', storage: '256GB SSD', basePrice: 6842 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 7735 }
    ],
  }),
  mkDevice({
    brand: 'Lenovo', modelName: 'Thinkpad Twist Series', slug: 'lenovo-thinkpad-twist-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Budget',
    variants: [
      { ram: '4GB', storage: '256GB SSD', basePrice: 6460 },
      { ram: '8GB', storage: '256GB SSD', basePrice: 7428 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 8398 }
    ],
  }),
  mkDevice({
    brand: 'Lenovo', modelName: 'IdeaPad 700 Series', slug: 'lenovo-ideapad-700-series',
    processorFamily: 'Intel Core i5', generation: '6th Gen', tier: 'Budget',
    variants: [
      { ram: '4GB', storage: '256GB SSD', basePrice: 6980 },
      { ram: '8GB', storage: '256GB SSD', basePrice: 8026 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 9074 }
    ],
  }),
  mkDevice({
    brand: 'Lenovo', modelName: 'Yoga C Series', slug: 'lenovo-yoga-c-series',
    processorFamily: 'Intel Core i7', generation: '10th Gen', tier: 'Budget',
    variants: [
      { ram: '4GB', storage: '256GB SSD', basePrice: 4680 },
      { ram: '8GB', storage: '256GB SSD', basePrice: 5382 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 6084 }
    ],
  }),
  mkDevice({
    brand: 'Lenovo', modelName: 'Thinkpad 11e Series', slug: 'lenovo-thinkpad-11e-series',
    processorFamily: 'Intel Celeron', generation: 'N Series', tier: 'Budget',
    variants: [
      { ram: '4GB', storage: '256GB SSD', basePrice: 5590 },
      { ram: '8GB', storage: '256GB SSD', basePrice: 6428 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 7267 }
    ],
  }),
  mkDevice({
    brand: 'Lenovo', modelName: 'Legion 5 Series', slug: 'lenovo-legion-5-series',
    processorFamily: 'AMD Ryzen 5', generation: '5000 Series', tier: 'Gaming',
    gpuType: 'NVIDIA RTX 3060', isGaming: true,
    variants: [
      { processor: 'AMD Ryzen 5', generation: '5000 Series', ram: '8GB', storage: '512GB SSD', basePrice: 21860 },
      { processor: 'AMD Ryzen 5', generation: '5000 Series', ram: '16GB', storage: '512GB SSD', basePrice: 25138 },
      { processor: 'AMD Ryzen 5', generation: '5000 Series', ram: '16GB', storage: '512GB SSD', basePrice: 28418 },
      { processor: 'AMD Ryzen 5', generation: '5000 Series', ram: '16GB', storage: '1TB SSD', basePrice: 32790 },
      { processor: 'AMD Ryzen 5', generation: '5000 Series', ram: '32GB', storage: '1TB SSD', basePrice: 38255 }
    ],
  }),
  mkDevice({
    brand: 'Lenovo', modelName: 'IdeaPad Slim 5i Series', slug: 'lenovo-ideapad-slim-5i-series',
    processorFamily: 'Intel Core i5', generation: '12th Gen', tier: 'Mid-range',
    variants: [
      { ram: '8GB', storage: '256GB SSD', basePrice: 22250 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 24920 },
      { ram: '16GB', storage: '512GB SSD', basePrice: 27812 }
    ],
  }),
  mkDevice({
    brand: 'Lenovo', modelName: 'ThinkBook Series', slug: 'lenovo-thinkbook-series',
    processorFamily: 'Intel Core i5', generation: '11th Gen', tier: 'Budget',
    variants: [
      { ram: '4GB', storage: '256GB SSD', basePrice: 5850 },
      { ram: '8GB', storage: '256GB SSD', basePrice: 6727 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 7605 }
    ],
  }),
  mkDevice({
    brand: 'Lenovo', modelName: 'Thinkpad P Series', slug: 'lenovo-thinkpad-p-series',
    processorFamily: 'Intel Core i7', generation: '11th Gen', tier: 'Budget',
    variants: [
      { ram: '4GB', storage: '256GB SSD', basePrice: 7620 },
      { ram: '8GB', storage: '256GB SSD', basePrice: 8763 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 9906 }
    ],
  }),
  mkDevice({
    brand: 'Lenovo', modelName: 'Lenovo 100e Series', slug: 'lenovo-lenovo-100e-series',
    processorFamily: 'Intel Celeron', generation: 'N Series', tier: 'Budget',
    variants: [
      { ram: '4GB', storage: '256GB SSD', basePrice: 3980 },
      { ram: '8GB', storage: '256GB SSD', basePrice: 4577 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 5174 }
    ],
  }),
  mkDevice({
    brand: 'Lenovo', modelName: 'Lenovo 11e Series', slug: 'lenovo-lenovo-11e-series',
    processorFamily: 'Intel Celeron', generation: 'N Series', tier: 'Budget',
    variants: [
      { ram: '4GB', storage: '256GB SSD', basePrice: 2880 },
      { ram: '8GB', storage: '256GB SSD', basePrice: 3311 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 3744 }
    ],
  }),
  mkDevice({
    brand: 'Lenovo', modelName: 'Thinkpad Helix Series', slug: 'lenovo-thinkpad-helix-series',
    processorFamily: 'Intel Core i5', generation: '4th Gen', tier: 'Budget',
    variants: [
      { ram: '4GB', storage: '256GB SSD', basePrice: 6080 },
      { ram: '8GB', storage: '256GB SSD', basePrice: 6991 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 7904 }
    ],
  }),
  mkDevice({
    brand: 'Lenovo', modelName: 'IdeaPad 900 Series', slug: 'lenovo-ideapad-900-series',
    processorFamily: 'Intel Core i7', generation: '6th Gen', tier: 'Budget',
    variants: [
      { ram: '4GB', storage: '256GB SSD', basePrice: 10520 },
      { ram: '8GB', storage: '256GB SSD', basePrice: 12097 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 13676 }
    ],
  }),
  mkDevice({
    brand: 'Lenovo', modelName: 'Legion 7 Series', slug: 'lenovo-legion-7-series',
    processorFamily: 'AMD Ryzen 7', generation: '5000 Series', tier: 'Gaming',
    gpuType: 'NVIDIA RTX 3080', isGaming: true,
    variants: [
      { processor: 'AMD Ryzen 5', generation: '5000 Series', ram: '8GB', storage: '512GB SSD', basePrice: 32850 },
      { processor: 'AMD Ryzen 5', generation: '5000 Series', ram: '16GB', storage: '512GB SSD', basePrice: 37777 },
      { processor: 'AMD Ryzen 7', generation: '5000 Series', ram: '16GB', storage: '512GB SSD', basePrice: 42705 },
      { processor: 'AMD Ryzen 7', generation: '5000 Series', ram: '16GB', storage: '1TB SSD', basePrice: 49275 },
      { processor: 'AMD Ryzen 7', generation: '5000 Series', ram: '32GB', storage: '1TB SSD', basePrice: 57487 }
    ],
  }),
  mkDevice({
    brand: 'Lenovo', modelName: 'Student Chromebooks', slug: 'lenovo-student-chromebooks',
    processorFamily: 'Intel Celeron', generation: 'N Series', tier: 'Budget',
    variants: [
      { ram: '4GB', storage: '256GB SSD', basePrice: 1320 },
      { ram: '8GB', storage: '256GB SSD', basePrice: 1517 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 1716 }
    ],
  }),
  mkDevice({
    brand: 'Lenovo', modelName: 'Other Lenovo Series', slug: 'lenovo-other-lenovo-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Budget',
    variants: [
      { ram: '4GB', storage: '256GB SSD', basePrice: 4410 },
      { ram: '8GB', storage: '256GB SSD', basePrice: 5071 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 5733 }
    ],
  }),
  mkDevice({
    brand: 'Lenovo', modelName: 'Legion 9i Series', slug: 'lenovo-legion-9i-series',
    processorFamily: 'Intel Core i9', generation: '13th Gen', tier: 'Gaming',
    gpuType: 'NVIDIA RTX 4090', isGaming: true,
    variants: [
      { processor: 'Intel Core i5', generation: '13th Gen', ram: '8GB', storage: '512GB SSD', basePrice: 60000 },
      { processor: 'Intel Core i5', generation: '13th Gen', ram: '16GB', storage: '512GB SSD', basePrice: 69000 },
      { processor: 'Intel Core i9', generation: '13th Gen', ram: '16GB', storage: '512GB SSD', basePrice: 78000 },
      { processor: 'Intel Core i9', generation: '13th Gen', ram: '16GB', storage: '1TB SSD', basePrice: 90000 },
      { processor: 'Intel Core i9', generation: '13th Gen', ram: '32GB', storage: '1TB SSD', basePrice: 105000 }
    ],
  }),
  mkDevice({
    brand: 'Lenovo', modelName: 'Yoga 6 Series', slug: 'lenovo-yoga-6-series',
    processorFamily: 'AMD Ryzen 5', generation: '5000 Series', tier: 'Mid-range',
    variants: [
      { ram: '8GB', storage: '256GB SSD', basePrice: 25000 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 28000 },
      { ram: '16GB', storage: '512GB SSD', basePrice: 31250 }
    ],
  }),
  mkDevice({
    brand: 'Lenovo', modelName: 'Yoga Slim 6i Series', slug: 'lenovo-yoga-slim-6i-series',
    processorFamily: 'Intel Core i5', generation: '13th Gen', tier: 'Mid-range',
    variants: [
      { ram: '8GB', storage: '256GB SSD', basePrice: 30000 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 33600 },
      { ram: '16GB', storage: '512GB SSD', basePrice: 37500 }
    ],
  }),
  mkDevice({
    brand: 'Lenovo', modelName: 'Yoga 7 Series', slug: 'lenovo-yoga-7-series',
    processorFamily: 'AMD Ryzen 7', generation: '5000 Series', tier: 'Mid-range',
    variants: [
      { ram: '8GB', storage: '256GB SSD', basePrice: 26000 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 29120 },
      { ram: '16GB', storage: '512GB SSD', basePrice: 32500 }
    ],
  }),
  mkDevice({
    brand: 'Lenovo', modelName: 'Yoga 7i Series', slug: 'lenovo-yoga-7i-series',
    processorFamily: 'Intel Core i7', generation: '12th Gen', tier: 'Mid-range',
    variants: [
      { ram: '16GB', storage: '512GB SSD', basePrice: 35000 },
      { ram: '16GB', storage: '1TB SSD', basePrice: 40250 },
      { ram: '32GB', storage: '1TB SSD', basePrice: 45500 }
    ],
  }),
  mkDevice({
    brand: 'Lenovo', modelName: 'Yoga Pro 7i Series', slug: 'lenovo-yoga-pro-7i-series',
    processorFamily: 'Intel Core i7', generation: '13th Gen', tier: 'Premium',
    variants: [
      { ram: '16GB', storage: '512GB SSD', basePrice: 40000 },
      { ram: '16GB', storage: '1TB SSD', basePrice: 46000 },
      { ram: '32GB', storage: '1TB SSD', basePrice: 52000 }
    ],
  }),
  mkDevice({
    brand: 'Lenovo', modelName: 'Yoga Slim 7i Series', slug: 'lenovo-yoga-slim-7i-series',
    processorFamily: 'Intel Core i7', generation: '13th Gen', tier: 'Mid-range',
    variants: [
      { ram: '16GB', storage: '512GB SSD', basePrice: 38000 },
      { ram: '16GB', storage: '1TB SSD', basePrice: 43700 },
      { ram: '32GB', storage: '1TB SSD', basePrice: 49400 }
    ],
  }),
  mkDevice({
    brand: 'Lenovo', modelName: 'Yoga 9i Series', slug: 'lenovo-yoga-9i-series',
    processorFamily: 'Intel Core i7', generation: '12th Gen', tier: 'Premium',
    variants: [
      { ram: '16GB', storage: '512GB SSD', basePrice: 50000 },
      { ram: '16GB', storage: '1TB SSD', basePrice: 57499 },
      { ram: '32GB', storage: '1TB SSD', basePrice: 65000 }
    ],
  }),
  mkDevice({
    brand: 'Lenovo', modelName: 'Yoga Book 9i Series', slug: 'lenovo-yoga-book-9i-series',
    processorFamily: 'Intel Core i7', generation: '13th Gen', tier: 'Premium',
    variants: [
      { ram: '16GB', storage: '512GB SSD', basePrice: 55000 },
      { ram: '16GB', storage: '1TB SSD', basePrice: 63249 },
      { ram: '32GB', storage: '1TB SSD', basePrice: 71500 }
    ],
  }),
  mkDevice({
    brand: 'Lenovo', modelName: 'Thinkpad X1 Series', slug: 'lenovo-thinkpad-x1-series',
    processorFamily: 'Intel Core i7', generation: '12th Gen', tier: 'Mid-range',
    variants: [
      { ram: '8GB', storage: '256GB SSD', basePrice: 30000 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 33600 },
      { ram: '16GB', storage: '512GB SSD', basePrice: 37500 }
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