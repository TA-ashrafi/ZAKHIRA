import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, ShieldCheck, RefreshCw, HeartHandshake } from 'lucide-react';

const Sustainability = () => {
  return (
    <div className="bg-[#0D0D0D] text-[#F8F6F1] min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <span className="text-[#C9A86C] uppercase tracking-[0.3em] text-xs font-semibold">Conscious Luxury</span>
        <h1 className="font-playfair text-4xl sm:text-6xl text-[#F8F6F1] font-normal mt-3 mb-6">
          Ethical & Sustainable <span className="italic text-[#C9A86C] font-serif">Commitment</span>
        </h1>
        <p className="text-gray-400 font-light text-base leading-relaxed">
          Preserving the beauty of Earth while crafting timeless treasures for future generations.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {[
          {
            icon: Leaf,
            title: "100% Recycled Fine Gold",
            desc: "We minimize environmental mining impact by sourcing 100% recycled 18K and 22K gold refined to international purity standards."
          },
          {
            icon: ShieldCheck,
            title: "Kimberley Process Diamonds",
            desc: "Every diamond set in ZAKHIRA creations is certified 100% conflict-free, adhering strictly to global ethical standards."
          },
          {
            icon: RefreshCw,
            title: "Zero-Waste Casting Atelier",
            desc: "Our Jaipur workshop operates on closed-loop water filtration and solar energy, capturing and re-refining all gold micro-particles."
          },
          {
            icon: HeartHandshake,
            title: "Fair Artisanal Wages",
            desc: "We empower 200+ artisan families with healthcare, fair wages, safety standards, and traditional craft preservation programs."
          }
        ].map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="bg-[#141414] border border-[#C9A86C]/30 rounded-2xl p-8 hover:border-[#C9A86C] transition-all"
          >
            <item.icon className="w-10 h-10 text-[#C9A86C] mb-4" />
            <h3 className="font-playfair text-2xl text-white mb-3">{item.title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed font-light">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Sustainability;
