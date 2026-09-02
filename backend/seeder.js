import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import Product from './models/Product.js';
import Coupon from './models/Coupon.js';
import dns from 'dns';

dns.setServers(["1.1.1.1", "8.8.8.8"]);
dotenv.config();

const productsSeed = [
  {
    name: 'Solitaire Pendant Necklace',
    description: 'Elegant solitaire diamond pendant set in 22K gold. Perfect for special occasions and everyday luxury.',
    price: 12900,
    comparePrice: 15900,
    category: 'Necklace',
    goldPurity: '22K',
    stoneType: 'Diamond',
    weight: 3.2,
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=800'
    ],
    inStock: true,
    stockQuantity: 15,
    ratings: { average: 4.9, count: 128 },
    isFeatured: true
  },
  {
    name: 'Classic Hoop Earrings',
    description: 'Timeless gold hoop earrings with a sleek finish. Lightweight and comfortable for all-day wear.',
    price: 8900,
    comparePrice: 10900,
    category: 'Earring',
    goldPurity: '22K',
    stoneType: 'None',
    weight: 2.8,
    images: [
      'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1635767798638-3e25273a8236?auto=format&fit=crop&q=80&w=800'
    ],
    inStock: true,
    stockQuantity: 25,
    ratings: { average: 4.8, count: 95 },
    isFeatured: true
  },
  {
    name: 'Dainty Stack Ring',
    description: 'Minimalist gold stacking ring with a delicate design. Perfect for everyday wear or special occasions.',
    price: 5900,
    comparePrice: 7500,
    category: 'Ring',
    goldPurity: '18K',
    stoneType: 'None',
    ringSize: 7,
    weight: 1.5,
    images: [
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&q=80&w=800'
    ],
    inStock: true,
    stockQuantity: 30,
    ratings: { average: 4.7, count: 67 },
    isFeatured: false
  },
  {
    name: 'Tennis Bracelet',
    description: 'Stunning tennis bracelet with sparkling diamonds set in 22K gold. A true statement piece.',
    price: 14900,
    comparePrice: 18900,
    category: 'Bracelet',
    goldPurity: '22K',
    stoneType: 'Diamond',
    weight: 4.5,
    images: [
      'https://images.unsplash.com/photo-1611591475140-1e5b4109f6b9?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=800'
    ],
    inStock: true,
    stockQuantity: 10,
    ratings: { average: 4.9, count: 82 },
    isFeatured: true
  },
  {
    name: 'Infinity Knot Ring',
    description: 'Beautiful infinity knot ring crafted in 22K gold. Symbolizes eternal love and commitment.',
    price: 7900,
    comparePrice: 9900,
    category: 'Ring',
    goldPurity: '22K',
    stoneType: 'None',
    ringSize: 6,
    weight: 2.1,
    images: [
      'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&q=80&w=800'
    ],
    inStock: true,
    stockQuantity: 20,
    ratings: { average: 4.6, count: 54 },
    isFeatured: false
  },
  {
    name: 'Pearl Drop Earrings',
    description: 'Elegant pearl drop earrings with a gold setting. Perfect for bridal wear and formal events.',
    price: 9900,
    comparePrice: 12900,
    category: 'Earring',
    goldPurity: '18K',
    stoneType: 'Pearl',
    weight: 3.0,
    images: [
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=800'
    ],
    inStock: true,
    stockQuantity: 12,
    ratings: { average: 4.8, count: 43 },
    isFeatured: false
  },
  {
    name: 'Gold Chain Necklace',
    description: 'Classic gold chain necklace with a delicate link design. A versatile piece for any jewelry collection.',
    price: 4500,
    comparePrice: 5500,
    category: 'Necklace',
    goldPurity: '22K',
    stoneType: 'None',
    weight: 2.5,
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=800'
    ],
    inStock: true,
    stockQuantity: 35,
    ratings: { average: 4.5, count: 38 },
    isFeatured: false
  },
  {
    name: 'Diamond Stud Earrings',
    description: 'Classic diamond stud earrings in 22K gold setting. Timeless elegance for any occasion.',
    price: 19900,
    comparePrice: 24900,
    category: 'Earring',
    goldPurity: '22K',
    stoneType: 'Diamond',
    weight: 2.2,
    images: [
      'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&q=80&w=800'
    ],
    inStock: true,
    stockQuantity: 8,
    ratings: { average: 4.9, count: 61 },
    isFeatured: true
  },
  {
    name: 'Gold Bangles Set',
    description: 'Set of 3 elegant gold bangles with a traditional design. Perfect for weddings and festive occasions.',
    price: 15900,
    comparePrice: 19900,
    category: 'Bracelet',
    goldPurity: '22K',
    stoneType: 'None',
    weight: 6.8,
    images: [
      'https://images.unsplash.com/photo-1611591475140-1e5b4109f6b9?auto=format&fit=crop&q=80&w=800'
    ],
    inStock: true,
    stockQuantity: 5,
    ratings: { average: 4.7, count: 29 },
    isFeatured: false
  },
  {
    name: 'Ruby Pendant Necklace',
    description: 'Exquisite ruby pendant surrounded by diamonds in a 22K gold setting. A true treasure.',
    price: 24900,
    comparePrice: 29900,
    category: 'Necklace',
    goldPurity: '22K',
    stoneType: 'Ruby',
    weight: 4.0,
    images: [
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=800'
    ],
    inStock: true,
    stockQuantity: 6,
    ratings: { average: 4.9, count: 47 },
    isFeatured: true
  },
  {
    name: 'Gold Cuff Bracelet',
    description: 'Modern gold cuff bracelet with a sleek, minimalist design. Adds sophistication to any outfit.',
    price: 6900,
    comparePrice: 8500,
    category: 'Bracelet',
    goldPurity: '22K',
    stoneType: 'None',
    weight: 3.5,
    images: [
      'https://images.unsplash.com/photo-1611591475140-1e5b4109f6b9?auto=format&fit=crop&q=80&w=800'
    ],
    inStock: true,
    stockQuantity: 18,
    ratings: { average: 4.6, count: 33 },
    isFeatured: false
  },
  {
    name: 'Emerald Drop Earrings',
    description: 'Stunning emerald drop earrings with a gold finish. Perfect for making a statement.',
    price: 17900,
    comparePrice: 21900,
    category: 'Earring',
    goldPurity: '18K',
    stoneType: 'Emerald',
    weight: 3.8,
    images: [
      'https://images.unsplash.com/photo-1635767798638-3e25273a8236?auto=format&fit=crop&q=80&w=800'
    ],
    inStock: true,
    stockQuantity: 9,
    ratings: { average: 4.8, count: 56 },
    isFeatured: false
  }
];

const seedDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      console.log('❌ MONGO_URI is not set in .env');
      process.exit(1);
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB for Seeding...');

    // Clear existing data
    await Product.deleteMany({});
    console.log('Cleared existing products.');

    // Seed products
    await Product.insertMany(productsSeed);
    console.log('Seeded products successfully!');

    // Configurable Admin Credentials from .env
    const adminEmail = (process.env.ADMIN_EMAIL || 'adminzakhira@gmail.com').toLowerCase();
    const adminPassword = process.env.ADMIN_PASSWORD || '1234';

    // Seed or update Admin User
    await User.deleteMany({ role: 'admin' });
    await User.create({
      name: 'ZAKHIRA Admin',
      email: adminEmail,
      password: adminPassword,
      role: 'admin',
      phone: '+91 9876543210',
      address: {
        street: '123 Luxury Way',
        city: 'Jaipur',
        state: 'Rajasthan',
        pincode: '302001',
        country: 'India'
      }
    });
    console.log(`Created admin user: ${adminEmail} / ${adminPassword}`);

    // Seed sample coupon code ZAKHIRA10
    await Coupon.deleteMany({});
    await Coupon.create({
      code: 'ZAKHIRA10',
      discountPercentage: 10,
      minPurchase: 999,
      isActive: true
    });
    console.log('Created sample promo coupon: ZAKHIRA10 (10% OFF)');

    console.log('DB Seed Complete! 🌱');
    process.exit(0);
  } catch (error) {
    console.error('Seeding Error:', error);
    process.exit(1);
  }
};

seedDB();
