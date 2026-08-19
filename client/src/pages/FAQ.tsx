import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  category: string;
  questions: {
    question: string;
    answer: string;
  }[];
}

const faqData: FAQItem[] = [
  {
    category: "Medicare Basics",
    questions: [
      {
        question: "What are Medicare Parts A, B, C, and D?",
        answer:
          "Medicare Part A covers hospital insurance (inpatient hospital stays, skilled nursing, hospice). Part B covers medical insurance (doctor visits, outpatient services, preventive care). Part C (Medicare Advantage) is an alternative to Original Medicare that includes Parts A, B, and usually D through private insurers. Part D covers prescription drugs.",
      },
      {
        question: "When am I eligible for Medicare?",
        answer:
          "You're eligible for Medicare at age 65. You may also qualify earlier if you have a disability, end-stage renal disease, or ALS. It's important to enroll during your Initial Enrollment Period (IEP) to avoid penalties.",
      },
      {
        question: "What's the difference between Original Medicare and Medicare Advantage?",
        answer:
          "Original Medicare (Parts A & B) is administered by the federal government. Medicare Advantage (Part C) is offered by private insurance companies and typically includes prescription drug coverage. Advantage plans often have lower premiums but may have network restrictions and higher out-of-pocket costs.",
      },
      {
        question: "Do I need a Medigap (Supplement) plan?",
        answer:
          "Medigap plans help cover costs that Original Medicare doesn't pay (deductibles, copayments, coinsurance). They're optional but can help reduce your out-of-pocket expenses. Medicare Advantage plans don't work with Medigap.",
      },
    ],
  },
  {
    category: "Enrollment & Deadlines",
    questions: [
      {
        question: "What is the Initial Enrollment Period (IEP)?",
        answer:
          "Your IEP is a 7-month period that starts 3 months before the month you turn 65, includes the month you turn 65, and ends 3 months after. You should enroll during this period to avoid late enrollment penalties.",
      },
      {
        question: "What is the Annual Enrollment Period (AEP)?",
        answer:
          "AEP runs from October 15 to December 7 each year. During this time, you can change your Medicare coverage for the following year. Changes take effect January 1.",
      },
      {
        question: "What happens if I miss my enrollment deadline?",
        answer:
          "Missing your enrollment deadline can result in permanent late enrollment penalties added to your premiums for life. Part B penalties are 10% per year of delayed enrollment. Part D penalties are 1% per month of delayed enrollment.",
      },
      {
        question: "Can I enroll in Medicare if I'm still working?",
        answer:
          "Yes, but it depends on your employer's coverage. If your employer has 20+ employees, you may be able to delay Part B enrollment. However, you should still enroll in Part A at 65 to avoid penalties. Consult with an agent to understand your specific situation.",
      },
    ],
  },
  {
    category: "Medicare Penalties",
    questions: [
      {
        question: "What are Medicare late enrollment penalties?",
        answer:
          "If you don't enroll in Part B when first eligible, you'll pay a permanent 10% penalty on your Part B premium for each year you were eligible but didn't enroll. For Part D, the penalty is 1% of the national average premium per month of delay.",
      },
      {
        question: "Are there exceptions to late enrollment penalties?",
        answer:
          "Yes. If you have creditable coverage (employer or union coverage) when you first become eligible, you may be able to delay enrollment without penalties. You must enroll within 63 days of losing coverage.",
      },
      {
        question: "Can penalties be waived or removed?",
        answer:
          "Penalties are generally permanent and cannot be waived. However, if you had a valid reason for late enrollment (such as not being informed), you may appeal to Medicare. It's best to enroll on time to avoid this situation entirely.",
      },
    ],
  },
  {
    category: "Plan Comparisons",
    questions: [
      {
        question: "How do I compare Medicare plans?",
        answer:
          "You can compare plans on Medicare.gov, or work with a licensed agent like Larry Dalton who can review your specific needs, medications, and preferred doctors to find the best plan for you. We compare costs, coverage, and networks to help you make an informed decision.",
      },
      {
        question: "What should I consider when choosing a Medicare plan?",
        answer:
          "Consider your doctors and hospitals (in-network vs. out-of-network), prescription medications, out-of-pocket costs, premiums, deductibles, and copayments. Also think about your health status and anticipated medical needs for the year.",
      },
      {
        question: "Can I switch Medicare plans?",
        answer:
          "Yes, you can change plans during the Annual Enrollment Period (October 15 - December 7). Changes take effect January 1. If you have a qualifying life event, you may be able to change plans outside of AEP.",
      },
      {
        question: "What's included in Medicare Advantage plans?",
        answer:
          "Medicare Advantage plans include Parts A, B, and usually D. Most plans also include dental, vision, hearing, and wellness benefits. However, they typically have network restrictions and may have higher out-of-pocket costs for out-of-network care.",
      },
    ],
  },
  {
    category: "Costs & Coverage",
    questions: [
      {
        question: "What are the 2026 Medicare premiums and deductibles?",
        answer:
          "Medicare costs change annually. For the most current 2026 premiums and deductibles, visit Medicare.gov or contact us for a personalized quote. We can help you understand all costs associated with your specific plan.",
      },
      {
        question: "What does Medicare Part A cover?",
        answer:
          "Part A covers inpatient hospital stays, skilled nursing facility care, hospice care, and some home health services. You typically pay a deductible for hospital stays and copayments for extended stays.",
      },
      {
        question: "What does Medicare Part B cover?",
        answer:
          "Part B covers doctor visits, outpatient services, preventive care, durable medical equipment, and some home health services. You pay a monthly premium and typically a 20% copayment after meeting your deductible.",
      },
      {
        question: "How much does prescription drug coverage cost?",
        answer:
          "Part D premiums vary by plan and region. You also pay a deductible, copayments or coinsurance for medications, and may pay more in the coverage gap. Costs depend on which drugs you take and which plan you choose.",
      },
    ],
  },
  {
    category: "Special Situations",
    questions: [
      {
        question: "What if I'm still working after 65?",
        answer:
          "If your employer has 20+ employees and offers health insurance, you can delay Part B enrollment without penalties. However, you should still enroll in Part A. Once you stop working or lose employer coverage, you have 63 days to enroll in Part B.",
      },
      {
        question: "What about Medicare for people under 65?",
        answer:
          "You may qualify for Medicare before 65 if you have a disability, end-stage renal disease, or ALS. Otherwise, you can explore ACA marketplace plans, short-term medical plans, or other individual health insurance options.",
      },
      {
        question: "How does Medicare work with Medicaid?",
        answer:
          "If you qualify for both Medicare and Medicaid, you're considered \"dual eligible.\" Medicaid can help cover Medicare premiums and cost-sharing. Eligibility varies by state.",
      },
      {
        question: "What happens to my Medicare if I move out of state?",
        answer:
          "Medicare coverage follows you if you move. However, your plan network may change, and you may need to switch plans if your new state isn't covered by your current plan. Contact us if you're planning to relocate.",
      },
    ],
  },
];

