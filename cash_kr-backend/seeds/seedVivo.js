import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import Device from "../models/Device.js";

const devices = [
  // ══════════════════════════════════════════════════════
  //  VIVO — All Series
  // ══════════════════════════════════════════════════════
  {
    category: "mobile",
    brand: "Vivo",
    modelName: "V9 Pro",
    slug: "vivo-v9-pro",
    imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/vivo-v9-pro.jpg",
    variants: [
      { storage: "4GB / 64GB", basePrice: 2970 },
      { storage: "6GB / 64GB", basePrice: 3120 }
    ]
  },
  {
    category: "mobile",
    brand: "Vivo",
    modelName: "V11 Pro",
    slug: "vivo-v11-pro",
    imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/vivo-v11-pro.jpg",
    variants: [
      { storage: "6GB / 64GB", basePrice: 3540 }
    ]
  },
  {
    category: "mobile",
    brand: "Vivo",
    modelName: "V11",
    slug: "vivo-v11",
    imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/vivo-v11.jpg",
    variants: [
      { storage: "6GB / 64GB", basePrice: 3170 }
    ]
  },
  {
    category: "mobile",
    brand: "Vivo",
    modelName: "Y83 Pro",
    slug: "vivo-y83-pro",
    imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/vivo-y83-pro.jpg",
    variants: [
      { storage: "4GB / 64GB", basePrice: 2650 }
    ]
  },
  {
    category: "mobile",
    brand: "Vivo",
    modelName: "NEX",
    slug: "vivo-nex",
    imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/vivo-nex.jpg",
    variants: [
      { storage: "8GB / 128GB", basePrice: 4490 }
    ]
  },
  {
    category: "mobile",
    brand: "Vivo",
    modelName: "V71i",
    slug: "vivo-v71i",
    imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/vivo-v71i.jpg",
    variants: [
      { storage: "2GB / 16GB", basePrice: 1340 }
    ]
  },
  {
    category: "mobile",
    brand: "Vivo",
    modelName: "Y81",
    slug: "vivo-y81",
    imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/vivo-y81.jpg",
    variants: [
      { storage: "3GB / 32GB", basePrice: 1830 },
      { storage: "4GB / 32GB", basePrice: 2140 }
    ]
  },
  {
    category: "mobile",
    brand: "Vivo",
    modelName: "Y83",
    slug: "vivo-y83",
    imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/vivo-y83.jpg",
    variants: [
      { storage: "4GB / 32GB", basePrice: 2260 }
    ]
  },
  {
    category: "mobile",
    brand: "Vivo",
    modelName: "V9 Youth",
    slug: "vivo-v9-youth",
    imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/vivo-v9-youth.jpg",
    variants: [
      { storage: "4GB / 32GB", basePrice: 2150 }
    ]
  },
  {
    category: "mobile",
    brand: "Vivo",
    modelName: "Y71",
    slug: "vivo-y71",
    imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/vivo-y71.jpg",
    variants: [
      { storage: "3GB / 16GB", basePrice: 1380 },
      { storage: "3GB / 32GB", basePrice: 1490 },
      { storage: "4GB / 32GB", basePrice: 1720 }
    ]
  },
  {
    category: "mobile",
    brand: "Vivo",
    modelName: "Y53i",
    slug: "vivo-y53i",
    imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/vivo-y53i.jpg",
    variants: [
      { storage: "2GB / 16GB", basePrice: 970 }
    ]
  },
  {
    category: "mobile",
    brand: "Vivo",
    modelName: "X21",
    slug: "vivo-x21",
    imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/vivo-x21.jpg",
    variants: [
      { storage: "6GB / 128GB", basePrice: 3640 }
    ]
  },
  {
    category: "mobile",
    brand: "Vivo",
    modelName: "V9",
    slug: "vivo-v9",
    imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/vivo-v9.jpg",
    variants: [
      { storage: "4GB / 64GB", basePrice: 2640 }
    ]
  },
  {
    category: "mobile",
    brand: "Vivo",
    modelName: "V7",
    slug: "vivo-v7",
    imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/vivo-v7.jpg",
    variants: [
      { storage: "4GB / 32GB", basePrice: 2080 }
    ]
  },
  {
    category: "mobile",
    brand: "Vivo",
    modelName: "V7 Plus",
    slug: "vivo-v7-plus",
    imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/vivo-v7-plus.jpg",
    variants: [
      { storage: "4GB / 64GB", basePrice: 2150 }
    ]
  },
  {
    category: "mobile",
    brand: "Vivo",
    modelName: "Y69",
    slug: "vivo-y69",
    imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/vivo-y69.jpg",
    variants: [
      { storage: "3GB / 32GB", basePrice: 1530 }
    ]
  },
  {
    category: "mobile",
    brand: "Vivo",
    modelName: "X9",
    slug: "vivo-x9",
    imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/vivo-x9.jpg",
    variants: [
      { storage: "64GB", basePrice: 2250 },
      { storage: "128GB", basePrice: 2400 }
    ]
  },
  {
    category: "mobile",
    brand: "Vivo",
    modelName: "X9s",
    slug: "vivo-x9s",
    imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/vivo-x9s.jpg",
    variants: [
      { storage: "4GB / 64GB", basePrice: 2330 }
    ]
  },
  {
    category: "mobile",
    brand: "Vivo",
    modelName: "X9s Plus",
    slug: "vivo-x9s-plus",
    imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/vivo-x9s-plus.jpg",
    variants: [
      { storage: "4GB / 64GB", basePrice: 2550 }
    ]
  },
  {
    category: "mobile",
    brand: "Vivo",
    modelName: "Y55s",
    slug: "vivo-y55s",
    imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/vivo-y55s.jpg",
    variants: [
      { storage: "3GB / 16GB", basePrice: 1050 }
    ]
  },
  {
    category: "mobile",
    brand: "Vivo",
    modelName: "Y66",
    slug: "vivo-y66",
    imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/vivo-y66.jpg",
    variants: [
      { storage: "3GB / 32GB", basePrice: 1490 }
    ]
  },
  {
    category: "mobile",
    brand: "Vivo",
    modelName: "V5 Plus",
    slug: "vivo-v5-plus",
    imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/vivo-v5-plus.jpg",
    variants: [
      { storage: "4GB / 32GB", basePrice: 1930 },
      { storage: "4GB / 64GB", basePrice: 2170 }
    ]
  },
  {
    category: "mobile",
    brand: "Vivo",
    modelName: "V5",
    slug: "vivo-v5",
    imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/vivo-v5.jpg",
    variants: [
      { storage: "4GB / 32GB", basePrice: 1480 }
    ]
  },
  {
    category: "mobile",
    brand: "Vivo",
    modelName: "Y95",
    slug: "vivo-y95",
    imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/vivo-y95.jpg",
    variants: [
      { storage: "4GB / 64GB", basePrice: 2960 }
    ]
  },
  {
    category: "mobile",
    brand: "Vivo",
    modelName: "Y93",
    slug: "vivo-y93",
    imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/vivo-y93.jpg",
    variants: [
      { storage: "3GB / 64GB", basePrice: 2500 },
      { storage: "4GB / 32GB", basePrice: 2420 }
    ]
  },
  {
    category: "mobile",
    brand: "Vivo",
    modelName: "Y81i",
    slug: "vivo-y81i",
    imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/vivo-y81i.jpg",
    variants: [
      { storage: "2GB / 16GB", basePrice: 1340 }
    ]
  },
  {
    category: "mobile",
    brand: "Vivo",
    modelName: "Z10",
    slug: "vivo-z10",
    imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/vivo-z10.jpg",
    variants: [
      { storage: "4GB / 32GB", basePrice: 2500 }
    ]
  },
  {
    category: "mobile",
    brand: "Vivo",
    modelName: "Y91",
    slug: "vivo-y91",
    imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/vivo-y91.jpg",
    variants: [
      { storage: "2GB / 32GB", basePrice: 2050 },
      { storage: "3GB / 32GB", basePrice: 2270 }
    ]
  },
  {
    category: "mobile",
    brand: "Vivo",
    modelName: "V15 Pro",
    slug: "vivo-v15-pro",
    imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/vivo-v15-pro.jpg",
    variants: [
      { storage: "6GB / 128GB", basePrice: 4570 },
      { storage: "8GB / 128GB", basePrice: 4800 }
    ]
  },
  {
    category: "mobile",
    brand: "Vivo",
    modelName: "Y91i",
    slug: "vivo-y91i",
    imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/vivo-y91i.jpg",
    variants: [
      { storage: "2GB / 16GB", basePrice: 1570 },
      { storage: "2GB / 32GB", basePrice: 1750 },
      { storage: "3GB / 32GB", basePrice: 1900 }
    ]
  },
  {
    category: "mobile",
    brand: "Vivo",
    modelName: "V15",
    slug: "vivo-v15",
    imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/vivo-v15.jpg",
    variants: [
      { storage: "6GB / 64GB", basePrice: 4300 },
      { storage: "6GB / 128GB", basePrice: 4460 }
    ]
  },
  {
    category: "mobile",
    brand: "Vivo",
    modelName: "Y17",
    slug: "vivo-y17",
    imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/vivo-y17.jpg",
    variants: [
      { storage: "4GB / 128GB", basePrice: 4500 }
    ]
  },
  {
    category: "mobile",
    brand: "Vivo",
    modelName: "Y15 2019",
    slug: "vivo-y15-2019",
    imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/vivo-y15-2019.jpg",
    variants: [
      { storage: "4GB / 64GB", basePrice: 3610 }
    ]
  },
  {
    category: "mobile",
    brand: "Vivo",
    modelName: "Y12",
    slug: "vivo-y12",
    imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/vivo-y12.jpg",
    variants: [
      { storage: "3GB / 64GB", basePrice: 3410 },
      { storage: "4GB / 32GB", basePrice: 3650 }
    ]
  },
  {
    category: "mobile",
    brand: "Vivo",
    modelName: "Z1 Pro",
    slug: "vivo-z1-pro",
    imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/vivo-z1-pro.jpg",
    variants: [
      { storage: "4GB / 64GB", basePrice: 3390 },
      { storage: "6GB / 64GB", basePrice: 3450 },
      { storage: "6GB / 128GB", basePrice: 3600 },
      { storage: "8GB / 128GB", basePrice: 3940 }
    ]
  },
  {
    category: "mobile",
    brand: "Vivo",
    modelName: "S1",
    slug: "vivo-s1",
    imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/vivo-s1.jpg",
    variants: [
      { storage: "4GB / 128GB", basePrice: 4000 },
      { storage: "6GB / 64GB", basePrice: 4010 },
      { storage: "6GB / 128GB", basePrice: 4140 }
    ]
  },
  {
    category: "mobile",
    brand: "Vivo",
    modelName: "Y90",
    slug: "vivo-y90",
    imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/vivo-y90.jpg",
    variants: [
      { storage: "2GB / 16GB", basePrice: 1980 }
    ]
  },
  {
    category: "mobile",
    brand: "Vivo",
    modelName: "Z1x",
    slug: "vivo-z1x",
    imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/vivo-z1x.jpg",
    variants: [
      { storage: "4GB / 128GB", basePrice: 3750 },
      { storage: "6GB / 64GB", basePrice: 4010 },
      { storage: "6GB / 128GB", basePrice: 4090 },
      { storage: "8GB / 128GB", basePrice: 4320 }
    ]
  },
  {
    category: "mobile",
    brand: "Vivo",
    modelName: "V17 Pro",
    slug: "vivo-v17-pro",
    imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/vivo-v17-pro.jpg",
    variants: [
      { storage: "8GB / 128GB", basePrice: 5650 }
    ]
  },
  {
    category: "mobile",
    brand: "Vivo",
    modelName: "U10",
    slug: "vivo-u10",
    imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/vivo-u10.jpg",
    variants: [
      { storage: "3GB / 32GB", basePrice: 2820 },
      { storage: "3GB / 64GB", basePrice: 3040 },
      { storage: "4GB / 64GB", basePrice: 3260 }
    ]
  },
  {
    category: "mobile",
    brand: "Vivo",
    modelName: "Y19",
    slug: "vivo-y19",
    imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/vivo-y19.jpg",
    variants: [
      { storage: "4GB / 128GB", basePrice: 4150 }
    ]
  },
  {
    category: "mobile",
    brand: "Vivo",
    modelName: "U20",
    slug: "vivo-u20",
    imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/vivo-u20.jpg",
    variants: [
      { storage: "4GB / 64GB", basePrice: 3470 },
      { storage: "6GB / 64GB", basePrice: 3560 },
      { storage: "8GB / 128GB", basePrice: 3820 }
    ]
  },
  {
    category: "mobile",
    brand: "Vivo",
    modelName: "V17",
    slug: "vivo-v17",
    imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/vivo-v17.jpg",
    variants: [
      { storage: "8GB / 128GB", basePrice: 5380 }
    ]
  },
  {
    category: "mobile",
    brand: "Vivo",
    modelName: "S1 Pro",
    slug: "vivo-s1-pro",
    imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/vivo-s1-pro.jpg",
    variants: [
      { storage: "8GB / 128GB", basePrice: 4810 }
    ]
  },
  {
    category: "mobile",
    brand: "Vivo",
    modelName: "Y11 2019",
    slug: "vivo-y11-2019",
    imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/vivo-y11-2019.jpg",
    variants: [
      { storage: "3GB / 32GB", basePrice: 2800 }
    ]
  },
  {
    category: "mobile",
    brand: "Vivo",
    modelName: "V19",
    slug: "vivo-v19",
    imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/vivo-v19.jpg",
    variants: [
      { storage: "128GB", basePrice: 5500 },
      { storage: "256GB", basePrice: 6070 }
    ]
  },
  {
    category: "mobile",
    brand: "Vivo",
    modelName: "Y50",
    slug: "vivo-y50",
    imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/vivo-y50.jpg",
    variants: [
      { storage: "8GB / 128GB", basePrice: 5170 }
    ]
  },
  {
    category: "mobile",
    brand: "Vivo",
    modelName: "Y30",
    slug: "vivo-y30",
    imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/vivo-y30.jpg",
    variants: [
      { storage: "4GB / 128GB", basePrice: 4500 },
      { storage: "6GB / 128GB", basePrice: 4730 }
    ]
  },
  {
    category: "mobile",
    brand: "Vivo",
    modelName: "X50",
    slug: "vivo-x50",
    imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/vivo-x50.jpg",
    variants: [
      { storage: "128GB", basePrice: 5920 },
      { storage: "256GB", basePrice: 6190 }
    ]
  },
  {
    category: "mobile",
    brand: "Vivo",
    modelName: "x50 Pro",
    slug: "vivo-x50-pro",
    imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/vivo-x50-pro.jpg",
    variants: [
      { storage: "8GB / 256GB", basePrice: 9150 }
    ]
  },
  {
    category: "mobile",
    brand: "Vivo",
    modelName: "V20",
    slug: "vivo-v20",
    imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/vivo-v20.jpg",
    variants: [
      { storage: "128GB", basePrice: 5960 },
      { storage: "256GB", basePrice: 6230 }
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