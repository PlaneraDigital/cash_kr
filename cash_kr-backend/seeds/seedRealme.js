import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import Device from "../models/Device.js";

const devices = [
    // ══════════════════════════════════════════════════════
    //  REALME — All Series
    // ══════════════════════════════════════════════════════
    {
        category: "mobile",
        brand: "Realme",
        modelName: "Realme 2 Pro",
        slug: "realme-realme-2-pro",
        imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/realme-realme-2-pro.jpg",
        variants: [
            { storage: "4 GB/64 GB", basePrice: 2470 },
            { storage: "6 GB/64 GB", basePrice: 2700 },
            { storage: "8 GB/128 GB", basePrice: 2940 }
        ]
    },
    {
        category: "mobile",
        brand: "Realme",
        modelName: "Realme C1 2019",
        slug: "realme-realme-c1-2019",
        imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/realme-realme-c1-2019.jpg",
        variants: [
            { storage: "2 GB/32 GB", basePrice: 1820 },
            { storage: "3 GB/32 GB", basePrice: 2010 }
        ]
    },
    {
        category: "mobile",
        brand: "Realme",
        modelName: "Realme C1",
        slug: "realme-realme-c1",
        imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/realme-realme-c1.jpg",
        variants: [
            { storage: "2 GB/16 GB", basePrice: 1740 }
        ]
    },
    {
        category: "mobile",
        brand: "Realme",
        modelName: "Realme 2",
        slug: "realme-realme-2",
        imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/realme-realme-2.jpg",
        variants: [
            { storage: "3 GB/32 GB", basePrice: 2080 },
            { storage: "4 GB/64 GB", basePrice: 2670 },
            { storage: "6 GB/128 GB", basePrice: 2960 }
        ]
    },
    {
        category: "mobile",
        brand: "Realme",
        modelName: "Realme U1",
        slug: "realme-realme-u1",
        imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/realme-realme-u1.jpg",
        variants: [
            { storage: "3 GB/32 GB", basePrice: 2240 },
            { storage: "4 GB/64 GB", basePrice: 2630 },
            { storage: "3 GB/64 GB", basePrice: 2360 }
        ]
    },
    {
        category: "mobile",
        brand: "Realme",
        modelName: "Realme 3",
        slug: "realme-realme-3",
        imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/realme-realme-3.jpg",
        variants: [
            { storage: "3 GB/32 GB", basePrice: 2320 },
            { storage: "4 GB/64 GB", basePrice: 2860 },
            { storage: "3 GB/64 GB", basePrice: 2630 }
        ]
    },
    {
        category: "mobile",
        brand: "Realme",
        modelName: "Realme 3 Pro",
        slug: "realme-realme-3-pro",
        imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/realme-realme-3-pro.jpg",
        variants: [
            { storage: "4 GB/64 GB", basePrice: 3290 },
            { storage: "6 GB/64 GB", basePrice: 3480 },
            { storage: "6 GB/128 GB", basePrice: 3820 }
        ]
    },
    {
        category: "mobile",
        brand: "Realme",
        modelName: "Realme C2",
        slug: "realme-realme-c2",
        imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/realme-realme-c2.jpg",
        variants: [
            { storage: "2 GB/16 GB", basePrice: 2010 },
            { storage: "3 GB/32 GB", basePrice: 2310 },
            { storage: "2 GB/32 GB", basePrice: 2200 }
        ]
    },
    {
        category: "mobile",
        brand: "Realme",
        modelName: "Realme X",
        slug: "realme-realme-x",
        imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/realme-realme-x.jpg",
        variants: [
            { storage: "4 GB/128 GB", basePrice: 4710 },
            { storage: "8 GB/128 GB", basePrice: 5130 }
        ]
    },
    {
        category: "mobile",
        brand: "Realme",
        modelName: "Realme 3i",
        slug: "realme-realme-3i",
        imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/realme-realme-3i.jpg",
        variants: [
            { storage: "3 GB/32 GB", basePrice: 2360 },
            { storage: "4 GB/64 GB", basePrice: 2780 }
        ]
    },
    {
        category: "mobile",
        brand: "Realme",
        modelName: "Realme 5",
        slug: "realme-realme-5",
        imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/realme-realme-5.jpg",
        variants: [
            { storage: "3 GB/32 GB", basePrice: 2800 },
            { storage: "4 GB/64 GB", basePrice: 3180 },
            { storage: "4 GB/128 GB", basePrice: 3510 }
        ]
    },
    {
        category: "mobile",
        brand: "Realme",
        modelName: "Realme 5 Pro",
        slug: "realme-realme-5-pro",
        imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/realme-realme-5-pro.jpg",
        variants: [
            { storage: "4 GB/64 GB", basePrice: 3660 },
            { storage: "6 GB/64 GB", basePrice: 3820 },
            { storage: "8 GB/128 GB", basePrice: 4060 }
        ]
    },
    {
        category: "mobile",
        brand: "Realme",
        modelName: "Realme XT",
        slug: "realme-realme-xt",
        imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/realme-realme-xt.jpg",
        variants: [
            { storage: "4 GB/64 GB", basePrice: 4290 },
            { storage: "6 GB/64 GB", basePrice: 4580 },
            { storage: "8 GB/128 GB", basePrice: 4960 }
        ]
    },
    {
        category: "mobile",
        brand: "Realme",
        modelName: "Realme 5s",
        slug: "realme-realme-5s",
        imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/realme-realme-5s.jpg",
        variants: [
            { storage: "4 GB/64 GB", basePrice: 3130 },
            { storage: "4 GB/128 GB", basePrice: 3520 }
        ]
    },
    {
        category: "mobile",
        brand: "Realme",
        modelName: "Realme X2 Pro",
        slug: "realme-realme-x2-pro",
        imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/realme-realme-x2-pro.jpg",
        variants: [
            { storage: "6 GB/64 GB", basePrice: 4750 },
            { storage: "8 GB/128 GB", basePrice: 5170 },
            { storage: "12 GB/256 GB", basePrice: 5480 }
        ]
    },
    {
        category: "mobile",
        brand: "Realme",
        modelName: "Realme X2",
        slug: "realme-realme-x2",
        imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/realme-realme-x2.jpg",
        variants: [
            { storage: "4 GB/64 GB", basePrice: 4140 },
            { storage: "6 GB/128 GB", basePrice: 4600 },
            { storage: "8 GB/128 GB", basePrice: 5020 },
            { storage: "8 GB/256 GB", basePrice: 5260 }
        ]
    },
    {
        category: "mobile",
        brand: "Realme",
        modelName: "Realme 5i",
        slug: "realme-realme-5i",
        imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/realme-realme-5i.jpg",
        variants: [
            { storage: "4 GB/64 GB", basePrice: 3780 },
            { storage: "4 GB/128 GB", basePrice: 4010 }
        ]
    },
    {
        category: "mobile",
        brand: "Realme",
        modelName: "Realme C3",
        slug: "realme-realme-c3",
        imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/realme-realme-c3.jpg",
        variants: [
            { storage: "4 GB/64 GB", basePrice: 3450 },
            { storage: "3 GB/32 GB", basePrice: 3140 }
        ]
    },
    {
        category: "mobile",
        brand: "Realme",
        modelName: "Realme X50 Pro",
        slug: "realme-realme-x50-pro",
        imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/realme-realme-x50-pro.jpg",
        variants: [
            { storage: "6 GB/128 GB", basePrice: 6640 },
            { storage: "8 GB/128 GB", basePrice: 6880 },
            { storage: "12 GB/256 GB", basePrice: 7410 }
        ]
    },
    {
        category: "mobile",
        brand: "Realme",
        modelName: "Realme 6",
        slug: "realme-realme-6",
        imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/realme-realme-6.jpg",
        variants: [
            { storage: "4 GB/64 GB", basePrice: 4190 },
            { storage: "6 GB/64 GB", basePrice: 4630 },
            { storage: "6 GB/128 GB", basePrice: 4850 },
            { storage: "8 GB/128 GB", basePrice: 5020 }
        ]
    },
    {
        category: "mobile",
        brand: "Realme",
        modelName: "Realme 6 Pro",
        slug: "realme-realme-6-pro",
        imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/realme-realme-6-pro.jpg",
        variants: [
            { storage: "6 GB/64 GB", basePrice: 4520 },
            { storage: "6 GB/128 GB", basePrice: 4950 },
            { storage: "8 GB/128 GB", basePrice: 5130 }
        ]
    },
    {
        category: "mobile",
        brand: "Realme",
        modelName: "Realme Narzo 10",
        slug: "realme-realme-narzo-10",
        imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/realme-realme-narzo-10.jpg",
        variants: [
            { storage: "4 GB/128 GB", basePrice: 3850 }
        ]
    },
    {
        category: "mobile",
        brand: "Realme",
        modelName: "Realme Narzo 10A",
        slug: "realme-realme-narzo-10a",
        imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/realme-realme-narzo-10a.jpg",
        variants: [
            { storage: "3 GB/32 GB", basePrice: 3240 },
            { storage: "4 GB/64 GB", basePrice: 3510 }
        ]
    },
];

// ─── SEED FUNCTION ────────────────────────────────────────────────────────────

async function seed() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");
        await Device.deleteMany({ category: "mobile", brand: "Realme" });
        console.log("Cleared existing Realme devices");
        await Device.insertMany(devices);
        console.log(`✅ Seeded ${devices.length} Realme devices successfully`);
        process.exit(0);
    } catch (err) {
        console.error("❌ Seed failed:", err.message);
        process.exit(1);
    }
}

seed();