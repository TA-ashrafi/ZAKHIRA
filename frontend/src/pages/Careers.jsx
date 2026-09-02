import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Send, CheckCircle, Mail } from 'lucide-react';
import toast from 'react-hot-toast';

const Careers = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', role: 'Master Jeweler / Artisan', portfolio: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    toast.success("Application submitted successfully! Our talent acquisition team will reach out.");
  };

  const openings = [
    { title: "Senior Diamond Setter", loc: "Jaipur Atelier", type: "Full-Time" },
    { title: "High Jewelry Design Illustrator", loc: "New Delhi Design Studio", type: "Full-Time" },
    { title: "VIP Client Relationship Manager", loc: "Mumbai Lounge", type: "Full-Time" }
  ];

  return (
    <div className="bg-[#0D0D0D] text-[#F8F6F1] min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <span className="text-[#C9A86C] uppercase tracking-[0.3em] text-xs font-semibold">Join The House of ZAKHIRA</span>
        <h1 className="font-playfair text-4xl sm:text-6xl text-[#F8F6F1] font-normal mt-3 mb-6">
          Careers & <span className="italic text-[#C9A86C] font-serif">Artisanship</span>
        </h1>
        <p className="text-gray-400 font-light text-base leading-relaxed">
          Craft your legacy alongside the finest master jewelry artisans and luxury visionaries.
        </p>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
        <div className="lg:col-span-5 space-y-6">
          <h2 className="font-playfair text-3xl text-white">Current Opportunities</h2>
          <div className="space-y-4">
            {openings.map((op, idx) => (
              <div key={idx} className="bg-[#141414] border border-[#C9A86C]/30 rounded-xl p-5 hover:border-[#C9A86C] transition-all">
                <span className="text-[10px] text-[#C9A86C] uppercase tracking-widest">{op.type} • {op.loc}</span>
                <h3 className="font-playfair text-lg text-white font-medium mt-1">{op.title}</h3>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-br from-[#1A1814] to-[#141414] p-6 rounded-xl border border-[#C9A86C]/20 text-sm space-y-2">
            <p className="text-[#C9A86C] font-medium flex items-center gap-2">
              <Mail className="w-4 h-4" /> Direct HR Email
            </p>
            <p className="text-gray-300">
              Send CVs directly to <a href="mailto:tahseenashrafi29@gmail.com" className="underline text-white hover:text-[#C9A86C]">tahseenashrafi29@gmail.com</a>
            </p>
          </div>
        </div>

        <div className="lg:col-span-7 bg-[#141414] border border-[#C9A86C]/30 rounded-2xl p-8">
          <h2 className="font-playfair text-2xl text-white mb-6">Apply to Join Our Atelier</h2>
          {submitted ? (
            <div className="text-center py-12 space-y-4">
              <CheckCircle className="w-16 h-16 text-[#C9A86C] mx-auto animate-bounce" />
              <h3 className="font-playfair text-2xl text-white">Application Received</h3>
              <p className="text-gray-400 text-sm">Thank you for applying. Our talent team will review your dossier shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-[#0D0D0D] border border-gray-800 rounded-lg px-4 py-3 text-white text-sm focus:border-[#C9A86C] outline-none"
                  placeholder="Royal Connoisseur"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-[#0D0D0D] border border-gray-800 rounded-lg px-4 py-3 text-white text-sm focus:border-[#C9A86C] outline-none"
                  placeholder="tahseenashrafi29@gmail.com"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1">Desired Position</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full bg-[#0D0D0D] border border-gray-800 rounded-lg px-4 py-3 text-white text-sm focus:border-[#C9A86C] outline-none"
                >
                  <option>Senior Diamond Setter</option>
                  <option>High Jewelry Design Illustrator</option>
                  <option>VIP Client Relationship Manager</option>
                  <option>General Talent Pool Inquiry</option>
                </select>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1">Portfolio / LinkedIn Link</label>
                <input
                  type="url"
                  value={formData.portfolio}
                  onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })}
                  className="w-full bg-[#0D0D0D] border border-gray-800 rounded-lg px-4 py-3 text-white text-sm focus:border-[#C9A86C] outline-none"
                  placeholder="https://behance.net/portfolio"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1">Cover Letter / Message</label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-[#0D0D0D] border border-gray-800 rounded-lg px-4 py-3 text-white text-sm focus:border-[#C9A86C] outline-none"
                  placeholder="Describe your passion for high jewelry..."
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#C9A86C] hover:bg-[#b8975b] text-black font-semibold text-sm py-3.5 rounded-lg transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" /> Submit Application Dossier
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Careers;
