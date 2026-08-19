import React from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2, Phone, Calendar, Briefcase, Users, TrendingUp } from "lucide-react";
import { LARRY_INFO } from "@/const";

export default function Group() {
  return (
    <div className="w-full">
      <section className="py-16 bg-gradient-to-r from-primary to-primary/80 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <Briefcase className="w-8 h-8" />
            <h1 className="text-4xl lg:text-5xl font-extrabold font-display">Group & Small Business Health Insurance</h1>
          </div>
          <p className="text-lg text-white/90 max-w-2xl leading-relaxed">
            Attract and retain talent with competitive group health, dental, and vision benefits. We help small businesses and organizations find affordable coverage that employees love.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <a href={`tel:${LARRY_INFO.phone}`}>
              <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-bold py-6 px-8 flex items-center gap-2 w-full sm:w-auto justify-center">
                <Phone className="w-5 h-5 fill-secondary-foreground" />
                <span>Get Free Group Quote</span>
              </Button>
            </a>
            <Link href="/booking?insuranceType=group">
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
              <h2 className="text-3xl font-bold text-foreground font-display">Why Offer Group Benefits?</h2>
              <p className="text-muted-foreground leading-relaxed">
                In today's competitive job market, offering health benefits is essential. Employees expect it, and it directly impacts recruitment, retention, and productivity.
              </p>

              <div className="space-y-4">
                <div className="flex gap-3">
                  <TrendingUp className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-foreground">Attract Top Talent</p>
                    <p className="text-sm text-muted-foreground mt-1">Competitive benefits packages make your business more attractive to job seekers.</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <TrendingUp className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-foreground">Reduce Turnover</p>
                    <p className="text-sm text-muted-foreground mt-1">Employees with health coverage are more likely to stay with your company.</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <TrendingUp className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-foreground">Improve Productivity</p>
                    <p className="text-sm text-muted-foreground mt-1">Healthier, less stressed employees are more productive and engaged.</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <TrendingUp className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-foreground">Tax Advantages</p>
                    <p className="text-sm text-muted-foreground mt-1">Group health insurance premiums are often tax-deductible for your business.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-6 bg-muted/30 p-8 rounded-xl border border-border">
              <h3 className="text-2xl font-bold text-foreground font-display">What We Offer</h3>
              
              <div className="space-y-4">
                <div className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-secondary fill-secondary/20 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-foreground text-sm">Plan Comparison</p>
                    <p className="text-xs text-muted-foreground mt-1">We compare plans from multiple carriers to find the best value.</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-secondary fill-secondary/20 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-foreground text-sm">Cost Control</p>
                    <p className="text-xs text-muted-foreground mt-1">We help you manage costs while maintaining quality coverage.</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-secondary fill-secondary/20 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-foreground text-sm">Enrollment Support</p>
                    <p className="text-xs text-muted-foreground mt-1">We handle the paperwork and guide your employees through enrollment.</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-secondary fill-secondary/20 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-foreground text-sm">Ongoing Administration</p>
                    <p className="text-xs text-muted-foreground mt-1">We handle renewals, changes, and employee questions year-round.</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-secondary fill-secondary/20 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-foreground text-sm">Compliance Expertise</p>
                    <p className="text-xs text-muted-foreground mt-1">We stay current on ACA requirements and other regulations.</p>
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

          {/* Coverage Options */}
          <div className="pt-12 border-t border-border">
            <h2 className="text-3xl font-bold text-foreground mb-8 font-display">Coverage Options</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="p-8 border-2 border-border hover:shadow-lg transition-snappy">
                <h3 className="text-xl font-bold text-foreground mb-4 font-display">Medical Insurance</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Comprehensive health coverage for your employees and their families. Multiple plan options to fit different budgets.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>HMO, PPO, and HDHP options</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>Preventive care at no cost</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>Competitive rates</span>
                  </li>
                </ul>
              </Card>

              <Card className="p-8 border-2 border-border hover:shadow-lg transition-snappy">
                <h3 className="text-xl font-bold text-foreground mb-4 font-display">Dental & Vision</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Standalone or bundled dental and vision coverage to complement your medical plan.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>Dental cleanings & exams</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>Vision exams & glasses</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>Affordable premiums</span>
                  </li>
                </ul>
              </Card>

              <Card className="p-8 border-2 border-border hover:shadow-lg transition-snappy">
                <h3 className="text-xl font-bold text-foreground mb-4 font-display">Voluntary Benefits</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Additional coverage options employees can choose to enhance their benefits package.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>Life insurance</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>Disability coverage</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>Accident & critical illness</span>
                  </li>
                </ul>
              </Card>
            </div>
          </div>

          {/* Group Size Info */}
          <div className="mt-16 pt-12 border-t border-border">
            <h2 className="text-3xl font-bold text-foreground mb-8 font-display">Group Size Requirements</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="p-8 border-2 border-border bg-muted/30">
                <h3 className="text-xl font-bold text-foreground mb-4 font-display">Small Group (2-50 Employees)</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Most small businesses qualify for small group health insurance. We work with carriers that specialize in this market.
                </p>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <p><strong>Typical Requirements:</strong></p>
                  <ul className="space-y-2">
                    <li className="flex gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>2 or more employees</span>
                    </li>
                    <li className="flex gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>Employer contribution required</span>
                    </li>
                    <li className="flex gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>Minimum participation rates</span>
                    </li>
                  </ul>
                </div>
              </Card>

              <Card className="p-8 border-2 border-border bg-muted/30">
                <h3 className="text-xl font-bold text-foreground mb-4 font-display">Large Group (51+ Employees)</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Larger organizations have access to more plan options and potentially better rates.
                </p>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <p><strong>Typical Features:</strong></p>
                  <ul className="space-y-2">
                    <li className="flex gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>More plan choices</span>
                    </li>
                    <li className="flex gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>Potential for better rates</span>
                    </li>
                    <li className="flex gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>Self-funding options</span>
                    </li>
                  </ul>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col gap-6">
          <h2 className="text-3xl lg:text-4xl font-extrabold font-display">
            Ready to Offer Better Benefits?
          </h2>
          <p className="text-lg text-white/90 leading-relaxed">
            Let Larry help you find the right group health plan for your business. Free consultation with no obligation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <a href={`tel:${LARRY_INFO.phone}`}>
              <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-bold py-6 px-8 flex items-center gap-2 w-full sm:w-auto justify-center">
                <Phone className="w-5 h-5 fill-secondary-foreground" />
                <span>Call for Group Quote</span>
              </Button>
            </a>
            <Link href="/booking?insuranceType=group">
              <Button variant="outline" className="border-2 border-white text-white hover:bg-white/10 font-bold py-6 px-8 flex items-center gap-2 w-full sm:w-auto justify-center">
                <Calendar className="w-5 h-5" />
                <span>Schedule Consultation</span>
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