export default function FAQ() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpanded = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      {/* Header */}
      <section className="bg-primary text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl lg:text-5xl font-extrabold mb-4 font-display">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-white/90 leading-relaxed">
            Find answers to common questions about Medicare, enrollment deadlines, penalties, and plan comparisons. If you don't find what you're looking for, contact us for personalized guidance.
          </p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {faqData.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-6 pb-3 border-b-2 border-primary">
                {category.category}
              </h2>

              <div className="space-y-4">
                {category.questions.map((item, itemIndex) => {
                  const globalIndex = categoryIndex * 100 + itemIndex;
                  const isExpanded = expandedIndex === globalIndex;

                  return (
                    <div
                      key={itemIndex}
                      className="border border-border rounded-lg overflow-hidden hover:border-primary/50 transition-colors"
                    >
                      <button
                        onClick={() => toggleExpanded(globalIndex)}
                        className="w-full px-6 py-4 bg-card text-card-foreground hover:bg-muted/50 transition-colors flex items-center justify-between text-left"
                      >
                        <span className="font-semibold text-lg pr-4">
                          {item.question}
                        </span>
                        <ChevronDown
                          className={`w-5 h-5 flex-shrink-0 transition-transform ${
                            isExpanded ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {isExpanded && (
                        <div className="px-6 py-4 bg-background border-t border-border">
                          <p className="text-foreground/90 leading-relaxed">
                            {item.answer}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4 font-display">
            Still Have Questions?
          </h2>
          <p className="text-lg text-white/90 mb-8">
            Get personalized guidance from Larry Dalton. Schedule a free consultation to discuss your specific Medicare needs and find the right plan for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:580-364-2266">
              <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-all">
                Call Larry: 580-364-2266
              </button>
            </a>
            <a href="/booking">
              <button className="bg-white hover:bg-gray-100 text-primary font-bold py-3 px-8 rounded-lg shadow-lg transition-all">
                Book Free Consultation
              </button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
