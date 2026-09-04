import React from 'react';
import { RotateCcw, ShieldCheck, RefreshCw, MessageCircle } from 'lucide-react';

const ReturnsExchanges = () => {
  return (
    <div className="bg-[#0D0D0D] text-[#F8F6F1] min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-[#C9A86C] uppercase tracking-[0.3em] text-xs font-semibold">PEACE OF MIND GUARANTEE</span>
          <h1 className="font-playfair text-4xl sm:text-5xl text-[#F8F6F1] font-normal mt-3 mb-4">
            Returns & <span className="italic text-[#C9A86C]">Exchanges</span>
          </h1>
          <p className="text-gray-400 font-light text-sm max-w-xl mx-auto">
            30-day hassle-free privilege return and lifetime buyback assurance on every ZAKHIRA purchase.
          </p>
        </div>

        <div className="space-y-8">
          <div className="bg-[#141414] border border-[#C9A86C]/20 p-6 md:p-8 rounded-2xl shadow-xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-[#C9A86C]/10 text-[#C9A86C] rounded-xl border border-[#C9A86C]/30">
                <RotateCcw className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-playfair text-xl font-bold text-white">30-Day Privilege Return</h3>
                <p className="text-xs text-gray-400">Complete refund or store credit</p>
              </div>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed font-light">
              If for any reason you are not completely enchanted with your purchase, you may return the item within 30 days of delivery in its original, unworn condition with all authenticity certificates and original packaging intact.
            </p>
          </div>

          <div className="bg-[#141414] border border-[#C9A86C]/20 p-6 md:p-8 rounded-2xl shadow-xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-[#C9A86C]/10 text-[#C9A86C] rounded-xl border border-[#C9A86C]/30">
                <RefreshCw className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-playfair text-xl font-bold text-white">Lifetime Buyback & Exchange</h3>
                <p className="text-xs text-gray-400">Eternal value on Gold & Certified Diamonds</p>
              </div>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed font-light">
              ZAKHIRA offers a lifetime exchange and buyback policy across all our 18K/22K gold and natural diamond jewellery. Exchange your gold pieces at 100% of the current prevailing gold market rate, and diamonds at 90% benchmark valuation.
            </p>
          </div>

          <div className="bg-[#141414] border border-[#C9A86C]/20 p-6 md:p-8 rounded-2xl shadow-xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-[#C9A86C]/10 text-[#C9A86C] rounded-xl border border-[#C9A86C]/30">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-playfair text-xl font-bold text-white">Complimentary Reverse Pickup</h3>
                <p className="text-xs text-gray-400">Insured return shipping service</p>
              </div>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed font-light">
              Our concierge team will arrange a secure, tamper-evident insured courier pick-up from your home address at a time convenient for you.
            </p>
          </div>
        </div>

        <div className="mt-12 text-center bg-[#1A1A1A] p-6 rounded-2xl border border-white/10">
          <p className="text-xs text-gray-300 mb-3">To initiate a return or exchange, contact our Concierge directly on WhatsApp:</p>
          <a 
            href="https://wa.me/918527580809" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-flex items-center gap-2 bg-[#25D366] text-black font-bold text-xs px-6 py-2.5 rounded-full uppercase tracking-wider hover:bg-[#20bd5a] transition"
          >
            <MessageCircle className="w-4 h-4 fill-current" /> Contact Concierge (+91 8527580809)
          </a>
        </div>
      </div>
    </div>
  );
};

export default ReturnsExchanges;
