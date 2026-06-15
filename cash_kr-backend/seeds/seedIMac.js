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
    lessThan1: 1.0, oneToTwo: 0.88, twoToThree: 0.75,
    lessThan3: 0.92, threeToEleven: 0.78, aboveEleven: 0.62,
    threeToFour: 0.48, fourToFive: 0.36, moreThan5: 0.22,
};

const screenMultipliers = {
    noIssue: 1.0, minorScratch: 0.96, deadPixels: 0.82,
    crackedWorks: 0.68, crackedBroken: 0.45,
};

const conditionMultipliers = { likenew: 1.0, good: 0.88, fair: 0.72, poor: 0.50 };

const accessoriesBonus = { bill: 300, box: 500, charger: 800, withBoxAndCharger: 800, originalCharger: 500, thirdPartyCharger: 200, none: 0 };

function mkDevice({ brand, modelName, slug, processorFamily, generation, tier, variants, gpuType }) {
    return {
        category: 'mac',
        brand,
        modelName,
        slug,
        imageUrl: '',
        processorFamily: processorFamily || '',
        generation: generation || '',
        gpuType: gpuType || '',
        isGamingLaptop: false,
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
    //  Apple iMac — All Series
    // ══════════════════════════════════════════════════════
    mkDevice({
        brand: 'Apple', modelName: 'iMac 21.5 inches', slug: 'apple-imac-21-5-inches',
        processorFamily: 'Intel Core i5', generation: 'Intel', tier: 'Mid-range',
        variants: [
            { ram: '8GB', storage: '256GB SSD', basePrice: 30250 },
            { ram: '16GB', storage: '512GB SSD', basePrice: 34000 },
        ],
    }),
    mkDevice({
        brand: 'Apple', modelName: 'iMac 27 inches', slug: 'apple-imac-27-inches',
        processorFamily: 'Intel Core i5', generation: 'Intel', tier: 'Mid-range',
        variants: [
            { ram: '8GB', storage: '256GB SSD', basePrice: 33350 },
            { ram: '16GB', storage: '512GB SSD', basePrice: 38000 },
        ],
    }),
    mkDevice({
        brand: 'Apple', modelName: 'iMac 24 inches', slug: 'apple-imac-24-inches',
        processorFamily: 'Apple M1', generation: 'M-Series', tier: 'Premium',
        variants: [
            { ram: '8GB', storage: '256GB SSD', basePrice: 45000 },
            { ram: '16GB', storage: '512GB SSD', basePrice: 52000 },
        ],
    }),
];

async function seed() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');
        await Device.deleteMany({ category: 'mac', brand: 'Apple' });
        console.log('Cleared existing Apple iMac devices');
        await Device.insertMany(devices);
        console.log(`✅ Seeded ${devices.length} Apple iMac devices successfully`);
        process.exit(0);
    } catch (err) {
        console.error('❌ Seed failed:', err.message);
        process.exit(1);
    }
}

seed();
