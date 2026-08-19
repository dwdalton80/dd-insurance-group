import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, Calendar, Phone, Mail, Clock, MapPin, AlertCircle } from "lucide-react";
import { LARRY_INFO } from "@/const";

export default function BookingConfirmation() {
  const [location] = useLocation();
  
  // Parse booking details from URL params
  const params = new URLSearchParams(location.split("?")[1] || "");
  const bookingData = {
    fullName: params.get("fullName") || "Guest",
    email: params.get("email") || "",
    phone: params.get("phone") || "",
    insuranceType: params.get("insuranceType") || "medicare",
    preferredDate: params.get("preferredDate") || "",
    preferredTime: params.get("preferredTime") || "",
  };

  // Format insurance type for display
  const insuranceTypeLabel = {
    medicare: "Medicare",
    individual: "Individual/ACA",
    group: "Group Plans",
  }[bookingData.insuranceType] || bookingData.insuranceType;

  // Format date for display
  const formattedDate = bookingData.preferredDate
    ? new Date(bookingData.preferredDate).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "To be determined";

  return (
    <div className="w-full">
      {/* Success Hero Section */}
      <section className="py-16 bg-gradient-to-r from-green-50 to-emerald-50 border-b-4 border-green-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center gap-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
              <Check className="w-10 h-10 text-green-600" />
            </div>
            <div>
              <h1 className="text-4xl lg:text-5xl font-extrabold font-display text-foreground mb-3">
                Booking Confirmed!
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Thank you, {bookingData.fullName}. We've received your consultation request{bookingData.insuranceType === 'medicare' ? ' and Statement of Understanding' : ''}. Larry will be in touch shortly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Booking Details */}
            <div className="lg:col-span-2">
              <Card className="p-8 border-2 border-border">
                <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                  <Calendar className="w-6 h-6 text-primary" />
                  Your Booking Details
                </h2>

                <div className="space-y-6">
                  {/* Personal Information */}
                  <div>
                    <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4">
                      Personal Information
                    </h3>
                    <div className="space-y-3 pl-4 border-l-2 border-primary/20">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Full Name</p>
                        <p className="text-foreground font-medium">{bookingData.fullName}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Email</p>
                        <p className="text-foreground font-medium break-all">{bookingData.email}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Phone</p>
                        <p className="text-foreground font-medium">{bookingData.phone}</p>
                      </div>
                    </div>
                  </div>

                  {/* Consultation Details */}
                  <div>
                    <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4">
                      Consultation Details
                    </h3>
                    <div className="space-y-3 pl-4 border-l-2 border-primary/20">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Insurance Type</p>
                        <p className="text-foreground font-medium">{insuranceTypeLabel}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Preferred Date</p>
                        <p className="text-foreground font-medium">{formattedDate}</p>
                      </div>
                      {bookingData.preferredTime && (
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Preferred Time</p>
                          <p className="text-foreground font-medium">{bookingData.preferredTime}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Document Status - Only show for Medicare */}
                  {bookingData.insuranceType === 'medicare' && (
                    <div>
                      <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4">
                        Document Status
                      </h3>
                      <div className="flex items-center gap-3 pl-4 border-l-2 border-green-500">
                        <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-foreground">Statement of Understanding Signed</p>
                          <p className="text-xs text-muted-foreground">Your SOA has been securely stored</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            </div>

            {/* Next Steps Sidebar */}
            <div className="lg:col-span-1">
              <Card className="p-6 border-2 border-primary/20 bg-primary/5 sticky top-24">
                <h3 className="text-lg font-bold text-foreground mb-6">What Happens Next?</h3>
                
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary text-white font-bold text-sm">
                        1
                      </div>
                    </div>
                    <div>
                      <p className="font-bold text-foreground text-sm mb-1">Larry Reviews Your Request</p>
                      <p className="text-xs text-muted-foreground">Within 24 hours</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary text-white font-bold text-sm">
                        2
                      </div>
                    </div>
                    <div>
                      <p className="font-bold text-foreground text-sm mb-1">Confirmation Call</p>
                      <p className="text-xs text-muted-foreground">Larry will call to confirm your appointment</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary text-white font-bold text-sm">
                        3
                      </div>
                    </div>
                    <div>
                      <p className="font-bold text-foreground text-sm mb-1">Your Consultation</p>
                      <p className="text-xs text-muted-foreground">Phone, video, or in-person meeting</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary text-white font-bold text-sm">
                        4
                      </div>
                    </div>
                    <div>
                      <p className="font-bold text-foreground text-sm mb-1">Find Your Plan</p>
                      <p className="text-xs text-muted-foreground">Personalized coverage recommendations</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Contact Information Section */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 border-2 border-border hover:border-primary/50 transition-colors">
              <div className="flex items-start gap-4">
                <Phone className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-foreground mb-2">Call Larry</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Reach out directly if you have questions or need to reschedule.
                  </p>
                  <a
                    href={`tel:${LARRY_INFO.phone}`}
                    className="text-primary hover:text-primary/80 font-bold text-sm"
                  >
                    {LARRY_INFO.phone}
                  </a>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-2 border-border hover:border-primary/50 transition-colors">
              <div className="flex items-start gap-4">
                <Mail className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-foreground mb-2">Email Larry</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Send us a message and we'll respond within 24 hours.
                  </p>
                  <a
                    href={`mailto:${LARRY_INFO.email}`}
                    className="text-primary hover:text-primary/80 font-bold text-sm break-all"
                  >
                    {LARRY_INFO.email}
                  </a>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-2 border-border hover:border-primary/50 transition-colors">
              <div className="flex items-start gap-4">
                <Clock className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-foreground mb-2">Business Hours</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Monday - Friday
                  </p>
                  <p className="text-sm font-bold text-foreground">
                    9:00 AM - 5:00 PM CT
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Important Information */}
          <Card className="mt-12 p-6 border-2 border-amber-200 bg-amber-50">
            <div className="flex gap-4">
              <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-amber-900 mb-2">Important Information</h3>
                <ul className="text-sm text-amber-800 space-y-2">
                  <li className="flex gap-2">
                    <span className="text-amber-600 font-bold">•</span>
                    <span>Your consultation is completely free with no obligation to purchase</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-amber-600 font-bold">•</span>
                    <span>We respect your privacy and will never share your information</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-amber-600 font-bold">•</span>
                    <span>Bring any current insurance documents if you have them</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-amber-600 font-bold">•</span>
                    <span>Choose phone, video, or in-person consultation—whatever works best for you</span>
                  </li>
                </ul>
              </div>
            </div>
          </Card>

          {/* CTA Buttons */}
          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => (window.location.href = "/")}
              variant="outline"
              className="px-8 py-6 text-base font-bold"
            >
              Return to Home
            </Button>
            <a href={`tel:${LARRY_INFO.phone}`}>
              <Button className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white font-bold py-6 px-8 text-base">
                <Phone className="w-5 h-5 mr-2" />
                Call Larry Now
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 bg-muted/30 border-t border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-8">Why Clients Trust Larry</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-3xl font-extrabold text-primary mb-2">40+</p>
              <p className="text-sm text-muted-foreground">Years of Medicare Expertise</p>
            </div>
            <div>
              <p className="text-3xl font-extrabold text-primary mb-2">2</p>
              <p className="text-sm text-muted-foreground">States Licensed (OK & TX)</p>
            </div>
            <div>
              <p className="text-3xl font-extrabold text-primary mb-2">100%</p>
              <p className="text-sm text-muted-foreground">No-Pressure Consultations</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
