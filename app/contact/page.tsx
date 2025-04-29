import { Metadata } from "next";
import ContactForm from "@/components/contact/contact-form";
import ContactInfo from "@/components/contact/contact-info";

export const metadata: Metadata = {
  title: "Contact - Zakarie Hashi",
  description:
    "Get in touch with Zakarie Hashi for financial guidance, business inquiries, or collaboration opportunities.",
};

export default function ContactPage() {
  return (
    <main className='bg-gradient-to-b from-[#f6f8fa] to-white dark:from-[#0a0a20] dark:to-[#141432] min-h-screen pt-24 pb-16 md:pt-32 md:pb-24'>
      {/* Decorative elements */}
      <div className='absolute top-0 left-0 w-full h-72 bg-gradient-to-b from-[#7e7dff]/5 to-transparent pointer-events-none'></div>
      <div className='absolute -top-40 -left-20 w-96 h-96 rounded-full bg-gradient-to-br from-[#7e7dff] to-[#1a1a36] opacity-5 blur-3xl pointer-events-none'></div>
      <div className='absolute -bottom-40 right-0 w-96 h-96 rounded-full bg-gradient-to-tr from-[#2a2a55] to-[#1a1a36] opacity-10 blur-3xl pointer-events-none'></div>

      <div className='container mx-auto px-4 relative z-10'>
        <div className='text-center mb-12'>
          <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 dark:text-white mb-4 font-cinzel'>
            Get in Touch
          </h1>
        </div>

        <div className='grid md:grid-cols-2 gap-8 max-w-6xl mx-auto'>
          <div className='order-2 md:order-1'>
            <ContactForm />
          </div>

          <div className='order-1 md:order-2'>
            <ContactInfo />
          </div>
        </div>
      </div>
    </main>
  );
}
