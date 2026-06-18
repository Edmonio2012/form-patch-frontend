/**
 * Space One — Contact Page
 * Design: Asymmetric layout with split-screen concept
 * Left: Contact form with progressive disclosure
 * Right: Contact info + social proof + stats
 * Typography: Sora (display) + DM Sans (body)
 * Palette: #001d2e base, #00c2f2 accent, premium gradients
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'wouter';
import { getTranslation, getCurrentLanguage } from '@/lib/i18n';
import { Mail, Phone, Send, CheckCircle, AlertCircle } from 'lucide-react';
import NewsletterCheckbox from '@/components/NewsletterCheckbox';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  company: string;
  subject: string;
  message: string;
  subscribe: boolean;
}

export default function Contact() {
  const [, navigate] = useLocation();
  const lang = getCurrentLanguage();
  const t = (key: string) => getTranslation(lang, key);

  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: '',
    subscribe: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked,
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Validate form
      if (!formData.fullName || !formData.email || !formData.message) {
        setErrorMessage('Please fill in all required fields');
        setSubmitStatus('error');
        setIsSubmitting(false);
        return;
      }

      // Get user IP and location info
      const ipResponse = await fetch('https://ipapi.co/json/');
      const ipData = await ipResponse.json();

      const payload = {
        full_name: formData.fullName,
        email: formData.email,
        phone_number: formData.phone,
        company_name: formData.company,
        subject: formData.subject,
        message: formData.message,
        subscribe_to_newsletter: formData.subscribe,
        preferred_contact_method: formData.phone ? 'phone' : 'email',
        country: ipData.country_name,
        city: ipData.city,
        state_province: ipData.region,
        postal_code: ipData.postal,
        ip_address: ipData.ip,
        user_agent: navigator.userAgent,
        referrer_url: document.referrer,
        status: 'new',
      };

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          company: '',
          subject: '',
          message: '',
          subscribe: false,
        });
        setTimeout(() => setSubmitStatus('idle'), 5000);
      } else {
        setErrorMessage('Failed to submit form. Please try again.');
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setErrorMessage('An error occurred. Please try again later.');
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div
      style={{
        background: '#001d2e',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Header />
      <div
        style={{
          flex: 1,
          paddingTop: '120px',
          paddingBottom: '80px',
        }}
      >
      {/* ─── Header Section ─── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 } as any}
        style={{
          textAlign: 'center',
          marginBottom: '60px',
          paddingLeft: '24px',
          paddingRight: '24px',
        }}
      >
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '48px',
            fontWeight: 700,
            color: '#fbf8f0',
            marginBottom: '16px',
            letterSpacing: '-0.02em',
          }}
        >
          Let's Build Something Great
        </h1>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '16px',
            color: 'rgba(251, 248, 240, 0.65)',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: '1.6',
          }}
        >
          Have a project in mind? We'd love to hear about it. Fill out the form below and our team will get back to you within 24 hours.
        </p>
      </motion.div>

      {/* ─── Main Content ─── */}
      <div
        style={{
          maxWidth: '1320px',
          margin: '0 auto',
          padding: '0 24px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
          gap: '60px',
          alignItems: 'start',
        }}
      >
        {/* ─── Contact Form ─── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <form onSubmit={handleSubmit}>
            <motion.div variants={itemVariants} style={{ marginBottom: '24px' }}>
              <label
                style={{
                  display: 'block',
                  fontFamily: 'var(--font-body)',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: '#fbf8f0',
                  marginBottom: '8px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }}
              >
                Full Name *
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Your name"
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  background: 'rgba(0, 194, 242, 0.05)',
                  border: '1px solid rgba(0, 194, 242, 0.15)',
                  color: '#fbf8f0',
                  fontFamily: 'var(--font-body)',
                  fontSize: '14px',
                  transition: 'all 0.3s ease',
                  outline: 'none',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.background = 'rgba(0, 194, 242, 0.08)';
                  e.currentTarget.style.borderColor = 'rgba(0, 194, 242, 0.3)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.background = 'rgba(0, 194, 242, 0.05)';
                  e.currentTarget.style.borderColor = 'rgba(0, 194, 242, 0.15)';
                }}
              />
            </motion.div>

            <motion.div variants={itemVariants} style={{ marginBottom: '24px' }}>
              <label
                style={{
                  display: 'block',
                  fontFamily: 'var(--font-body)',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: '#fbf8f0',
                  marginBottom: '8px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }}
              >
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  background: 'rgba(0, 194, 242, 0.05)',
                  border: '1px solid rgba(0, 194, 242, 0.15)',
                  color: '#fbf8f0',
                  fontFamily: 'var(--font-body)',
                  fontSize: '14px',
                  transition: 'all 0.3s ease',
                  outline: 'none',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.background = 'rgba(0, 194, 242, 0.08)';
                  e.currentTarget.style.borderColor = 'rgba(0, 194, 242, 0.3)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.background = 'rgba(0, 194, 242, 0.05)';
                  e.currentTarget.style.borderColor = 'rgba(0, 194, 242, 0.15)';
                }}
              />
            </motion.div>

            <motion.div variants={itemVariants} style={{ marginBottom: '24px' }}>
              <label
                style={{
                  display: 'block',
                  fontFamily: 'var(--font-body)',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: '#fbf8f0',
                  marginBottom: '8px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }}
              >
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+1 (555) 123-4567"
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  background: 'rgba(0, 194, 242, 0.05)',
                  border: '1px solid rgba(0, 194, 242, 0.15)',
                  color: '#fbf8f0',
                  fontFamily: 'var(--font-body)',
                  fontSize: '14px',
                  transition: 'all 0.3s ease',
                  outline: 'none',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.background = 'rgba(0, 194, 242, 0.08)';
                  e.currentTarget.style.borderColor = 'rgba(0, 194, 242, 0.3)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.background = 'rgba(0, 194, 242, 0.05)';
                  e.currentTarget.style.borderColor = 'rgba(0, 194, 242, 0.15)';
                }}
              />
            </motion.div>

            <motion.div variants={itemVariants} style={{ marginBottom: '24px' }}>
              <label
                style={{
                  display: 'block',
                  fontFamily: 'var(--font-body)',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: '#fbf8f0',
                  marginBottom: '8px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }}
              >
                Company
              </label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Your company name"
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  background: 'rgba(0, 194, 242, 0.05)',
                  border: '1px solid rgba(0, 194, 242, 0.15)',
                  color: '#fbf8f0',
                  fontFamily: 'var(--font-body)',
                  fontSize: '14px',
                  transition: 'all 0.3s ease',
                  outline: 'none',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.background = 'rgba(0, 194, 242, 0.08)';
                  e.currentTarget.style.borderColor = 'rgba(0, 194, 242, 0.3)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.background = 'rgba(0, 194, 242, 0.05)';
                  e.currentTarget.style.borderColor = 'rgba(0, 194, 242, 0.15)';
                }}
              />
            </motion.div>

            <motion.div variants={itemVariants} style={{ marginBottom: '24px' }}>
              <label
                style={{
                  display: 'block',
                  fontFamily: 'var(--font-body)',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: '#fbf8f0',
                  marginBottom: '8px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }}
              >
                Subject
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="What is this about?"
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  background: 'rgba(0, 194, 242, 0.05)',
                  border: '1px solid rgba(0, 194, 242, 0.15)',
                  color: '#fbf8f0',
                  fontFamily: 'var(--font-body)',
                  fontSize: '14px',
                  transition: 'all 0.3s ease',
                  outline: 'none',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.background = 'rgba(0, 194, 242, 0.08)';
                  e.currentTarget.style.borderColor = 'rgba(0, 194, 242, 0.3)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.background = 'rgba(0, 194, 242, 0.05)';
                  e.currentTarget.style.borderColor = 'rgba(0, 194, 242, 0.15)';
                }}
              />
            </motion.div>

            <motion.div variants={itemVariants} style={{ marginBottom: '24px' }}>
              <label
                style={{
                  display: 'block',
                  fontFamily: 'var(--font-body)',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: '#fbf8f0',
                  marginBottom: '8px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }}
              >
                Message *
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us about your project..."
                rows={6}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  background: 'rgba(0, 194, 242, 0.05)',
                  border: '1px solid rgba(0, 194, 242, 0.15)',
                  color: '#fbf8f0',
                  fontFamily: 'var(--font-body)',
                  fontSize: '14px',
                  transition: 'all 0.3s ease',
                  outline: 'none',
                  resize: 'vertical',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.background = 'rgba(0, 194, 242, 0.08)';
                  e.currentTarget.style.borderColor = 'rgba(0, 194, 242, 0.3)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.background = 'rgba(0, 194, 242, 0.05)';
                  e.currentTarget.style.borderColor = 'rgba(0, 194, 242, 0.15)';
                }}
              />
            </motion.div>

            <motion.div
              variants={itemVariants}
              style={{
                marginBottom: '24px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              <input
                type="checkbox"
                name="subscribe"
                checked={formData.subscribe}
                onChange={handleChange}
                style={{
                  width: '18px',
                  height: '18px',
                  cursor: 'pointer',
                  accentColor: '#00c2f2',
                }}
              />
              <label
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '13px',
                  color: 'rgba(251, 248, 240, 0.65)',
                  cursor: 'pointer',
                }}
              >
                Subscribe to our newsletter for updates and insights
              </label>
            </motion.div>

            {/* Status Messages */}
            {submitStatus === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  padding: '16px',
                  borderRadius: '8px',
                  background: 'rgba(34, 197, 94, 0.1)',
                  border: '1px solid rgba(34, 197, 94, 0.3)',
                  display: 'flex',
                  gap: '12px',
                  alignItems: 'center',
                  marginBottom: '24px',
                }}
              >
                <CheckCircle size={20} style={{ color: '#22c55e' }} />
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '14px',
                    color: '#22c55e',
                    margin: 0,
                  }}
                >
                  Thank you! We've received your message and will get back to you soon.
                </p>
              </motion.div>
            )}

            {submitStatus === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  padding: '16px',
                  borderRadius: '8px',
                  background: 'rgba(239, 68, 68, 0.1)',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  display: 'flex',
                  gap: '12px',
                  alignItems: 'center',
                  marginBottom: '24px',
                }}
              >
                <AlertCircle size={20} style={{ color: '#ef4444' }} />
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '14px',
                    color: '#ef4444',
                    margin: 0,
                  }}
                >
                  {errorMessage}
                </p>
              </motion.div>
            )}

            <motion.button
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isSubmitting}
              style={{
                width: '100%',
                padding: '14px 24px',
                borderRadius: '8px',
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: '14px',
                color: '#001d2e',
                background: isSubmitting ? 'rgba(0, 194, 242, 0.5)' : 'linear-gradient(135deg, #00c2f2 0%, #75dbf4 100%)',
                border: 'none',
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 6px 24px rgba(0, 194, 242, 0.35)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                letterSpacing: '0.3px',
              }}
              onMouseEnter={(e) => {
                if (!isSubmitting) {
                  const el = e.currentTarget as HTMLElement;
                  el.style.boxShadow = '0 12px 40px rgba(0, 194, 242, 0.5)';
                }
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.boxShadow = '0 6px 24px rgba(0, 194, 242, 0.35)';
              }}
            >
              <Send size={16} />
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </motion.button>
          </form>
        </motion.div>

        {/* ─── Contact Info & Social Proof ─── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '40px',
          }}
        >
          {/* Contact Methods */}
          <div>
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '24px',
                fontWeight: 700,
                color: '#fbf8f0',
                marginBottom: '24px',
              }}
            >
              Get in Touch
            </h3>

            <motion.div
              variants={itemVariants}
              style={{
                display: 'flex',
                gap: '16px',
                marginBottom: '24px',
              }}
            >
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '8px',
                  background: 'rgba(0, 194, 242, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Mail size={24} style={{ color: '#00c2f2' }} />
              </div>
              <div>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '13px',
                    color: 'rgba(251, 248, 240, 0.65)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    margin: '0 0 4px 0',
                  }}
                >
                  Email
                </p>
                <a
                  href="mailto:space1.agency@gmail.com"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '16px',
                    color: '#fbf8f0',
                    textDecoration: 'none',
                    transition: 'color 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#00c2f2';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#fbf8f0';
                  }}
                >
                  space1.agency@gmail.com
                </a>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              style={{
                display: 'flex',
                gap: '16px',
                marginBottom: '24px',
              }}
            >
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '8px',
                  background: 'rgba(0, 194, 242, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Phone size={24} style={{ color: '#00c2f2' }} />
              </div>
              <div>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '13px',
                    color: 'rgba(251, 248, 240, 0.65)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    margin: '0 0 4px 0',
                  }}
                >
                  Phone
                </p>
                <a
                  href="tel:+37444499703"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '16px',
                    color: '#fbf8f0',
                    textDecoration: 'none',
                    transition: 'color 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#00c2f2';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#fbf8f0';
                  }}
                >
                  +374 44 499 703
                </a>
              </div>
            </motion.div>
          </div>

          {/* Response Time Guarantee */}
          <motion.div
            variants={itemVariants}
            style={{
              padding: '24px',
              borderRadius: '12px',
              background: 'rgba(0, 194, 242, 0.05)',
              border: '1px solid rgba(0, 194, 242, 0.15)',
            }}
          >
            <h4
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '16px',
                fontWeight: 700,
                color: '#fbf8f0',
                marginBottom: '12px',
              }}
            >
              ⚡ Quick Response
            </h4>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '14px',
                color: 'rgba(251, 248, 240, 0.75)',
                lineHeight: '1.6',
                margin: 0,
              }}
            >
              We typically respond to inquiries within 24 hours. For urgent matters, feel free to call us directly.
            </p>
          </motion.div>

          {/* Stats */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '20px',
            }}
          >
            <motion.div
              variants={itemVariants}
              style={{
                padding: '20px',
                borderRadius: '12px',
                background: 'rgba(0, 194, 242, 0.05)',
                border: '1px solid rgba(0, 194, 242, 0.15)',
                textAlign: 'center',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '28px',
                  fontWeight: 700,
                  color: '#00c2f2',
                  margin: '0 0 8px 0',
                }}
              >
                50+
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '12px',
                  color: 'rgba(251, 248, 240, 0.65)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  margin: 0,
                }}
              >
                Projects Delivered
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              style={{
                padding: '20px',
                borderRadius: '12px',
                background: 'rgba(0, 194, 242, 0.05)',
                border: '1px solid rgba(0, 194, 242, 0.15)',
                textAlign: 'center',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '28px',
                  fontWeight: 700,
                  color: '#00c2f2',
                  margin: '0 0 8px 0',
                }}
              >
                98%
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '12px',
                  color: 'rgba(251, 248, 240, 0.65)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  margin: 0,
                }}
              >
                Client Satisfaction
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
      </div>
      <Footer />
    </div>
  );
}
