import { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success('Your message has been sent to Royal Concierge!');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: 'General Inquiry',
        message: ''
      });
    }, 1000);
  };

  return (
    <div className="bg-[#0D0D0D] text-[#F8F6F1] min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-[#C9A86C] uppercase tracking-[0.3em] text-xs font-semibold">ROYAL CONCIERGE</span>
          <h1 className="font-playfair text-4xl sm:text-6xl text-[#F8F6F1] font-normal mt-3 mb-4">
            Contact <span className="italic text-[#C9A86C]">Us</span>
          </h1>
          <p className="text-gray-400 font-light text-sm max-w-xl mx-auto">
            Our private jewellery advisors and master goldsmiths are at your service.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Info Panel */}
          <div className="space-y-8 bg-[#141414] p-8 md:p-10 rounded-2xl border border-[#C9A86C]/30 shadow-2xl">
            <div>
              <h2 className="font-playfair text-2xl text-white font-bold mb-2">Get In Touch Directly</h2>
              <p className="text-xs text-gray-400 font-light leading-relaxed">
                Connect with our Jaipur atelier for bespoke bridal orders, store visits, or general enquiries.
              </p>
            </div>

            <div className="space-y-6 text-xs">
              <a 
                href="https://wa.me/918527580809" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-4 p-4 bg-emerald-950/30 border border-emerald-500/30 rounded-xl hover:bg-emerald-900/40 transition text-emerald-300"
              >
                <div className="p-3 bg-emerald-500/20 text-emerald-400 rounded-xl">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white">WhatsApp Concierge</h4>
                  <p className="opacity-80">+91 8527580809</p>
                </div>
              </a>

              <a 
                href="tel:+918527580809"
                className="flex items-center gap-4 p-4 bg-[#1A1A1A] border border-white/10 rounded-xl hover:bg-white/5 transition"
              >
                <div className="p-3 bg-[#C9A86C]/20 text-[#C9A86C] rounded-xl">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white">Direct Phone Line</h4>
                  <p className="text-gray-400">+91 8527580809</p>
                </div>
              </a>

              <a 
                href="mailto:tahseenashrafi29@gmail.com"
                className="flex items-center gap-4 p-4 bg-[#1A1A1A] border border-white/10 rounded-xl hover:bg-white/5 transition"
              >
                <div className="p-3 bg-[#C9A86C]/20 text-[#C9A86C] rounded-xl">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white">Email Support</h4>
                  <p className="text-gray-400">tahseenashrafi29@gmail.com</p>
                </div>
              </a>

              <div className="flex items-center gap-4 p-4 bg-[#1A1A1A] border border-white/10 rounded-xl">
                <div className="p-3 bg-[#C9A86C]/20 text-[#C9A86C] rounded-xl">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white">Headquarters & Flagship Atelier</h4>
                  <p className="text-gray-400">Johari Bazaar, Jaipur, Rajasthan, India - 302003</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Contact Form */}
          <div className="bg-[#141414] p-8 md:p-10 rounded-2xl border border-[#C9A86C]/30 shadow-2xl space-y-6">
            <h2 className="font-playfair text-2xl text-white font-bold">Send Us A Message</h2>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-gray-300 font-semibold mb-1 uppercase tracking-wider text-[10px]">Your Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Royal Name"
                  className="w-full px-4 py-3 bg-[#1A1A1A] border border-[#C9A86C]/30 text-white rounded-xl focus:outline-none focus:border-[#C9A86C]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 font-semibold mb-1 uppercase tracking-wider text-[10px]">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@example.com"
                    className="w-full px-4 py-3 bg-[#1A1A1A] border border-[#C9A86C]/30 text-white rounded-xl focus:outline-none focus:border-[#C9A86C]"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 font-semibold mb-1 uppercase tracking-wider text-[10px]">Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 9876543210"
                    className="w-full px-4 py-3 bg-[#1A1A1A] border border-[#C9A86C]/30 text-white rounded-xl focus:outline-none focus:border-[#C9A86C]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-300 font-semibold mb-1 uppercase tracking-wider text-[10px]">Subject</label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-3 bg-[#1A1A1A] border border-[#C9A86C]/30 text-white rounded-xl focus:outline-none focus:border-[#C9A86C]"
                >
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Bespoke Custom Jewelry">Bespoke Custom Jewelry</option>
                  <option value="Bridal Appointment">Bridal Appointment</option>
                  <option value="Order Status">Order Status</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-300 font-semibold mb-1 uppercase tracking-wider text-[10px]">Your Message</label>
                <textarea
                  rows="4"
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="How may our concierge assist you today?"
                  className="w-full px-4 py-3 bg-[#1A1A1A] border border-[#C9A86C]/30 text-white rounded-xl focus:outline-none focus:border-[#C9A86C]"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#C9A86C] text-black py-3.5 rounded-xl font-bold uppercase tracking-widest hover:bg-[#b8975b] transition flex items-center justify-center gap-2 cursor-pointer"
              >
                {isSubmitting ? 'Sending...' : 'Transmit Message'} <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
