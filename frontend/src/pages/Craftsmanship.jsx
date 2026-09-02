import React from 'react';
import { motion } from 'framer-motion';
import { Hammer, Flame, Gem, Sparkles, ShieldCheck } from 'lucide-react';

const Craftsmanship = () => {
  const steps = [
    {
      num: "01",
      title: "Hand-Drawn Atelier Sketches",
      desc: "Every design starts as a hand-penciled concept by our master jewelry illustrators in Jaipur, capturing harmony, stone ratios, and light reflections."
    },
    {
      num: "02",
      title: "Precision 3D Wax Sculpting",
      desc: "Sketches are translated into precision micro-wax molds, ensuring perfect prong placement for VVS diamonds and emerald cuts."
    },
    {
      num: "03",
      title: "18K/22K Gold Smelting & Casting",
      desc: "Pure 24K gold is alloyed with copper and silver to achieve our proprietary warm gold luster before undergoing high-vacuum casting."
    },
    {
      num: "04",
      title: "Micro-Pave Stone Setting",
      desc: "Artisans mount each diamond under high-power stereoscopic microscopes for flawless alignment and maximum brilliance."
    },
    {
      num: "05",
      title: "Mirror Polish & BIS Hallmarking",
      desc: "Finished pieces are hand-buffed with diamond paste and laser engraved with official BIS Hallmarks and GIA certification numbers."
    }
  ];

  return (
    <div className="bg-[#0D0D0D] text-[#F8F6F1] min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <span className="text-[#C9A86C] uppercase tracking-[0.3em] text-xs font-semibold">Master Artisanal Technique</span>
        <h1 className="font-playfair text-4xl sm:text-6xl text-[#F8F6F1] font-normal mt-3 mb-6">
          The Art of <span className="italic text-[#C9A86C] font-serif">Craftsmanship</span>
        </h1>
        <p className="text-gray-400 font-light text-base leading-relaxed">
          Over 120 hours of meticulous hand-craftsmanship are poured into every ZAKHIRA treasure.
        </p>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
        <div className="space-y-6">
          <h2 className="font-playfair text-3xl text-white">Uncompromising Precision</h2>
          <p className="text-gray-400 font-light leading-relaxed">
            Unlike mass-produced jewelry, ZAKHIRA honors age-old goldsmithing techniques passed down through generations. From hand-strung pearls to micro-pave diamond borders, our creations reflect an extraordinary devotion to perfection.
          </p>
          <div className="flex gap-4 pt-2">
            <div className="flex items-center gap-2 text-[#C9A86C] text-sm">
              <Hammer className="w-4 h-4" /> 100% Handcrafted
            </div>
            <div className="flex items-center gap-2 text-[#C9A86C] text-sm">
              <Flame className="w-4 h-4" /> Vacuum Cast Gold
            </div>
          </div>
        </div>
        <div className="rounded-2xl overflow-hidden border border-[#C9A86C]/30">
          <img
            src="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=800"
            alt="Artisan at work"
            className="w-full h-80 object-cover"
          />
        </div>
      </div>

      {/* Step Process */}
      <div className="max-w-5xl mx-auto space-y-6">
        <h2 className="font-playfair text-3xl text-center text-white mb-10">Our 5-Stage Creation Journey</h2>
        {steps.map((s, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="bg-[#141414] border border-[#C9A86C]/20 rounded-xl p-6 flex flex-col md:flex-row items-start md:items-center gap-6"
          >
            <span className="font-playfair text-4xl text-[#C9A86C] font-bold">{s.num}</span>
            <div>
              <h3 className="font-playfair text-xl text-white mb-1">{s.title}</h3>
              <p className="text-gray-400 text-sm font-light">{s.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Craftsmanship;
