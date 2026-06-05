import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import Device from "../models/Device.js";

const devices = [
    // ══════════════════════════════════════════════════════
    //  SAMSUNG — All Series
    // ══════════════════════════════════════════════════════
    {
        category: "mobile",
        brand: "Samsung",
        modelName: "Galaxy A14 5G",
        slug: "samsung-galaxy-a14-5g",
        imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-a14-5g.jpg",
        variants: [
            { storage: "4GB / 64GB", basePrice: 6980 },
            { storage: "4GB / 128GB", basePrice: 7760 },
            { storage: "6GB / 128GB", basePrice: 8290 },
            { storage: "8GB / 128GB", basePrice: 8880 }
        ]
    },
    {
        category: "mobile",
        brand: "Samsung",
        modelName: "Galaxy A13",
        slug: "samsung-galaxy-a13",
        imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-a13.jpg",
        variants: [
            { storage: "4GB / 64GB", basePrice: 3750 },
            { storage: "4GB / 128GB", basePrice: 4170 },
            { storage: "6GB / 128GB", basePrice: 4660 }
        ]
    },
    {
        category: "mobile",
        brand: "Samsung",
        modelName: "Galaxy A03",
        slug: "samsung-galaxy-a03",
        imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-a03.jpg",
        variants: [
            { storage: "3GB / 32GB", basePrice: 2240 },
            { storage: "4GB / 64GB", basePrice: 2690 }
        ]
    },
    {
        category: "mobile",
        brand: "Samsung",
        modelName: "Galaxy A03 Core",
        slug: "samsung-galaxy-a03-core",
        imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-a03-core.jpg",
        variants: [
            { storage: "2GB / 32GB", basePrice: 2150 }
        ]
    },
    {
        category: "mobile",
        brand: "Samsung",
        modelName: "Galaxy A03s",
        slug: "samsung-galaxy-a03s",
        imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-a03s.jpg",
        variants: [
            { storage: "3GB / 32GB", basePrice: 2150 },
            { storage: "4GB / 64GB", basePrice: 2980 }
        ]
    },
    {
        category: "mobile",
        brand: "Samsung",
        modelName: "Galaxy A10",
        slug: "samsung-galaxy-a10",
        imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-a10.jpg",
        variants: [
            { storage: "2GB / 32GB", basePrice: 1850 }
        ]
    },
    {
        category: "mobile",
        brand: "Samsung",
        modelName: "Galaxy A10s",
        slug: "samsung-galaxy-a10s",
        imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-a10s.jpg",
        variants: [
            { storage: "2GB / 32GB", basePrice: 1920 },
            { storage: "3GB / 32GB", basePrice: 2000 }
        ]
    },
    {
        category: "mobile",
        brand: "Samsung",
        modelName: "Galaxy A12",
        slug: "samsung-galaxy-a12",
        imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-a12.jpg",
        variants: [
            { storage: "4GB / 64GB", basePrice: 3500 },
            { storage: "4GB / 128GB", basePrice: 3710 },
            { storage: "6GB / 128GB", basePrice: 3980 }
        ]
    },
    {
        category: "mobile",
        brand: "Samsung",
        modelName: "Galaxy A20",
        slug: "samsung-galaxy-a20",
        imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-a20.jpg",
        variants: [
            { storage: "3GB / 32GB", basePrice: 2540 }
        ]
    },
    {
        category: "mobile",
        brand: "Samsung",
        modelName: "Galaxy A20s",
        slug: "samsung-galaxy-a20s",
        imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-a20s.jpg",
        variants: [
            { storage: "3GB / 32GB", basePrice: 2440 },
            { storage: "4GB / 64GB", basePrice: 2730 }
        ]
    },
    {
        category: "mobile",
        brand: "Samsung",
        modelName: "Galaxy A21s",
        slug: "samsung-galaxy-a21s",
        imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-a21s.jpg",
        variants: [
            { storage: "4GB / 64GB", basePrice: 3350 },
            { storage: "6GB / 64GB", basePrice: 3580 },
            { storage: "6GB / 128GB", basePrice: 3750 }
        ]
    },
    {
        category: "mobile",
        brand: "Samsung",
        modelName: "Galaxy A22",
        slug: "samsung-galaxy-a22",
        imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-a22.jpg",
        variants: [
            { storage: "4GB / 128GB", basePrice: 3850 },
            { storage: "6GB / 128GB", basePrice: 4220 }
        ]
    },
    {
        category: "mobile",
        brand: "Samsung",
        modelName: "Galaxy A22 5G",
        slug: "samsung-galaxy-a22-5g",
        imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-a22-5g.jpg",
        variants: [
            { storage: "6GB / 128GB", basePrice: 6020 },
            { storage: "8GB / 128GB", basePrice: 6520 }
        ]
    },
    {
        category: "mobile",
        brand: "Samsung",
        modelName: "Galaxy A23",
        slug: "samsung-galaxy-a23",
        imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-a23.jpg",
        variants: [
            { storage: "6GB / 128GB", basePrice: 4520 },
            { storage: "8GB / 128GB", basePrice: 4940 }
        ]
    },
    {
        category: "mobile",
        brand: "Samsung",
        modelName: "Galaxy A30",
        slug: "samsung-galaxy-a30",
        imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-a30.jpg",
        variants: [
            { storage: "4GB / 64GB", basePrice: 2670 }
        ]
    },
    {
        category: "mobile",
        brand: "Samsung",
        modelName: "Galaxy A30s",
        slug: "samsung-galaxy-a30s",
        imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-a30s.jpg",
        variants: [
            { storage: "4GB / 64GB", basePrice: 2570 },
            { storage: "4GB / 128GB", basePrice: 2730 }
        ]
    },
    {
        category: "mobile",
        brand: "Samsung",
        modelName: "Galaxy A31",
        slug: "samsung-galaxy-a31",
        imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-a31.jpg",
        variants: [
            { storage: "6GB / 128GB", basePrice: 3580 }
        ]
    },
    {
        category: "mobile",
        brand: "Samsung",
        modelName: "Galaxy A32",
        slug: "samsung-galaxy-a32",
        imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-a32.jpg",
        variants: [
            { storage: "6GB / 128GB", basePrice: 4810 },
            { storage: "8GB / 128GB", basePrice: 5340 }
        ]
    },
    {
        category: "mobile",
        brand: "Samsung",
        modelName: "Galaxy A5 2017",
        slug: "samsung-galaxy-a5-2017",
        imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-a5-2017.jpg",
        variants: [
            { storage: "3GB / 32GB", basePrice: 1080 }
        ]
    },
    {
        category: "mobile",
        brand: "Samsung",
        modelName: "Galaxy A50",
        slug: "samsung-galaxy-a50",
        imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-a50.jpg",
        variants: [
            { storage: "4GB / 64GB", basePrice: 2930 },
            { storage: "6GB / 64GB", basePrice: 3180 },
            { storage: "6GB / 128GB", basePrice: 3370 }
        ]
    },
    {
        category: "mobile",
        brand: "Samsung",
        modelName: "Galaxy A50s",
        slug: "samsung-galaxy-a50s",
        imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-a50s.jpg",
        variants: [
            { storage: "4GB / 128GB", basePrice: 2800 },
            { storage: "6GB / 128GB", basePrice: 3000 }
        ]
    },
    {
        category: "mobile",
        brand: "Samsung",
        modelName: "Galaxy A51",
        slug: "samsung-galaxy-a51",
        imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-a51.jpg",
        variants: [
            { storage: "6GB / 128GB", basePrice: 3940 },
            { storage: "8GB / 128GB", basePrice: 4140 }
        ]
    },
    {
        category: "mobile",
        brand: "Samsung",
        modelName: "Galaxy A52",
        slug: "samsung-galaxy-a52",
        imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-a52.jpg",
        variants: [
            { storage: "6GB / 128GB", basePrice: 5420 },
            { storage: "8GB / 128GB", basePrice: 5790 }
        ]
    },
    {
        category: "mobile",
        brand: "Samsung",
        modelName: "Galaxy A52s 5G",
        slug: "samsung-galaxy-a52s-5g",
        imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-a52s-5g.jpg",
        variants: [
            { storage: "6GB / 128GB", basePrice: 7620 },
            { storage: "8GB / 128GB", basePrice: 8190 }
        ]
    },
    {
        category: "mobile",
        brand: "Samsung",
        modelName: "Galaxy A53 5G",
        slug: "samsung-galaxy-a53-5g",
        imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-a53-5g.jpg",
        variants: [
            { storage: "6GB / 128GB", basePrice: 6780 },
            { storage: "8GB / 128GB", basePrice: 7190 },
            { storage: "8GB / 256GB", basePrice: 7590 }
        ]
    },
    {
        category: "mobile",
        brand: "Samsung",
        modelName: "Galaxy A6",
        slug: "samsung-galaxy-a6",
        imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-a6.jpg",
        variants: [
            { storage: "3GB / 32GB", basePrice: 1330 },
            { storage: "4GB / 32GB", basePrice: 1460 },
            { storage: "4GB / 64GB", basePrice: 1640 }
        ]
    },
    {
        category: "mobile",
        brand: "Samsung",
        modelName: "Galaxy A6 Plus",
        slug: "samsung-galaxy-a6-plus",
        imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-a6-plus.jpg",
        variants: [
            { storage: "3GB / 32GB", basePrice: 1510 },
            { storage: "4GB / 32GB", basePrice: 1640 },
            { storage: "4GB / 64GB", basePrice: 1820 }
        ]
    },
    {
        category: "mobile",
        brand: "Samsung",
        modelName: "Galaxy A7 2016",
        slug: "samsung-galaxy-a7-2016",
        imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-a7-2016.jpg",
        variants: [
            { storage: "3GB / 16GB", basePrice: 1260 }
        ]
    },
    {
        category: "mobile",
        brand: "Samsung",
        modelName: "Galaxy A7 2017",
        slug: "samsung-galaxy-a7-2017",
        imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-a7-2017.jpg",
        variants: [
            { storage: "3GB / 32GB", basePrice: 1410 }
        ]
    },
    {
        category: "mobile",
        brand: "Samsung",
        modelName: "Galaxy A7 (2018)",
        slug: "samsung-galaxy-a7-2018",
        imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-a7-2018.jpg",
        variants: [
            { storage: "4GB / 64GB", basePrice: 1820 },
            { storage: "4GB / 128GB", basePrice: 2010 },
            { storage: "6GB / 128GB", basePrice: 2150 }
        ]
    },
    {
        category: "mobile",
        brand: "Samsung",
        modelName: "Galaxy A70",
        slug: "samsung-galaxy-a70",
        imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-a70.jpg",
        variants: [
            { storage: "6GB / 128GB", basePrice: 3700 }
        ]
    },
    {
        category: "mobile",
        brand: "Samsung",
        modelName: "Galaxy A70s",
        slug: "samsung-galaxy-a70s",
        imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-a70s.jpg",
        variants: [
            { storage: "6GB / 128GB", basePrice: 3460 },
            { storage: "8GB / 128GB", basePrice: 3690 }
        ]
    },
    {
        category: "mobile",
        brand: "Samsung",
        modelName: "Galaxy A71",
        slug: "samsung-galaxy-a71",
        imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-a71.jpg",
        variants: [
            { storage: "6GB / 128GB", basePrice: 4070 },
            { storage: "8GB / 128GB", basePrice: 4430 }
        ]
    },
    {
        category: "mobile",
        brand: "Samsung",
        modelName: "Galaxy A72",
        slug: "samsung-galaxy-a72",
        imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-a72.jpg",
        variants: [
            { storage: "8GB / 128GB", basePrice: 6360 },
            { storage: "8GB / 256GB", basePrice: 6910 }
        ]
    },
    {
        category: "mobile",
        brand: "Samsung",
        modelName: "Galaxy A73 5G",
        slug: "samsung-galaxy-a73-5g",
        imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-a73-5g.jpg",
        variants: [
            { storage: "8GB / 128GB", basePrice: 8930 },
            { storage: "8GB / 256GB", basePrice: 9660 }
        ]
    },
    {
        category: "mobile",
        brand: "Samsung",
        modelName: "Galaxy A8 Plus",
        slug: "samsung-galaxy-a8-plus",
        imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-a8-plus.jpg",
        variants: [
            { storage: "6GB / 64GB", basePrice: 2300 }
        ]
    },
    {
        category: "mobile",
        brand: "Samsung",
        modelName: "Galaxy A8 Star",
        slug: "samsung-galaxy-a8-star",
        imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-a8-star.jpg",
        variants: [
            { storage: "6GB / 64GB", basePrice: 1780 }
        ]
    },
    {
        category: "mobile",
        brand: "Samsung",
        modelName: "Galaxy A80",
        slug: "samsung-galaxy-a80",
        imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-a80.jpg",
        variants: [
            { storage: "8GB / 128GB", basePrice: 5040 }
        ]
    },
    {
        category: "mobile",
        brand: "Samsung",
        modelName: "Galaxy A9 2018",
        slug: "samsung-galaxy-a9-2018",
        imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-a9-2018.jpg",
        variants: [
            { storage: "6GB / 128GB", basePrice: 2260 },
            { storage: "8GB / 128GB", basePrice: 2480 }
        ]
    },
    {
        category: "mobile",
        brand: "Samsung",
        modelName: "Galaxy A9 Pro",
        slug: "samsung-galaxy-a9-pro",
        imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-a9-pro.jpg",
        variants: [
            { storage: "4GB / 32GB", basePrice: 1480 }
        ]
    },
    {
        category: "mobile",
        brand: "Samsung",
        modelName: "Galaxy C7 Pro",
        slug: "samsung-galaxy-c7-pro",
        imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-c7-pro.jpg",
        variants: [
            { storage: "4GB / 64GB", basePrice: 2110 }
        ]
    },
    {
        category: "mobile",
        brand: "Samsung",
        modelName: "Galaxy C9 Pro",
        slug: "samsung-galaxy-c9-pro",
        imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-c9-pro.jpg",
        variants: [
            { storage: "6GB / 64GB", basePrice: 2150 }
        ]
    },
    {
        category: "mobile",
        brand: "Samsung",
        modelName: "Galaxy F02s",
        slug: "samsung-galaxy-f02s",
        imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-f02s.jpg",
        variants: [
            { storage: "3GB / 32GB", basePrice: 2740 },
            { storage: "4GB / 64GB", basePrice: 2890 }
        ]
    },
    {
        category: "mobile",
        brand: "Samsung",
        modelName: "Galaxy F12",
        slug: "samsung-galaxy-f12",
        imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-f12.jpg",
        variants: [
            { storage: "4GB / 64GB", basePrice: 3230 },
            { storage: "4GB / 128GB", basePrice: 3650 }
        ]
    },
    {
        category: "mobile",
        brand: "Samsung",
        modelName: "Galaxy F13",
        slug: "samsung-galaxy-f13",
        imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-f13.jpg",
        variants: [
            { storage: "4GB / 64GB", basePrice: 3750 },
            { storage: "4GB / 128GB", basePrice: 4000 }
        ]
    },
    {
        category: "mobile",
        brand: "Samsung",
        modelName: "Galaxy F22",
        slug: "samsung-galaxy-f22",
        imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-f22.jpg",
        variants: [
            { storage: "4GB / 64GB", basePrice: 3500 },
            { storage: "6GB / 128GB", basePrice: 3810 }
        ]
    },
    {
        category: "mobile",
        brand: "Samsung",
        modelName: "Galaxy F23 5G",
        slug: "samsung-galaxy-f23-5g",
        imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-f23-5g.jpg",
        variants: [
            { storage: "4GB / 128GB", basePrice: 5890 },
            { storage: "6GB / 128GB", basePrice: 6190 }
        ]
    },
    {
        category: "mobile",
        brand: "Samsung",
        modelName: "Galaxy F41",
        slug: "samsung-galaxy-f41",
        imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-f41.jpg",
        variants: [
            { storage: "6GB / 64GB", basePrice: 3220 },
            { storage: "6GB / 128GB", basePrice: 3560 }
        ]
    },
    {
        category: "mobile",
        brand: "Samsung",
        modelName: "Galaxy F42 5G",
        slug: "samsung-galaxy-f42-5g",
        imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-f42-5g.jpg",
        variants: [
            { storage: "6GB / 128GB", basePrice: 6340 },
            { storage: "8GB / 128GB", basePrice: 6930 }
        ]
    },
    {
        category: "mobile",
        brand: "Samsung",
        modelName: "Galaxy F62",
        slug: "samsung-galaxy-f62",
        imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-f62.jpg",
        variants: [
            { storage: "6GB / 128GB", basePrice: 4880 },
            { storage: "8GB / 128GB", basePrice: 5040 }
        ]
    },
    {
        category: "mobile",
        brand: "Samsung",
        modelName: "Galaxy Fold",
        slug: "samsung-galaxy-fold",
        imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-fold.jpg",
        variants: [
            { storage: "12GB / 512GB", basePrice: 12790 }
        ]
    },
    {
        category: "mobile",
        brand: "Samsung",
        modelName: "Galaxy J2 2016",
        slug: "samsung-galaxy-j2-2016",
        imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-j2-2016.jpg",
        variants: [
            { storage: "1.5GB / 8GB", basePrice: 810 }
        ]
    },
    {
        category: "mobile",
        brand: "Samsung",
        modelName: "Galaxy J2 2017",
        slug: "samsung-galaxy-j2-2017",
        imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-j2-2017.jpg",
        variants: [
            { storage: "1GB / 8GB", basePrice: 700 }
        ]
    },
    {
        category: "mobile",
        brand: "Samsung",
        modelName: "Galaxy J2 2018",
        slug: "samsung-galaxy-j2-2018",
        imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-j2-2018.jpg",
        variants: [
            { storage: "2GB / 16GB", basePrice: 1190 }
        ]
    },
    {
        category: "mobile",
        brand: "Samsung",
        modelName: "Galaxy J2 Ace",
        slug: "samsung-galaxy-j2-ace",
        imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-j2-ace.jpg",
        variants: [
            { storage: "1.5GB / 8GB", basePrice: 660 }
        ]
    },
    {
        category: "mobile",
        brand: "Samsung",
        modelName: "Galaxy J2 Core",
        slug: "samsung-galaxy-j2-core",
        imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-j2-core.jpg",
        variants: [
            { storage: "1GB / 8GB", basePrice: 740 }
        ]
    },
    {
        category: "mobile",
        brand: "Samsung",
        modelName: "Galaxy J2 Core 2020",
        slug: "samsung-galaxy-j2-core-2020",
        imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-j2-core-2020.jpg",
        variants: [
            { storage: "1GB / 16GB", basePrice: 1290 }
        ]
    },
    {
        category: "mobile",
        brand: "Samsung",
        modelName: "Galaxy J2 pro",
        slug: "samsung-galaxy-j2-pro",
        imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-j2-pro.jpg",
        variants: [
            { storage: "2GB / 16GB", basePrice: 890 }
        ]
    },
    {
        category: "mobile",
        brand: "Samsung",
        modelName: "Galaxy J3",
        slug: "samsung-galaxy-j3",
        imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-j3.jpg",
        variants: [
            { storage: "1.5GB / 8GB", basePrice: 880 }
        ]
    },
    {
        category: "mobile",
        brand: "Samsung",
        modelName: "Galaxy J3 2017",
        slug: "samsung-galaxy-j3-2017",
        imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-j3-2017.jpg",
        variants: [
            { storage: "2GB / 16GB", basePrice: 1170 }
        ]
    },
    {
        category: "mobile",
        brand: "Samsung",
        modelName: "Galaxy J3 Pro",
        slug: "samsung-galaxy-j3-pro",
        imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-j3-pro.jpg",
        variants: [
            { storage: "2GB / 16GB", basePrice: 890 }
        ]
    },
    {
        category: "mobile",
        brand: "Samsung",
        modelName: "Galaxy J4",
        slug: "samsung-galaxy-j4",
        imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-j4.jpg",
        variants: [
            { storage: "2GB / 16GB", basePrice: 1110 },
            { storage: "3GB / 32GB", basePrice: 1330 }
        ]
    },
    {
        category: "mobile",
        brand: "Samsung",
        modelName: "Galaxy J4 Plus",
        slug: "samsung-galaxy-j4-plus",
        imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-j4-plus.jpg",
        variants: [
            { storage: "2GB / 32GB", basePrice: 1480 }
        ]
    },
    {
        category: "mobile",
        brand: "Samsung",
        modelName: "Galaxy J5 2016",
        slug: "samsung-galaxy-j5-2016",
        imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-j5-2016.jpg",
        variants: [
            { storage: "2GB / 16GB", basePrice: 890 }
        ]
    },
    {
        category: "mobile",
        brand: "Samsung",
        modelName: "Galaxy J5 2017",
        slug: "samsung-galaxy-j5-2017",
        imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-j5-2017.jpg",
        variants: [
            { storage: "2GB / 16GB", basePrice: 960 }
        ]
    },
    {
        category: "mobile",
        brand: "Samsung",
        modelName: "Galaxy J5 Prime",
        slug: "samsung-galaxy-j5-prime",
        imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-j5-prime.jpg",
        variants: [
            { storage: "2GB / 16GB", basePrice: 1130 },
            { storage: "3GB / 32GB", basePrice: 1200 }
        ]
    },
    {
        category: "mobile",
        brand: "Samsung",
        modelName: "Galaxy J6",
        slug: "samsung-galaxy-j6",
        imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-j6.jpg",
        variants: [
            { storage: "3GB / 32GB", basePrice: 1530 },
            { storage: "4GB / 64GB", basePrice: 1700 }
        ]
    },
    {
        category: "mobile",
        brand: "Samsung",
        modelName: "Galaxy J6 Plus",
        slug: "samsung-galaxy-j6-plus",
        imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-j6-plus.jpg",
        variants: [
            { storage: "4GB / 64GB", basePrice: 1890 }
        ]
    },
    {
        category: "mobile",
        brand: "Samsung",
        modelName: "Galaxy J7 2016",
        slug: "samsung-galaxy-j7-2016",
        imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-j7-2016.jpg",
        variants: [
            { storage: "2GB / 16GB", basePrice: 1110 }
        ]
    },
    {
        category: "mobile",
        brand: "Samsung",
        modelName: "Galaxy J7 Duo",
        slug: "samsung-galaxy-j7-duo",
        imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-j7-duo.jpg",
        variants: [
            { storage: "4GB / 32GB", basePrice: 1410 }
        ]
    },
    {
        category: "mobile",
        brand: "Samsung",
        modelName: "Galaxy J7 Max",
        slug: "samsung-galaxy-j7-max",
        imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-j7-max.jpg",
        variants: [
            { storage: "4GB / 32GB", basePrice: 1440 }
        ]
    },
    {
        category: "mobile",
        brand: "Samsung",
        modelName: "Galaxy J7 Nxt",
        slug: "samsung-galaxy-j7-nxt",
        imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-j7-nxt.jpg",
        variants: [
            { storage: "2GB / 16GB", basePrice: 1190 },
            { storage: "3GB / 32GB", basePrice: 1410 }
        ]
    },
    {
        category: "mobile",
        brand: "Samsung",
        modelName: "Galaxy J7 Prime",
        slug: "samsung-galaxy-j7-prime",
        imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-j7-prime.jpg",
        variants: [
            { storage: "3GB / 16GB", basePrice: 1190 },
            { storage: "3GB / 32GB", basePrice: 1260 },
            { storage: "3GB / 64GB", basePrice: 1480 }
        ]
    },
    {
        category: "mobile",
        brand: "Samsung",
        modelName: "Galaxy J7 Pro",
        slug: "samsung-galaxy-j7-pro",
        imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-j7-pro.jpg",
        variants: [
            { storage: "3GB / 32GB", basePrice: 1000 },
            { storage: "3GB / 64GB", basePrice: 1110 }
        ]
    },
    {
        category: "mobile",
        brand: "Samsung",
        modelName: "Galaxy J8",
        slug: "samsung-galaxy-j8",
        imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-j8.jpg",
        variants: [
            { storage: "4GB / 64GB", basePrice: 2340 }
        ]
    },
    {
        category: "mobile",
        brand: "Samsung",
        modelName: "Galaxy M01",
        slug: "samsung-galaxy-m01",
        imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-m01.jpg",
        variants: [
            { storage: "3GB / 32GB", basePrice: 2180 }
        ]
    },
    {
        category: "mobile",
        brand: "Samsung",
        modelName: "Galaxy M01 Core",
        slug: "samsung-galaxy-m01-core",
        imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-m01-core.jpg",
        variants: [
            { storage: "1GB / 16GB", basePrice: 1310 },
            { storage: "2GB / 32GB", basePrice: 1580 }
        ]
    },
    {
        category: "mobile",
        brand: "Samsung",
        modelName: "Galaxy M01s",
        slug: "samsung-galaxy-m01s",
        imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-m01s.jpg",
        variants: [
            { storage: "3GB / 32GB", basePrice: 2080 }
        ]
    },
    {
        category: "mobile",
        brand: "Samsung",
        modelName: "Galaxy M02",
        slug: "samsung-galaxy-m02",
        imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-m02.jpg",
        variants: [
            { storage: "2GB / 32GB", basePrice: 2460 },
            { storage: "3GB / 32GB", basePrice: 2690 }
        ]
    },
];

// ─── SEED FUNCTION ────────────────────────────────────────────────────────────

async function seed() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");
        await Device.deleteMany({ category: "mobile", brand: "Samsung" });
        console.log("Cleared existing Samsung devices");
        await Device.insertMany(devices);
        console.log(`✅ Seeded ${devices.length} Samsung devices successfully`);
        process.exit(0);
    } catch (err) {
        console.error("❌ Seed failed:", err.message);
        process.exit(1);
    }
}

seed();