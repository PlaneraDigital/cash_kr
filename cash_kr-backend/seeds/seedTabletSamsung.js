import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import Device from "../models/Device.js";

const devices = [
    {
        category: "tablet",
        brand: "Samsung",
        modelName: "Galaxy Tab A 7.0 (2018) LTE",
        slug: "samsung-galaxy-tab-a-7-0-2018-lte",
        imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-tab-a-70-2016.jpg",
        variants: [
            { storage: "1.5 GB / 8 GB", basePrice: 1970 }
        ]
    },
    {
        category: "tablet",
        brand: "Samsung",
        modelName: "Galaxy Tab S3 LTE",
        slug: "samsung-galaxy-tab-s3-lte",
        imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-tab-s3-97.jpg",
        variants: [
            { storage: "4 GB / 32 GB", basePrice: 3870 }
        ]
    },
    {
        category: "tablet",
        brand: "Samsung",
        modelName: "Galaxy Tab A 10.5 LTE",
        slug: "samsung-galaxy-tab-a-10-5-lte",
        imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-tab-a-105-2018.jpg",
        variants: [
            { storage: "3 GB / 32 GB", basePrice: 5320 }
        ]
    },
    {
        category: "tablet",
        brand: "Samsung",
        modelName: "Galaxy Tab S 8.4 LTE",
        slug: "samsung-galaxy-tab-s-8-4-lte",
        imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-tab-s-84.jpg",
        variants: [
            { storage: "3 GB / 16 GB", basePrice: 2300 }
        ]
    },
    {
        category: "tablet",
        brand: "Samsung",
        modelName: "Galaxy Tab S 10.5 LTE",
        slug: "samsung-galaxy-tab-s-10-5-lte",
        imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-tab-s-105.jpg",
        variants: [
            { storage: "3 GB / 16 GB", basePrice: 3330 }
        ]
    },
    {
        category: "tablet",
        brand: "Samsung",
        modelName: "Galaxy Tab A 8.0 (2015) Wi-Fi",
        slug: "samsung-galaxy-tab-a-8-0-2015-wi-fi",
        imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-tab-a-80.jpg",
        variants: [
            { storage: "1.5 GB / 16 GB", basePrice: 2220 }
        ]
    }
];

async function seed() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");
        await Device.deleteMany({ category: "tablet", brand: "Samsung" });
        console.log("Cleared existing Samsung tablet devices");
        await Device.insertMany(devices);
        console.log(`✅ Seeded ${devices.length} Samsung tablet devices successfully`);
        process.exit(0);
    } catch (err) {
        console.error("❌ Seed failed:", err.message);
        process.exit(1);
    }
}

seed();
