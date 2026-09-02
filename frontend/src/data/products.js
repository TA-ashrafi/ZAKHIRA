// Product Images
import necklace1 from '../assets/images/products/necklace-1.jpg';
import necklace2 from '../assets/images/products/necklace-2.jpg';
import earring1 from '../assets/images/products/earring-1.jpg';
import earring2 from '../assets/images/products/earring-2.jpg';
import ring1 from '../assets/images/products/ring-1.jpg';
import ring2 from '../assets/images/products/ring-2.jpg';
import bracelet1 from '../assets/images/products/bracelet-1.jpg';
import bracelet2 from '../assets/images/products/bracelet-2.jpg';
import pendant1 from '../assets/images/products/pendant-1.jpg';
import pendant2 from '../assets/images/products/pendant-2.jpg';

// Category Images
import necklacesCat from '../assets/images/categories/necklaces.jpg';
import earringsCat from '../assets/images/categories/earrings.jpg';
import ringsCat from '../assets/images/categories/rings.jpg';
import braceletsCat from '../assets/images/categories/bracelets.jpg';

// Hero Background
import heroBg from '../assets/images/hero-bg.jpg';

export const productsData = [
  {
    _id: '65f2a1b2c3d4e5f600000001',
    name: 'Solitaire Pendant Necklace',
    description: 'Elegant solitaire diamond pendant set in 22K gold. Perfect for special occasions and everyday luxury.',
    price: 12900,
    comparePrice: 15900,
    category: 'Necklace',
    goldPurity: '22K',
    stoneType: 'Diamond',
    weight: 3.2,
    images: [necklace1, necklace2],
    inStock: true,
    stockQuantity: 15,
    ratings: { average: 4.9, count: 128 },
    isFeatured: true,
    createdAt: '2026-01-15'
  },
  {
    _id: '65f2a1b2c3d4e5f600000002',
    name: 'Classic Hoop Earrings',
    description: 'Timeless gold hoop earrings with a sleek finish. Lightweight and comfortable for all-day wear.',
    price: 8900,
    comparePrice: 10900,
    category: 'Earring',
    goldPurity: '22K',
    stoneType: 'None',
    weight: 2.8,
    images: [earring1, earring2],
    inStock: true,
    stockQuantity: 25,
    ratings: { average: 4.8, count: 95 },
    isFeatured: true,
    createdAt: '2026-01-18'
  },
  {
    _id: '65f2a1b2c3d4e5f600000003',
    name: 'Dainty Stack Ring',
    description: 'Minimalist gold stacking ring with a delicate design. Perfect for everyday wear or special occasions.',
    price: 5900,
    comparePrice: 7500,
    category: 'Ring',
    goldPurity: '18K',
    stoneType: 'None',
    ringSize: 7,
    weight: 1.5,
    images: [ring1, ring2],
    inStock: true,
    stockQuantity: 30,
    ratings: { average: 4.7, count: 67 },
    isFeatured: false,
    createdAt: '2026-01-20'
  },
  {
    _id: '65f2a1b2c3d4e5f600000004',
    name: 'Tennis Bracelet',
    description: 'Stunning tennis bracelet with sparkling diamonds set in 22K gold. A true statement piece.',
    price: 14900,
    comparePrice: 18900,
    category: 'Bracelet',
    goldPurity: '22K',
    stoneType: 'Diamond',
    weight: 4.5,
    images: [bracelet1, bracelet2],
    inStock: true,
    stockQuantity: 10,
    ratings: { average: 4.9, count: 82 },
    isFeatured: true,
    createdAt: '2026-01-22'
  },
  {
    _id: '65f2a1b2c3d4e5f600000005',
    name: 'Infinity Knot Ring',
    description: 'Beautiful infinity knot ring crafted in 22K gold. Symbolizes eternal love and commitment.',
    price: 7900,
    comparePrice: 9900,
    category: 'Ring',
    goldPurity: '22K',
    stoneType: 'None',
    ringSize: 6,
    weight: 2.1,
    images: [ring1, ring2],
    inStock: true,
    stockQuantity: 20,
    ratings: { average: 4.6, count: 54 },
    isFeatured: false,
    createdAt: '2026-01-25'
  },
  {
    _id: '65f2a1b2c3d4e5f600000006',
    name: 'Pearl Drop Earrings',
    description: 'Elegant pearl drop earrings with a gold setting. Perfect for bridal wear and formal events.',
    price: 9900,
    comparePrice: 12900,
    category: 'Earring',
    goldPurity: '18K',
    stoneType: 'Pearl',
    weight: 3.0,
    images: [earring1, earring2],
    inStock: true,
    stockQuantity: 12,
    ratings: { average: 4.8, count: 43 },
    isFeatured: false,
    createdAt: '2026-01-28'
  },
  {
    _id: '65f2a1b2c3d4e5f600000007',
    name: 'Gold Chain Necklace',
    description: 'Classic gold chain necklace with a delicate link design. A versatile piece for any jewelry collection.',
    price: 4500,
    comparePrice: 5500,
    category: 'Necklace',
    goldPurity: '22K',
    stoneType: 'None',
    weight: 2.5,
    images: [necklace1, necklace2],
    inStock: true,
    stockQuantity: 35,
    ratings: { average: 4.5, count: 38 },
    isFeatured: false,
    createdAt: '2026-02-01'
  },
  {
    _id: '65f2a1b2c3d4e5f600000008',
    name: 'Diamond Stud Earrings',
    description: 'Classic diamond stud earrings in 22K gold setting. Timeless elegance for any occasion.',
    price: 19900,
    comparePrice: 24900,
    category: 'Earring',
    goldPurity: '22K',
    stoneType: 'Diamond',
    weight: 2.2,
    images: [earring1, earring2],
    inStock: true,
    stockQuantity: 8,
    ratings: { average: 4.9, count: 61 },
    isFeatured: true,
    createdAt: '2026-02-05'
  },
  {
    _id: '65f2a1b2c3d4e5f600000009',
    name: 'Gold Bangles Set',
    description: 'Set of 3 elegant gold bangles with a traditional design. Perfect for weddings and festive occasions.',
    price: 15900,
    comparePrice: 19900,
    category: 'Bracelet',
    goldPurity: '22K',
    stoneType: 'None',
    weight: 6.8,
    images: [bracelet1, bracelet2],
    inStock: true,
    stockQuantity: 5,
    ratings: { average: 4.7, count: 29 },
    isFeatured: false,
    createdAt: '2026-02-10'
  },
  {
    _id: '65f2a1b2c3d4e5f600000010',
    name: 'Ruby Pendant Necklace',
    description: 'Exquisite ruby pendant surrounded by diamonds in a 22K gold setting. A true treasure.',
    price: 24900,
    comparePrice: 29900,
    category: 'Necklace',
    goldPurity: '22K',
    stoneType: 'Ruby',
    weight: 4.0,
    images: [pendant1, pendant2],
    inStock: true,
    stockQuantity: 6,
    ratings: { average: 4.9, count: 47 },
    isFeatured: true,
    createdAt: '2026-02-15'
  },
  {
    _id: '65f2a1b2c3d4e5f600000011',
    name: 'Gold Cuff Bracelet',
    description: 'Modern gold cuff bracelet with a sleek, minimalist design. Adds sophistication to any outfit.',
    price: 6900,
    comparePrice: 8500,
    category: 'Bracelet',
    goldPurity: '22K',
    stoneType: 'None',
    weight: 3.5,
    images: [bracelet1, bracelet2],
    inStock: true,
    stockQuantity: 18,
    ratings: { average: 4.6, count: 33 },
    isFeatured: false,
    createdAt: '2026-02-20'
  },
  {
    _id: '65f2a1b2c3d4e5f600000012',
    name: 'Emerald Drop Earrings',
    description: 'Stunning emerald drop earrings with a gold finish. Perfect for making a statement.',
    price: 17900,
    comparePrice: 21900,
    category: 'Earring',
    goldPurity: '18K',
    stoneType: 'Emerald',
    weight: 3.8,
    images: [earring1, earring2],
    inStock: true,
    stockQuantity: 9,
    ratings: { average: 4.8, count: 56 },
    isFeatured: false,
    createdAt: '2026-02-25'
  }
];

// Category Data
export const categoriesData = [
  {
    id: 'necklaces',
    name: 'Necklaces',
    image: necklacesCat,
    link: '/shop?category=Necklace'
  },
  {
    id: 'earrings',
    name: 'Earrings',
    image: earringsCat,
    link: '/shop?category=Earring'
  },
  {
    id: 'rings',
    name: 'Rings',
    image: ringsCat,
    link: '/shop?category=Ring'
  },
  {
    id: 'bracelets',
    name: 'Bracelets',
    image: braceletsCat,
    link: '/shop?category=Bracelet'
  }
];

// Best Sellers (6 items)
export const bestSellersData = productsData
  .filter(p => p.ratings.average >= 4.7)
  .slice(0, 6);

// Hero Background
export const heroData = {
  bgImage: heroBg,
  title: 'Timeless Beauty.',
  subtitle: 'Made to Shine.',
  description: 'Fine jewelry crafted with precision, passion, and the finest materials.'
};
