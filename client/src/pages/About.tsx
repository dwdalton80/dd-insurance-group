import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Phone, Award, Heart, CheckCircle2, Star } from "lucide-react";
import { LARRY_INFO, AD_IMAGES, BRAND_ASSETS } from "@/const";

export default function About() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-primary/80 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-6">
          <h1 className="text-4xl lg:text-5xl font-extrabold font-display">About Larry Dalton</h1>
          <p className="text-lg text-white/90 max-w-2xl leading-relaxed">
            Meet the Medicare expert trusted by thousands across Oklahoma and Texas. With 40+ years of experience, Larry is dedicated to helping you navigate your insurance options with confidence.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            {/* Left: Featured Ad Image */}
            <div className="rounded-xl overflow-hidden shadow-2xl">
              <picture>
                <source
                  media="(min-width: 1024px)"
                  srcSet="/images/about_image_desktop_ff4ee0ab.jpg"
                />
                <source
                  media="(min-width: 640px)"
                  srcSet="/images/about_image_tablet_989195a9.jpg"
                />
                <img
                  src="/images/about_image_mobile_625d6f77.jpg"
                  alt="Larry Dalton - Your Trusted Medicare Insurance Agent"
                  className="w-full h-auto object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </picture>
            </div>

            {/* Right: Bio */}
            <div className="flex flex-col gap-8">
              <div>
                <h2 className="text-4xl font-extrabold text-foreground mb-4 font-display">
                  Larry Dalton
                </h2>
                <p className="text-lg text-primary font-bold mb-6">
                  Medicare Independent Broker & Agent
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  With 40+ years of Medicare expertise, Larry Dalton has dedicated his career to helping individuals, seniors, and small businesses navigate the complex world of health insurance. His mission is simple: provide personalized guidance, clear explanations, and honest advice—no pressure, no sales tactics.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Licensed in Oklahoma and Texas, Larry serves all of the metropolitan areas as well as rural communities in both Oklahoma and Texas with a commitment to local service, trusted guidance, and personal attention.
                </p>
              </div>

              {/* Quick Facts */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                <div>
                  <p className="text-3xl font-extrabold text-primary">40+</p>
                  <p className="text-sm text-muted-foreground font-bold">Years of Experience</p>
                </div>
                <div>
                  <p className="text-3xl font-extrabold text-primary">2</p>
                  <p className="text-sm text-muted-foreground font-bold">States Licensed</p>
                </div>
              </div>

              {/* CTA */}
              <a href={`tel:${LARRY_INFO.phone}`}>
                <Button className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-6 text-lg">
                  <Phone className="w-5 h-5 mr-2" />
                  Call Larry Today
                </Button>
              </a>
            </div>
          </div>

          {/* Why Choose Larry */}
          <div className="mb-20">
            <h2 className="text-4xl font-extrabold text-foreground mb-12 font-display text-center">
              Why Choose Larry?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: Award,
                  title: "40+ Years of Expertise",
                  desc: "Decades of Medicare knowledge and real-world experience helping clients make the right choices.",
                },
                {
                  icon: Heart,
                  title: "Client-Focused Approach",
                  desc: "Your health and financial security come first. No pressure to buy, just honest guidance.",
                },
                {
                  icon: CheckCircle2,
                  title: "Licensed & Compliant",
                  desc: "Licensed in Oklahoma and Texas. All consultations follow CMS Medicare compliance standards.",
                },
                {
                  icon: Star,
                  title: "Recognized Authority",
                  desc: "Featured in Medicare Agents Hub, Top Rated Local Agent, and BBB Accredited Business.",
                },
                {
                  icon: Phone,
                  title: "Local & Accessible",
                  desc: "Serving the Durant, Oklahoma area and surrounding communities. Phone, video, or in-person.",
                },
                {
                  icon: Heart,
                  title: "Your Advocate",
                  desc: "We work for you, not insurance companies. Free consultations and ongoing support.",
                },
              ].map((item, idx) => (
                <Card key={idx} className="p-8 border-2 border-border hover:border-primary/50 hover:shadow-lg transition-all">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </Card>
              ))}
            </div>
          </div>


          {/* Credentials & Recognition */}
          <div className="mb-20">
            <h2 className="text-4xl font-extrabold text-foreground mb-12 font-display text-center">
              Credentials & Recognition
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="p-8 border-2 border-primary/20 bg-primary/5">
                <h3 className="text-xl font-bold text-foreground mb-4">Professional Credentials</h3>
                <ul className="space-y-3">
                  <li className="flex gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">Medicare Independent Broker & Agent</span>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">Licensed in Oklahoma & Texas</span>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">NPN: {LARRY_INFO.npi}</span>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">CMS Medicare Compliant</span>
                  </li>
                </ul>
              </Card>

              <Card className="p-8 border-2 border-primary/20 bg-primary/5">
                <h3 className="text-xl font-bold text-foreground mb-4">Recognition & Trust Badges</h3>
                <ul className="space-y-3">
                  <li className="flex gap-3">
                    <Star className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">Medicare Agents Hub</span>
                  </li>
                  <li className="flex gap-3">
                    <Star className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">Top Rated Local Medicare Agent</span>
                  </li>
                  <li className="flex gap-3">
                    <Star className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">Verified Local Medicare Agent</span>
                  </li>
                  <li className="flex gap-3">
                    <Star className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">BBB Accredited Business</span>
                  </li>
                </ul>
              </Card>
            </div>
          </div>


          {/* Service Areas */}
          <div className="mb-20">
            <h2 className="text-3xl font-extrabold text-foreground mb-8 font-display">Service Areas</h2>
            <Card className="p-8 border-2 border-primary/20 bg-gradient-to-r from-primary/5 to-red-50">
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Larry serves individuals, seniors, and small businesses in all of the metropolitan areas as well as rural communities throughout Oklahoma and Texas. Whether you're in a major city or a small rural community, Larry is available for phone, video, or in-person consultations.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-foreground mb-3">Oklahoma</h4>
                  <p className="text-sm text-muted-foreground">
                    Serving Durant and surrounding communities with personalized Medicare and health insurance guidance.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-foreground mb-3">Texas</h4>
                  <p className="text-sm text-muted-foreground">
                    Helping North Texas residents navigate Medicare, health, dental, and group insurance options.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary/80 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-extrabold mb-6 font-display">Ready to Work with Larry?</h2>
          <p className="text-xl text-white/90 mb-10 leading-relaxed">
            Schedule your free consultation today. No obligation, no pressure—just expert guidance from someone who cares about your health and financial security.
          </p>
          <a href={`tel:${LARRY_INFO.phone}`}>
            <Button className="bg-red-600 hover:bg-red-700 text-white font-bold py-6 px-8 text-lg rounded-lg shadow-lg">
              <Phone className="w-5 h-5 mr-2" />
              Call Larry: {LARRY_INFO.phone}
            </Button>
          </a>
        </div>
      </section>
    </div>
  );
}
