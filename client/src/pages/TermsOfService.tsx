import { Button } from '@/components/ui/button';
import { useLocation } from 'wouter';
import { ChevronLeft } from 'lucide-react';

export default function TermsOfService() {
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
          <h1 className="text-4xl font-bold">Terms of Service</h1>
          <p className="text-white/90 mt-2">Last Updated: May 2026</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-invert max-w-none">
          {/* Introduction */}
          <section className="mb-12">
            <p className="text-lg text-muted-foreground leading-relaxed">
              These Terms of Service ("Terms") govern your use of this website (the "Site") operated by a private, licensed independent insurance broker in Oklahoma and Texas (the "Broker," "we," "us," "our," or "Company"). By accessing, browsing, or using this Site, you agree to be bound by these Terms. If you do not agree to these Terms, please do not use this Site.
            </p>
          </section>

          {/* Section 1: Use License */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-foreground">1. Use License</h2>
            <p className="text-muted-foreground mb-4">
              Permission is granted to temporarily download one copy of the materials (information or software) on this Site for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex gap-3">
                <span className="text-primary font-bold">•</span>
                <span>Modify or copy the materials or any portion thereof.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">•</span>
                <span>Use the materials for any commercial purpose or for any public display (commercial or non-commercial).</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">•</span>
                <span>Attempt to decompile or reverse engineer any software contained on the Site.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">•</span>
                <span>Remove any copyright or other proprietary notations from the materials.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">•</span>
                <span>Transfer the materials to another person or "mirror" the materials on any other server.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">•</span>
                <span>Violate any applicable laws or regulations in your jurisdiction.</span>
              </li>
            </ul>
          </section>

          {/* Section 2: Disclaimer of Warranties */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-foreground">2. Disclaimer of Warranties</h2>
            <div className="bg-muted p-6 rounded-lg border border-border mb-4">
              <p className="text-muted-foreground">
                The materials on this Site are provided on an "as-is" basis. The Broker makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
              </p>
            </div>
            <p className="text-muted-foreground mb-4">
              Further, the Broker does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on its Internet web site or otherwise relating to such materials or on any sites linked to this site.
            </p>
          </section>

          {/* Section 3: Limitations of Liability */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-foreground">3. Limitations of Liability</h2>
            <p className="text-muted-foreground mb-4">
              In no event shall the Broker or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on this Site, even if the Broker or an authorized representative has been notified orally or in writing of the possibility of such damage.
            </p>
            <p className="text-muted-foreground">
              Because some jurisdictions do not allow limitations on implied warranties, or limitations of liability for consequential or incidental damages, these limitations may not apply to you.
            </p>
          </section>

          {/* Section 4: Accuracy of Materials */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-foreground">4. Accuracy of Materials</h2>
            <p className="text-muted-foreground mb-4">
              The materials appearing on this Site could include technical, typographical, or photographic errors. The Broker does not warrant that any of the materials on its Site are accurate, complete, or current. The Broker may make changes to the materials contained on its Site at any time without notice.
            </p>
            <p className="text-muted-foreground">
              Information provided on this Site regarding insurance products, coverage options, and plan details is general in nature and may not reflect all available options or current rates. For accurate, personalized information, please contact our office directly at <a href="tel:5802643699" className="text-primary hover:underline">580-364-2266</a>.
            </p>
          </section>

          {/* Section 5: Materials License */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-foreground">5. Materials License</h2>
            <p className="text-muted-foreground mb-4">
              The Broker grants you a limited license to access and use this Site for the purpose of obtaining information about insurance products and services. This license does not include:
            </p>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex gap-3">
                <span className="text-primary font-bold">•</span>
                <span>Any resale or commercial use of this Site or its contents.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">•</span>
                <span>Any collection and use of product listings, descriptions, or prices.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">•</span>
                <span>Any derivative works or modifications of this Site or its contents.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">•</span>
                <span>Any downloading or copying of account information for the benefit of another party.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">•</span>
                <span>Any use of data mining, robots, or similar data gathering and extraction tools.</span>
              </li>
            </ul>
          </section>

          {/* Section 6: Disclaimer of Professional Advice */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-foreground">6. Disclaimer of Professional Advice</h2>
            <div className="bg-muted p-6 rounded-lg border border-border">
              <p className="text-muted-foreground">
                <strong>Important:</strong> Information provided on this Site is for educational and informational purposes only and should not be construed as professional insurance, legal, tax, or financial advice. While we strive to provide accurate and current information, insurance products, regulations, and rates change frequently. The information on this Site may not reflect the most current developments.
              </p>
              <p className="text-muted-foreground mt-4">
                Before making any insurance decisions, you should consult with a licensed insurance agent (such as our office) or other qualified professional who can assess your individual circumstances and needs. Your use of this Site does not create an attorney-client, accountant-client, or professional advisory relationship.
              </p>
            </div>
          </section>

          {/* Section 7: No Medical Advice */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-foreground">7. No Medical Advice</h2>
            <p className="text-muted-foreground">
              This Site does not provide medical advice, diagnosis, treatment, or services. Any health-related information is for informational purposes only. Do not rely on information from this Site as a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified healthcare provider with any questions you may have regarding a medical condition.
            </p>
          </section>

          {/* Section 8: Limitations on Use */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-foreground">8. Limitations on Use</h2>
            <p className="text-muted-foreground mb-4">
              You agree not to use this Site in any way that:
            </p>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex gap-3">
                <span className="text-primary font-bold">•</span>
                <span>Violates any applicable law or regulation.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">•</span>
                <span>Infringes upon the rights of others, including intellectual property rights.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">•</span>
                <span>Is defamatory, obscene, abusive, or otherwise objectionable.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">•</span>
                <span>Harasses, threatens, intimidates, or harms any individual or group.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">•</span>
                <span>Attempts to gain unauthorized access to our systems or networks.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">•</span>
                <span>Transmits viruses, malware, or any other malicious code.</span>
              </li>
            </ul>
          </section>

          {/* Section 9: Third-Party Links */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-foreground">9. Third-Party Links</h2>
            <p className="text-muted-foreground mb-4">
              This Site may contain links to third-party websites, including Medicare.gov, insurance carrier websites, and other external resources. The Broker is not responsible for the content, accuracy, or practices of these third-party sites. Your use of third-party websites is governed by their own terms and privacy policies.
            </p>
            <p className="text-muted-foreground">
              The inclusion of any link does not imply endorsement, sponsorship, or affiliation with the linked site. We encourage you to review the terms and privacy policies of any third-party site before providing personal information.
            </p>
          </section>

          {/* Section 10: Indemnification */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-foreground">10. Indemnification</h2>
            <p className="text-muted-foreground">
              You agree to indemnify, defend, and hold harmless the Broker, its officers, directors, employees, agents, and suppliers from and against any and all claims, liabilities, damages, losses, costs, and expenses (including reasonable attorneys' fees) arising out of or related to your use of this Site, your violation of these Terms, or your infringement of any intellectual property or other rights of any person or entity.
            </p>
          </section>

          {/* Section 11: Termination */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-foreground">11. Termination</h2>
            <p className="text-muted-foreground">
              The Broker may terminate or suspend your access to this Site at any time, without notice or cause, if we believe you have violated these Terms or engaged in conduct that is harmful to the Broker, other users, or third parties. Upon termination, your right to use this Site will immediately cease.
            </p>
          </section>

          {/* Section 12: Governing Law */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-foreground">12. Governing Law</h2>
            <p className="text-muted-foreground">
              These Terms and your use of this Site are governed by and construed in accordance with the laws of the State of Oklahoma, without regard to its conflict of law provisions. You agree to submit to the exclusive jurisdiction of the courts located in Oklahoma County, Oklahoma for the resolution of any disputes arising out of or related to these Terms or your use of this Site.
            </p>
          </section>

          {/* Section 13: Severability */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-foreground">13. Severability</h2>
            <p className="text-muted-foreground">
              If any provision of these Terms is found to be invalid or unenforceable, that provision will be modified to the minimum extent necessary to make it valid and enforceable, or if such modification is not possible, the provision will be severed. The remaining provisions of these Terms will remain in full force and effect.
            </p>
          </section>

          {/* Section 14: Entire Agreement */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-foreground">14. Entire Agreement</h2>
            <p className="text-muted-foreground">
              These Terms, together with our Privacy Policy, constitute the entire agreement between you and the Broker regarding your use of this Site and supersede all prior and contemporaneous agreements, understandings, and communications, whether written or oral.
            </p>
          </section>

          {/* Section 15: Contact Information */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-foreground">15. Contact Information</h2>
            <p className="text-muted-foreground mb-4">
              If you have questions about these Terms of Service, please contact us:
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
