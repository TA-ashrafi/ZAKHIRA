import React from 'react';
import { Truck, ShieldCheck, Globe, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const ShippingInfo = () => {
  return (
    <div className="bg-[#0D0D0D] text-[#F8F6F1] min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-[#C9A86C] uppercase tracking-[0.3em] text-xs font-semibold">CUSTOMER CARE</span>
          <h1 className="font-playfair text-4xl sm:text-5xl text-[#F8F6F1] font-normal mt-3 mb-4">
            Shipping & Delivery <span className="italic text-[#C9A86C]">Policy</span>
          </h1>
          <p className="text-gray-400 font-light text-sm max-w-xl mx-auto">
            100% Insured express worldwide shipping for every ZAKHIRA creation.
          </p>
        </div>

        <div className="space-y-8">
          <div className="bg-[#141414] border border-[#C9A86C]/20 p-6 md:p-8 rounded-2xl shadow-xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-[#C9A86C]/10 text-[#C9A86C] rounded-xl border border-[#C9A86C]/30">
                <Truck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-playfair text-xl font-bold text-white">Domestic Shipping (India)</h3>
                <p className="text-xs text-gray-400">Complimentary express delivery across all pin codes</p>
              </div>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed font-light">
              All domestic orders are shipped via insured logistics partners (Blue Dart / BVC Logistics). Standard delivery timeline is 3-5 business days from dispatch. You will receive live WhatsApp and email tracking once dispatched.
            </p>
          </div>

          <div className="bg-[#141414] border border-[#C9A86C]/20 p-6 md:p-8 rounded-2xl shadow-xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-[#C9A86C]/10 text-[#C9A86C] rounded-xl border border-[#C9A86C]/30">
                <Globe className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-playfair text-xl font-bold text-white">International Delivery</h3>
                <p className="text-xs text-gray-400">FedEx / DHL Insured World Express</p>
              </div>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed font-light">
              We ship to over 80+ countries worldwide. Delivery timelines range between 5-8 business days depending on customs clearance. Customs duties and taxes, if applicable, are calculated at checkout or billed by local customs authority.
            </p>
          </div>

          <div className="bg-[#141414] border border-[#C9A86C]/20 p-6 md:p-8 rounded-2xl shadow-xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-[#C9A86C]/10 text-[#C9A86C] rounded-xl border border-[#C9A86C]/30">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-playfair text-xl font-bold text-white">100% Transit Insurance</h3>
                <p className="text-xs text-gray-400">Zero risk guaranteed</p>
              </div>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed font-light">
              Every package is fully insured from our Jaipur atelier right until it reaches your doorstep. A signature upon receipt is strictly required for all deliveries.
            </p>
          </div>
        </div>

        <div className="mt-12 text-center bg-[#1A1A1A] p-6 rounded-2xl border border-white/10">
          <p className="text-xs text-gray-300 mb-3">Have a specific delivery query or special request?</p>
          <Link to="/track-order" className="inline-flex items-center gap-2 bg-[#C9A86C] text-black font-bold text-xs px-6 py-2.5 rounded-full uppercase tracking-wider hover:bg-[#b8975b] transition">
            Track Order Live <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ShippingInfo;
