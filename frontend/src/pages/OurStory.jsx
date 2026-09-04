import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const OurStory = () => {
  return (
    <div className="bg-[#0D0D0D] text-[#F8F6F1] min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      {/* Title */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        <span className="text-[#C9A86C] uppercase tracking-[0.3em] text-xs font-semibold">The ZAKHIRA Legacy</span>
        <h1 className="font-playfair text-4xl sm:text-6xl text-[#F8F6F1] font-normal mt-3 mb-6">
          Our <span className="italic text-[#C9A86C] font-serif">Story</span>
        </h1>
        <p className="text-gray-400 font-light text-base leading-relaxed">
          From the regal palaces of Rajasthan to global luxury runways, explore the journey of ZAKHIRA.
        </p>
      </div>

      {/* Narrative Timeline / Story blocks */}
      <div className="max-w-5xl mx-auto space-y-20 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center"
        >
          <div className="order-2 md:order-1 space-y-4">
            <span className="text-[#C9A86C] font-mono text-sm">CHAPTER I • THE GENESIS</span>
            <h2 className="font-playfair text-3xl text-white">The Royal Heritage of Jaipur</h2>
            <p className="text-gray-400 font-light text-sm leading-relaxed">
              In 1984, the seeds of ZAKHIRA were sown in the historic Johari Bazaar of Jaipur. Inspired by the opulent Kundan, Meenakari, and Polki jewelry worn by royalty, our founders sought to preserve timeless gold craft while refining it for modern connoisseurs.
            </p>
          </div>
          <div className="order-1 md:order-2 rounded-xl overflow-hidden border border-[#C9A86C]/30 shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=800"
              alt="Jaipur Heritage"
              className="w-full h-80 object-cover"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center"
        >
          <div className="rounded-xl overflow-hidden border border-[#C9A86C]/30 shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1611591475140-438856db0cd1?auto=format&fit=crop&q=80&w=800"
              alt="Modern Haute Joaillerie"
              className="w-full h-80 object-cover"
            />
          </div>
          <div className="space-y-4">
            <span className="text-[#C9A86C] font-mono text-sm">CHAPTER II • REINVENTION</span>
            <h2 className="font-playfair text-3xl text-white">High Jewelry Meets Modern Minimalism</h2>
            <p className="text-gray-400 font-light text-sm leading-relaxed">
              As design evolved, ZAKHIRA transformed traditional heavy bridal sets into lightweight, fluid, and versatile statement jewelry. Every necklace, ring, and bracelet is engineered with ergonomic weight distribution, ensuring comfort without compromising on grandeur.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Call to action */}
      <div className="max-w-3xl mx-auto text-center bg-[#141414] border border-[#C9A86C]/30 rounded-2xl p-10">
        <h3 className="font-playfair text-2xl text-white mb-3">Experience ZAKHIRA Firsthand</h3>
        <p className="text-gray-400 text-sm mb-6">Schedule a private session with our chief creative director.</p>
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 bg-[#C9A86C] text-black font-semibold px-8 py-3 rounded-full hover:bg-[#b8975b] transition-all"
        >
          Explore Signature Collections <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};

export default OurStory;
