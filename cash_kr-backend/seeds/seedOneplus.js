import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import Device from "../models/Device.js";

const devices = [
    // ══════════════════════════════════════════════════════
    //  ONEPLUS — All Series
    // ══════════════════════════════════════════════════════
    {
        category: "mobile",
        brand: "OnePlus",
        modelName: "6T",
        slug: "oneplus-6t",
        imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/oneplus-6t.jpg",
        variants: [
            { storage: "6GB / 128GB", basePrice: 5000 },
            { storage: "8GB / 128GB", basePrice: 5540 },
            { storage: "8GB / 256GB", basePrice: 5630 }
        ]
    },
    {
        category: "mobile",
        brand: "OnePlus",
        modelName: "One Plus 6",
        slug: "oneplus-one-plus-6",
        imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/oneplus-one-plus-6.jpg",
        variants: [
            { storage: "6GB / 64GB", basePrice: 3940 },
            { storage: "8GB / 128GB", basePrice: 4040 },
            { storage: "8GB / 256GB", basePrice: 4170 }
        ]
    },
    {
        category: "mobile",
        brand: "OnePlus",
        modelName: "5T",
        slug: "oneplus-5t",
        imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/oneplus-5t.jpg",
        variants: [
            { storage: "6GB / 64GB", basePrice: 2570 },
            { storage: "8GB / 128GB", basePrice: 2930 }
        ]
    },
    {
        category: "mobile",
        brand: "OnePlus",
        modelName: "One Plus 5",
        slug: "oneplus-one-plus-5",
        imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/oneplus-one-plus-5.jpg",
        variants: [
            { storage: "6GB / 64GB", basePrice: 2420 },
            { storage: "8GB / 128GB", basePrice: 2780 }
        ]
    },
    {
        category: "mobile",
        brand: "OnePlus",
        modelName: "3T",
        slug: "oneplus-3t",
        imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/oneplus-3t.jpg",
        variants: [
            { storage: "64GB", basePrice: 1860 },
            { storage: "128GB", basePrice: 2040 }
        ]
    },
    {
        category: "mobile",
        brand: "OnePlus",
        modelName: "One Plus 3",
        slug: "oneplus-one-plus-3",
        imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/oneplus-one-plus-3.jpg",
        variants: [
            { storage: "6GB / 64GB", basePrice: 1700 }
        ]
    },
    {
        category: "mobile",
        brand: "OnePlus",
        modelName: "6T McLaren",
        slug: "oneplus-6t-mclaren",
        imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/oneplus-6t-mclaren.jpg",
        variants: [
            { storage: "10GB / 256GB", basePrice: 5640 }
        ]
    },
    {
        category: "mobile",
        brand: "OnePlus",
        modelName: "One Plus 7",
        slug: "oneplus-one-plus-7",
        imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/oneplus-one-plus-7.jpg",
        variants: [
            { storage: "6GB / 128GB", basePrice: 5610 },
            { storage: "8GB / 256GB", basePrice: 6210 }
        ]
    },
    {
        category: "mobile",
        brand: "OnePlus",
        modelName: "One Plus 7 Pro",
        slug: "oneplus-one-plus-7-pro",
        imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/oneplus-one-plus-7-pro.jpg",
        variants: [
            { storage: "6GB / 128GB", basePrice: 7570 },
            { storage: "8GB / 256GB", basePrice: 7850 },
            { storage: "12GB / 256GB", basePrice: 8000 }
        ]
    },
    {
        category: "mobile",
        brand: "OnePlus",
        modelName: "One Plus 7T",
        slug: "oneplus-one-plus-7t",
        imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/oneplus-one-plus-7t.jpg",
        variants: [
            { storage: "128GB", basePrice: 6210 },
            { storage: "256GB", basePrice: 6590 }
        ]
    },
    {
        category: "mobile",
        brand: "OnePlus",
        modelName: "One Plus 7T Pro",
        slug: "oneplus-one-plus-7t-pro",
        imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/oneplus-one-plus-7t-pro.jpg",
        variants: [
            { storage: "8GB / 256GB", basePrice: 8180 },
            { storage: "12GB / 256GB", basePrice: 8630 }
        ]
    },
    {
        category: "mobile",
        brand: "OnePlus",
        modelName: "One Plus 8",
        slug: "oneplus-one-plus-8",
        imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/oneplus-one-plus-8.jpg",
        variants: [
            { storage: "6GB / 128GB", basePrice: 9660 },
            { storage: "8GB / 128GB", basePrice: 10000 },
            { storage: "12GB / 256GB", basePrice: 10450 }
        ]
    },
    {
        category: "mobile",
        brand: "OnePlus",
        modelName: "One Plus 8 Pro",
        slug: "oneplus-one-plus-8-pro",
        imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/oneplus-one-plus-8-pro.jpg",
        variants: [
            { storage: "8GB / 128GB", basePrice: 11930 },
            { storage: "12GB / 256GB", basePrice: 12570 }
        ]
    },
    {
        category: "mobile",
        brand: "OnePlus",
        modelName: "7T Pro McLaren Edition",
        slug: "oneplus-7t-pro-mclaren-edition",
        imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/oneplus-7t-pro-mclaren-edition.jpg",
        variants: [
            { storage: "12GB / 256GB", basePrice: 9090 }
        ]
    },
    {
        category: "mobile",
        brand: "OnePlus",
        modelName: "One Plus Nord",
        slug: "oneplus-one-plus-nord",
        imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/oneplus-one-plus-nord.jpg",
        variants: [
            { storage: "6GB / 64GB", basePrice: 6780 },
            { storage: "8GB / 128GB", basePrice: 8260 },
            { storage: "12GB / 256GB", basePrice: 8750 }
        ]
    },
    {
        category: "mobile",
        brand: "OnePlus",
        modelName: "One Plus 8T",
        slug: "oneplus-one-plus-8t",
        imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/oneplus-one-plus-8t.jpg",
        variants: [
            { storage: "8GB / 128GB", basePrice: 9500 },
            { storage: "12GB / 256GB", basePrice: 9910 }
        ]
    },
    {
        category: "mobile",
        brand: "OnePlus",
        modelName: "One Plus 9 5G",
        slug: "oneplus-one-plus-9-5g",
        imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/oneplus-one-plus-9-5g.jpg",
        variants: [
            { storage: "8GB / 128GB", basePrice: 9660 },
            { storage: "12GB / 256GB", basePrice: 9920 }
        ]
    },
    {
        category: "mobile",
        brand: "OnePlus",
        modelName: "One Plus 9R 5G",
        slug: "oneplus-one-plus-9r-5g",
        imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/oneplus-one-plus-9r-5g.jpg",
        variants: [
            { storage: "8GB / 128GB", basePrice: 9090 },
            { storage: "12GB / 256GB", basePrice: 9770 }
        ]
    },
    {
        category: "mobile",
        brand: "OnePlus",
        modelName: "One Plus 9 Pro 5G",
        slug: "oneplus-one-plus-9-pro-5g",
        imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/oneplus-one-plus-9-pro-5g.jpg",
        variants: [
            { storage: "8GB / 128GB", basePrice: 12040 },
            { storage: "12GB / 256GB", basePrice: 13330 }
        ]
    },
    {
        category: "mobile",
        brand: "OnePlus",
        modelName: "One Plus Nord CE 5G",
        slug: "oneplus-one-plus-nord-ce-5g",
        imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/oneplus-one-plus-nord-ce-5g.jpg",
        variants: [
            { storage: "6GB / 128GB", basePrice: 7120 },
            { storage: "8GB / 128GB", basePrice: 7500 },
            { storage: "12GB / 256GB", basePrice: 7840 }
        ]
    },
    {
        category: "mobile",
        brand: "OnePlus",
        modelName: "One Plus Nord 2 5G",
        slug: "oneplus-one-plus-nord-2-5g",
        imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/oneplus-one-plus-nord-2-5g.jpg",
        variants: [
            { storage: "6GB / 128GB", basePrice: 8410 },
            { storage: "8GB / 128GB", basePrice: 9240 },
            { storage: "12GB / 256GB", basePrice: 9660 }
        ]
    },
    {
        category: "mobile",
        brand: "OnePlus",
        modelName: "One Plus 9RT 5G",
        slug: "oneplus-one-plus-9rt-5g",
        imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/oneplus-one-plus-9rt-5g.jpg",
        variants: [
            { storage: "8GB / 128GB", basePrice: 10110 },
            { storage: "12GB / 256GB", basePrice: 11210 }
        ]
    },
    {
        category: "mobile",
        brand: "OnePlus",
        modelName: "One Plus Nord CE 2 5G",
        slug: "oneplus-one-plus-nord-ce-2-5g",
        imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/oneplus-one-plus-nord-ce-2-5g.jpg",
        variants: [
            { storage: "6GB / 128GB", basePrice: 8480 },
            { storage: "8GB / 128GB", basePrice: 9010 }
        ]
    },
    {
        category: "mobile",
        brand: "OnePlus",
        modelName: "One Plus 10 Pro 5G",
        slug: "oneplus-one-plus-10-pro-5g",
        imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/oneplus-one-plus-10-pro-5g.jpg",
        variants: [
            { storage: "8GB / 128GB", basePrice: 14570 },
            { storage: "12GB / 256GB", basePrice: 15630 }
        ]
    },
    {
        category: "mobile",
        brand: "OnePlus",
        modelName: "One Plus Nord CE 2 Lite 5G",
        slug: "oneplus-one-plus-nord-ce-2-lite-5g",
        imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/oneplus-one-plus-nord-ce-2-lite-5g.jpg",
        variants: [
            { storage: "6GB / 128GB", basePrice: 7570 },
            { storage: "8GB / 128GB", basePrice: 7990 }
        ]
    },
    {
        category: "mobile",
        brand: "OnePlus",
        modelName: "One Plus 10R 5G",
        slug: "oneplus-one-plus-10r-5g",
        imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/oneplus-one-plus-10r-5g.jpg",
        variants: [
            { storage: "8GB / 128GB", basePrice: 9830 },
            { storage: "12GB / 256GB", basePrice: 10560 }
        ]
    },
    {
        category: "mobile",
        brand: "OnePlus",
        modelName: "One Plus Nord 2T 5G",
        slug: "oneplus-one-plus-nord-2t-5g",
        imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/oneplus-one-plus-nord-2t-5g.jpg",
        variants: [
            { storage: "8GB / 128GB", basePrice: 9280 },
            { storage: "12GB / 256GB", basePrice: 9850 }
        ]
    },
    {
        category: "mobile",
        brand: "OnePlus",
        modelName: "One Plus 10T 5G",
        slug: "oneplus-one-plus-10t-5g",
        imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/oneplus-one-plus-10t-5g.jpg",
        variants: [
            { storage: "8GB / 128GB", basePrice: 14010 },
            { storage: "12GB / 256GB", basePrice: 14490 },
            { storage: "16GB / 256GB", basePrice: 15710 }
        ]
    },
    {
        category: "mobile",
        brand: "OnePlus",
        modelName: "One Plus 11 5G",
        slug: "oneplus-one-plus-11-5g",
        imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/oneplus-one-plus-11-5g.jpg",
        variants: [
            { storage: "8GB / 128GB", basePrice: 27970 },
            { storage: "16GB / 256GB", basePrice: 25390 }
        ]
    },
    {
        category: "mobile",
        brand: "OnePlus",
        modelName: "One Plus 11 5G Marble Edition",
        slug: "oneplus-one-plus-11-5g-marble-edition",
        imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/oneplus-one-plus-11-5g-marble-edition.jpg",
        variants: [
            { storage: "16GB / 256GB", basePrice: 26630 }
        ]
    },
    {
        category: "mobile",
        brand: "OnePlus",
        modelName: "One Plus 11R 5G",
        slug: "oneplus-one-plus-11r-5g",
        imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/oneplus-one-plus-11r-5g.jpg",
        variants: [
            { storage: "8GB / 128GB", basePrice: 20160 },
            { storage: "16GB / 256GB", basePrice: 21020 },
            { storage: "18GB / 512GB", basePrice: 21870 }
        ]
    },
    {
        category: "mobile",
        brand: "OnePlus",
        modelName: "One Plus Nord CE 3 Lite 5G",
        slug: "oneplus-one-plus-nord-ce-3-lite-5g",
        imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/oneplus-one-plus-nord-ce-3-lite-5g.jpg",
        variants: [
            { storage: "128GB", basePrice: 11410 },
            { storage: "256GB", basePrice: 12080 }
        ]
    },
    {
        category: "mobile",
        brand: "OnePlus",
        modelName: "One Plus Nord 3 5G",
        slug: "oneplus-one-plus-nord-3-5g",
        imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/oneplus-one-plus-nord-3-5g.jpg",
        variants: [
            { storage: "8GB / 128GB", basePrice: 14270 },
            { storage: "16GB / 256GB", basePrice: 15220 }
        ]
    },
    {
        category: "mobile",
        brand: "OnePlus",
        modelName: "One Plus Nord CE 3 5G",
        slug: "oneplus-one-plus-nord-ce-3-5g",
        imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/oneplus-one-plus-nord-ce-3-5g.jpg",
        variants: [
            { storage: "8GB / 128GB", basePrice: 13440 },
            { storage: "12GB / 256GB", basePrice: 14070 }
        ]
    },
    {
        category: "mobile",
        brand: "OnePlus",
        modelName: "One Plus Open",
        slug: "oneplus-one-plus-open",
        imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/oneplus-one-plus-open.jpg",
        variants: [
            { storage: "16GB / 512GB", basePrice: 54320 }
        ]
    },
    {
        category: "mobile",
        brand: "OnePlus",
        modelName: "One Plus 12",
        slug: "oneplus-one-plus-12",
        imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/oneplus-one-plus-12.jpg",
        variants: [
            { storage: "12GB / 256GB", basePrice: 35190 },
            { storage: "16GB / 512GB", basePrice: 37180 }
        ]
    },
    {
        category: "mobile",
        brand: "OnePlus",
        modelName: "One Plus 12R",
        slug: "oneplus-one-plus-12r",
        imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/oneplus-one-plus-12r.jpg",
        variants: [
            { storage: "8GB / 128GB", basePrice: 24730 },
            { storage: "8GB / 256GB", basePrice: 25390 },
            { storage: "16GB / 256GB", basePrice: 26340 }
        ]
    },
    {
        category: "mobile",
        brand: "OnePlus",
        modelName: "One Plus Nord CE 4 5G",
        slug: "oneplus-one-plus-nord-ce-4-5g",
        imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/oneplus-one-plus-nord-ce-4-5g.jpg",
        variants: [
            { storage: "128GB", basePrice: 13540 },
            { storage: "256GB", basePrice: 15460 }
        ]
    },
    {
        category: "mobile",
        brand: "OnePlus",
        modelName: "One Plus Nord CE 4 Lite 5G",
        slug: "oneplus-one-plus-nord-ce-4-lite-5g",
        imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/oneplus-one-plus-nord-ce-4-lite-5g.jpg",
        variants: [
            { storage: "128GB", basePrice: 13030 },
            { storage: "256GB", basePrice: 13500 }
        ]
    },
    {
        category: "mobile",
        brand: "OnePlus",
        modelName: "One Plus Nord 4",
        slug: "oneplus-one-plus-nord-4",
        imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/oneplus-one-plus-nord-4.jpg",
        variants: [
            { storage: "8GB / 128GB", basePrice: 17880 },
            { storage: "8GB / 256GB", basePrice: 19510 },
            { storage: "12GB / 256GB", basePrice: 19970 }
        ]
    },
    {
        category: "mobile",
        brand: "OnePlus",
        modelName: "One Plus 13",
        slug: "oneplus-one-plus-13",
        imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/oneplus-one-plus-13.jpg",
        variants: [
            { storage: "12GB / 256GB", basePrice: 44600 },
            { storage: "16GB / 512GB", basePrice: 46200 },
            { storage: "24GB / 1TB", basePrice: 50500 }
        ]
    },
    {
        category: "mobile",
        brand: "OnePlus",
        modelName: "One Plus 13R",
        slug: "oneplus-one-plus-13r",
        imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/oneplus-one-plus-13r.jpg",
        variants: [
            { storage: "12GB / 256GB", basePrice: 28000 },
            { storage: "16GB / 512GB", basePrice: 29800 }
        ]
    },
    {
        category: "mobile",
        brand: "OnePlus",
        modelName: "One Plus 13S",
        slug: "oneplus-one-plus-13s",
        imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/oneplus-one-plus-13s.jpg",
        variants: [
            { storage: "256GB", basePrice: 35000 },
            { storage: "512GB", basePrice: 37500 }
        ]
    },
    {
        category: "mobile",
        brand: "OnePlus",
        modelName: "One Plus Nord 5",
        slug: "oneplus-one-plus-nord-5",
        imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/oneplus-one-plus-nord-5.jpg",
        variants: [
            { storage: "8GB / 256GB", basePrice: 23200 },
            { storage: "12GB / 256GB", basePrice: 25500 },
            { storage: "12GB / 512GB", basePrice: 26000 }
        ]
    },
    {
        category: "mobile",
        brand: "OnePlus",
        modelName: "One Plus Nord CE 5",
        slug: "oneplus-one-plus-nord-ce-5",
        imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/oneplus-one-plus-nord-ce-5.jpg",
        variants: [
            { storage: "8GB / 128GB", basePrice: 16900 },
            { storage: "8GB / 256GB", basePrice: 18300 },
            { storage: "12GB / 256GB", basePrice: 19200 }
        ]
    },
    {
        category: "mobile",
        brand: "OnePlus",
        modelName: "One Plus 15",
        slug: "oneplus-one-plus-15",
        imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/oneplus-one-plus-15.jpg",
        variants: [
            { storage: "12GB / 256GB", basePrice: 53300 },
            { storage: "16GB / 512GB", basePrice: 55800 }
        ]
    },
    {
        category: "mobile",
        brand: "OnePlus",
        modelName: "One Plus 15R",
        slug: "oneplus-one-plus-15r",
        imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/oneplus-one-plus-15r.jpg",
        variants: [
            { storage: "256GB", basePrice: 32500 },
            { storage: "512GB", basePrice: 34200 }
        ]
    },
    {
        category: "mobile",
        brand: "OnePlus",
        modelName: "One Plus Nord 6 5G",
        slug: "oneplus-one-plus-nord-6-5g",
        imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/oneplus-one-plus-nord-6-5g.jpg",
        variants: [
            { storage: "8GB / 256GB", basePrice: 26500 },
            { storage: "12GB / 256GB", basePrice: 28500 }
        ]
    },
];

// ─── SEED FUNCTION ────────────────────────────────────────────────────────────

async function seed() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");
        await Device.insertMany(devices);
        console.log(`✅ Seeded ${devices.length} mobile devices successfully`);
        process.exit(0);
    } catch (err) {
        console.error("❌ Seed failed:", err);
        process.exit(1);
    }
}
seed();