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
    //  SAMSUNG — All Series
    // ══════════════════════════════════════════════════════
    mkDevice({
        brand: 'Samsung', modelName: 'Galaxy Book Go Series', slug: 'samsung-galaxy-book-go-series',
        processorFamily: 'Snapdragon 7c', generation: 'Snapdragon', tier: 'Budget',
        variants: [
            { ram: '4GB', storage: '256GB SSD', basePrice: 10860 },
            { ram: '8GB', storage: '256GB SSD', basePrice: 12488 },
            { ram: '8GB', storage: '512GB SSD', basePrice: 14118 }
        ],
    }),
    mkDevice({
        brand: 'Samsung', modelName: 'Galaxy Book2 Series', slug: 'samsung-galaxy-book2-series',
        processorFamily: 'Intel Core i5', generation: '12th Gen', tier: 'Mid-range',
        variants: [
            { ram: '8GB', storage: '256GB SSD', basePrice: 21990 },
            { ram: '8GB', storage: '512GB SSD', basePrice: 24628 },
            { ram: '16GB', storage: '512GB SSD', basePrice: 27487 }
        ],
    }),
    mkDevice({
        brand: 'Samsung', modelName: 'Galaxy Book2 360 Series', slug: 'samsung-galaxy-book2-360-series',
        processorFamily: 'Intel Core i5', generation: '12th Gen', tier: 'Mid-range',
        variants: [
            { ram: '8GB', storage: '256GB SSD', basePrice: 27340 },
            { ram: '8GB', storage: '512GB SSD', basePrice: 30620 },
            { ram: '16GB', storage: '512GB SSD', basePrice: 34175 }
        ],
    }),
    mkDevice({
        brand: 'Samsung', modelName: 'Galaxy Book2 Pro Series', slug: 'samsung-galaxy-book2-pro-series',
        processorFamily: 'Intel Core i5', generation: '12th Gen', tier: 'Mid-range',
        variants: [
            { ram: '8GB', storage: '256GB SSD', basePrice: 29060 },
            { ram: '8GB', storage: '512GB SSD', basePrice: 32547 },
            { ram: '16GB', storage: '512GB SSD', basePrice: 36325 }
        ],
    }),
    mkDevice({
        brand: 'Samsung', modelName: 'Galaxy Book2 Pro 360 Series', slug: 'samsung-galaxy-book2-pro-360-series',
        processorFamily: 'Intel Core i7', generation: '12th Gen', tier: 'Mid-range',
        variants: [
            { ram: '8GB', storage: '256GB SSD', basePrice: 29490 },
            { ram: '8GB', storage: '512GB SSD', basePrice: 33028 },
            { ram: '16GB', storage: '512GB SSD', basePrice: 36862 }
        ],
    }),
    mkDevice({
        brand: 'Samsung', modelName: 'Galaxy Book3 Series', slug: 'samsung-galaxy-book3-series',
        processorFamily: 'Intel Core i5', generation: '13th Gen', tier: 'Mid-range',
        variants: [
            { ram: '8GB', storage: '256GB SSD', basePrice: 30000 },
            { ram: '8GB', storage: '512GB SSD', basePrice: 33600 },
            { ram: '16GB', storage: '512GB SSD', basePrice: 37500 }
        ],
    }),
    mkDevice({
        brand: 'Samsung', modelName: 'Galaxy Book3 360 Series', slug: 'samsung-galaxy-book3-360-series',
        processorFamily: 'Intel Core i5', generation: '13th Gen', tier: 'Mid-range',
        variants: [
            { ram: '8GB', storage: '256GB SSD', basePrice: 33000 },
            { ram: '8GB', storage: '512GB SSD', basePrice: 36960 },
            { ram: '16GB', storage: '512GB SSD', basePrice: 41250 }
        ],
    }),
    mkDevice({
        brand: 'Samsung', modelName: 'Galaxy Book3 Ultra Series', slug: 'samsung-galaxy-book3-ultra-series',
        processorFamily: 'Intel Core i9', generation: '13th Gen', tier: 'Premium',
        variants: [
            { ram: '16GB', storage: '512GB SSD', basePrice: 55000 },
            { ram: '16GB', storage: '1TB SSD', basePrice: 63249 },
            { ram: '32GB', storage: '1TB SSD', basePrice: 71500 }
        ],
    }),
    mkDevice({
        brand: 'Samsung', modelName: 'Galaxy Book3 Pro 360 Series', slug: 'samsung-galaxy-book3-pro-360-series',
        processorFamily: 'Intel Core i7', generation: '13th Gen', tier: 'Premium',
        variants: [
            { ram: '16GB', storage: '512GB SSD', basePrice: 40000 },
            { ram: '16GB', storage: '1TB SSD', basePrice: 46000 },
            { ram: '32GB', storage: '1TB SSD', basePrice: 52000 }
        ],
    }),
    mkDevice({
        brand: 'Samsung', modelName: 'Galaxy Book4 Series', slug: 'samsung-galaxy-book4-series',
        processorFamily: 'Intel Core Ultra 5', generation: 'Ultra Gen', tier: 'Mid-range',
        variants: [
            { ram: '8GB', storage: '256GB SSD', basePrice: 29830 },
            { ram: '8GB', storage: '512GB SSD', basePrice: 33409 },
            { ram: '16GB', storage: '512GB SSD', basePrice: 37287 }
        ],
    }),
    mkDevice({
        brand: 'Samsung', modelName: 'Galaxy Book4 360 Series', slug: 'samsung-galaxy-book4-360-series',
        processorFamily: 'Intel Core Ultra 5', generation: 'Ultra Gen', tier: 'Mid-range',
        variants: [
            { ram: '8GB', storage: '256GB SSD', basePrice: 31470 },
            { ram: '8GB', storage: '512GB SSD', basePrice: 35246 },
            { ram: '16GB', storage: '512GB SSD', basePrice: 39337 }
        ],
    }),
    mkDevice({
        brand: 'Samsung', modelName: 'Galaxy Book4 Pro Series', slug: 'samsung-galaxy-book4-pro-series',
        processorFamily: 'Intel Core Ultra 7', generation: 'Ultra Gen', tier: 'Mid-range',
        variants: [
            { ram: '8GB', storage: '256GB SSD', basePrice: 30870 },
            { ram: '8GB', storage: '512GB SSD', basePrice: 34574 },
            { ram: '16GB', storage: '512GB SSD', basePrice: 38587 }
        ],
    }),
    mkDevice({
        brand: 'Samsung', modelName: 'Galaxy Book4 Pro 360 Series', slug: 'samsung-galaxy-book4-pro-360-series',
        processorFamily: 'Intel Core Ultra 7', generation: 'Ultra Gen', tier: 'Premium',
        variants: [
            { ram: '16GB', storage: '512GB SSD', basePrice: 45000 },
            { ram: '16GB', storage: '1TB SSD', basePrice: 51749 },
            { ram: '32GB', storage: '1TB SSD', basePrice: 58500 }
        ],
    }),
    mkDevice({
        brand: 'Samsung', modelName: 'Galaxy Book4 Ultra Series', slug: 'samsung-galaxy-book4-ultra-series',
        processorFamily: 'Intel Core Ultra 9', generation: 'Ultra Gen', tier: 'Premium',
        variants: [
            { ram: '16GB', storage: '512GB SSD', basePrice: 50000 },
            { ram: '16GB', storage: '1TB SSD', basePrice: 57499 },
            { ram: '32GB', storage: '1TB SSD', basePrice: 65000 }
        ],
    }),
    mkDevice({
        brand: 'Samsung', modelName: 'Galaxy Book4 Edge Series', slug: 'samsung-galaxy-book4-edge-series',
        processorFamily: 'Intel Core i9', generation: '11th Gen', tier: 'Mid-range',
        gpuType: 'NVIDIA RTX 3080', isGaming: true,
        variants: [
            { processor: 'Intel Core i5', generation: '11th Gen', ram: '8GB', storage: '512GB SSD', basePrice: 30000 },
            { processor: 'Intel Core i5', generation: '11th Gen', ram: '16GB', storage: '512GB SSD', basePrice: 34500 },
            { processor: 'Intel Core i9', generation: '11th Gen', ram: '16GB', storage: '512GB SSD', basePrice: 39000 },
            { processor: 'Intel Core i9', generation: '11th Gen', ram: '16GB', storage: '1TB SSD', basePrice: 45000 },
            { processor: 'Intel Core i9', generation: '11th Gen', ram: '32GB', storage: '1TB SSD', basePrice: 52500 }
        ],
    }),
    mkDevice({
        brand: 'Samsung', modelName: 'Galaxy Book5 360 Series', slug: 'samsung-galaxy-book5-360-series',
        processorFamily: 'Intel Core Ultra 5', generation: 'Ultra Gen', tier: 'Premium',
        variants: [
            { ram: '16GB', storage: '512GB SSD', basePrice: 43460 },
            { ram: '16GB', storage: '1TB SSD', basePrice: 49978 },
            { ram: '32GB', storage: '1TB SSD', basePrice: 56498 }
        ],
    }),
    mkDevice({
        brand: 'Samsung', modelName: 'Galaxy Book5 Pro Series', slug: 'samsung-galaxy-book5-pro-series',
        processorFamily: 'Intel Core Ultra 7', generation: 'Ultra Gen', tier: 'Premium',
        variants: [
            { ram: '16GB', storage: '512GB SSD', basePrice: 46680 },
            { ram: '16GB', storage: '1TB SSD', basePrice: 53681 },
            { ram: '32GB', storage: '1TB SSD', basePrice: 60684 }
        ],
    }),
    mkDevice({
        brand: 'Samsung', modelName: 'Galaxy Book5 Pro 360 Series', slug: 'samsung-galaxy-book5-pro-360-series',
        processorFamily: 'Intel Core Ultra 7', generation: 'Ultra Gen', tier: 'Premium',
        variants: [
            { ram: '16GB', storage: '512GB SSD', basePrice: 49900 },
            { ram: '16GB', storage: '1TB SSD', basePrice: 57384 },
            { ram: '32GB', storage: '1TB SSD', basePrice: 64870 }
        ],
    }),
    mkDevice({
        brand: 'Samsung', modelName: 'Galaxy Book5 Series', slug: 'samsung-galaxy-book5-series',
        processorFamily: 'Intel Core Ultra 5', generation: 'Ultra Gen', tier: 'Premium',
        variants: [
            { ram: '16GB', storage: '512GB SSD', basePrice: 42100 },
            { ram: '16GB', storage: '1TB SSD', basePrice: 48414 },
            { ram: '32GB', storage: '1TB SSD', basePrice: 54730 }
        ],
    }),
    mkDevice({
        brand: 'Samsung', modelName: 'Others Samsung Series', slug: 'samsung-others-samsung-series',
        processorFamily: 'Intel Core i5', generation: '10th Gen', tier: 'Budget',
        variants: [
            { ram: '4GB', storage: '256GB SSD', basePrice: 4030 },
            { ram: '8GB', storage: '256GB SSD', basePrice: 4634 },
            { ram: '8GB', storage: '512GB SSD', basePrice: 5239 }
        ],
    }),
];


async function seed() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');
        await Device.deleteMany({ category: 'laptop', brand: 'Samsung' });
        console.log('Cleared existing Samsung laptop devices');
        await Device.insertMany(devices);
        console.log(`✅ Seeded ${devices.length} Samsung laptop devices successfully`);
        process.exit(0);
    } catch (err) {
        console.error('❌ Seed failed:', err.message);
        process.exit(1);
    }
}

seed();