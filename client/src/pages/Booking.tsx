import { Card } from "@/components/ui/card";
import { LARRY_INFO } from "@/const";
import BookingForm from "@/components/BookingForm";

export default function Booking() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-primary/80 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-6">
          <h1 className="text-4xl lg:text-5xl font-extrabold font-display">
            Book Your Free Consultation
          </h1>
          <p className="text-lg text-white/90 max-w-2xl leading-relaxed">
            Schedule a personalized consultation with Larry. We'll discuss your situation, answer your questions, and help you find the right coverage.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <BookingForm />

          {/* Alternative Contact Methods */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-6 border-2 border-border">
              <h3 className="font-bold text-foreground mb-3">Prefer to Call?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                You can reach Larry directly by phone. We're available Monday-Friday, 9 AM - 5 PM CT.
              </p>
              <a href={`tel:${LARRY_INFO.phone}`} className="text-lg font-bold text-primary hover:text-primary/80">
                {LARRY_INFO.phone}
              </a>
            </Card>

            <Card className="p-6 border-2 border-border">
              <h3 className="font-bold text-foreground mb-3">Have Questions First?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Send us a message and we'll get back to you within 24 hours with answers to your questions.
              </p>
              <a href="/contact" className="text-primary hover:text-primary/80 font-bold">
                Send a Message →
              </a>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground mb-12 font-display">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <Card className="p-6 border-2 border-border">
              <h3 className="font-bold text-foreground mb-3">How long does a consultation take?</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Most consultations take 20-45 minutes, depending on your situation. We'll take as much time as you need to feel comfortable with your decision.
              </p>
            </Card>

            <Card className="p-6 border-2 border-border">
              <h3 className="font-bold text-foreground mb-3">Is the consultation really free?</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Yes, completely free. There's no obligation to buy anything. We just want to help you understand your options.
              </p>
            </Card>

            <Card className="p-6 border-2 border-border">
              <h3 className="font-bold text-foreground mb-3">What should I bring to my consultation?</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Bring any current insurance documents you have. If you don't have them, that's fine—we can work with what you remember.
              </p>
            </Card>

            <Card className="p-6 border-2 border-border">
              <h3 className="font-bold text-foreground mb-3">Can I do this over the phone or video?</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Absolutely. We offer phone, video, and in-person consultations. Choose whatever works best for you.
              </p>
            </Card>

            <Card className="p-6 border-2 border-border">
              <h3 className="font-bold text-foreground mb-3">What if I'm not ready to make a decision?</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                That's perfectly fine. We'll answer your questions and provide information. You can take your time and call back whenever you're ready.
              </p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
