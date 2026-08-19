import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface ResultMessage {
  type: 'success' | 'error' | 'neutral';
  text: string;
}

export default function MedicaidCheckTool() {
  const [stateCode, setStateCode] = useState('TX');
  const [householdSize, setHouseholdSize] = useState(1);
  const [monthlyIncome, setMonthlyIncome] = useState('');
  const [resultMessage, setResultMessage] = useState<ResultMessage | null>(null);
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<{[key: string]: boolean}>({
    programs: false,
    misconceptions: false,
    nextSteps: false,
    faq: false
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleScreening = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const income = parseFloat(monthlyIncome);

    if (isNaN(income) || income <= 0) {
      setResultMessage({
        type: 'error',
        text: 'Please enter a valid gross monthly income amount.'
      });
      return;
    }

    // 2026 Strict Federal & Regional Maximum Thresholds Matrix
    // Texas MSP Rules (QMB/SLMB 2026 Limits) vs Oklahoma (SoonerCare Adult Expansion 138% FPL)
    const thresholds = {
      TX: {
        qmb: householdSize === 1 ? 1330 : 1804,  // QMB pays premiums + cost-sharing
        slmb: householdSize === 1 ? 1596 : 2164, // SLMB pays Part B premium ($202.90)
      },
      OK: {
        soonercare: householdSize === 1 ? 1848 : 2507, // OK SoonerCare Adult Expansion (~138% FPL)
        slmb: householdSize === 1 ? 1585 : 2135,       // OK SLMB Premium Protection Standard
      }
    };

    if (stateCode === 'TX') {
      if (income <= thresholds.TX.qmb) {
        setResultMessage({
          type: 'success',
          text: `Based on your profile, you may qualify for the Texas QMB (Qualified Medicare Beneficiary) program! The state will pay your $202.90 Part B premium and cover your doctor co-pays.`
        });
      } else if (income <= thresholds.TX.slmb) {
        setResultMessage({
          type: 'success',
          text: `You fall within the Texas SLMB limit! The state will likely pay your $202.90 monthly Medicare Part B premium automatically.`
        });
      } else {
        setResultMessage({
          type: 'neutral',
          text: `Your income exceeds the standard baseline MSP limits. However, you might still qualify for a low-premium Medicare Advantage Dual-Eligible Special Needs Plan (D-SNP). Let's review options.`
        });
      }
    } else if (stateCode === 'OK') {
      if (income <= thresholds.OK.soonercare) {
        setResultMessage({
          type: 'success',
          text: `Great news! Your income is within the Oklahoma SoonerCare (Medicaid) Expansion threshold. You may be eligible for comprehensive dual medical benefits.`
        });
      } else if (income <= thresholds.OK.slmb) {
        setResultMessage({
          type: 'success',
          text: `You align with the Oklahoma SLMB threshold parameters. This indicates the state can reimburse or cover your monthly $202.90 Part B medical premium.`
        });
      } else {
        setResultMessage({
          type: 'neutral',
          text: `You exceed the general baseline guidelines for Oklahoma SoonerCare. We recommend assessing custom Medicare Supplement choices or Advantage layouts to limit your out-of-pocket exposure.`
        });
      }
    }
  };

  const faqItems = [
    {
      q: "Can I apply if I'm still working?",
      a: "Yes. Income limits are based on gross income, not employment status. Many working seniors qualify for these programs."
    },
    {
      q: "What if my income changes after I'm approved?",
      a: "You must report changes within 10 days. Increases may affect your eligibility, but decreases could improve your benefits."
    },
    {
      q: "Do I have to reapply every year?",
      a: "Yes, most programs require annual recertification. We can help you renew your benefits each year."
    },
    {
      q: "What if I'm denied?",
      a: "You have the right to appeal. We can help you understand why you were denied and file an appeal if appropriate."
    },
    {
      q: "Can I have both Medicare Advantage and Medicaid?",
      a: "Yes. Dual-eligible beneficiaries can enroll in D-SNP (Dual Special Needs Plans) that coordinate both coverages."
    },
    {
      q: "Will this affect my assets or savings?",
      a: "MSP programs (QMB/SLMB) have no asset limits. SoonerCare has asset limits, but they're generous ($2,000 for individuals)."
    }
  ];

  return (
    <div className="w-full bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm max-w-3xl mx-auto my-12">
      <div className="mb-6">
        <span className="text-[11px] uppercase font-bold tracking-widest text-[#D32F2F]">Interactive Tool</span>
        <h3 className="text-xl font-extrabold text-[#0B1E3D] mt-0.5">Quick Regional Program Screening</h3>
        <p className="text-xs text-slate-600 mt-1">Check if you qualify for state premium help or dual assistance options in Oklahoma and Texas.</p>
      </div>

      <form onSubmit={handleScreening} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          
          {/* State Picker */}
          <div className="flex flex-col">
            <label className="text-[11px] font-bold text-slate-700 mb-1">Your State</label>
            <select 
              value={stateCode} 
              onChange={(e) => { setStateCode(e.target.value); setResultMessage(null); }}
              className="p-2.5 bg-[#F4F7FC] text-[#0B1E3D] text-xs font-semibold rounded-lg border border-slate-200 focus:ring-2 focus:ring-[#D32F2F]">
              <option value="TX">Texas (HHSC)</option>
              <option value="OK">Oklahoma (SoonerCare)</option>
            </select>
          </div>

          {/* Household Size */}
          <div className="flex flex-col">
            <label className="text-[11px] font-bold text-slate-700 mb-1">Household Size</label>
            <select 
              value={householdSize} 
              onChange={(e) => { setHouseholdSize(parseInt(e.target.value)); setResultMessage(null); }}
              className="p-2.5 bg-[#F4F7FC] text-[#0B1E3D] text-xs font-semibold rounded-lg border border-slate-200 focus:ring-2 focus:ring-[#D32F2F]">
              <option value={1}>1 Individual</option>
              <option value={2}>2 Persons (Married/Couple)</option>
            </select>
          </div>

          {/* Income Field */}
          <div className="flex flex-col">
            <label className="text-[11px] font-bold text-slate-700 mb-1">Total Gross Monthly Income ($)</label>
            <input 
              type="number" 
              placeholder="e.g. 1450"
              value={monthlyIncome}
              onChange={(e) => { setMonthlyIncome(e.target.value); setResultMessage(null); }}
              className="p-2.5 bg-white text-gray-900 placeholder-slate-400 text-xs font-semibold rounded-lg border border-slate-200 focus:ring-2 focus:ring-[#D32F2F]"
            />
          </div>

        </div>

        <button 
          type="submit" 
          className="w-full bg-[#D32F2F] hover:bg-[#B71C1C] transition duration-200 font-bold text-xs uppercase tracking-wider text-white py-3 px-6 rounded-lg shadow-sm">
          Run Pre-Screening Evaluation
        </button>
      </form>

      {/* Dynamic Results Display */}
      {resultMessage && (
        <div className={`mt-6 p-4 rounded-xl border text-xs md:text-sm leading-relaxed transition-all duration-300 ${
          resultMessage.type === 'success' ? 'bg-emerald-50 border-emerald-300 text-emerald-950' : 
          resultMessage.type === 'error' ? 'bg-orange-50 border-orange-300 text-orange-950' : 'bg-slate-50 border-slate-300 text-slate-900'
        }`}>
          <p className="font-bold mb-1">{resultMessage.type === 'success' ? '✓ Initial Alignment Found' : 'Notice:'}</p>
          <p>{resultMessage.text}</p>
          {resultMessage.type !== 'error' && (
            <p className="mt-3 font-semibold text-[#0B1E3D]" style={{color: '#d3302f'}}>
              *Note: Final qualification requires a full review of resources. Use our booking form to secure a consultation.
            </p>
          )}
        </div>
      )}

      {/* Collapsible Educational Content Sections */}
      <div className="mt-12 space-y-3">
        
        {/* Program Explanations Section */}
        <div className="border border-slate-200 rounded-lg overflow-hidden">
          <button
            onClick={() => toggleSection('programs')}
            className="w-full px-4 py-3 bg-slate-50 hover:bg-slate-100 text-left flex justify-between items-center transition"
          >
            <span className="text-sm font-bold text-[#0B1E3D]">Understanding Your Options</span>
            <ChevronDown className={`w-5 h-5 text-[#D32F2F] transition-transform ${expandedSections.programs ? 'rotate-180' : ''}`} />
          </button>
          {expandedSections.programs && (
            <div className="p-4 bg-white border-t border-slate-200 space-y-3">
              <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                <p className="text-xs font-bold text-blue-900 mb-1">QMB (Qualified Medicare Beneficiary)</p>
                <p className="text-xs text-blue-800 leading-relaxed">The state pays your Medicare Part B premium ($202.90/month), Part A deductible, and most of your doctor co-pays. This is the most comprehensive assistance available.</p>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                <p className="text-xs font-bold text-blue-900 mb-1">SLMB (Specified Low-Income Medicare Beneficiary)</p>
                <p className="text-xs text-blue-800 leading-relaxed">The state pays your Part B premium only ($202.90/month). You remain responsible for deductibles and co-pays, but this saves you over $2,400 annually.</p>
              </div>
              <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                <p className="text-xs font-bold text-green-900 mb-1">SoonerCare (Oklahoma Medicaid)</p>
                <p className="text-xs text-green-800 leading-relaxed">Comprehensive dual coverage combining Medicare and Medicaid. Covers hospital stays, doctor visits, prescriptions, and long-term care with minimal out-of-pocket costs.</p>
              </div>
              <div className="bg-purple-50 p-3 rounded-lg border border-purple-200">
                <p className="text-xs font-bold text-purple-900 mb-1">Medicare Advantage (Part C)</p>
                <p className="text-xs text-purple-800 leading-relaxed">Private insurance alternative to Original Medicare. Often includes dental, vision, and hearing coverage with $0 premiums, but requires using in-network providers.</p>
              </div>
            </div>
          )}
        </div>

        {/* Common Misconceptions Section */}
        <div className="border border-slate-200 rounded-lg overflow-hidden">
          <button
            onClick={() => toggleSection('misconceptions')}
            className="w-full px-4 py-3 bg-slate-50 hover:bg-slate-100 text-left flex justify-between items-center transition"
          >
            <span className="text-sm font-bold text-[#0B1E3D]">Common Misconceptions</span>
            <ChevronDown className={`w-5 h-5 text-[#D32F2F] transition-transform ${expandedSections.misconceptions ? 'rotate-180' : ''}`} />
          </button>
          {expandedSections.misconceptions && (
            <div className="p-4 bg-white border-t border-slate-200 space-y-2">
              <div className="bg-yellow-50 p-2.5 rounded-lg border border-yellow-200">
                <p className="text-xs font-bold text-yellow-900">❌ "I'm too rich to qualify"</p>
                <p className="text-xs text-yellow-800">✓ Income limits are surprisingly low, but many people still qualify. A single person earning $1,330/month in Texas can qualify for QMB.</p>
              </div>
              <div className="bg-yellow-50 p-2.5 rounded-lg border border-yellow-200">
                <p className="text-xs font-bold text-yellow-900">❌ "These programs are the same as welfare"</p>
                <p className="text-xs text-yellow-800">✓ MSP and SoonerCare are federal/state programs specifically designed for Medicare beneficiaries. You earned these benefits through Medicare eligibility.</p>
              </div>
              <div className="bg-yellow-50 p-2.5 rounded-lg border border-yellow-200">
                <p className="text-xs font-bold text-yellow-900">❌ "Applying will affect my Social Security"</p>
                <p className="text-xs text-yellow-800">✓ These programs are separate from Social Security. Applying does not reduce your benefits or affect future eligibility.</p>
              </div>
              <div className="bg-yellow-50 p-2.5 rounded-lg border border-yellow-200">
                <p className="text-xs font-bold text-yellow-900">❌ "The process is complicated and takes months"</p>
                <p className="text-xs text-yellow-800">✓ Applications are streamlined. Many approvals happen within 2-4 weeks, and benefits can be retroactive to your application date.</p>
              </div>
            </div>
          )}
        </div>

        {/* Next Steps Section */}
        <div className="border border-slate-200 rounded-lg overflow-hidden">
          <button
            onClick={() => toggleSection('nextSteps')}
            className="w-full px-4 py-3 bg-slate-50 hover:bg-slate-100 text-left flex justify-between items-center transition"
          >
            <span className="text-sm font-bold text-[#0B1E3D]">Next Steps After Qualification</span>
            <ChevronDown className={`w-5 h-5 text-[#D32F2F] transition-transform ${expandedSections.nextSteps ? 'rotate-180' : ''}`} />
          </button>
          {expandedSections.nextSteps && (
            <div className="p-4 bg-white border-t border-slate-200">
              <ol className="space-y-2.5 text-xs">
                <li className="flex gap-2.5">
                  <span className="font-bold text-[#D32F2F] flex-shrink-0">1.</span>
                  <span><strong>Confirm Your Eligibility</strong> – Call us or schedule a consultation for a detailed review of your specific situation and documentation needs.</span>
                </li>
                <li className="flex gap-2.5">
                  <span className="font-bold text-[#D32F2F] flex-shrink-0">2.</span>
                  <span><strong>Gather Required Documents</strong> – Typically: proof of income (pay stubs, tax returns), proof of citizenship (birth certificate), and Social Security card.</span>
                </li>
                <li className="flex gap-2.5">
                  <span className="font-bold text-[#D32F2F] flex-shrink-0">3.</span>
                  <span><strong>Submit Your Application</strong> – We can help you apply online, by mail, or in person at your local HHSC/SoonerCare office.</span>
                </li>
                <li className="flex gap-2.5">
                  <span className="font-bold text-[#D32F2F] flex-shrink-0">4.</span>
                  <span><strong>Receive Your Approval</strong> – Once approved, you'll receive a new Medicare card or Medicaid card with your benefits active.</span>
                </li>
                <li className="flex gap-2.5">
                  <span className="font-bold text-[#D32F2F] flex-shrink-0">5.</span>
                  <span><strong>Start Saving</strong> – Your benefits are typically effective the first of the month following approval. Begin using your new coverage immediately.</span>
                </li>
              </ol>
            </div>
          )}
        </div>

        {/* FAQ Section */}
        <div className="border border-slate-200 rounded-lg overflow-hidden">
          <button
            onClick={() => toggleSection('faq')}
            className="w-full px-4 py-3 bg-slate-50 hover:bg-slate-100 text-left flex justify-between items-center transition"
          >
            <span className="text-sm font-bold text-[#0B1E3D]">Frequently Asked Questions</span>
            <ChevronDown className={`w-5 h-5 text-[#D32F2F] transition-transform ${expandedSections.faq ? 'rotate-180' : ''}`} />
          </button>
          {expandedSections.faq && (
            <div className="p-4 bg-white border-t border-slate-200 space-y-2">
              {faqItems.map((faq, idx) => (
                <div key={idx} className="border border-slate-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setExpandedFAQ(expandedFAQ === idx.toString() ? null : idx.toString())}
                    className="w-full px-3 py-2 bg-slate-50 hover:bg-slate-100 text-left flex justify-between items-center transition"
                  >
                    <span className="text-xs font-bold text-[#0B1E3D]">{faq.q}</span>
                    <ChevronDown className={`w-3.5 h-3.5 text-[#D32F2F] transition-transform ${expandedFAQ === idx.toString() ? 'rotate-180' : ''}`} />
                  </button>
                  {expandedFAQ === idx.toString() && (
                    <div className="px-3 py-2 bg-white border-t border-slate-200">
                      <p className="text-xs text-slate-700 leading-relaxed">{faq.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
