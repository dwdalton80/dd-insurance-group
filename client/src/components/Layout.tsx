import React, { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Phone, Calendar, Menu, X, Shield, CheckCircle2, ExternalLink } from "lucide-react";
import { BRAND_ASSETS, LARRY_INFO } from "@/const";
import { Button } from "@/components/ui/button";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location]);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Medicare", path: "/medicare" },
    { name: "Individual Insurance", path: "/under-65" },
    { name: "Group Plans", path: "/group" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "FAQ", path: "/faq" }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground font-sans">
      {/* Top Banner (Alert/Compliance/Direct Call) */}
      <div className="bg-primary text-primary-foreground py-2 px-4 text-xs font-medium border-b border-primary/20">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <Shield className="w-3.5 h-3.5 text-secondary" />
            <span>Licensed in {LARRY_INFO.states.join(" & ")} — Personalized Medicare & Health Consultation</span>
          </div>
          <div className="flex items-center gap-4">
            <a href={`tel:${LARRY_INFO.phone}`} className="flex items-center gap-1.5 hover:text-secondary transition-colors font-semibold">
              <Phone className="w-3 h-3 text-secondary fill-secondary" />
              <span>Click to Call: {LARRY_INFO.phone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Header */}
      <header className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        scrolled 
          ? "bg-white/95 backdrop-blur-md shadow-md border-b border-border py-3" 
          : "bg-white py-4"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          {/* Logo Brand - Optimized with responsive sizes and WebP */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative w-10 h-10 transition-transform duration-300 group-hover:scale-110 flex-shrink-0">
              <picture>
                <source srcSet="/images/dd-logo-colored-mobile_ce046c6c.webp" type="image/webp" />
                <source srcSet="/images/dd-logo-colored-mobile_29e7fcb7.png" type="image/png" />
                <img 
                  src="/images/dd-logo-colored-optimized_fc2140f6.webp" 
                  alt="D&D Insurance Group Logo" 
                  className="w-full h-full object-contain"
                  loading="lazy"
                  decoding="async"
                />
              </picture>
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="text-lg font-extrabold tracking-tight text-foreground font-display leading-tight">
                D&D <span className="text-primary">Insurance</span>
              </span>
              <span className="text-[9px] text-muted-foreground tracking-wider uppercase font-semibold">
                Medicare Broker
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = location === item.path;
              
              return (
                <Link key={item.path} href={item.path}>
                  <span className={`px-3 py-2 rounded-md text-sm font-semibold transition-snappy ${
                    isActive 
                      ? "text-primary bg-primary/5" 
                      : "text-muted-foreground hover:text-primary hover:bg-muted"
                  }`}>
                    {item.name}
                  </span>
                </Link>
              );
            })}
          </nav>



          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted focus:outline-none transition-snappy"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-x-0 top-[117px] bg-white border-b border-border shadow-xl py-4 px-6 flex flex-col gap-4 animate-in fade-in slide-in-from-top-5 duration-200 z-50 max-h-[calc(100vh-120px)] overflow-y-auto">
            <div className="flex flex-col gap-1">
              {navItems.map((item) => {
                const isActive = location === item.path;
                
                return (
                  <Link key={item.path} href={item.path}>
                    <span className={`block px-4 py-3 rounded-lg text-base font-bold transition-snappy ${
                      isActive 
                        ? "text-primary bg-primary/5 border-l-4 border-primary" 
                        : "text-muted-foreground hover:text-primary hover:bg-muted"
                    }`}>
                      {item.name}
                    </span>
                  </Link>
                );
              })}
            </div>
            
            <div className="border-t border-border pt-4 flex flex-col gap-3">
              <a href={`tel:${LARRY_INFO.phone}`} className="w-full">
                <Button variant="outline" className="w-full border-primary/30 text-primary hover:bg-primary/5 py-6 text-base font-bold flex items-center justify-center gap-2">
                  <Phone className="w-5 h-5 fill-primary/10" />
                  <span>Call {LARRY_INFO.phone}</span>
                </Button>
              </a>
              <Link href="/booking" className="w-full">
                <Button className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground py-6 text-base font-bold flex items-center justify-center gap-2 shadow-md">
                  <Calendar className="w-5 h-5" />
                  <span>Book Free Consultation</span>
                </Button>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Main Content Page Area */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Compliant Footer */}
      <footer className="bg-foreground text-white pt-16 pb-8 border-t border-primary/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1: Brand & Bio */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <picture>
                <source srcSet="/images/dd-logo-white-tablet_1ffde95a.webp" type="image/webp" />
                <source srcSet="/images/dd-logo-white-tablet_714a59a7.png" type="image/png" />
                <img 
                  src="/images/dd-logo-white-optimized_28b99c64.webp" 
                  alt="D&D Insurance Group White Logo" 
                  className="w-12 h-12 object-contain"
                  loading="lazy"
                  decoding="async"
                />
              </picture>
              <span className="text-xl font-extrabold tracking-tight font-display text-white">
                D&D <span className="text-primary">Insurance Group</span>
              </span>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed">
              Headed by Larry Dalton, we specialize in helping individuals, seniors, and small businesses navigate Medicare, health, vision, dental, and group benefits in all of the metropolitan areas as well as rural communities throughout Oklahoma and Texas.
            </p>
            <div className="flex flex-col gap-1 text-xs text-gray-300">
              <span>Durant, OK Office & Mobile Consultations</span>
              <span>NPN: {LARRY_INFO.npi}</span>
            </div>
          </div>

          {/* Column 2: Needs-Based Navigation */}
          <div className="flex flex-col gap-4">
            <h3 className="text-base font-bold tracking-wider uppercase text-primary border-b border-primary/20 pb-2">
              Insurance Solutions
            </h3>
            <ul className="flex flex-col gap-2.5 text-sm">
              <li>
                <Link href="/medicare" className="text-gray-300 hover:text-white transition-colors">
                  Medicare Supplements & Advantage
                </Link>
              </li>
              <li>
                <Link href="/under-65" className="text-gray-300 hover:text-white transition-colors">
                  Under-65 Health Plans (ACA/Marketplace)
                </Link>
              </li>
              <li>
                <Link href="/under-65#dental-vision" className="text-gray-300 hover:text-white transition-colors">
                  Dental & Vision Protection
                </Link>
              </li>
              <li>
                <Link href="/group" className="text-gray-300 hover:text-white transition-colors">
                  Small Business & Group Health
                </Link>
              </li>
              <li>
                <Link href="/under-65#short-term" className="text-gray-300 hover:text-white transition-colors">
                  Short-Term Medical Plans
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Resources & Compliance */}
          <div className="flex flex-col gap-4">
            <h3 className="text-base font-bold tracking-wider uppercase text-primary border-b border-primary/20 pb-2">
              Resources & Tools
            </h3>
            <ul className="flex flex-col gap-2.5 text-sm">
              <li>
                <Link href="/medicare" className="text-gray-300 hover:text-white transition-colors">
                  Medicare Guidance & Education
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
                  Meet Agent Larry Dalton
                </Link>
              </li>
              <li>
                <Link href="/booking" className="text-gray-300 hover:text-white transition-colors">
                  Book Free Consultation
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-gray-300 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="text-gray-300 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Compliance */}
          <div className="flex flex-col gap-4">
            <h3 className="text-base font-bold tracking-wider uppercase text-primary border-b border-primary/20 pb-2">
              Get in Touch
            </h3>
            <ul className="flex flex-col gap-3 text-sm">
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-secondary flex-shrink-0 mt-0.5" />
                <div className="flex flex-col gap-1">
                  <a href={`tel:${LARRY_INFO.phone}`} className="text-gray-300 hover:text-white transition-colors font-semibold">
                    {LARRY_INFO.phone}
                  </a>
                  <span className="text-xs text-gray-300">Call for Free Consultation</span>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-secondary flex-shrink-0 mt-0.5" />
                <div className="flex flex-col gap-1">
                  <span className="text-gray-300 font-semibold">Licensed in OK & TX</span>
                  <span className="text-xs text-gray-300">40+ Years Medicare Experience</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Compliance Disclaimers */}
        <div className="border-t border-primary/20 mt-12 pt-8 px-4 sm:px-6 lg:px-8 bg-foreground/95">
          <div className="max-w-7xl mx-auto space-y-4 text-xs text-gray-300 leading-relaxed">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="font-semibold text-white mb-2">TPMO Disclaimer:</p>
                <p>We do not offer every plan available in your area. Any information we provide is limited to those plans we do offer in your area. Please contact Medicare.gov or 1-800-MEDICARE to get information on all of your options.</p>
              </div>
              <div>
                <p className="font-semibold text-white mb-2">Affiliation Notice:</p>
                <p>This website is operated by a private, independent licensed insurance agent. It is not affiliated with, endorsed by, or connected to the federal Medicare program, CMS, or any government entity.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-primary/20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-300 py-8">
            <p>© 2026 D&D Insurance Group. All rights reserved. Headed by Larry Dalton.</p>
            <div className="flex gap-6">
              <Link href="/privacy-policy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms-of-service" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
              <a href="https://www.medicare.gov" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
                Medicare.gov <ExternalLink className="w-3 h-3" />
              </a>
              <a href="tel:1-800-MEDICARE" className="hover:text-white transition-colors">
                1-800-MEDICARE
              </a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
