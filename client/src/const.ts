// Brand assets and configuration for D&D Insurance Group
export const BRAND_ASSETS = {
  // Logo URLs (from user attachments)
  logoColor: "/images/dd-logo-colored-new-optimized_d41336db.png", // Red White Blue Shield with D&D
  logoWhite: "/images/dd-logo-white-optimized_769eae49.png", // All White Shield
  
  // Generated Image Assets (using Compressed webp for high performance)
  heroBg: "/images/hero-bg-optimized_c330d890.jpg",
  serviceMap: "/images/oklahoma-texas-map-optimized_1d0b5a0e.jpg",
  medicareTrust: "/images/medicare-trust-optimized_98ca04f8.jpg",
  
  // High-quality stock portrait placeholders
  larryHeadshot: "/images/Image-1_03_e6dda05b.jpg", // Larry's professional headshot from ads
  clientCouple: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=800",
  businessGroup: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800"
};

export const LARRY_INFO = {
  name: "Larry Dalton",
  title: "Medicare Independent Broker & Agent",
  phone: "580-364-2266",
  email: "larry@ddinsgroup.com",
  address: "P.O. Box 153, Durant, OK 74701",
  states: ["Oklahoma", "Texas"],
  experience: "40+ years of Medicare expertise",
  tagline: "Your Health. Your Future. Our Priority.",
  npi: "NPN #17548329",
  tagline2: "Local. Trusted. Here for You."
};

export const AD_IMAGES = {
  testimonial: "/images/Image-1-optimized_d88a3c19.jpg",
  america250: "/images/BD92D9E0-E2AD-4212-B90E-617104E6A26A_5972f39d.PNG",
  workingPast65: "/images/Image-1_01-optimized_5a3f347a.jpg",
  communityTrust: "/images/Image-1_02-optimized_ed0f4505.jpg",
  trustedAgent: "/images/Image-1_03-optimized_7442d16d.jpg",
};

export const TRUST_BADGES = [
  "/images/the-medicare-agent-directory-logo_348db37e.png",
  "/images/top-rated-medicare-agent-badge_31eb4747.png",
  "/images/medicare-expert-seal-optimized_d67b5de6.png",
  "/images/verified-medicare-agent-badge_6aba60c8.png",
  "/images/BBBLogo_f43c0f5a.png",
];


// Formspree form endpoints — replace YOUR_FORM_ID with the ID from your Formspree dashboard
// (Formspree > New Form > copy the endpoint shown, looks like https://formspree.io/f/xxxxxxxx)
export const FORMSPREE_BOOKING_ENDPOINT = "https://formspree.io/f/xnpalpkz";
export const FORMSPREE_CONTACT_ENDPOINT = "https://formspree.io/f/xdenyerw";

// Sunfire SOA (Scope of Appointment) redirect link for Medicare bookings
export const SUNFIRE_PURL_URL = "https://sunfire.example.com/soa";
