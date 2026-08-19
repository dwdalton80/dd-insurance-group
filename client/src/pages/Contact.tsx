import React, { useState, useEffect } from "react";

declare global {
  interface Window {
    Calendly?: any;
  }
}
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Calendar, CheckCircle2, AlertCircle } from "lucide-react";
import { LARRY_INFO, FORMSPREE_CONTACT_ENDPOINT } from "@/const";

export default function Contact() {
  const [location] = useLocation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(FORMSPREE_CONTACT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          fullName: formData.name,
          email: formData.email,
          phone: formData.phone || undefined,
          subject: formData.subject,
          message: formData.message,
        }),
      });

      if (!response.ok) {
        throw new Error("Submission failed");
      }

      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      }, 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send message. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const bookingMode = location.includes("book=true");

  useEffect(() => {
    // Load and reinitialize Calendly widget
    if (bookingMode) {
      // Load the script if not already loaded
      if (!(window as any).Calendly) {
        const script = document.createElement('script');
        script.src = 'https://assets.calendly.com/assets/external/widget.js';
        script.async = true;
        script.onload = () => {
          // Reinitialize Calendly after script loads
          if ((window as any).Calendly) {
            (window as any).Calendly.initInlineWidget({
              url: 'https://calendly.com/ddinsgroup',
              parentElement: document.getElementById('calendly-widget')
            });
          }
        };
        document.body.appendChild(script);
      } else {
        // Script already loaded, just reinitialize
        if ((window as any).Calendly) {
          (window as any).Calendly.initInlineWidget({
            url: 'https://calendly.com/ddinsgroup',
            parentElement: document.getElementById('calendly-widget')
          });
        }
      }
    }
  }, [bookingMode]);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-primary/80 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-6">
          <h1 className="text-4xl lg:text-5xl font-extrabold font-display">
            {bookingMode ? "Book Your Free Consultation" : "Get in Touch"}
          </h1>
          <p className="text-lg text-white/90 max-w-2xl leading-relaxed">
            {bookingMode 
              ? "Schedule a personalized consultation with Larry. We'll discuss your situation, answer your questions, and help you find the right coverage."
              : "Have questions? Want to schedule a consultation? Contact Larry directly. We're here to help."}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left: Contact Info */}
            <div className="flex flex-col gap-8">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-8 font-display">Contact Information</h2>
              </div>

              {/* Direct Call */}
              <a href={`tel:${LARRY_INFO.phone}`} className="group">
                <Card className="p-6 border-2 border-border hover:border-primary/50 hover:shadow-lg transition-snappy cursor-pointer">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                      <Phone className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-grow">
                      <p className="font-bold text-foreground mb-1">Call or Text</p>
                      <p className="text-lg font-bold text-primary">{LARRY_INFO.phone}</p>
                      <p className="text-xs text-muted-foreground mt-2">Available during business hours. Text anytime.</p>
                    </div>
                  </div>
                </Card>
              </a>

              {/* Email */}
              <a href={`mailto:${LARRY_INFO.email}`} className="group">
                <Card className="p-6 border-2 border-border hover:border-primary/50 hover:shadow-lg transition-snappy cursor-pointer">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-grow">
                      <p className="font-bold text-foreground mb-1">Email</p>
                      <p className="text-sm font-mono text-primary break-all">{LARRY_INFO.email}</p>
                      <p className="text-xs text-muted-foreground mt-2">We'll respond within 24 hours.</p>
                    </div>
                  </div>
                </Card>
              </a>

              {/* Address */}
              <Card className="p-6 border-2 border-border hover:shadow-lg transition-snappy">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-grow">
                    <p className="font-bold text-foreground mb-1">Mailing Address</p>
                    <p className="text-sm text-muted-foreground">{LARRY_INFO.address}</p>
                    <p className="text-xs text-muted-foreground mt-2">Also available for phone/video consultations.</p>
                  </div>
                </div>
              </Card>

              {/* Hours */}
              <Card className="p-6 border-2 border-border bg-muted/30">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-grow">
                    <p className="font-bold text-foreground mb-3">Availability</p>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <p>Monday - Friday: 9 AM - 5 PM CT</p>
                      <p>Saturday: By Appointment</p>
                      <p>Sunday: Closed</p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Why Contact */}
              <div className="pt-8 border-t border-border">
                <h3 className="font-bold text-foreground mb-4">Why Contact Larry?</h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>Free, no-obligation consultation</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>Expert guidance tailored to you</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>40+ years of experience</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>Licensed in OK & TX</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>No pressure to buy</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right: Calendly Widget or Contact Form */}
            <div className="lg:col-span-2">
              {bookingMode ? (
                <Card className="p-8 border-2 border-border">
                  <h2 className="text-2xl font-bold text-foreground mb-6 font-display">Schedule Your Consultation</h2>
                  <p className="text-muted-foreground mb-6 text-sm">Select a time that works best for you. Larry will confirm your appointment and send you meeting details.</p>
                  <div 
                    id="calendly-widget"
                    style={{ minWidth: '320px', height: '630px' }}
                  ></div>
                </Card>
              ) : (
                <Card className="p-8 border-2 border-border">
                  <h2 className="text-2xl font-bold text-foreground mb-8 font-display">Send a Message</h2>

                  {error && (
                    <div className="mb-6 p-4 bg-destructive/10 border border-destructive/30 rounded-lg flex gap-3">
                      <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold text-foreground">Error</p>
                        <p className="text-sm text-muted-foreground mt-1">{error}</p>
                      </div>
                    </div>
                  )}

                  {submitted && (
                    <div className="mb-6 p-4 bg-secondary/10 border border-secondary/30 rounded-lg flex gap-3">
                      <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold text-foreground">Message Sent!</p>
                        <p className="text-sm text-muted-foreground mt-1">We'll get back to you as soon as possible.</p>
                      </div>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name */}
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-bold text-foreground">Full Name *</label>
                      <Input 
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        required
                        className="border-border focus:border-primary focus:ring-primary"
                      />
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-bold text-foreground">Email Address *</label>
                      <Input 
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        required
                        className="border-border focus:border-primary focus:ring-primary"
                      />
                    </div>

                    {/* Phone */}
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-bold text-foreground">Phone Number *</label>
                      <Input 
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="(555) 123-4567"
                        required
                        className="border-border focus:border-primary focus:ring-primary"
                      />
                    </div>

                    {/* Subject */}
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-bold text-foreground">Subject *</label>
                      <select 
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="px-4 py-2 border border-border rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 bg-white text-foreground font-medium"
                      >
                        <option value="">Select an option...</option>
                        <option value="medicare">Medicare Guidance</option>
                        <option value="under65">Under-65 Health Insurance</option>
                        <option value="group">Group Benefits</option>
                        <option value="dental-vision">Dental & Vision</option>
                        <option value="general">General Question</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    {/* Message */}
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-bold text-foreground">Message *</label>
                      <Textarea 
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us about your situation..."
                        required
                        rows={6}
                        className="border-border focus:border-primary focus:ring-primary resize-none"
                      />
                    </div>

                    {/* Compliance Notice */}
                    <div className="p-4 bg-muted/30 border border-border rounded-lg flex gap-3">
                      <AlertCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        By submitting this form, you agree to be contacted by D&D Insurance Group. We'll respect your privacy and only use your information to respond to your inquiry.
                      </p>
                    </div>

                    {/* Submit Button */}
                    <Button 
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-6 text-base"
                    >
                      {isLoading ? "Sending..." : "Send Message"}
                    </Button>
                  </form>

                  {/* Quick Call CTA */}
                  <div className="mt-8 pt-8 border-t border-border">
                    <p className="text-sm text-muted-foreground mb-4">Prefer to call right now?</p>
                    <a href={`tel:${LARRY_INFO.phone}`}>
                      <Button 
                        variant="outline"
                        className="w-full border-primary/30 text-primary hover:bg-primary/5 font-bold py-6 text-base flex items-center justify-center gap-2"
                      >
                        <Phone className="w-5 h-5" />
                        <span>Call {LARRY_INFO.phone}</span>
                      </Button>
                    </a>
                  </div>
                </Card>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground mb-12 font-display">Frequently Asked Questions</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-6 border-2 border-border">
              <h3 className="font-bold text-foreground mb-3">How long does a consultation take?</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Most consultations take 20-45 minutes, depending on your situation. We'll take as much time as you need to feel comfortable with your decision.
              </p>
            </Card>

            <Card className="p-6 border-2 border-border">
              <h3 className="font-bold text-foreground mb-3">Is the consultation really free?</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Yes, completely free. There's no obligation to buy anything. We just want to help you understand your options.
              </p>
            </Card>

            <Card className="p-6 border-2 border-border">
              <h3 className="font-bold text-foreground mb-3">What should I bring to my consultation?</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Bring any current insurance documents you have. If you don't have them, that's fine—we can work with what you remember.
              </p>
            </Card>

            <Card className="p-6 border-2 border-border">
              <h3 className="font-bold text-foreground mb-3">Can I do this over the phone?</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Absolutely. We offer phone, video, and in-person consultations. Choose whatever works best for you.
              </p>
            </Card>

            <Card className="p-6 border-2 border-border">
              <h3 className="font-bold text-foreground mb-3">What if I'm not ready to make a decision?</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                That's perfectly fine. We'll answer your questions and provide information. You can take your time and call back whenever you're ready.
              </p>
            </Card>

            <Card className="p-6 border-2 border-border">
              <h3 className="font-bold text-foreground mb-3">Do you work with all insurance companies?</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                We work with most major carriers. We'll show you the options available in your area and help you choose the best fit.
              </p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
