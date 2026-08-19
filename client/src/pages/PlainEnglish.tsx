import React, { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BookOpen, CheckCircle2, HelpCircle, ArrowRight, Phone, Calendar } from "lucide-react";
import { LARRY_INFO } from "@/const";

export default function PlainEnglish() {
  const [expandedGuide, setExpandedGuide] = useState<string | null>(null);

  const guides = [
    {
      id: "how-medicare-works",
      title: "How Medicare Works: The Basics",
      shortDesc: "A simple overview of what Medicare is and why it matters.",
      fullContent: `Medicare is a federal health insurance program for people age 65 and older, some younger people with disabilities, and people with End-Stage Renal Disease (ESRD). It's divided into four parts:

**Part A (Hospital Insurance):** Covers inpatient hospital stays, skilled nursing facility care, hospice, and home health services.

**Part B (Medical Insurance):** Covers doctor visits, outpatient care, preventive services, medical equipment, and supplies.

**Part C (Medicare Advantage):** An alternative way to get Parts A and B through a private insurance company, often with added benefits like dental, vision, and hearing.

**Part D (Prescription Drug Coverage):** Covers prescription medications through a private plan.

Most people become eligible for Medicare when they turn 65. If you're already receiving Social Security benefits, you'll be automatically enrolled in Parts A and B. If you're not receiving Social Security, you'll need to sign up manually.

**Key Point:** You have choices. You can stick with Original Medicare (Parts A & B) and add a Medigap supplement, or you can switch to Medicare Advantage (Part C). The choice depends on your health needs, budget, and preferences.`
    },
    {
      id: "part-a",
      title: "Medicare Part A Explained",
      shortDesc: "Hospital insurance and what it covers.",
      fullContent: `Medicare Part A is hospital insurance. It covers:

- **Inpatient hospital stays:** Room, meals, nursing care, and hospital services
- **Skilled nursing facility care:** Up to 100 days per benefit period (after a qualifying hospital stay)
- **Hospice care:** For people with terminal illnesses
- **Home health services:** Part-time skilled nursing and therapy services

**What Part A Does NOT Cover:**
- Custodial care (help with daily activities like bathing or dressing)
- Long-term care in a nursing home
- Prescription drugs (covered by Part D)

**Cost:** Most people don't pay a premium for Part A if they or their spouse paid Medicare taxes while working. However, there are deductibles and coinsurance amounts you may owe.

**Deductible:** For 2024, the Part A deductible is $1,632 per benefit period for hospital stays.

**Important:** If you don't enroll in Part A when you're first eligible, you may face late-enrollment penalties.`
    },
    {
      id: "part-b",
      title: "Medicare Part B Explained",
      shortDesc: "Medical insurance for doctor visits and outpatient care.",
      fullContent: `Medicare Part B is medical insurance. It covers:

- **Doctor visits:** Primary care, specialists, and consultations
- **Outpatient care:** Emergency room visits, urgent care, and outpatient surgery
- **Preventive services:** Annual wellness visits, cancer screenings, and vaccinations (usually at no cost)
- **Medical equipment:** Wheelchairs, walkers, oxygen, and other durable medical equipment
- **Mental health services:** Therapy and psychiatric care
- **Rehabilitation services:** Physical therapy and occupational therapy

**What Part B Does NOT Cover:**
- Routine dental care, dentures, or dental implants
- Routine eye exams or eyeglasses
- Hearing aids or routine hearing exams
- Prescription drugs (covered by Part D)
- Long-term care

**Cost:** For 2024, the standard Part B premium is $164.90 per month (higher if your income is above certain thresholds). There's also a deductible ($240 for 2024) and coinsurance (typically 20% of approved charges).

**Enrollment:** Unlike Part A, you must actively enroll in Part B during your Initial Enrollment Period. If you delay, you may face late-enrollment penalties.`
    },
    {
      id: "part-c-advantage",
      title: "Medicare Part C (Medicare Advantage) Explained",
      shortDesc: "An alternative way to get Medicare through a private insurance company.",
      fullContent: `Medicare Advantage (Part C) is an alternative way to get your Medicare benefits. Instead of Original Medicare (Parts A & B), you can enroll in a Medicare Advantage plan offered by a private insurance company.

**How It Works:**
A Medicare Advantage plan bundles Parts A, B, and usually D (prescription drug coverage) into one plan. The insurance company is responsible for providing all your Medicare benefits.

**Advantages:**
- **All-in-one coverage:** Parts A, B, and often D in one plan
- **Extra benefits:** Many plans include dental, vision, hearing, fitness programs, and wellness services
- **Lower premiums:** Often $0 monthly premium (though you still pay your Part B premium to Medicare)
- **Predictable costs:** Maximum out-of-pocket limits protect you from catastrophic expenses

**Disadvantages:**
- **Network restrictions:** You must use in-network doctors and hospitals (except emergencies)
- **Referrals:** Some plans require referrals to see specialists
- **Prior authorization:** Some services may require approval before you receive them
- **Travel limitations:** Coverage may be limited outside your plan's service area

**Best For:** People who prefer lower premiums, want extra benefits, and are comfortable with network restrictions.

**Important:** You can only enroll in Medicare Advantage during your Initial Enrollment Period or during the Annual Enrollment Period (October 15 - December 7).`
    },
    {
      id: "part-d",
      title: "Medicare Part D Explained",
      shortDesc: "Prescription drug coverage and why it matters.",
      fullContent: `Medicare Part D is prescription drug coverage. It covers medications prescribed by your doctor.

**How It Works:**
Part D is offered by private insurance companies. You enroll in a specific plan, and the plan covers your prescription drugs based on the plan's formulary (list of covered drugs).

**Coverage Stages:**
1. **Deductible:** You pay the full cost of drugs until you reach your plan's deductible (typically $200-$500)
2. **Initial Coverage:** You pay a copay or coinsurance; the plan pays the rest
3. **Coverage Gap (Donut Hole):** You pay more out-of-pocket (though discounts apply)
4. **Catastrophic Coverage:** After you spend a certain amount, the plan covers most costs

**Why It Matters:**
If you don't enroll in Part D when you're first eligible, you may face late-enrollment penalties of about 1% per month for every month you delay. These penalties are permanent.

**Cost:** Premiums vary by plan (typically $10-$100+ per month). You also pay copays or coinsurance for each prescription.

**Enrollment:** You can enroll in Part D during your Initial Enrollment Period or during the Annual Enrollment Period. You can also switch plans during the Annual Enrollment Period if your current plan doesn't meet your needs.

**Pro Tip:** Review your Part D plan every year during the Annual Enrollment Period. Your medications, plan formularies, and costs change annually.`
    },
    {
      id: "medigap",
      title: "Medigap (Supplement Insurance) Explained",
      shortDesc: "How to fill the gaps in Original Medicare coverage.",
      fullContent: `Medigap (also called Medi-Gap or Supplement Insurance) is private insurance that helps cover costs that Original Medicare doesn't—like copays, coinsurance, and deductibles.

**How It Works:**
You enroll in Original Medicare (Parts A & B), and you also purchase a Medigap policy from a private insurance company. Medigap helps pay your out-of-pocket costs.

**What Medigap Covers:**
- Part A coinsurance and hospital costs
- Part B coinsurance and copays
- Part B excess charges (in some plans)
- Blood transfusions
- Skilled nursing facility coinsurance

**What Medigap Does NOT Cover:**
- Prescription drugs (you need Part D for that)
- Dental, vision, or hearing care
- Long-term care
- Routine physical exams

**Medigap Plans:**
There are 10 standardized Medigap plans (A, B, C, D, F, G, K, L, M, N). Each plan covers a different combination of costs. Plan G is currently the most popular.

**Cost:** Medigap premiums vary by plan and insurance company (typically $100-$300+ per month).

**Important:** You cannot use Medigap if you have Medicare Advantage. Medigap is only for Original Medicare beneficiaries.

**Enrollment:** You have the best rates if you enroll in Medigap within 6 months of turning 65 and enrolling in Part B. After that, insurance companies can charge more based on your health.`
    },
    {
      id: "enrollment-periods",
      title: "Medicare Enrollment Periods: Don't Miss Your Deadline",
      shortDesc: "When you can enroll in Medicare and what happens if you miss deadlines.",
      fullContent: `Timing is critical when it comes to Medicare enrollment. Missing deadlines can result in permanent penalties.

**Initial Enrollment Period (IEP):**
This is your first chance to enroll in Medicare. It starts 3 months before the month you turn 65 and ends 3 months after. That's a 7-month window.

Example: If you turn 65 in June, your IEP runs from March through September.

**What Happens If You Miss Your IEP:**
- Late-enrollment penalties on your premiums (about 10% per month for Part B and Part D)
- These penalties are permanent—you'll pay them for as long as you have Medicare
- You'll have to wait until the next Annual Enrollment Period to enroll

**Annual Enrollment Period (AEP):**
Every year from October 15 to December 7, you can:
- Change your Medicare Advantage plan
- Switch from Medicare Advantage to Original Medicare
- Switch from Original Medicare to Medicare Advantage
- Change your Part D plan
- Enroll in or change your Medigap plan

Changes take effect January 1 of the following year.

**Special Enrollment Period (SEP):**
If you experience a qualifying life event, you may be eligible to enroll outside normal windows. Qualifying events include:
- Loss of employer or union coverage
- Relocation to a new area
- Marriage or divorce
- Death of a spouse
- Becoming a U.S. citizen

**Pro Tip:** Mark your calendar. Set a reminder 3 months before you turn 65 to start researching your options. Don't wait until the last minute.`
    },
    {
      id: "common-questions",
      title: "Common Medicare Questions Answered",
      shortDesc: "Answers to the questions people ask most often.",
      fullContent: `**Q: Do I have to enroll in Medicare at 65?**
A: If you're receiving Social Security benefits, you're automatically enrolled in Parts A and B. If you're not receiving Social Security, you should enroll manually to avoid penalties.

**Q: Can I keep working and delay Medicare?**
A: If you're still working and have employer coverage, you may be able to delay Part B enrollment without penalty (through a process called creditable coverage). However, you should still enroll in Part A to avoid penalties.

**Q: What if I move to a different state?**
A: You can change your Medicare plan during the Annual Enrollment Period or if you move to a new area (which may qualify as a Special Enrollment Period).

**Q: Can I change my Medicare plan after I enroll?**
A: Yes, during the Annual Enrollment Period (October 15 - December 7) or if you experience a qualifying life event.

**Q: What's the difference between Medicare and Medicaid?**
A: Medicare is a federal program for people 65+. Medicaid is a state program for low-income individuals and families. They're completely different programs.

**Q: Do I need both Original Medicare and Medicare Advantage?**
A: No. You choose one or the other. You can't have both at the same time.

**Q: What if I can't afford Medicare?**
A: There are programs to help. Talk to Larry about Medicare Savings Programs, Extra Help with Part D, and other assistance options.

**Q: How do I know which plan is right for me?**
A: Consider your health needs, preferred doctors, medications, and budget. A personalized consultation with an agent like Larry can help you compare options and make the best choice.`
    }
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-secondary to-secondary/80 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <BookOpen className="w-8 h-8" />
            <h1 className="text-4xl lg:text-5xl font-extrabold font-display">Medicare in Plain English</h1>
          </div>
          <p className="text-lg text-white/90 max-w-2xl leading-relaxed">
            Medicare can feel overwhelming, but the basics don't have to be complicated. This free educational hub explains all the parts, enrollment periods, and common questions in plain language you can understand.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <a href={`tel:${LARRY_INFO.phone}`}>
              <Button className="bg-white text-secondary hover:bg-white/90 font-bold py-6 px-8 flex items-center gap-2 w-full sm:w-auto justify-center">
                <Phone className="w-5 h-5" />
                <span>Call for Personalized Help</span>
              </Button>
            </a>
            <Link href="/booking">
              <Button variant="outline" className="border-2 border-white text-white hover:bg-white/10 font-bold py-6 px-8 flex items-center gap-2 w-full sm:w-auto justify-center">
                <Calendar className="w-5 h-5" />
                <span>Book Free Consultation</span>
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Guides Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl lg:text-4xl font-extrabold text-foreground mb-4 font-display">
              Educational Guides
            </h2>
            <p className="text-lg text-muted-foreground">
              Click on any guide below to expand it and learn more. All guides are written in plain language without jargon.
            </p>
          </div>

          <div className="space-y-4">
            {guides.map((guide) => (
              <Card 
                key={guide.id}
                className="border-2 border-border hover:border-primary/50 transition-snappy cursor-pointer overflow-hidden"
                onClick={() => setExpandedGuide(expandedGuide === guide.id ? null : guide.id)}
              >
                <div className="p-6 flex items-start gap-4 hover:bg-muted/20 transition-colors">
                  <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <BookOpen className="w-6 h-6 text-secondary" />
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-xl font-bold text-foreground font-display">{guide.title}</h3>
                    <p className="text-muted-foreground mt-1">{guide.shortDesc}</p>
                  </div>
                  <div className="w-6 h-6 text-secondary flex-shrink-0 mt-1 transition-transform duration-300" style={{
                    transform: expandedGuide === guide.id ? 'rotate(180deg)' : 'rotate(0deg)'
                  }}>
                    <ArrowRight className="w-full h-full" />
                  </div>
                </div>

                {expandedGuide === guide.id && (
                  <div className="px-6 pb-6 border-t border-border bg-muted/10 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="prose prose-sm max-w-none text-muted-foreground leading-relaxed whitespace-pre-wrap">
                      {guide.fullContent}
                    </div>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-extrabold text-foreground mb-4 font-display">
              Still Have Questions?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              These guides cover the fundamentals, but everyone's situation is unique. Larry is here to answer your specific questions and help you make the right choice.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-8 border-2 border-border hover:shadow-lg transition-snappy">
              <div className="flex items-center gap-3 mb-4">
                <HelpCircle className="w-6 h-6 text-primary" />
                <h3 className="text-xl font-bold text-foreground font-display">Personalized Consultation</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Book a free call with Larry. We'll discuss your health, medications, budget, and preferred doctors to find the best plan for you.
              </p>
              <Link href="/booking">
                <Button className="w-full bg-primary hover:bg-primary/90 text-white font-bold">
                  Schedule Consultation
                </Button>
              </Link>
            </Card>

            <Card className="p-8 border-2 border-border hover:shadow-lg transition-snappy">
              <div className="flex items-center gap-3 mb-4">
                <Phone className="w-6 h-6 text-primary" />
                <h3 className="text-xl font-bold text-foreground font-display">Call Larry Directly</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Have a quick question? Call or text Larry anytime. No question is too small, and there's never any pressure to buy.
              </p>
              <a href={`tel:${LARRY_INFO.phone}`}>
                <Button className="w-full bg-primary hover:bg-primary/90 text-white font-bold">
                  {LARRY_INFO.phone}
                </Button>
              </a>
            </Card>
          </div>
        </div>
      </section>

      {/* Resource Links */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-extrabold text-foreground mb-4 font-display">
              Official Medicare Resources
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              These official government resources provide authoritative information about Medicare.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <a href="https://www.medicare.gov" target="_blank" rel="noopener noreferrer" className="group">
              <Card className="p-8 border-2 border-border hover:border-primary/50 hover:shadow-lg transition-snappy h-full">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                    <BookOpen className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-lg font-bold text-foreground font-display group-hover:text-primary transition-colors">Medicare.gov</h3>
                    <p className="text-sm text-muted-foreground mt-2">
                      The official Medicare website. Find plans, compare options, and enroll online.
                    </p>
                    <div className="flex items-center gap-2 text-primary font-bold mt-4 group-hover:gap-3 transition-all">
                      <span className="text-sm">Visit Site</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </Card>
            </a>

            <a href="tel:1-800-MEDICARE" className="group">
              <Card className="p-8 border-2 border-border hover:border-primary/50 hover:shadow-lg transition-snappy h-full">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-lg font-bold text-foreground font-display group-hover:text-primary transition-colors">1-800-MEDICARE</h3>
                    <p className="text-sm text-muted-foreground mt-2">
                      Call the official Medicare helpline. Available 24/7, 7 days a week. TTY: 1-877-486-2048.
                    </p>
                    <div className="flex items-center gap-2 text-primary font-bold mt-4 group-hover:gap-3 transition-all">
                      <span className="text-sm">Call Now</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </Card>
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col gap-6">
          <h2 className="text-3xl lg:text-4xl font-extrabold font-display">
            Ready for Expert Guidance?
          </h2>
          <p className="text-lg text-white/90 leading-relaxed">
            Understanding Medicare is the first step. The next step is finding the right plan for your unique situation. Let Larry help you navigate your options.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <a href={`tel:${LARRY_INFO.phone}`}>
              <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-bold py-6 px-8 flex items-center gap-2 w-full sm:w-auto justify-center">
                <Phone className="w-5 h-5 fill-secondary-foreground" />
                <span>Call Larry</span>
              </Button>
            </a>
            <Link href="/booking">
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
