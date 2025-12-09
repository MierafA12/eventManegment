// src/pages/Contact.jsx
import { useState } from 'react';
import MainLayout from '../layout/mainLayout';

export default function Contact() {
  const [formStatus, setFormStatus] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus('Thank you for your message! We will get back to you soon.');
    e.target.reset();
    setTimeout(() => setFormStatus(''), 5000);
  };

  return (
    <MainLayout>
      <section className="pt-24 pb-20 bg-gradient-to-br from-secondary to-primary/20">
        <div className="container mx-auto px-4">

          <h1 className="text-5xl md:text-6xl font-bold text-center text-primary mb-16">
            Contact Us
          </h1>

          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">

            {/* Contact Form */}
            <div className="bg-bg rounded-2xl shadow-xl p-8">
              <h2 className="text-3xl font-bold mb-6 text-primary">Send us a Message</h2>

              {formStatus && (
                <div className="mb-6 p-4 bg-success/20 border border-success text-success rounded-lg text-center font-medium">
                  {formStatus}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">

                <div>
                  <label className="block text-primary font-medium mb-2">Full Name</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border border-secondary rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-primary font-medium mb-2">Email</label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-3 border border-secondary rounded-lg focus:ring-2 focus:ring-primary"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="block text-primary font-medium mb-2">Subject</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border border-secondary rounded-lg focus:ring-2 focus:ring-primary"
                    placeholder="Event Inquiry"
                  />
                </div>

                <div>
                  <label className="block text-primary font-medium mb-2">Message</label>
                  <textarea
                    required
                    rows="5"
                    className="w-full px-4 py-3 border border-secondary rounded-lg focus:ring-2 focus:ring-primary resize-none"
                    placeholder="Tell us about your event..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary text-text1 py-4 rounded-lg font-semibold text-lg hover:bg-buttonHover transition transform hover:scale-105"
                >
                  Send Message
                </button>

              </form>
            </div>

            {/* Contact Info */}
            <div className="bg-primary text-text1 rounded-2xl shadow-xl p-8 flex flex-col justify-center">
              <h2 className="text-3xl font-bold mb-8">Get in Touch</h2>

              <div className="space-y-6">

                <div className="flex items-start space-x-4">
                  <i className="fas fa-map-marker-alt text-2xl mt-1"></i>
                  <div>
                    <p className="font-semibold">Address</p>
                    <p className="opacity-90">Bole, Addis Ababa, Ethiopia</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <i className="fas fa-phone text-2xl mt-1"></i>
                  <div>
                    <p className="font-semibold">Phone</p>
                    <p className="opacity-90">+251 912 121212</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <i className="fas fa-envelope text-2xl mt-1"></i>
                  <div>
                    <p className="font-semibold">Email</p>
                    <p className="opacity-90">info@Ethioevents.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <i className="fas fa-clock text-2xl mt-1"></i>
                  <div>
                    <p className="font-semibold">Working Hours</p>
                    <p className="opacity-90">Mon - Fri: 9:00 AM - 6:00 PM</p>
                  </div>
                </div>

              </div>

            </div>

          </div>
        </div>
      </section>
    </MainLayout>
  );
}
