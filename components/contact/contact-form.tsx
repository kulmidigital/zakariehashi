"use client";
import React, { useState } from "react";
import { FiSend, FiUser, FiMail, FiMessageSquare, FiTag } from "react-icons/fi";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    // Subject validation
    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
      isValid = false;
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
      isValid = false;
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message should be at least 10 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error for this field when user types
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // This would be replaced with your actual API endpoint
      // await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(formData),
      // });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Success handling
      setSubmitStatus("success");
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='w-full max-w-2xl mx-auto bg-white dark:bg-[#1a1a36] rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-[#2e2d56]'>
      <div className='p-6 sm:p-8'>
        <h2 className='text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white mb-6 font-cinzel'>
          Get in Touch
        </h2>

        {submitStatus === "success" && (
          <div className='mb-6 p-4 rounded-lg bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border border-green-100 dark:border-green-900/30'>
            Thank you for your message! I'll get back to you as soon as
            possible.
          </div>
        )}

        {submitStatus === "error" && (
          <div className='mb-6 p-4 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 border border-red-100 dark:border-red-900/30'>
            There was an error sending your message. Please try again later.
          </div>
        )}

        <form onSubmit={handleSubmit} className='space-y-5'>
          <div>
            <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
              Name
            </label>
            <div className='relative'>
              <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                <FiUser className='h-5 w-5 text-gray-400 dark:text-gray-500' />
              </div>
              <input
                type='text'
                name='name'
                value={formData.name}
                onChange={handleChange}
                className={`w-full pl-10 pr-3 py-3 rounded-lg border ${
                  errors.name
                    ? "border-red-500 dark:border-red-700"
                    : "border-gray-300 dark:border-gray-600"
                } bg-white dark:bg-[#0a0a20] text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#7e7dff] transition-all duration-200`}
                placeholder='Your name'
              />
            </div>
            {errors.name && (
              <p className='mt-1 text-sm text-red-600 dark:text-red-400'>
                {errors.name}
              </p>
            )}
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
              Email
            </label>
            <div className='relative'>
              <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                <FiMail className='h-5 w-5 text-gray-400 dark:text-gray-500' />
              </div>
              <input
                type='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                className={`w-full pl-10 pr-3 py-3 rounded-lg border ${
                  errors.email
                    ? "border-red-500 dark:border-red-700"
                    : "border-gray-300 dark:border-gray-600"
                } bg-white dark:bg-[#0a0a20] text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#7e7dff] transition-all duration-200`}
                placeholder='your.email@example.com'
              />
            </div>
            {errors.email && (
              <p className='mt-1 text-sm text-red-600 dark:text-red-400'>
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
              Subject
            </label>
            <div className='relative'>
              <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                <FiTag className='h-5 w-5 text-gray-400 dark:text-gray-500' />
              </div>
              <input
                type='text'
                name='subject'
                value={formData.subject}
                onChange={handleChange}
                className={`w-full pl-10 pr-3 py-3 rounded-lg border ${
                  errors.subject
                    ? "border-red-500 dark:border-red-700"
                    : "border-gray-300 dark:border-gray-600"
                } bg-white dark:bg-[#0a0a20] text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#7e7dff] transition-all duration-200`}
                placeholder="What's this about?"
              />
            </div>
            {errors.subject && (
              <p className='mt-1 text-sm text-red-600 dark:text-red-400'>
                {errors.subject}
              </p>
            )}
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
              Message
            </label>
            <div className='relative'>
              <div className='absolute top-3 left-3 flex items-center pointer-events-none'>
                <FiMessageSquare className='h-5 w-5 text-gray-400 dark:text-gray-500' />
              </div>
              <textarea
                name='message'
                value={formData.message}
                onChange={handleChange}
                rows={5}
                className={`w-full pl-10 pr-3 py-3 rounded-lg border ${
                  errors.message
                    ? "border-red-500 dark:border-red-700"
                    : "border-gray-300 dark:border-gray-600"
                } bg-white dark:bg-[#0a0a20] text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#7e7dff] transition-all duration-200`}
                placeholder='Your message here...'
              />
            </div>
            {errors.message && (
              <p className='mt-1 text-sm text-red-600 dark:text-red-400'>
                {errors.message}
              </p>
            )}
          </div>

          <div className='pt-2'>
            <button
              type='submit'
              disabled={isSubmitting}
              className={`w-full flex items-center justify-center gap-2 bg-[#7e7dff] hover:bg-[#6c6bcf] text-white py-3 px-6 rounded-lg font-medium transition-all duration-300 shadow-md hover:shadow-lg ${
                isSubmitting ? "opacity-70 cursor-not-allowed" : ""
              }`}>
              {isSubmitting ? (
                <>
                  <div className='h-5 w-5 rounded-full border-2 border-white border-t-transparent animate-spin'></div>
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <FiSend className='h-5 w-5' />
                  <span>Send Message</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
