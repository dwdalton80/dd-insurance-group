import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Phone, Calendar } from 'lucide-react';
import { LARRY_INFO } from '@/const';
import MedicaidCheckTool from '@/components/MedicaidCheckTool';

export default function DDInsureMedicarePage() {
  const [selectedNeed, setSelectedNeed] = useState('none');

  // Need Alignment Dataset
  const scenarioNeeds = {
    none: {
      alertTitle: "Select a profile scenario above to begin",
      alertDesc: "Click one of the red profile triggers above to dynamically map structural Medicare directions based on common consumer situations.",
      alertStyle: "bg-slate-50 border-slate-300 text-slate-700"
    },
    low_budget: {
      alertTitle: "Recommended: Medicare Part A & B Pathway",
      alertDesc: "• Medicare Part B Plans: Supplement Plans (Covers all the \"gaps\" in part A & B)\n• Medicare Part D: Stand-alone Prescription Drug Plan",
      alertStyle: "bg-red-50 border-[#D32F2F] text-red-950"
    },
    traveler: {
      alertTitle: "Recommended: Original Medicare + Medigap Supplement",
      alertDesc: "If you travel regularly between Oklahoma, Texas, or across state lines, you should avoid network restrictions. This path lets you see any doctor or specialist nationwide who accepts federal Medicare, without requiring referrals or dealing with out-of-network penalties.",
      alertStyle: "bg-red-50 border-[#D32F2F] text-red-950"
    },
    meds: {
      alertTitle: "Recommended: Medicare Advantage Plan",
      alertDesc: "If you need a 0 or low monthly premium and need an option that lets you pay as you need service then Medicare Advantage is the best option, however, it does come with unpredictable co pays and co insurance and a high maximum out of pocket cost based on which plan you choose.",
      alertStyle: "bg-red-50 border-[#D32F2F] text-red-950"
    }
  };

  const currentScenario = scenarioNeeds[selectedNeed as keyof typeof scenarioNeeds];

  return (
    <div className="w-full min-h-screen bg-white text-[#2D3748] font-sans antialiased">
      
      {/* Hero Section with Title in Blue Banner */}
      <section className="py-16 bg-gradient-to-r from-primary to-primary/80 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-6">
          <h1 className="text-4xl lg:text-5xl font-extrabold font-display">
            Medicare Explained
            <br />
            In Plain English
          </h1>
          <p className="text-lg text-white/90 max-w-2xl leading-relaxed">
            We strip away the confusing government acronyms and dry handbooks. Below is a simplified, up-to-date translation of your core healthcare choices.
          </p>
        </div>
      </section>

      {/* Main Educational Wrapper */}
      <main className="max-w-6xl mx-auto px-4 py-12 md:py-16">

        {/* SECTION 1: THE CORE PILLARS BREAKDOWN */}
        <section className="mb-20">
          <div className="flex items-center space-x-2 mb-8">
            <span className="h-6 w-1.5 bg-[#D32F2F] rounded-full"></span>
            <h2 className="text-2xl font-extrabold text-[#0B1E3D] tracking-tight">1. Understanding the Four Core Parts</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Part A */}
            <div className="bg-[#F4F7FC] p-6 rounded-xl border-l-4 border-[#0B1E3D] transition hover:shadow-md">
              <span className="text-[11px] uppercase font-bold tracking-widest text-[#D32F2F]">Government Standard</span>
              <h3 className="text-xl font-bold text-[#0B1E3D] mt-1">Medicare Part A (Hospital Coverages)</h3>
              <p className="text-sm text-[#2D3748] mt-2 leading-relaxed">
                <strong>Plain English Definition:</strong> This is your room-and-board insurance for emergency situations. It covers you when you are officially admitted into an inpatient hospital room, a skilled nursing facility, or hospice.
              </p>
              <p className="text-xs font-semibold text-[#1E3A60] mt-4 pt-3 border-t border-slate-200">
                Current Cost Baseline: $0 monthly premium for most Americans who paid Medicare taxes during employment.
              </p>
            </div>

            {/* Part B */}
            <div className="bg-[#F4F7FC] p-6 rounded-xl border-l-4 border-[#0B1E3D] transition hover:shadow-md">
              <span className="text-[11px] uppercase font-bold tracking-widest text-[#D32F2F]">Government Standard</span>
              <h3 className="text-xl font-bold text-[#0B1E3D] mt-1">Medicare Part B (Medical Necessities)</h3>
              <p className="text-sm text-[#2D3748] mt-2 leading-relaxed">
                <strong>Plain English Definition:</strong> This covers your everyday outpatient medical care. Anytime you see a regular doctor, visit an urgent care clinic, get standard lab tests, or receive a preventative vaccine, Part B pays its share.
              </p>
              <p className="text-xs font-semibold text-[#1E3A60] mt-4 pt-3 border-t border-slate-200">
                Current Cost Baseline: Standard monthly premium is set at $202.90 (can scale higher based on income brackets).
              </p>
            </div>

            {/* Part C */}
            <div className="bg-[#F4F7FC] p-6 rounded-xl border-l-4 border-[#D32F2F] transition hover:shadow-md">
              <span className="text-[11px] uppercase font-bold tracking-widest text-slate-500">Private Enterprise Options</span>
              <h3 className="text-xl font-bold text-[#0B1E3D] mt-1">Medicare Part C (Medicare Advantage)</h3>
              <p className="text-sm text-[#2D3748] mt-2 leading-relaxed">
                <strong>Plain English Definition:</strong> Instead of the government running your billing, private insurance companies manage your care in a bundled network package. These plans combine Parts A and B, often include Part D drug coverage, and add extra perks like gym memberships or routine dental allowances.
              </p>
              <p className="text-xs font-semibold text-red-800 mt-4 pt-3 border-t border-slate-200">
                Current Cost Baseline: Many regional options feature a $0 additional monthly premium. Max out-of-pocket exposure is legally capped.
              </p>
            </div>

            {/* Part D */}
            <div className="bg-[#F4F7FC] p-6 rounded-xl border-l-4 border-[#D32F2F] transition hover:shadow-md">
              <span className="text-[11px] uppercase font-bold tracking-widest text-slate-500">Private Enterprise Options</span>
              <h3 className="text-xl font-bold text-[#0B1E3D] mt-1">Medicare Part D (Prescription Drug Card)</h3>
              <p className="text-sm text-[#2D3748] mt-2 leading-relaxed">
                <strong>Plain English Definition:</strong> A standalone private insurance card designed to help lower what you pay at the pharmacy counter for daily maintenance or specialty prescription drugs.
              </p>
              <p className="text-xs font-semibold text-red-800 mt-4 pt-3 border-t border-slate-200">
                Current Cost Baseline: Premiums vary by plan formulary list. Features a strict federal $2,100 maximum annual out-of-pocket cap on covered drug costs.
              </p>
            </div>

          </div>
        </section>


        {/* SECTION 2: INTERACTIVE CHOICES BASED ON SPECIFIC NEEDS */}
        <section className="mb-20">
          <div className="flex items-center space-x-2 mb-4">
            <span className="h-6 w-1.5 bg-[#D32F2F] rounded-full"></span>
            <h2 className="text-2xl font-extrabold text-[#0B1E3D] tracking-tight">2. Select Your Primary Need Profile</h2>
          </div>
          <p className="text-sm text-slate-600 mb-8 max-w-2xl">
            Everyone has different health and financial goals. Click the profile card below that matches your current situation to see your recommended path:
          </p>

          {/* Interactive Trigger Buttons Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <button 
              onClick={() => setSelectedNeed('low_budget')}
              className={`p-4 text-left border rounded-xl font-bold text-xs uppercase tracking-wider transition ${selectedNeed === 'low_budget' ? 'bg-[#0B1E3D] border-[#0B1E3D] text-white shadow-md' : 'bg-white border-slate-200 hover:bg-slate-50 text-[#0B1E3D]'}`} style={{backgroundColor: '#d32f2f', color: '#ffffff'}}>
              Fixed Monthly Budget
            </button>
            <button 
              onClick={() => setSelectedNeed('traveler')}
              className={`p-4 text-left border rounded-xl font-bold text-xs uppercase tracking-wider transition ${selectedNeed === 'traveler' ? 'bg-[#0B1E3D] border-[#0B1E3D] text-white shadow-md' : 'bg-white border-slate-200 hover:bg-slate-50 text-[#0B1E3D]'}`} style={{backgroundColor: '#d32f2f', color: '#ffffff'}}>
              Regular Out-of-State Traveler
            </button>
            <button 
              onClick={() => setSelectedNeed('meds')}
              className={`p-4 text-left border rounded-xl font-bold text-xs uppercase tracking-wider transition ${selectedNeed === 'meds' ? 'bg-[#0B1E3D] border-[#0B1E3D] text-white shadow-md' : 'bg-white border-slate-200 hover:bg-slate-50 text-[#0B1E3D]'}`} style={{backgroundColor: '#d32f2f', color: '#ffffff'}}>
              Pay-As-You-Go
            </button>
          </div>

          {/* Dynamic Recommendation Alert */}
          <Card className={`p-6 border-2 rounded-xl mb-8 ${currentScenario.alertStyle}`}>
            <h3 className="text-lg font-bold mb-2">{currentScenario.alertTitle}</h3>
            <p className="text-sm leading-relaxed">{currentScenario.alertDesc}</p>
          </Card>

          {/* CTA Buttons */}
          {selectedNeed !== 'none' && (
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a href={`tel:${LARRY_INFO.phone}`} className="flex-1">
                <Button className="bg-[#D32F2F] hover:bg-[#B71C1C] text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-2 w-full" style={{backgroundColor: '#0b1e3d'}}>
                  <Phone className="w-4 h-4" />
                  Call for Free Consultation
                </Button>
              </a>
              <a href="/booking?insuranceType=medicare" className="flex-1">
                <Button variant="outline" className="border-2 border-[#0B1E3D] text-[#0B1E3D] hover:bg-slate-50 font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-2 w-full">
                  <Calendar className="w-4 h-4" />
                  Book Appointment
                </Button>
              </a>
            </div>
          )}
        </section>

        {/* SECTION 2.5: MEDICAID CHECK TOOL */}
        <section className="py-8">
          <MedicaidCheckTool />
        </section>

        {/* SECTION 3: IMPORTANT COMPLIANCE NOTICE */}
        <section className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg">
          <h3 className="text-lg font-bold text-blue-900 mb-2">Important Notice</h3>
          <p className="text-sm text-blue-800 leading-relaxed">
            This website is operated by a private, independent licensed insurance agent. It is not affiliated with, endorsed by, or connected to the federal Medicare program, CMS, or any government entity. All information provided is educational and not a substitute for professional insurance advice. Please consult with a licensed agent for your specific situation.
          </p>
        </section>
      </main>
    </div>
  );
}
