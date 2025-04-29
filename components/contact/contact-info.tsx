import React from "react";
import { FiMail, FiClock, FiLinkedin } from "react-icons/fi";
import Link from "next/link";

export default function ContactInfo() {
  const contactDetails = [
    {
      icon: FiMail,
      title: "Email",
      details: "zakariehashi@gmail.com",
      action: "mailto:zakariehashi@gmail.com",
      actionText: "Send an email",
    },
    {
      icon: FiClock,
      title: "Business Hours",
      details: "Monday - Friday: 9:00 AM - 5:00 PM",
      secondDetails: "Weekends: By appointment only",
      action: "",
      actionText: "",
    },
  ];

  return (
    <div className='bg-white dark:bg-[#1a1a36] rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-[#2e2d56]'>
      <div className='p-6 sm:p-8'>
        <h2 className='text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white mb-6 font-cinzel'>
          Contact Information
        </h2>

        <div className='space-y-6'>
          {contactDetails.map((item, index) => (
            <div key={index} className='flex items-start'>
              <div className='flex-shrink-0 h-10 w-10 rounded-full bg-[#7e7dff]/10 flex items-center justify-center mr-4'>
                <item.icon className='h-5 w-5 text-[#7e7dff]' />
              </div>
              <div>
                <h3 className='text-lg font-medium text-gray-800 dark:text-white mb-1'>
                  {item.title}
                </h3>
                <p className='text-gray-600 dark:text-gray-300'>
                  {item.details}
                </p>
                {item.secondDetails && (
                  <p className='text-gray-600 dark:text-gray-300'>
                    {item.secondDetails}
                  </p>
                )}
                {item.action && (
                  <Link
                    href={item.action}
                    target={
                      item.action.startsWith("http") ? "_blank" : undefined
                    }
                    rel={
                      item.action.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className='inline-flex items-center mt-2 text-sm font-medium text-[#7e7dff] hover:text-[#6c6bcf] transition-colors'>
                    {item.actionText} →
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className='mt-10 pt-6 border-t border-gray-200 dark:border-gray-700'>
          <h3 className='text-lg font-medium text-gray-800 dark:text-white mb-4'>
            Connect with me
          </h3>
          <div className='flex'>
            <Link
              href='https://www.linkedin.com/in/zakariehashi/'
              target='_blank'
              rel='noopener noreferrer'
              aria-label='Visit LinkedIn'
              className='p-3 rounded-full bg-gray-100 dark:bg-[#0a0a20] hover:bg-gray-200 dark:hover:bg-[#2a2a55] transition-colors'
              style={{ color: "#0077B5" }}>
              <FiLinkedin className='h-5 w-5' />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
