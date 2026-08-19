
import { useLocation } from "wouter";
import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Phone, Heart, Shield, BookOpen, Users, Calendar, Star, CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import { LARRY_INFO, AD_IMAGES, BRAND_ASSETS, TRUST_BADGES } from "@/const";

const testimonials = [
  {
    quote: "Larry provided information that anyone can understand. He was very truthful about the insurance we had. He helped me and my spouse save $56 each on our pharmacy insurance. He was very easy to work with!",
    name: "Linda B.",
    title: "Medicare Beneficiary, Oklahoma",
    rating: 5,
  },
  {
    quote: "I've learned a lot from Larry in a short amount of time. He has helped me more than anyone else. I've been on Medicare for a while, and he has become someone we know we can trust, not someone padding their pocket. He saved us $250 per month on our supplement plans.",
    name: "Donna W.",
    title: "Medicare Beneficiary, Oklahoma",
    rating: 5,
  },
  {
    quote: "Thank you for helping us with making healthcare decisions. Your guidance in choosing plans has been great. We appreciate all you have done.",
    name: "Jerry S.",
    title: "Medicare Beneficiary, Oklahoma",
    rating: 5,
  },
  {
    quote: "I have had insurance for many years, I contacted Larry about my premium going up every year. Larry was able to explain my options and switch me to a Medicare and Supplement plan that was affordable. I'm thankful he was more than willing to help.",
    name: "Cheri S.",
    title: "Medicare Beneficiary, Oklahoma",
    rating: 5,
  },
  {
    quote: "Larry helped us save on our supplemental insurance and prescription drug plans. Larry is upfront and honest with his clients. He is knowledgeable about Medicare and keeps up with current changes and laws.",
    name: "Regina B.",
    title: "Medicare Beneficiary, Oklahoma",
    rating: 5,
  },
  {
    quote: "Thank you Larry for all of your advice concerning insurance and Medicare for Brian and myself. I believe you have spent lots of time learning more to help your clients, which shows how much you care. I have recommended you to others. I fully trust you and your recommendations.",
    name: "Sheryl C.",
    title: "Medicare Beneficiary, Oklahoma",
    rating: 5,
  },
  {
    quote: "Larry saved me an unbelievable amount of money. I am 82 and my monthly premium was over $400 per month. Larry was able to move me to another Medicare plan reducing my cost by half of what I was paying. I would recommend him to anyone.",
    name: "J Dewitt",
    title: "Medicare Beneficiary, Oklahoma",
    rating: 5,
  },
];

