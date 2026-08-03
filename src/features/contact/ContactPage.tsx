import React, { useState } from 'react';
import { CheckCircle2, Clock, Mail, MapPin, Phone, Send } from 'lucide-react';
import { Field } from '../../components/ui/Field';

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Membership Inquiry',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: '', email: '', phone: '', subject: 'Membership Inquiry', message: '' });
      }, 4500);
    }
  };

  return (
    <div className="space-y-10 pb-12 select-none">
      {/* Header */}
      <div className="space-y-2 text-center max-w-2xl mx-auto">
        <span className="text-[11px] font-extrabold tracking-widest text-[#C7FF3D] uppercase">
          COIMBATORE CLUB
        </span>
        <h1 className="font-display text-4xl font-extrabold uppercase text-[#F3F5ED] sm:text-5xl">
          Contact FORGE
        </h1>
        <p className="text-xs text-[#A1A69A]">
          Have questions about our facilities, personal coaching, or annual memberships? Get in touch with our team.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Info Panel */}
        <div className="rounded-3xl border border-white/10 bg-[#111310] p-6 sm:p-8 space-y-6 flex flex-col justify-between">
          <div className="space-y-6">
            <span className="text-[11px] font-extrabold text-[#C7FF3D] uppercase tracking-widest block">
              LOCATION & HOURS
            </span>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#C7FF3D]/10 text-[#C7FF3D]">
                  <MapPin className="h-4.5 w-4.5" />
                </div>
                <div>
                  <span className="font-display text-lg font-bold uppercase text-[#F3F5ED] block">
                    Coimbatore Club Address
                  </span>
                  <p className="text-xs text-[#A1A69A] leading-relaxed">
                    FORGE Performance Club, Avinashi Road, Race Course Area, Coimbatore, Tamil Nadu 641018
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#C7FF3D]/10 text-[#C7FF3D]">
                  <Clock className="h-4.5 w-4.5" />
                </div>
                <div>
                  <span className="font-display text-lg font-bold uppercase text-[#F3F5ED] block">
                    Operational Hours
                  </span>
                  <p className="text-xs text-[#A1A69A]">
                    Monday – Sunday: 05:00 AM – 11:00 PM IST
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#C7FF3D]/10 text-[#C7FF3D]">
                  <Phone className="h-4.5 w-4.5" />
                </div>
                <div>
                  <span className="font-display text-lg font-bold uppercase text-[#F3F5ED] block">
                    Direct Line
                  </span>
                  <p className="text-xs text-[#A1A69A]">
                    +91 98765 43210 / +91 422 284 9900
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#C7FF3D]/10 text-[#C7FF3D]">
                  <Mail className="h-4.5 w-4.5" />
                </div>
                <div>
                  <span className="font-display text-lg font-bold uppercase text-[#F3F5ED] block">
                    Email Desk
                  </span>
                  <p className="text-xs text-[#A1A69A]">
                    coimbatore@forgeclub.in
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#181B16] p-4 text-xs text-[#A1A69A] space-y-1">
            <span className="font-bold text-[#F3F5ED] block">Visitor Note:</span>
            <span>Guest walkthroughs and facility assessments are available daily by appointment or walk-in.</span>
          </div>
        </div>

        {/* Right Direct Message Form */}
        <div className="rounded-3xl border border-white/10 bg-[#111310] p-6 sm:p-8 space-y-6">
          <div className="space-y-1">
            <span className="text-[11px] font-extrabold text-[#C7FF3D] uppercase tracking-widest block">
              DIRECT DISPATCH
            </span>
            <h2 className="font-display text-2xl font-bold uppercase text-[#F3F5ED]">
              Send an Inquiry
            </h2>
          </div>

          {submitted ? (
            <div className="rounded-2xl border border-[#A8E65C]/40 bg-[#A8E65C]/10 p-6 text-center space-y-3">
              <CheckCircle2 className="h-10 w-10 text-[#A8E65C] mx-auto" />
              <h3 className="font-display text-xl font-bold text-[#F3F5ED] uppercase">Inquiry Received</h3>
              <p className="text-xs text-[#A1A69A]">
                Thank you, {formData.name}. Our Coimbatore membership team will reach out to you shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <Field
                id="contact-name"
                label="Full Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Aadithya Vikram"
                required
              />

              <Field
                id="contact-email"
                label="Email Address"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="aadithya@example.com"
                required
              />

              <Field
                id="contact-phone"
                label="Mobile Phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+91 98765 43210"
              />

              <div className="space-y-1.5 text-left">
                <label htmlFor="contact-message" className="block text-xs font-medium text-[#F3F5ED]/90">
                  Message Details *
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us about your fitness background or questions..."
                  required
                  className="w-full rounded-xl border border-white/10 bg-[#111310] p-3 text-sm text-[#F3F5ED] placeholder-[#747A70] focus:border-[#C7FF3D] focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full h-12 rounded-xl bg-[#C7FF3D] text-[#070806] font-extrabold text-xs uppercase tracking-wider hover:bg-[#A8E65C] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg"
              >
                <Send className="h-4 w-4" />
                <span>Submit Inquiry</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
