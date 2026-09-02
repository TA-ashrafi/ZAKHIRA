import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Navigation } from 'lucide-react';

const StoreLocator = () => {
  const stores = [
    {
      city: "Jaipur (Flagship Royal Atelier)",
      address: "ZAKHIRA Palace, M.I. Road, Near Panch Batti, Jaipur, Rajasthan 302001",
      phone: "+91 8527580809",
      email: "tahseenashrafi29@gmail.com",
      hours: "Mon - Sun: 11:00 AM - 8:30 PM",
      image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&q=80&w=800"
    },
    {
      city: "New Delhi Boutique",
      address: "DLF Emporio, Vasant Kunj, New Delhi 110070",
      phone: "+91 8527580809",
      email: "tahseenashrafi29@gmail.com",
      hours: "Mon - Sun: 11:00 AM - 9:00 PM",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800"
    },
    {
      city: "Mumbai High Jewelry Lounge",
      address: "Linking Road, Bandra West, Mumbai, Maharashtra 400050",
      phone: "+91 8527580809",
      email: "tahseenashrafi29@gmail.com",
      hours: "Mon - Sun: 11:00 AM - 9:00 PM",
      image: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&q=80&w=800"
    }
  ];

  return (
    <div className="bg-[#0D0D0D] text-[#F8F6F1] min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <span className="text-[#C9A86C] uppercase tracking-[0.3em] text-xs font-semibold">Flagship Boutiques</span>
        <h1 className="font-playfair text-4xl sm:text-6xl text-[#F8F6F1] font-normal mt-3 mb-6">
          Store <span className="italic text-[#C9A86C] font-serif">Locator</span>
        </h1>
        <p className="text-gray-400 font-light text-base leading-relaxed">
          Visit our royal ateliers for personalized high jewelry consultations and VIP previews.
        </p>
      </div>

      <div className="max-w-6xl mx-auto space-y-12 mb-20">
        {stores.map((store, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="bg-[#141414] border border-[#C9A86C]/30 rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 shadow-2xl"
          >
            <div className="lg:col-span-5 relative h-64 lg:h-auto">
              <img src={store.image} alt={store.city} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
            </div>
            <div className="lg:col-span-7 p-8 flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center gap-2 text-[#C9A86C] text-xs tracking-widest uppercase mb-2">
                  <MapPin className="w-4 h-4" /> Official Atelier
                </div>
                <h3 className="font-playfair text-3xl text-white mb-4">{store.city}</h3>
                <p className="text-gray-300 text-sm font-light leading-relaxed mb-4">{store.address}</p>

                <div className="space-y-2 text-sm text-gray-400">
                  <p className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-[#C9A86C]" /> {store.hours}
                  </p>
                  <p className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-[#C9A86C]" />
                    <a href="https://wa.me/918527580809" target="_blank" rel="noopener noreferrer" className="hover:text-[#C9A86C] transition-colors">
                      {store.phone} (WhatsApp Available)
                    </a>
                  </p>
                  <p className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-[#C9A86C]" />
                    <a href={`mailto:${store.email}`} className="hover:text-[#C9A86C] transition-colors">
                      {store.email}
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 pt-4 border-t border-[#C9A86C]/20">
                <a
                  href="https://wa.me/918527580809"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#25D366] text-black font-semibold text-xs px-5 py-2.5 rounded-full hover:bg-[#20bd5a] transition-all"
                >
                  Book Private VIP Visit
                </a>
                <a
                  href={`mailto:${store.email}?subject=Store%20Appointment%20Inquiry`}
                  className="inline-flex items-center gap-2 border border-[#C9A86C] text-[#C9A86C] font-semibold text-xs px-5 py-2.5 rounded-full hover:bg-[#C9A86C] hover:text-black transition-all"
                >
                  <Navigation className="w-3.5 h-3.5" /> Direct Email Inquiry
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default StoreLocator;
