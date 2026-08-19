import { Button } from '@/components/ui/button';
import { useLocation } from 'wouter';
import { ChevronLeft } from 'lucide-react';

export default function PrivacyPolicy() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="bg-primary text-white py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => setLocation('/')}
            className="flex items-center gap-2 text-white/80 hover:text-white mb-4 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            Back to Home
          </button>
          <h1 className="text-4xl font-bold">Privacy Policy</h1>
          <p className="text-white/90 mt-2">Last Updated: May 2026</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-invert max-w-none">
          {/* Introduction */}
          <section className="mb-12">
            <p className="text-lg text-muted-foreground leading-relaxed">
              This Privacy Policy describes how this website (the "Site"), operated by a private, licensed independent insurance broker in Oklahoma and Texas (the "Broker," "we," "us," or "our"), collects, uses, protects, and discloses your Personally Identifiable Information (PII) and Protected Health Information (PHI) in compliance with the Centers for Medicare & Medicaid Services (CMS) regulations, the Telephone Consumer Protection Act (TCPA), and federal privacy laws.
            </p>
          </section>

          {/* Section 1: Important Legal Disclaimers */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-foreground">1. Important Legal Disclaimers</h2>
            <div className="space-y-4">
              <div className="bg-muted p-6 rounded-lg border border-border">
                <h3 className="font-bold text-foreground mb-2">Third-Party Marketing Organization (TPMO) Disclaimer</h3>
                <p className="text-muted-foreground">
                  We do not offer every plan available in your area. Any information we provide is limited to those plans we do offer in your area. Please contact Medicare.gov or 1-800-MEDICARE to get information on all of your options.
                </p>
              </div>
              <div className="bg-muted p-6 rounded-lg border border-border">
                <h3 className="font-bold text-foreground mb-2">Government Affiliation</h3>
                <p className="text-muted-foreground">
                  This website is a private insurance broker platform. It is not affiliated with, endorsed by, or connected to the federal Medicare program, the Department of Health and Human Services (HHS), or any other government agency.
                </p>
              </div>
            </div>
          </section>

          {/* Section 2: Information We Collect */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-foreground">2. Information We Collect</h2>
            <p className="text-muted-foreground mb-4">
              We collect information that you voluntarily provide through our online forms, booking calendar, and digital Scope of Appointment (SOA) signature tool, including:
            </p>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex gap-3">
                <span className="text-primary font-bold">•</span>
                <span><strong>Identity Information:</strong> Full name, date of birth, and electronic signature.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">•</span>
                <span><strong>Contact Information:</strong> Phone number, email address, and physical mailing address.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">•</span>
                <span><strong>Geographic Data:</strong> ZIP code and state of residence (restricted to Oklahoma and Texas).</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">•</span>
                <span><strong>Medicare Product Intentions:</strong> Your specific selections for product lines you wish to discuss (e.g., Medicare Advantage, Part D, or Medicare Supplement plans).</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">•</span>
                <span><strong>Technical Data:</strong> IP address, browser type, and timestamps of when forms or digital SOAs were completed.</span>
              </li>
            </ul>
          </section>

          {/* Section 3: CMS "1-to-1 Consent" */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-foreground">3. CMS "1-to-1 Consent" & Strict Non-Disclosure of Data</h2>
            <p className="text-muted-foreground mb-4">
              In strict accordance with federal CMS Final Rules for Third-Party Marketing Organizations:
            </p>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex gap-3">
                <span className="text-primary font-bold">•</span>
                <span><strong>No Data Selling or Sharing:</strong> We will <strong>NEVER</strong> sell, trade, license, or lease your personal beneficiary data, phone number, or email address to other lead generators, insurance brokers, or TPMOs.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">•</span>
                <span><strong>Express Written Consent:</strong> By providing your information on our forms, you grant your Prior Express Written Consent (PEWC) exclusively to this specific independent agency to contact you. Blanket or multi-broker distribution of your data is entirely prohibited on this platform.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">•</span>
                <span><strong>Data Portability to Spark:</strong> Your data is synchronized directly via a secure API to our Field Marketing Organization (FMO) carrier management pipeline hosted by Spark Advisors for the sole purpose of evaluating plan availability and processing your request.</span>
              </li>
            </ul>
          </section>

          {/* Section 4: Data Security and Retention */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-foreground">4. How We Secure and Retain Your Data</h2>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex gap-3">
                <span className="text-primary font-bold">•</span>
                <span><strong>10-Year Data Retention:</strong> Per CMS compliance protocols, all digital Scope of Appointment (SOA) forms, appointment records, and verification audit trails are securely archived and retained in an encrypted database for a mandatory period of <strong>10 years</strong>.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">•</span>
                <span><strong>Data Security Protocols:</strong> We utilize advanced Secure Socket Layer (SSL/HTTPS) encryption in transit and secure database partitioning at rest to safeguard your personal metrics from unauthorized access or breach.</span>
              </li>
            </ul>
          </section>

          {/* Section 5: TCPA Compliance */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-foreground">5. TCPA Compliance and Communication</h2>
            <p className="text-muted-foreground mb-4">
              By submitting a form, checking a consent box, or dialing our listed phone lines, you acknowledge and agree that:
            </p>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex gap-3">
                <span className="text-primary font-bold">•</span>
                <span>You are establishing an informational business relationship.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">•</span>
                <span>You grant authorization to receive communications from a licensed insurance agent via telephone, text message, or email.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">•</span>
                <span>You may revoke your communication consent at any time by replying "STOP" to digital communications or requesting to be placed on our internal Do Not Call list.</span>
              </li>
            </ul>
          </section>

          {/* Section 6: Contact Information */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-foreground">6. Contact and Licensing Information</h2>
            <p className="text-muted-foreground mb-4">
              For questions regarding this privacy framework, or to update your information, please contact:
            </p>
            <div className="bg-muted p-6 rounded-lg border border-border space-y-2">
              <p className="text-muted-foreground">
                <strong>Licensed Territories:</strong> State of Oklahoma & State of Texas
              </p>
              <p className="text-muted-foreground">
                <strong>Contact Phone Number:</strong> <a href="tel:5802643699" className="text-primary hover:underline">580-364-2266</a>
              </p>
              <p className="text-sm text-muted-foreground italic">
                By calling this number, you will be connected to a licensed insurance agent.
              </p>
            </div>
          </section>

          {/* Footer CTA */}
          <section className="mt-16 pt-8 border-t border-border">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => setLocation('/')}
                variant="default"
                className="bg-primary hover:bg-primary/90"
              >
                Back to Home
              </Button>
              <a href="tel:5802643699">
                <Button
                  variant="outline"
                  className="w-full sm:w-auto"
                >
                  Contact Us
                </Button>
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