export default function Home() {
  const [, setLocation] = useLocation();
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  const goToPrevious = () => {
    setCurrentTestimonialIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const goToNext = () => {
    setCurrentTestimonialIndex((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  const goToTestimonial = (index: number) => {
    setCurrentTestimonialIndex(index);
  };

  // Auto-rotate testimonials every 6 seconds when not hovering
  useEffect(() => {
    if (isHovering) return;

    const interval = setInterval(() => {
      setCurrentTestimonialIndex((prev) =>
        prev === testimonials.length - 1 ? 0 : prev + 1
      );
    }, 6000);

    return () => clearInterval(interval);
  }, [isHovering]);

  const currentTestimonial = testimonials[currentTestimonialIndex];

  return (
    <div className="w-full">
      {/* Premium Hero Section - Patriotic Design */}
      <section className="relative py-24 bg-gradient-to-b from-primary via-primary to-primary/95 text-white overflow-hidden">
        {/* Decorative stars background */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 text-6xl">★</div>
          <div className="absolute top-20 right-20 text-5xl">★</div>
          <div className="absolute bottom-20 left-1/4 text-4xl">★</div>
          <div className="absolute bottom-10 right-1/3 text-5xl">★</div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Hero Copy */}
            <div className="flex flex-col gap-8">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-sm font-bold tracking-widest text-white/90">
                  LICENSED IN OKLAHOMA & TEXAS
                </span>
              </div>

              <div className="space-y-4">
                <h1 className="text-6xl lg:text-7xl xl:text-8xl font-extrabold font-display leading-tight">
                  Your Health.
                  <br />
                  <span className="text-red-500">Your Future.</span>
                  <br />
                  <span className="text-white">Our Priority.</span>
                </h1>
                <p className="text-xl text-white/95 leading-relaxed font-medium">
                  {LARRY_INFO.experience} of Medicare expertise. Personalized guidance from a trusted local agent serving all of the metropolitan areas as well as rural communities in both Oklahoma and Texas.
                </p>
              </div>

              {/* Trust Tagline */}
              <div className="flex items-center gap-3 pt-4 border-t border-white/20">
                <Heart className="w-6 h-6 text-red-500 flex-shrink-0" />
                <p className="text-lg font-bold text-white">{LARRY_INFO.tagline2}</p>
              </div>

              {/* Medicare Affiliation Disclaimer */}
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 text-sm text-white/90">
                <p><strong>Important Notice:</strong> This website is operated by a private, independent licensed insurance agent. It is not affiliated with, endorsed by, or connected to the federal Medicare program, CMS, or any government entity.</p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <a href={`tel:${LARRY_INFO.phone}`}>
                  <Button className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white font-bold py-6 px-8 text-lg rounded-lg shadow-lg hover:shadow-xl transition-all">
                    <Phone className="w-5 h-5 mr-2" />
                    Call Larry Now
                  </Button>
                </a>
                <Button
                  onClick={() => setLocation("/booking")}
                  variant="outline"
                  className="w-full sm:w-auto border-2 border-white text-white hover:bg-white/10 font-bold py-6 px-8 text-lg rounded-lg"
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Book Free Consultation
                </Button>
              </div>
            </div>

            {/* Right: Featured Ad Image - Optimized with responsive sizes and WebP */}
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20">
                <picture>
                  {/* Desktop: 800px */}
                  <source
                    media="(min-width: 1024px)"
                    srcSet="/images/larry-desktop_e94926ab.webp"
                    type="image/webp"
                  />
                  <source
                    media="(min-width: 1024px)"
                    srcSet="/images/larry-desktop_00c4ba92.png"
                    type="image/png"
                  />
                  {/* Tablet: 600px */}
                  <source
                    media="(min-width: 768px)"
                    srcSet="/images/larry-tablet_35f7c30b.webp"
                    type="image/webp"
                  />
                  <source
                    media="(min-width: 768px)"
                    srcSet="/images/larry-tablet_68b159a8.png"
                    type="image/png"
                  />
                  {/* Mobile: 400px */}
                  <source
                    media="(max-width: 767px)"
                    srcSet="/images/larry-mobile_3889c13e.webp"
                    type="image/webp"
                  />
                  <source
                    media="(max-width: 767px)"
                    srcSet="/images/larry-mobile_382b9a45.png"
                    type="image/png"
                  />
                  {/* Fallback */}
                  <img
                    src="/images/larry-optimized_50d38d78.webp"
                    alt="Larry Dalton - Your Trusted Medicare Insurance Agent"
                    className="w-full h-auto object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </picture>
              </div>
              {/* Decorative badge */}
              <div className="absolute -bottom-6 -right-6 bg-red-600 text-white rounded-full p-6 shadow-xl border-4 border-white">
                <div className="text-center">
                  <div className="text-2xl font-extrabold">40+</div>
                  <div className="text-xs font-bold leading-tight">Years<br/>Experience</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Signals Section - Optimized badges with responsive sizing and WebP */}
      <section className="py-16 bg-white border-b-4 border-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-8 items-center justify-items-center">
            {/* Medicare Agent Directory Badge */}
            <div className="flex justify-center">
              <picture>
                <source media="(min-width: 1024px)" srcSet="/images/badge_10_large_5fab1f30.jpg" />
                <source media="(min-width: 640px)" srcSet="/images/badge_10_medium_e7638a42.jpg" />
                <img src="/images/badge_10_small_88136285.jpg" alt="Medicare Agent Directory Logo" className="h-24 w-24 md:h-28 md:w-28 lg:h-32 lg:w-32 object-contain" loading="lazy" decoding="async" />
              </picture>
            </div>
            {/* Top Rated Agent Badge */}
            <div className="flex justify-center">
              <picture>
                <source media="(min-width: 1024px)" srcSet="/images/badge_20_large_27792266.jpg" />
                <source media="(min-width: 640px)" srcSet="/images/badge_20_medium_91a02332.jpg" />
                <img src="/images/badge_20_small_10ecf95c.jpg" alt="Top Rated Medicare Agent Badge" className="h-24 w-24 md:h-28 md:w-28 lg:h-32 lg:w-32 object-contain" loading="lazy" decoding="async" />
              </picture>
            </div>
            {/* Medicare Expert Seal Badge */}
            <div className="flex justify-center">
              <picture>
                <source media="(min-width: 1024px)" srcSet="/images/badge_11_large_f24455d0.jpg" />
                <source media="(min-width: 640px)" srcSet="/images/badge_11_medium_dd0f7367.jpg" />
                <img src="/images/badge_11_small_c224fea2.jpg" alt="Medicare Expert Seal" className="h-24 w-24 md:h-28 md:w-28 lg:h-32 lg:w-32 object-contain" loading="lazy" decoding="async" />
              </picture>
            </div>
            {/* Verified Agent Badge */}
            <div className="flex justify-center">
              <picture>
                <source media="(min-width: 1024px)" srcSet="/images/badge_21_large_9d15d9d0.jpg" />
                <source media="(min-width: 640px)" srcSet="/images/badge_21_medium_5eed5f68.jpg" />
                <img src="/images/badge_21_small_3cd87440.jpg" alt="Verified Medicare Agent Badge" className="h-24 w-24 md:h-28 md:w-28 lg:h-32 lg:w-32 object-contain" loading="lazy" decoding="async" />
              </picture>
            </div>
            {/* BBB Logo Badge */}
            <div className="flex justify-center">
              <picture>
                <source media="(min-width: 1024px)" srcSet="/images/badge_1_large_290a3d08.jpg" />
                <source media="(min-width: 640px)" srcSet="/images/badge_1_medium_7d608e62.jpg" />
                <img src="/images/badge_1_small_032c87e9.jpg" alt="BBB Logo" className="h-24 w-24 md:h-28 md:w-28 lg:h-32 lg:w-32 object-contain" loading="lazy" decoding="async" />
              </picture>
            </div>
          </div>
        </div>
      </section>

      {/* What's Your Situation Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-foreground mb-4 font-display">
              What's Your Situation?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Select your life stage or insurance need. We'll guide you to the right coverage and answer all your questions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Heart,
                title: "Medicare",
                desc: "Turning 65? We explain Parts A, B, C, D, Supplements, and Advantage plans.",
                link: "/medicare",
                color: "from-primary to-blue-600 border-primary",
              },
              {
                icon: Users,
                title: "Individual Insurance",
                desc: "Individual, family, or marketplace coverage. We compare ACA and short-term options.",
                link: "/under-65",
                color: "from-red-600 to-red-700 border-red-600",
              },
              {
                icon: Shield,
                title: "Group Plans",
                desc: "Attract and retain talent with competitive group health, dental, and vision benefits.",
                link: "/group",
                color: "from-primary to-blue-600 border-primary",
              },
            ].map((item, idx) => (
              <a key={idx} href={item.link} className="group">
                <Card className={`p-8 h-full border-2 bg-gradient-to-br ${item.color} hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer`}>
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-white/30 transition-colors">
                      <item.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white group-hover:text-white/90 transition-colors">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-sm text-white/90 leading-relaxed">{item.desc}</p>
                  <div className="mt-6 flex items-center gap-2 text-white font-bold text-sm group-hover:gap-3 transition-all">
                    Learn More <span>→</span>
                  </div>
                </Card>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Ad Section - Working Past 65 */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="rounded-xl overflow-hidden shadow-xl">
              <picture>
                {/* Desktop: 800px */}
                <source
                  media="(min-width: 1024px)"
                  srcSet="/images/working-past-65-desktop_b2c3bd1e.webp"
                  type="image/webp"
                />
                <source
                  media="(min-width: 1024px)"
                  srcSet="/images/working-past-65-desktop_741304f3.jpg"
                  type="image/jpeg"
                />
                {/* Tablet: 600px */}
                <source
                  media="(min-width: 768px)"
                  srcSet="/images/working-past-65-tablet_596fabdb.webp"
                  type="image/webp"
                />
                <source
                  media="(min-width: 768px)"
                  srcSet="/images/working-past-65-tablet_27f875fa.jpg"
                  type="image/jpeg"
                />
                {/* Mobile: 400px */}
                <source
                  media="(max-width: 767px)"
                  srcSet="/images/working-past-65-mobile_d73920c8.webp"
                  type="image/webp"
                />
                <source
                  media="(max-width: 767px)"
                  srcSet="/images/working-past-65-mobile_94706668.jpg"
                  type="image/jpeg"
                />
                {/* Fallback */}
                <img
                  src="/images/working-past-65-optimized_7839e24d.webp"
                  alt="Working Past 65 - Medicare Penalties"
                  className="w-full h-auto object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </picture>
            </div>
            <div className="flex flex-col gap-6">
              <h2 className="text-4xl font-extrabold text-foreground font-display">
                Still Working After 65?
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                If you're still working past 65, understanding your Medicare options is critical. Missing enrollment deadlines can result in permanent penalties that last a lifetime.
              </p>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-foreground">Avoid Medicare Penalties</p>
                    <p className="text-sm text-muted-foreground">Understand your options and enrollment timing</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-foreground">Save Money</p>
                    <p className="text-sm text-muted-foreground">Find the right plan for your situation</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-foreground">Expert Guidance</p>
                    <p className="text-sm text-muted-foreground">40+ years of Medicare experience</p>
                  </div>
                </div>
              </div>
              <a href={`tel:${LARRY_INFO.phone}`}>
                <Button className="bg-primary hover:bg-primary/90 text-white font-bold py-6 px-8 text-lg w-full">
                  <Phone className="w-5 h-5 mr-2" />
                  Call Larry Today
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-8">
            <div>
              <h2 className="text-4xl font-extrabold text-foreground mb-4 font-display">
                What Clients Say
              </h2>
              <p className="text-lg text-muted-foreground">
                Real people, real results. See why clients trust Larry with their Medicare decisions.
              </p>
            </div>

            {/* Carousel Container */}
            <div
              className="relative"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              {/* Testimonial Card */}
              <Card className="p-8 border-2 border-primary/20 bg-primary/5 min-h-[280px] flex flex-col justify-between">
                <div>
                  <div className="flex gap-1 mb-4">
                    {[...Array(currentTestimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-lg font-bold text-foreground mb-6 italic">
                    "{currentTestimonial.quote}"
                  </p>
                </div>
                <div>
                  <p className="font-bold text-foreground">{currentTestimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{currentTestimonial.title}</p>
                </div>
              </Card>

              {/* Navigation Arrows */}
              <button
                onClick={goToPrevious}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 sm:-translate-x-16 bg-primary hover:bg-primary/90 text-white rounded-full p-2 transition-all"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={goToNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 sm:translate-x-16 bg-primary hover:bg-primary/90 text-white rounded-full p-2 transition-all"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Dot Indicators */}
              <div className="flex justify-center gap-2 mt-6">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      index === currentTestimonialIndex
                        ? "bg-primary w-8"
                        : "bg-primary/30 hover:bg-primary/50"
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <a href={`tel:${LARRY_INFO.phone}`}>
              <Button className="bg-red-600 hover:bg-red-700 text-white font-bold py-6 px-8 text-lg w-full">
                <Phone className="w-5 h-5 mr-2" />
                Work With Someone You Trust
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Service Area Map Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold text-foreground mb-4 font-display">
              We Serve Oklahoma & Texas
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Licensed to serve Medicare beneficiaries and individuals in all of the metropolitan areas as well as rural communities throughout Oklahoma and Texas. Click on the map to explore your service area.
            </p>
          </div>
          <div className="rounded-xl overflow-hidden shadow-lg border-2 border-primary/20 bg-gradient-to-br from-blue-50 to-blue-100 p-8 h-64 sm:h-80 md:h-96 flex flex-col items-center justify-center">
            <div className="text-center space-y-4">
              <div className="text-5xl">🗺️</div>
              <h3 className="text-2xl font-bold text-primary">Service Coverage</h3>
              <p className="text-muted-foreground max-w-md">We proudly serve all counties and metropolitan areas throughout Oklahoma and Texas.</p>
              <div className="flex gap-6 justify-center pt-4">
                <div className="text-center">
                  <div className="text-4xl mb-2">🏢</div>
                  <p className="font-semibold text-foreground">Oklahoma</p>
                  <p className="text-sm text-muted-foreground">All Counties</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-2">⭐</div>
                  <p className="font-semibold text-foreground">Texas</p>
                  <p className="text-sm text-muted-foreground">All Counties</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6 border-2 border-primary/20">
              <h3 className="text-xl font-bold text-foreground mb-2">Oklahoma</h3>
              <p className="text-muted-foreground mb-4">Serving all counties throughout Oklahoma with personalized Medicare guidance and health insurance solutions.</p>
              <p className="text-sm font-semibold text-primary">Licensed & Insured</p>
            </Card>
            <Card className="p-6 border-2 border-primary/20">
              <h3 className="text-xl font-bold text-foreground mb-2">Texas</h3>
              <p className="text-muted-foreground mb-4">Providing comprehensive Medicare and health insurance services to beneficiaries across Texas.</p>
              <p className="text-sm font-semibold text-primary">Licensed & Insured</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary/80 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-extrabold mb-6 font-display">
            Ready to Find Your Perfect Plan?
          </h2>
          <p className="text-xl text-white/90 mb-10 leading-relaxed">
            Call Larry today for a free, personalized consultation. No obligation, no pressure—just expert guidance tailored to your unique situation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={`tel:${LARRY_INFO.phone}`}>
              <Button className="bg-red-600 hover:bg-red-700 text-white font-bold py-6 px-8 text-lg rounded-lg shadow-lg">
                <Phone className="w-5 h-5 mr-2" />
                {LARRY_INFO.phone}
              </Button>
            </a>
            <Button
              onClick={() => setLocation("/booking")}
              className="bg-white hover:bg-gray-100 text-primary font-bold py-6 px-8 text-lg rounded-lg shadow-lg"
            >
              <Calendar className="w-5 h-5 mr-2" />
              Book Consultation
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
