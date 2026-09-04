import { useState } from 'react';
import { ChevronDown, HelpCircle, Phone, Mail } from 'lucide-react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      q: "Are all ZAKHIRA gold jewellery products certified and hallmarked?",
      a: "Yes, 100% of our gold jewellery is BIS (Bureau of Indian Standards) hallmarked with official laser purity etchings. All solitaire diamonds are GIA or IGI internationally certified."
    },
    {
      q: "How can I check the exact purity of my jewellery?",
      a: "Every product shipped by ZAKHIRA comes with a physical certificate of authenticity detailing the gold karat (18K or 22K), exact net weight, diamond clarity (VVS/VS), and color grade."
    },
    {
      q: "Do you offer custom jewellery design services?",
      a: "Yes! Our master goldsmiths in Jaipur create custom bespoke bridal sets, solitaire engagement rings, and engraved heirloom pieces. Contact our Concierge to schedule a consultation."
    },
    {
      q: "What is the delivery timeline for domestic and international orders?",
      a: "Domestic deliveries within India take 3-5 business days. International express shipments via FedEx/DHL take 5-8 business days. Transit insurance is complimentary."
    },
    {
      q: "What is your return and buyback policy?",
      a: "We offer a 30-day privilege return policy and a lifetime buyback guarantee. Gold is exchanged at 100% market rate, and diamonds at 90% benchmark valuation."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-[#0D0D0D] text-[#F8F6F1] min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-[#C9A86C] uppercase tracking-[0.3em] text-xs font-semibold">GOT QUESTIONS?</span>
          <h1 className="font-playfair text-4xl sm:text-5xl text-[#F8F6F1] font-normal mt-3 mb-4">
            Frequently Asked <span className="italic text-[#C9A86C]">Questions</span>
          </h1>
          <p className="text-gray-400 font-light text-sm max-w-xl mx-auto">
            Everything you need to know about purchasing, purity, shipping, and custom designs.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index} 
                className="bg-[#141414] border border-[#C9A86C]/20 rounded-2xl overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex justify-between items-center p-6 text-left hover:bg-white/5 transition focus:outline-none"
                >
                  <span className="font-playfair font-bold text-base md:text-lg text-white pr-4">
                    {faq.q}
                  </span>
                  <ChevronDown className={`w-5 h-5 text-[#C9A86C] transition-transform duration-300 flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-gray-300 text-xs md:text-sm leading-relaxed border-t border-white/5 font-light">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center bg-[#141414] border border-[#C9A86C]/30 p-8 rounded-2xl space-y-4">
          <HelpCircle className="w-8 h-8 text-[#C9A86C] mx-auto" />
          <h3 className="font-playfair text-xl text-white font-bold">Still have a question?</h3>
          <p className="text-xs text-gray-400 max-w-md mx-auto">
            Our private jewellery advisors are available 24/7 to answer your queries.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <a 
              href="https://wa.me/918527580809" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center gap-2 bg-[#25D366] text-black font-bold text-xs px-6 py-2.5 rounded-full uppercase tracking-wider hover:bg-[#20bd5a] transition"
            >
              <Phone className="w-4 h-4 fill-current" /> WhatsApp +91 8527580809
            </a>
            <a 
              href="mailto:tahseenashrafi29@gmail.com" 
              className="inline-flex items-center gap-2 bg-[#C9A86C] text-black font-bold text-xs px-6 py-2.5 rounded-full uppercase tracking-wider hover:bg-[#b8975b] transition"
            >
              <Mail className="w-4 h-4" /> Email Concierge
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
