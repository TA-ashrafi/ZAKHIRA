import { ShieldCheck, Lock, Eye, FileText } from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <div className="bg-[#0D0D0D] text-[#F8F6F1] min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-10">
        <div className="text-center space-y-3">
          <span className="text-[#C9A86C] uppercase tracking-[0.3em] text-xs font-semibold">ROYAL TRUST & PRIVACY</span>
          <h1 className="font-playfair text-4xl sm:text-5xl text-white font-normal">
            Privacy <span className="italic text-[#C9A86C]">Policy</span>
          </h1>
          <p className="text-gray-400 text-xs max-w-lg mx-auto leading-relaxed">
            At ZAKHIRA, we treat your personal data with the same utmost care, discretion, and perfection as our finest gemstones.
          </p>
        </div>

        <div className="bg-[#141414] p-8 sm:p-10 rounded-2xl border border-[#C9A86C]/30 shadow-2xl space-y-8 text-xs leading-relaxed text-gray-300">
          <section className="space-y-3">
            <h2 className="font-playfair text-lg text-white font-bold flex items-center gap-2 border-b border-white/10 pb-2">
              <ShieldCheck className="w-5 h-5 text-[#C9A86C]" /> 1. Information We Collect
            </h2>
            <p>
              When you browse ZAKHIRA or place a order for custom jewellery, we collect information including your name, shipping address, contact phone number, and email address. We use this information strictly to fulfill your order, process payments, and provide high-touch concierge support.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-playfair text-lg text-white font-bold flex items-center gap-2 border-b border-white/10 pb-2">
              <Lock className="w-5 h-5 text-[#C9A86C]" /> 2. Bank & Payment Security
            </h2>
            <p>
              Your sensitive financial data (credit card numbers, UPI credentials, and net banking passkeys) is encrypted using bank-grade 256-bit SSL protocols. All payments are processed through PCI-DSS compliant secure gateways. ZAKHIRA never stores card numbers or payment passwords on our servers.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-playfair text-lg text-white font-bold flex items-center gap-2 border-b border-white/10 pb-2">
              <Eye className="w-5 h-5 text-[#C9A86C]" /> 3. Data Confidentiality Guarantee
            </h2>
            <p>
              We guarantee that your personal data will never be sold, rented, leased, or disclosed to third-party marketing companies. Data is shared exclusively with certified transit couriers to ensure secure delivery of your hallmarked jewellery.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-playfair text-lg text-white font-bold flex items-center gap-2 border-b border-white/10 pb-2">
              <FileText className="w-5 h-5 text-[#C9A86C]" /> 4. Contact Privileged Privacy Officer
            </h2>
            <p>
              If you wish to update, modify, or delete your account records from our atelier database, please contact our privacy concierge at <a href="mailto:tahseenashrafi29@gmail.com" className="text-[#C9A86C] font-bold underline">tahseenashrafi29@gmail.com</a> or call +91 8527580809.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
