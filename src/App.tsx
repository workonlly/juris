import './App.css';
import emailjs from '@emailjs/browser';
import { useRef } from 'react';

function App() {
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = formRef.current;
    if (!form) return;

    // Get selected services
    const selectedServices = Array.from(
      form.querySelectorAll('input[name="services"]:checked')
    ).map((el) => (el as HTMLInputElement).value).join(', ');

    // Send to Admin
    emailjs.sendForm(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      form,
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    ).then(() => {
      // Send Auto-Reply
      emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_AUTOREPLY_TEMPLATE_ID,
        {
          user_name: form.user_name.value,
          user_email: form.user_email.value,
          whatsapp: form.whatsapp.value,
          services: selectedServices,
          message: form.message.value,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      alert('Your request has been submitted!');
      form.reset();
    }).catch((err) => {
      console.error('EmailJS Error:', err.text);
      alert('Failed to send request.');
    });
  };

  return (
    <div className='min-h-screen w-full bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center overflow-x-hidden flex-col gap-8'>
      <div className="w-full max-w-screen-full mb-8 h-24 sm:h-32 rounded-b-[50px] bg-white/10 backdrop-blur-sm border border-white/20 shadow-xl content-center text-center">
        <p className='text-white font-bold text-2xl sm:text-3xl md:text-4xl'>
          Lacleo Juris
        </p>
      </div>

      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="w-full max-w-screen-lg mx-auto bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl shadow-2xl px-6 py-8"
      >
        <h2 className="text-4xl font-bold text-center mb-10 text-white">Tax Service Request</h2>

        {/* Input Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">Full Name</label>
            <input name="user_name" type="text" required placeholder="Enter your full name"
              className="w-full p-4 bg-white/10 border border-white/20 rounded-lg placeholder:text-gray-400 text-white focus:ring-2 focus:ring-white/50" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">Email</label>
            <input name="user_email" type="email" required placeholder="your.email@example.com"
              className="w-full p-4 bg-white/10 border border-white/20 rounded-lg placeholder:text-gray-400 text-white focus:ring-2 focus:ring-white/50" />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2 text-gray-300">WhatsApp Number</label>
            <input name="whatsapp" type="tel" required placeholder="+91 9876543210"
              className="w-full p-4 bg-white/10 border border-white/20 rounded-lg placeholder:text-gray-400 text-white focus:ring-2 focus:ring-white/50" />
          </div>
        </div>

        {/* Services */}
        <div className="mb-10">
          <h3 className="text-2xl font-semibold mb-6 text-white">Select Services</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              "Income Tax",
              "Capital Gains Tax",
              "Dividend Tax",
              "GST (Goods and Services Tax)",
              "TDS (Tax Deducted at Source)",
              "TDS Return Filing",
              "Income Tax Return (ITR-3 or ITR-4)",
              "Advance Tax",
              "GST Return",
              "Professional Tax (some states)"
            ].map((service, idx) => (
              <label key={idx} className="flex items-center space-x-3 p-4 rounded-lg border border-white/20 bg-white/10 text-white">
                <input type="checkbox" name="services" value={service}
                  className="form-checkbox h-5 w-5 text-white bg-white/10 border-gray-300 rounded" />
                <span>{service}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Message */}
        <div className="mb-10">
          <label className="block text-sm font-medium mb-2 text-gray-300">Message / Additional Info</label>
          <textarea name="message" rows={4} placeholder="Tell us more about your requirements..."
            className="w-full p-4 bg-white/10 border border-white/20 rounded-lg placeholder:text-gray-400 text-white focus:ring-2 focus:ring-white/50 resize-y" />
        </div>

        {/* Submit */}
        <div className="text-center">
          <button type="submit"
            className="bg-white text-black px-10 py-4 rounded-lg font-bold shadow-xl hover:bg-gray-100 transition-all duration-200 hover:scale-105 active:scale-95">
            Submit Request
          </button>
        </div>
      </form>
        <div className="bg-white text-gray-900 w-full rounded-t-[100px] px-6 sm:px-10 md:px-20 pt-16 pb-20 leading-relaxed text-base sm:text-lg font-sans">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-12">Your Complete Tax Compliance Partner</h2>
        <div className="bg-white text-gray-900 w-full rounded-t-[100px] px-6 sm:px-10 md:px-20 pt-16 pb-20 leading-relaxed text-base sm:text-lg font-sans">
  <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-12">Your Complete Tax Compliance Partner</h2>

  <p className="mb-6">
    Navigating the intricate landscape of Indian taxation can be a daunting task for individuals, professionals, and businesses. At <strong>Lacleo Digital</strong>, we simplify this complexity by offering expert-led, tailored services across every tax category—so you can stay compliant, stress-free, and focused on what matters most.
  </p>

  <div className="space-y-6">
    <div>
      <strong className="text-lg text-black">Income Tax</strong> – Whether you’re a salaried individual or a freelancer, calculating and filing income tax correctly is crucial. We assist in accurate income declarations, applying eligible deductions (under 80C, 80D, etc.), and timely ITR filing, ensuring zero penalties and maximum savings.
    </div>

    <div>
      <strong className="text-lg text-black">Capital Gains Tax</strong> – Profits from selling real estate, shares, or other capital assets may attract short-term or long-term capital gains tax. Lacleo helps compute accurate liabilities, apply exemptions (like Section 54, 54F), and structure your gains for tax efficiency.
    </div>

    <div>
      <strong className="text-lg text-black">Dividend Tax</strong> – If you receive dividends from your investments, understanding the TDS rules and tax implications is vital. We help you track your income, manage deductions, and ensure proper compliance in light of the new tax regime on dividends.
    </div>

    <div>
      <strong className="text-lg text-black">GST (Goods and Services Tax)</strong> – This multi-stage, destination-based indirect tax applies to most goods and services. Lacleo helps you register under GST, file monthly or quarterly returns, manage input tax credits, and stay audit-ready at all times.
    </div>

    <div>
      <strong className="text-lg text-black">TDS (Tax Deducted at Source)</strong> – TDS requires businesses and certain individuals to deduct tax while making specific payments. We ensure correct TDS deductions, timely payments, and accurate record-keeping—helping you avoid penalties and notices.
    </div>

    <div>
      <strong className="text-lg text-black">TDS Return Filing</strong> – Filing TDS returns like Form 24Q, 26Q, or 27Q is mandatory for deductors. We handle quarterly submissions, validate data, and ensure flawless filing through digital platforms like TRACES.
    </div>

    <div>
      <strong className="text-lg text-black">Income Tax Return (ITR-3 or ITR-4)</strong> – Choosing the correct ITR form based on your income from profession, business, or presumptive tax is critical. We help select, fill, and file your ITR form accurately while maintaining all required financial documentation.
    </div>

    <div>
      <strong className="text-lg text-black">Advance Tax</strong> – If your tax liability exceeds ₹10,000/year, advance tax applies. Lacleo calculates your due amounts across four installments and helps you pay on time to avoid interest under Sections 234B/234C.
    </div>

    <div>
      <strong className="text-lg text-black">GST Return Filing</strong> – GST return filing ensures you get your Input Tax Credit and maintain compliance. From GSTR-1 to GSTR-9, we manage the entire cycle, even for multiple states or turnover brackets.
    </div>

    <div>
      <strong className="text-lg text-black">Professional Tax</strong> – Levied by certain states like Maharashtra and Karnataka, this tax varies based on salary or profession. We assist with registrations, monthly deductions, and returns as per state norms.
    </div>
  </div>

  <p className="mt-10 text-gray-800">
    At <strong>Lacleo Digital</strong>, our mission is to provide hassle-free tax compliance, personalized advisory, and complete digital filing support. Whether you're an entrepreneur, salaried employee, or investor—our expert team ensures you stay compliant and worry-free, with clarity and confidence.
  </p>
</div>
      </div>
    </div>
  );
}

export default App;
