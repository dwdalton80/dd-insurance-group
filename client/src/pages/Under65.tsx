import React from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2, Phone, Calendar, Users, Heart, Zap } from "lucide-react";
import { LARRY_INFO } from "@/const";

export default function Under65() {
  return (
    <div className="w-full">
      <section className="py-16 bg-gradient-to-r from-primary to-primary/80 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <Users className="w-8 h-8" />
            <h1 className="text-4xl lg:text-5xl font-extrabold font-display">Health Insurance for Under-65</h1>
          </div>
          <p className="text-lg text-white/90 max-w-2xl leading-relaxed">
            Individual, family, and marketplace coverage. We compare ACA plans, short-term medical, and other options to find affordable coverage that fits your health needs and budget.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <a href={`tel:${LARRY_INFO.phone}`}>
              <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-bold py-6 px-8 flex items-center gap-2 w-full sm:w-auto justify-center">
                <Phone className="w-5 h-5 fill-secondary-foreground" />
                <span>Get Free Quote</span>
              </Button>
            </a>
            <Link href="/booking?insuranceType=individual">
              <Button variant="outline" className="border-2 border-white text-white hover:bg-white/10 font-bold py-6 px-8 flex items-center gap-2 w-full sm:w-auto justify-center">
                <Calendar className="w-5 h-5" />
                <span>Schedule Consultation</span>
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div className="flex flex-col gap-6">
              <h2 className="text-3xl font-bold text-foreground font-display">Coverage Options for Under-65</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you're under 65 and don't have employer coverage, you have several options. We help you compare them all.
              </p>

              <div className="space-y-4">
                <div className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary fill-primary/20 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-foreground">ACA Marketplace Plans</p>
                    <p className="text-sm text-muted-foreground mt-1">Individual and family plans with subsidies based on income.</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary fill-primary/20 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-foreground">Short-Term Medical</p>
                    <p className="text-sm text-muted-foreground mt-1">Temporary coverage for gaps or transitions (up to 12 months).</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary fill-primary/20 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-foreground">Standalone Dental & Vision</p>
                    <p className="text-sm text-muted-foreground mt-1">Affordable coverage for teeth and eye care.</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary fill-primary/20 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-foreground">Catastrophic Plans</p>
                    <p className="text-sm text-muted-foreground mt-1">Low-premium coverage for major medical events (if under 30).</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-6 bg-muted/30 p-8 rounded-xl border border-border">
              <h3 className="text-2xl font-bold text-foreground font-display">Why Work With Larry?</h3>
              
              <div className="space-y-4">
                <div className="flex gap-3">
                  <Zap className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-foreground text-sm">Plan Comparison</p>
                    <p className="text-xs text-muted-foreground mt-1">We compare premiums, deductibles, and coverage side-by-side.</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Zap className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-foreground text-sm">Subsidy Optimization</p>
                    <p className="text-xs text-muted-foreground mt-1">We help you understand and maximize available tax credits.</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Zap className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-foreground text-sm">Enrollment Support</p>
                    <p className="text-xs text-muted-foreground mt-1">We guide you through the enrollment process step-by-step.</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Zap className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-foreground text-sm">Ongoing Support</p>
                    <p className="text-xs text-muted-foreground mt-1">Questions during the year? We're here to help.</p>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-border">
                <a href={`tel:${LARRY_INFO.phone}`}>
                  <Button className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-6 flex items-center justify-center gap-2">
                    <Phone className="w-5 h-5" />
                    <span>Get Your Free Quote</span>
                  </Button>
                </a>
              </div>
            </div>
          </div>

          {/* Dental & Vision Section */}
          <div id="dental-vision" className="pt-12 border-t border-border">
            <h2 className="text-3xl font-bold text-foreground mb-8 font-display">Dental & Vision Coverage</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="p-8 border-2 border-border hover:shadow-lg transition-snappy">
                <div className="flex items-center gap-3 mb-4">
                  <Heart className="w-6 h-6 text-primary" />
                  <h3 className="text-xl font-bold text-foreground font-display">Dental Plans</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Affordable coverage for cleanings, exams, fillings, crowns, and more. Standalone or bundled with health insurance.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground mb-6">
                  <li className="flex gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>Preventive care covered at 100%</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>Affordable monthly premiums</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>Large network of dentists</span>
                  </li>
                </ul>
                <a href={`tel:${LARRY_INFO.phone}`}>
                  <Button variant="outline" className="w-full border-primary/30 text-primary hover:bg-primary/5 font-bold">
                    Learn More
                  </Button>
                </a>
              </Card>

              <Card className="p-8 border-2 border-border hover:shadow-lg transition-snappy">
                <div className="flex items-center gap-3 mb-4">
                  <Heart className="w-6 h-6 text-secondary" />
                  <h3 className="text-xl font-bold text-foreground font-display">Vision Plans</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Coverage for eye exams, glasses, contacts, and more. Keep your vision healthy and affordable.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground mb-6">
                  <li className="flex gap-2">
                    <CheckCircle2 className="w-4 h-4 text-secondary flex-shrink-0 mt-0.5" />
                    <span>Annual eye exams covered</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle2 className="w-4 h-4 text-secondary flex-shrink-0 mt-0.5" />
                    <span>Discounts on glasses & contacts</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle2 className="w-4 h-4 text-secondary flex-shrink-0 mt-0.5" />
                    <span>Affordable monthly premiums</span>
                  </li>
                </ul>
                <a href={`tel:${LARRY_INFO.phone}`}>
                  <Button variant="outline" className="w-full border-secondary/30 text-secondary hover:bg-secondary/5 font-bold">
                    Learn More
                  </Button>
                </a>
              </Card>
            </div>
          </div>

          {/* Short-Term Medical Section */}
          <div id="short-term" className="pt-12 border-t border-border">
            <h2 className="text-3xl font-bold text-foreground mb-8 font-display">Short-Term Medical Plans</h2>
            <Card className="p-8 border-2 border-border bg-muted/30">
              <p className="text-muted-foreground leading-relaxed mb-6">
                Short-term medical plans provide temporary health coverage for gaps between jobs, waiting periods, or transitions. Coverage is typically available for 3, 6, or 12 months.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary fill-primary/20 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-foreground text-sm">Affordable Premiums</p>
                    <p className="text-xs text-muted-foreground mt-1">Lower cost than ACA plans for temporary coverage.</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary fill-primary/20 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-foreground text-sm">Quick Enrollment</p>
                    <p className="text-xs text-muted-foreground mt-1">Coverage can start as soon as the next day.</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary fill-primary/20 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-foreground text-sm">Flexible Terms</p>
                    <p className="text-xs text-muted-foreground mt-1">Choose 3, 6, or 12-month coverage periods.</p>
                  </div>
                </div>
              </div>
              <p className="text-sm text-secondary font-bold mt-6">
                ⚠️ Note: Short-term plans don't cover pre-existing conditions and are not considered "qualifying coverage" for ACA purposes.
              </p>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col gap-6">
          <h2 className="text-3xl lg:text-4xl font-extrabold font-display">
            Need Affordable Coverage?
          </h2>
          <p className="text-lg text-white/90 leading-relaxed">
            Let Larry help you find the right plan at the right price. Free consultation, no obligation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <a href={`tel:${LARRY_INFO.phone}`}>
              <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-bold py-6 px-8 flex items-center gap-2 w-full sm:w-auto justify-center">
                <Phone className="w-5 h-5 fill-secondary-foreground" />
                <span>Call for Quote</span>
              </Button>
            </a>
            <Link href="/booking?insuranceType=individual">
              <Button variant="outline" className="border-2 border-white text-white hover:bg-white/10 font-bold py-6 px-8 flex items-center gap-2 w-full sm:w-auto justify-center">
                <Calendar className="w-5 h-5" />
                <span>Book Consultation</span>
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
