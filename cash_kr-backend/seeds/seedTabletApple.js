import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import Device from "../models/Device.js";

const devices = [
    {
        category: "tablet",
        brand: "Apple",
        modelName: "iPad Air 1st Gen (Wi-Fi Only)",
        slug: "apple-ipad-air-1st-gen-wi-fi-only",
        imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/apple-ipad-air.jpg",
        variants: [
            { storage: "16 GB", basePrice: 2660 },
            { storage: "32 GB", basePrice: 2900 },
            { storage: "64 GB", basePrice: 3350 },
            { storage: "128 GB", basePrice: 3940 }
        ]
    },
    {
        category: "tablet",
        brand: "Apple",
        modelName: "iPad Air 1st Gen (Wi-Fi + Cellular)",
        slug: "apple-ipad-air-1st-gen-wi-fi-cellular",
        imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/apple-ipad-air.jpg",
        variants: [
            { storage: "16 GB", basePrice: 2660 },
            { storage: "32 GB", basePrice: 2900 },
            { storage: "64 GB", basePrice: 3350 },
            { storage: "128 GB", basePrice: 3940 }
        ]
    },
    {
        category: "tablet",
        brand: "Apple",
        modelName: "iPad Air 2nd Gen (Wi-Fi Only)",
        slug: "apple-ipad-air-2nd-gen-wi-fi-only",
        imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/apple-ipad-air2.jpg",
        variants: [
            { storage: "16 GB", basePrice: 3050 },
            { storage: "32 GB", basePrice: 3290 },
            { storage: "64 GB", basePrice: 4620 },
            { storage: "128 GB", basePrice: 5370 }
        ]
    }
];

async function seed() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");
        await Device.deleteMany({ category: "tablet", brand: "Apple" });
        console.log("Cleared existing Apple tablet devices");
        await Device.insertMany(devices);
        console.log(`✅ Seeded ${devices.length} Apple tablet devices successfully`);
        process.exit(0);
    } catch (err) {
        console.error("❌ Seed failed:", err.message);
        process.exit(1);
    }
}

seed();
