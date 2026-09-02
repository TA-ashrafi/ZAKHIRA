import React from 'react';
import { motion } from 'framer-motion';
import { Award, ShieldCheck, Gem, Compass, Sparkles, Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="bg-[#0D0D0D] text-[#F8F6F1] min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      {/* Hero Header */}
      <div className="max-w-7xl mx-auto text-center mb-16">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[#C9A86C] uppercase tracking-[0.3em] text-xs sm:text-sm font-medium"
        >
          Royal Haute Joaillerie
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="font-playfair text-4xl sm:text-6xl text-[#F8F6F1] font-normal mt-3 mb-6"
        >
          About <span className="italic text-[#C9A86C] font-serif">ZAKHIRA</span>
        </motion.h1>
        <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#C9A86C] to-transparent mx-auto mb-6" />
        <p className="max-w-2xl mx-auto text-gray-400 font-light text-sm sm:text-base leading-relaxed">
          Born in the royal corridors of Jaipur, ZAKHIRA represents the pinnacle of luxury, heritage, and contemporary diamond craftsmanship.
        </p>
      </div>

      {/* Main Narrative */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative rounded-2xl overflow-hidden border border-[#C9A86C]/30 shadow-2xl group"
        >
          <img
            src="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=1000"
            alt="ZAKHIRA Craftsmanship"
            className="w-full h-[500px] object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
          <div className="absolute bottom-6 left-6 right-6">
            <span className="text-xs uppercase tracking-widest text-[#C9A86C]">Atelier Jaipur</span>
            <h3 className="font-playfair text-2xl text-white font-medium">Master Artisan Techniques</h3>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <h2 className="font-playfair text-3xl sm:text-4xl text-[#F8F6F1]">
            Where Royal Heritage Meets Modern Sophistication
          </h2>
          <p className="text-gray-400 leading-relaxed font-light">
            Founded with an unyielding ambition to reinvent luxury fine jewelry, ZAKHIRA brings together centuries-old Rajasthani royal goldsmithing traditions with modern minimalist aesthetics.
          </p>
          <p className="text-gray-400 leading-relaxed font-light">
            Every piece in our collection is painstakingly handcrafted using 100% BIS Hallmarked 18K/22K gold, certified natural VVS diamonds, and ethically sourced precious gemstones.
          </p>

          <div className="grid grid-cols-2 gap-6 pt-4 border-t border-[#C9A86C]/20">
            <div>
              <h4 className="font-playfair text-3xl text-[#C9A86C]">100%</h4>
              <p className="text-xs text-gray-400 uppercase tracking-widest mt-1">BIS Hallmarked Gold</p>
            </div>
            <div>
              <h4 className="font-playfair text-3xl text-[#C9A86C]">IGI/GIA</h4>
              <p className="text-xs text-gray-400 uppercase tracking-widest mt-1">Certified Diamonds</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Pillars Section */}
      <div className="max-w-7xl mx-auto mb-24">
        <div className="text-center mb-12">
          <h2 className="font-playfair text-3xl sm:text-4xl text-white mb-3">Our Core Pillars</h2>
          <p className="text-gray-400 text-sm">Uncompromising standards in every creation</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: Gem,
              title: "Ethical Sourcing",
              desc: "We exclusively utilize Conflict-Free Kimberley Process diamonds and eco-conscious recycled gold."
            },
            {
              icon: ShieldCheck,
              title: "Lifetime Guarantee",
              desc: "Every creation carries our lifetime buyback, exchange assurance, and annual polishing care."
            },
            {
              icon: Award,
              title: "Master Goldsmiths",
              desc: "Crafted over hundreds of hours by 3rd generation master artisans in Jaipur."
            }
          ].map((pillar, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-[#141414] border border-[#C9A86C]/20 rounded-xl p-8 hover:border-[#C9A86C]/60 transition-colors group"
            >
              <div className="w-12 h-12 rounded-full bg-[#C9A86C]/10 flex items-center justify-center text-[#C9A86C] mb-6 group-hover:bg-[#C9A86C] group-hover:text-black transition-colors">
                <pillar.icon className="w-6 h-6" />
              </div>
              <h3 className="font-playfair text-xl text-white mb-3">{pillar.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed font-light">{pillar.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Direct Contact Banner */}
      <div className="max-w-4xl mx-auto bg-gradient-to-r from-[#1A1814] via-[#262118] to-[#1A1814] border border-[#C9A86C]/40 rounded-2xl p-8 text-center shadow-2xl">
        <Sparkles className="w-8 h-8 text-[#C9A86C] mx-auto mb-4 animate-pulse" />
        <h3 className="font-playfair text-2xl sm:text-3xl text-white mb-3">Bespoke Concierge & Private Appointments</h3>
        <p className="text-gray-300 text-sm mb-6 max-w-xl mx-auto font-light">
          Connect directly with our master jewelry consultants for custom designs, bridal trousseaus, or store visits.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="https://wa.me/918527580809"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-black font-semibold text-sm px-6 py-3 rounded-full transition-all"
          >
            <Phone className="w-4 h-4 fill-current" /> WhatsApp +91 8527580809
          </a>
          <a
            href="mailto:tahseenashrafi29@gmail.com"
            className="inline-flex items-center gap-2 bg-[#C9A86C] hover:bg-[#B8975B] text-black font-semibold text-sm px-6 py-3 rounded-full transition-all"
          >
            <Mail className="w-4 h-4" /> Email Concierge
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;
