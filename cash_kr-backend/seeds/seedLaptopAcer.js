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
  //  ACER — All Series
  // ══════════════════════════════════════════════════════
  mkDevice({
    brand: 'Acer', modelName: 'TravelMate P4 Series', slug: 'acer-travelmate-p4-series',
    processorFamily: 'Intel Core i5', generation: '11th Gen', tier: 'Budget',
    variants: [
      { ram: '4GB', storage: '256GB SSD', basePrice: 17000 },
      { ram: '8GB', storage: '256GB SSD', basePrice: 19550 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 22100 }
    ],
  }),
  mkDevice({
    brand: 'Acer', modelName: 'TravelMate P2 Series', slug: 'acer-travelmate-p2-series',
    processorFamily: 'Intel Core i5', generation: '11th Gen', tier: 'Budget',
    variants: [
      { ram: '4GB', storage: '256GB SSD', basePrice: 15000 },
      { ram: '8GB', storage: '256GB SSD', basePrice: 17250 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 19500 }
    ],
  }),
  mkDevice({
    brand: 'Acer', modelName: 'TravelMate P6 Series', slug: 'acer-travelmate-p6-series',
    processorFamily: 'Intel Core i5', generation: '11th Gen', tier: 'Mid-range',
    variants: [
      { ram: '8GB', storage: '256GB SSD', basePrice: 19000 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 21280 },
      { ram: '16GB', storage: '512GB SSD', basePrice: 23750 }
    ],
  }),
  mkDevice({
    brand: 'Acer', modelName: 'Aspire Series', slug: 'acer-aspire-series',
    processorFamily: 'Intel Core i3', generation: '10th Gen', tier: 'Budget',
    variants: [
      { ram: '4GB', storage: '256GB SSD', basePrice: 7670 },
      { ram: '8GB', storage: '256GB SSD', basePrice: 8820 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 9971 }
    ],
  }),
  mkDevice({
    brand: 'Acer', modelName: 'Aspire One Series', slug: 'acer-aspire-one-series',
    processorFamily: 'Intel Celeron', generation: 'N Series', tier: 'Budget',
    variants: [
      { ram: '4GB', storage: '256GB SSD', basePrice: 3570 },
      { ram: '8GB', storage: '256GB SSD', basePrice: 4105 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 4641 }
    ],
  }),
  mkDevice({
    brand: 'Acer', modelName: 'Aspire E Series', slug: 'acer-aspire-e-series',
    processorFamily: 'Intel Core i5', generation: '7th Gen', tier: 'Budget',
    variants: [
      { ram: '4GB', storage: '256GB SSD', basePrice: 9240 },
      { ram: '8GB', storage: '256GB SSD', basePrice: 10626 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 12012 }
    ],
  }),
  mkDevice({
    brand: 'Acer', modelName: 'Aspire 5 Series', slug: 'acer-aspire-5-series',
    processorFamily: 'Intel Core i5', generation: '12th Gen', tier: 'Budget',
    variants: [
      { ram: '4GB', storage: '256GB SSD', basePrice: 13740 },
      { ram: '8GB', storage: '256GB SSD', basePrice: 15800 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 17862 }
    ],
  }),
  mkDevice({
    brand: 'Acer', modelName: 'Aspire 3 Series', slug: 'acer-aspire-3-series',
    processorFamily: 'Intel Core i3', generation: '12th Gen', tier: 'Budget',
    variants: [
      { ram: '4GB', storage: '256GB SSD', basePrice: 8320 },
      { ram: '8GB', storage: '256GB SSD', basePrice: 9568 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 10816 }
    ],
  }),
  mkDevice({
    brand: 'Acer', modelName: 'Predator Series', slug: 'acer-predator-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Gaming',
    gpuType: 'NVIDIA GTX 1650', isGaming: true,
    variants: [
      { processor: 'Intel Core i5', generation: '10th Gen', ram: '8GB', storage: '512GB SSD', basePrice: 13980 },
      { processor: 'Intel Core i5', generation: '10th Gen', ram: '16GB', storage: '512GB SSD', basePrice: 16076 },
      { processor: 'Intel Core i5', generation: '10th Gen', ram: '16GB', storage: '512GB SSD', basePrice: 18174 },
      { processor: 'Intel Core i5', generation: '10th Gen', ram: '16GB', storage: '1TB SSD', basePrice: 20970 },
      { processor: 'Intel Core i5', generation: '10th Gen', ram: '32GB', storage: '1TB SSD', basePrice: 24465 }
    ],
  }),
  mkDevice({
    brand: 'Acer', modelName: 'Switch Series', slug: 'acer-switch-series',
    processorFamily: 'Intel Core i3', generation: '10th Gen', tier: 'Budget',
    variants: [
      { ram: '4GB', storage: '256GB SSD', basePrice: 11070 },
      { ram: '8GB', storage: '256GB SSD', basePrice: 12730 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 14391 }
    ],
  }),
  mkDevice({
    brand: 'Acer', modelName: 'Nitro Spin Series', slug: 'acer-nitro-spin-series',
    processorFamily: 'Intel Core i5', generation: '8th Gen', tier: 'Gaming',
    gpuType: 'NVIDIA GTX 1050', isGaming: true,
    variants: [
      { processor: 'Intel Core i5', generation: '8th Gen', ram: '8GB', storage: '512GB SSD', basePrice: 13320 },
      { processor: 'Intel Core i5', generation: '8th Gen', ram: '16GB', storage: '512GB SSD', basePrice: 15317 },
      { processor: 'Intel Core i5', generation: '8th Gen', ram: '16GB', storage: '512GB SSD', basePrice: 17316 },
      { processor: 'Intel Core i5', generation: '8th Gen', ram: '16GB', storage: '1TB SSD', basePrice: 19980 },
      { processor: 'Intel Core i5', generation: '8th Gen', ram: '32GB', storage: '1TB SSD', basePrice: 23310 }
    ],
  }),
  mkDevice({
    brand: 'Acer', modelName: 'Spin Series', slug: 'acer-spin-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Budget',
    variants: [
      { ram: '4GB', storage: '256GB SSD', basePrice: 11070 },
      { ram: '8GB', storage: '256GB SSD', basePrice: 12730 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 14391 }
    ],
  }),
  mkDevice({
    brand: 'Acer', modelName: 'Acer Chromebook Series', slug: 'acer-acer-chromebook-series',
    processorFamily: 'Intel Celeron', generation: 'N Series', tier: 'Budget',
    variants: [
      { ram: '4GB', storage: '256GB SSD', basePrice: 3860 },
      { ram: '8GB', storage: '256GB SSD', basePrice: 4439 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 5018 }
    ],
  }),
  mkDevice({
    brand: 'Acer', modelName: 'Swift Series', slug: 'acer-swift-series',
    processorFamily: 'Intel Core i5', generation: '11th Gen', tier: 'Budget',
    variants: [
      { ram: '4GB', storage: '256GB SSD', basePrice: 11640 },
      { ram: '8GB', storage: '256GB SSD', basePrice: 13385 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 15132 }
    ],
  }),
  mkDevice({
    brand: 'Acer', modelName: 'Nitro 5 Series', slug: 'acer-nitro-5-series',
    processorFamily: 'Intel Core i5', generation: '11th Gen', tier: 'Gaming',
    gpuType: 'NVIDIA RTX 3050', isGaming: true,
    variants: [
      { processor: 'Intel Core i5', generation: '11th Gen', ram: '8GB', storage: '512GB SSD', basePrice: 15390 },
      { processor: 'Intel Core i5', generation: '11th Gen', ram: '16GB', storage: '512GB SSD', basePrice: 17698 },
      { processor: 'Intel Core i5', generation: '11th Gen', ram: '16GB', storage: '512GB SSD', basePrice: 20007 },
      { processor: 'Intel Core i5', generation: '11th Gen', ram: '16GB', storage: '1TB SSD', basePrice: 23085 },
      { processor: 'Intel Core i5', generation: '11th Gen', ram: '32GB', storage: '1TB SSD', basePrice: 26932 }
    ],
  }),
  mkDevice({
    brand: 'Acer', modelName: 'Aspire 7 Series', slug: 'acer-aspire-7-series',
    processorFamily: 'AMD Ryzen 5', generation: '5000 Series', tier: 'Budget',
    variants: [
      { ram: '4GB', storage: '256GB SSD', basePrice: 17140 },
      { ram: '8GB', storage: '256GB SSD', basePrice: 19711 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 22282 }
    ],
  }),
  mkDevice({
    brand: 'Acer', modelName: 'Predator Helios 300 Series', slug: 'acer-predator-helios-300-series',
    processorFamily: 'Intel Core i7', generation: '11th Gen', tier: 'Gaming',
    gpuType: 'NVIDIA RTX 3060', isGaming: true,
    variants: [
      { processor: 'Intel Core i5', generation: '11th Gen', ram: '8GB', storage: '512GB SSD', basePrice: 20930 },
      { processor: 'Intel Core i5', generation: '11th Gen', ram: '16GB', storage: '512GB SSD', basePrice: 24069 },
      { processor: 'Intel Core i7', generation: '11th Gen', ram: '16GB', storage: '512GB SSD', basePrice: 27209 },
      { processor: 'Intel Core i7', generation: '11th Gen', ram: '16GB', storage: '1TB SSD', basePrice: 31395 },
      { processor: 'Intel Core i7', generation: '11th Gen', ram: '32GB', storage: '1TB SSD', basePrice: 36627 }
    ],
  }),
  mkDevice({
    brand: 'Acer', modelName: 'Swift 5 Series', slug: 'acer-swift-5-series',
    processorFamily: 'Intel Core i7', generation: '11th Gen', tier: 'Mid-range',
    variants: [
      { ram: '8GB', storage: '256GB SSD', basePrice: 19610 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 21963 },
      { ram: '16GB', storage: '512GB SSD', basePrice: 24512 }
    ],
  }),
  mkDevice({
    brand: 'Acer', modelName: 'Extensa Series', slug: 'acer-extensa-series',
    processorFamily: 'Intel Core i3', generation: '10th Gen', tier: 'Budget',
    variants: [
      { ram: '4GB', storage: '256GB SSD', basePrice: 5000 },
      { ram: '8GB', storage: '256GB SSD', basePrice: 5750 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 6500 }
    ],
  }),
  mkDevice({
    brand: 'Acer', modelName: 'Swift 3 Series', slug: 'acer-swift-3-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Budget',
    variants: [
      { ram: '4GB', storage: '256GB SSD', basePrice: 9170 },
      { ram: '8GB', storage: '256GB SSD', basePrice: 10545 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 11921 }
    ],
  }),
  mkDevice({
    brand: 'Acer', modelName: 'Nitro 5 Spin Series', slug: 'acer-nitro-5-spin-series',
    processorFamily: 'Intel Core i5', generation: '8th Gen', tier: 'Gaming',
    gpuType: 'NVIDIA GTX 1050', isGaming: true,
    variants: [
      { processor: 'Intel Core i5', generation: '8th Gen', ram: '8GB', storage: '512GB SSD', basePrice: 15100 },
      { processor: 'Intel Core i5', generation: '8th Gen', ram: '16GB', storage: '512GB SSD', basePrice: 17365 },
      { processor: 'Intel Core i5', generation: '8th Gen', ram: '16GB', storage: '512GB SSD', basePrice: 19630 },
      { processor: 'Intel Core i5', generation: '8th Gen', ram: '16GB', storage: '1TB SSD', basePrice: 22650 },
      { processor: 'Intel Core i5', generation: '8th Gen', ram: '32GB', storage: '1TB SSD', basePrice: 26425 }
    ],
  }),
  mkDevice({
    brand: 'Acer', modelName: 'Spin 1 Series', slug: 'acer-spin-1-series',
    processorFamily: 'Intel Core i3', generation: '10th Gen', tier: 'Budget',
    variants: [
      { ram: '4GB', storage: '256GB SSD', basePrice: 4240 },
      { ram: '8GB', storage: '256GB SSD', basePrice: 4876 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 5512 }
    ],
  }),
  mkDevice({
    brand: 'Acer', modelName: 'Spin 5 Series', slug: 'acer-spin-5-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Budget',
    variants: [
      { ram: '4GB', storage: '256GB SSD', basePrice: 9840 },
      { ram: '8GB', storage: '256GB SSD', basePrice: 11316 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 12792 }
    ],
  }),
  mkDevice({
    brand: 'Acer', modelName: 'Switch 5 Series', slug: 'acer-switch-5-series',
    processorFamily: 'Intel Core i7', generation: '10th Gen', tier: 'Budget',
    variants: [
      { ram: '4GB', storage: '256GB SSD', basePrice: 11620 },
      { ram: '8GB', storage: '256GB SSD', basePrice: 13362 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 15106 }
    ],
  }),
  mkDevice({
    brand: 'Acer', modelName: 'Spin 3 Series', slug: 'acer-spin-3-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Budget',
    variants: [
      { ram: '4GB', storage: '256GB SSD', basePrice: 8320 },
      { ram: '8GB', storage: '256GB SSD', basePrice: 9568 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 10816 }
    ],
  }),
  mkDevice({
    brand: 'Acer', modelName: 'Predator 15 Series', slug: 'acer-predator-15-series',
    processorFamily: 'Intel Core i7', generation: '6th Gen', tier: 'Gaming',
    gpuType: 'NVIDIA GTX 980M', isGaming: true,
    variants: [
      { processor: 'Intel Core i5', generation: '6th Gen', ram: '8GB', storage: '512GB SSD', basePrice: 16860 },
      { processor: 'Intel Core i5', generation: '6th Gen', ram: '16GB', storage: '512GB SSD', basePrice: 19389 },
      { processor: 'Intel Core i7', generation: '6th Gen', ram: '16GB', storage: '512GB SSD', basePrice: 21918 },
      { processor: 'Intel Core i7', generation: '6th Gen', ram: '16GB', storage: '1TB SSD', basePrice: 25290 },
      { processor: 'Intel Core i7', generation: '6th Gen', ram: '32GB', storage: '1TB SSD', basePrice: 29505 }
    ],
  }),
  mkDevice({
    brand: 'Acer', modelName: 'Nitro 7 Series', slug: 'acer-nitro-7-series',
    processorFamily: 'Intel Core i7', generation: '9th Gen', tier: 'Gaming',
    gpuType: 'NVIDIA GTX 1660 Ti', isGaming: true,
    variants: [
      { processor: 'Intel Core i5', generation: '9th Gen', ram: '8GB', storage: '512GB SSD', basePrice: 15910 },
      { processor: 'Intel Core i5', generation: '9th Gen', ram: '16GB', storage: '512GB SSD', basePrice: 18296 },
      { processor: 'Intel Core i7', generation: '9th Gen', ram: '16GB', storage: '512GB SSD', basePrice: 20683 },
      { processor: 'Intel Core i7', generation: '9th Gen', ram: '16GB', storage: '1TB SSD', basePrice: 23865 },
      { processor: 'Intel Core i7', generation: '9th Gen', ram: '32GB', storage: '1TB SSD', basePrice: 27842 }
    ],
  }),
  mkDevice({
    brand: 'Acer', modelName: 'Spin 7 Series', slug: 'acer-spin-7-series',
    processorFamily: 'Intel Core i7', generation: '10th Gen', tier: 'Budget',
    variants: [
      { ram: '4GB', storage: '256GB SSD', basePrice: 17240 },
      { ram: '8GB', storage: '256GB SSD', basePrice: 19826 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 22412 }
    ],
  }),
  mkDevice({
    brand: 'Acer', modelName: 'Swift 7 Series', slug: 'acer-swift-7-series',
    processorFamily: 'Intel Core i7', generation: '10th Gen', tier: 'Mid-range',
    variants: [
      { ram: '8GB', storage: '256GB SSD', basePrice: 18920 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 21190 },
      { ram: '16GB', storage: '512GB SSD', basePrice: 23650 }
    ],
  }),
  mkDevice({
    brand: 'Acer', modelName: 'Swift X Series', slug: 'acer-swift-x-series',
    processorFamily: 'Intel Core Ultra 5', generation: 'Ultra Gen', tier: 'Mid-range',
    variants: [
      { ram: '8GB', storage: '256GB SSD', basePrice: 18190 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 20372 },
      { ram: '16GB', storage: '512GB SSD', basePrice: 22737 }
    ],
  }),
  mkDevice({
    brand: 'Acer', modelName: 'Swift 3x Series', slug: 'acer-swift-3x-series',
    processorFamily: 'Intel Core i7', generation: '11th Gen', tier: 'Mid-range',
    variants: [
      { ram: '8GB', storage: '256GB SSD', basePrice: 21510 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 24091 },
      { ram: '16GB', storage: '512GB SSD', basePrice: 26887 }
    ],
  }),
  mkDevice({
    brand: 'Acer', modelName: 'ConceptD 3 Series', slug: 'acer-conceptd-3-series',
    processorFamily: 'Intel Core i5', generation: '9th Gen', tier: 'Mid-range',
    variants: [
      { ram: '8GB', storage: '256GB SSD', basePrice: 26730 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 29937 },
      { ram: '16GB', storage: '512GB SSD', basePrice: 33412 }
    ],
  }),
  mkDevice({
    brand: 'Acer', modelName: 'ConceptD 5 Series', slug: 'acer-conceptd-5-series',
    processorFamily: 'Intel Core i7', generation: '9th Gen', tier: 'Mid-range',
    variants: [
      { ram: '8GB', storage: '256GB SSD', basePrice: 28290 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 31684 },
      { ram: '16GB', storage: '512GB SSD', basePrice: 35362 }
    ],
  }),
  mkDevice({
    brand: 'Acer', modelName: 'ConceptD 7 Series', slug: 'acer-conceptd-7-series',
    processorFamily: 'Intel Core i7', generation: '10th Gen', tier: 'Mid-range',
    variants: [
      { ram: '8GB', storage: '256GB SSD', basePrice: 30670 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 34350 },
      { ram: '16GB', storage: '512GB SSD', basePrice: 38337 }
    ],
  }),
  mkDevice({
    brand: 'Acer', modelName: 'ConceptD 9 Series', slug: 'acer-conceptd-9-series',
    processorFamily: 'Intel Core i9', generation: '10th Gen', tier: 'Mid-range',
    variants: [
      { ram: '8GB', storage: '256GB SSD', basePrice: 31780 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 35593 },
      { ram: '16GB', storage: '512GB SSD', basePrice: 39725 }
    ],
  }),
  mkDevice({
    brand: 'Acer', modelName: 'Predator Triton 300 Series', slug: 'acer-predator-triton-300-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Gaming',
    gpuType: 'NVIDIA GTX 1650 Ti', isGaming: true,
    variants: [
      { processor: 'Intel Core i5', generation: '10th Gen', ram: '8GB', storage: '512GB SSD', basePrice: 18760 },
      { processor: 'Intel Core i5', generation: '10th Gen', ram: '16GB', storage: '512GB SSD', basePrice: 21574 },
      { processor: 'Intel Core i5', generation: '10th Gen', ram: '16GB', storage: '512GB SSD', basePrice: 24388 },
      { processor: 'Intel Core i5', generation: '10th Gen', ram: '16GB', storage: '1TB SSD', basePrice: 28140 },
      { processor: 'Intel Core i5', generation: '10th Gen', ram: '32GB', storage: '1TB SSD', basePrice: 32830 }
    ],
  }),
  mkDevice({
    brand: 'Acer', modelName: 'Predator Triton 500 Series', slug: 'acer-predator-triton-500-series',
    processorFamily: 'Intel Core i7', generation: '10th Gen', tier: 'Gaming',
    gpuType: 'NVIDIA RTX 2060', isGaming: true,
    variants: [
      { processor: 'Intel Core i5', generation: '10th Gen', ram: '8GB', storage: '512GB SSD', basePrice: 21130 },
      { processor: 'Intel Core i5', generation: '10th Gen', ram: '16GB', storage: '512GB SSD', basePrice: 24299 },
      { processor: 'Intel Core i7', generation: '10th Gen', ram: '16GB', storage: '512GB SSD', basePrice: 27469 },
      { processor: 'Intel Core i7', generation: '10th Gen', ram: '16GB', storage: '1TB SSD', basePrice: 31695 },
      { processor: 'Intel Core i7', generation: '10th Gen', ram: '32GB', storage: '1TB SSD', basePrice: 36977 }
    ],
  }),
  mkDevice({
    brand: 'Acer', modelName: 'Predator Triton 700 Series', slug: 'acer-predator-triton-700-series',
    processorFamily: 'Intel Core i7', generation: '7th Gen', tier: 'Gaming',
    gpuType: 'NVIDIA GTX 1080', isGaming: true,
    variants: [
      { processor: 'Intel Core i5', generation: '7th Gen', ram: '8GB', storage: '512GB SSD', basePrice: 21500 },
      { processor: 'Intel Core i5', generation: '7th Gen', ram: '16GB', storage: '512GB SSD', basePrice: 24724 },
      { processor: 'Intel Core i7', generation: '7th Gen', ram: '16GB', storage: '512GB SSD', basePrice: 27950 },
      { processor: 'Intel Core i7', generation: '7th Gen', ram: '16GB', storage: '1TB SSD', basePrice: 32250 },
      { processor: 'Intel Core i7', generation: '7th Gen', ram: '32GB', storage: '1TB SSD', basePrice: 37625 }
    ],
  }),
  mkDevice({
    brand: 'Acer', modelName: 'Predator Triton 900 Series', slug: 'acer-predator-triton-900-series',
    processorFamily: 'Intel Core i9', generation: '8th Gen', tier: 'Gaming',
    gpuType: 'NVIDIA RTX 2080', isGaming: true,
    variants: [
      { processor: 'Intel Core i5', generation: '8th Gen', ram: '8GB', storage: '512GB SSD', basePrice: 24230 },
      { processor: 'Intel Core i5', generation: '8th Gen', ram: '16GB', storage: '512GB SSD', basePrice: 27864 },
      { processor: 'Intel Core i9', generation: '8th Gen', ram: '16GB', storage: '512GB SSD', basePrice: 31499 },
      { processor: 'Intel Core i9', generation: '8th Gen', ram: '16GB', storage: '1TB SSD', basePrice: 36345 },
      { processor: 'Intel Core i9', generation: '8th Gen', ram: '32GB', storage: '1TB SSD', basePrice: 42402 }
    ],
  }),
  mkDevice({
    brand: 'Acer', modelName: 'Predator Helios 500 Series', slug: 'acer-predator-helios-500-series',
    processorFamily: 'Intel Core i7', generation: '9th Gen', tier: 'Gaming',
    gpuType: 'NVIDIA RTX 2070', isGaming: true,
    variants: [
      { processor: 'Intel Core i5', generation: '9th Gen', ram: '8GB', storage: '512GB SSD', basePrice: 23730 },
      { processor: 'Intel Core i5', generation: '9th Gen', ram: '16GB', storage: '512GB SSD', basePrice: 27289 },
      { processor: 'Intel Core i7', generation: '9th Gen', ram: '16GB', storage: '512GB SSD', basePrice: 30849 },
      { processor: 'Intel Core i7', generation: '9th Gen', ram: '16GB', storage: '1TB SSD', basePrice: 35595 },
      { processor: 'Intel Core i7', generation: '9th Gen', ram: '32GB', storage: '1TB SSD', basePrice: 41527 }
    ],
  }),
  mkDevice({
    brand: 'Acer', modelName: 'Predator Helios 700 Series', slug: 'acer-predator-helios-700-series',
    processorFamily: 'Intel Core i9', generation: '9th Gen', tier: 'Gaming',
    gpuType: 'NVIDIA RTX 2080', isGaming: true,
    variants: [
      { processor: 'Intel Core i5', generation: '9th Gen', ram: '8GB', storage: '512GB SSD', basePrice: 28100 },
      { processor: 'Intel Core i5', generation: '9th Gen', ram: '16GB', storage: '512GB SSD', basePrice: 32314 },
      { processor: 'Intel Core i9', generation: '9th Gen', ram: '16GB', storage: '512GB SSD', basePrice: 36530 },
      { processor: 'Intel Core i9', generation: '9th Gen', ram: '16GB', storage: '1TB SSD', basePrice: 42150 },
      { processor: 'Intel Core i9', generation: '9th Gen', ram: '32GB', storage: '1TB SSD', basePrice: 49175 }
    ],
  }),
  mkDevice({
    brand: 'Acer', modelName: 'Predator 17 Series', slug: 'acer-predator-17-series',
    processorFamily: 'Intel Core i7', generation: '6th Gen', tier: 'Gaming',
    gpuType: 'NVIDIA GTX 980M', isGaming: true,
    variants: [
      { processor: 'Intel Core i5', generation: '6th Gen', ram: '8GB', storage: '512GB SSD', basePrice: 17710 },
      { processor: 'Intel Core i5', generation: '6th Gen', ram: '16GB', storage: '512GB SSD', basePrice: 20366 },
      { processor: 'Intel Core i7', generation: '6th Gen', ram: '16GB', storage: '512GB SSD', basePrice: 23023 },
      { processor: 'Intel Core i7', generation: '6th Gen', ram: '16GB', storage: '1TB SSD', basePrice: 26565 },
      { processor: 'Intel Core i7', generation: '6th Gen', ram: '32GB', storage: '1TB SSD', basePrice: 30992 }
    ],
  }),
  mkDevice({
    brand: 'Acer', modelName: 'Predator 21x Series', slug: 'acer-predator-21x-series',
    processorFamily: 'Intel Core i7', generation: '7th Gen', tier: 'Gaming',
    gpuType: 'NVIDIA GTX 1080', isGaming: true,
    variants: [
      { processor: 'Intel Core i5', generation: '7th Gen', ram: '8GB', storage: '512GB SSD', basePrice: 18660 },
      { processor: 'Intel Core i5', generation: '7th Gen', ram: '16GB', storage: '512GB SSD', basePrice: 21459 },
      { processor: 'Intel Core i7', generation: '7th Gen', ram: '16GB', storage: '512GB SSD', basePrice: 24258 },
      { processor: 'Intel Core i7', generation: '7th Gen', ram: '16GB', storage: '1TB SSD', basePrice: 27990 },
      { processor: 'Intel Core i7', generation: '7th Gen', ram: '32GB', storage: '1TB SSD', basePrice: 32655 }
    ],
  }),
  mkDevice({
    brand: 'Acer', modelName: 'Other Acer Series', slug: 'acer-other-acer-series',
    processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Budget',
    variants: [
      { ram: '4GB', storage: '256GB SSD', basePrice: 4240 },
      { ram: '8GB', storage: '256GB SSD', basePrice: 4876 },
      { ram: '8GB', storage: '512GB SSD', basePrice: 5512 }
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