import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { FORMSPREE_BOOKING_ENDPOINT, SUNFIRE_PURL_URL } from '@/const';

export default function BookingForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    zipCode: '',
    state: 'OK' as 'OK' | 'TX',
    insuranceType: 'medicare',
    preferredDate: '',
    preferredTime: '',
    notes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingCreated, setBookingCreated] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fullName || !formData.email || !formData.phone || !formData.zipCode) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(FORMSPREE_BOOKING_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          fullName: formData.fullName.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          zipCode: formData.zipCode.trim(),
          state: formData.state,
          insuranceType: formData.insuranceType,
          preferredDate: formData.preferredDate || undefined,
          preferredTime: formData.preferredTime || undefined,
          notes: formData.notes?.trim() || undefined,
        }),
      });

      if (!response.ok) {
        throw new Error('Submission failed');
      }

      if (formData.insuranceType === 'medicare') {
        toast.success('Request received! Redirecting to complete your SOA...');
        setBookingCreated(true);
        setTimeout(() => {
          window.location.href = SUNFIRE_PURL_URL;
        }, 1500);
      } else {
        toast.success("Request sent! We'll reach out to confirm your appointment shortly.");
        setBookingCreated(true);
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          zipCode: '',
          state: 'OK',
          insuranceType: 'medicare',
          preferredDate: '',
          preferredTime: '',
          notes: '',
        });
      }
    } catch (err) {
      toast.error('Failed to send your request. Please call or text us instead.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="p-8 border-2 border-border">
      <h2 className="text-2xl font-bold mb-6 text-foreground">Schedule Your Free Consultation</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Full Name *
          </label>
          <Input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="John Doe"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Email Address *
          </label>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="john@example.com"
            required
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Phone Number *
          </label>
          <Input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="(580) 364-2266"
            required
          />
        </div>

        {/* ZIP Code */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            ZIP Code *
          </label>
          <Input
            type="text"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleChange}
            placeholder="73701"
            pattern="\d{5}"
            maxLength={5}
            required
          />
        </div>

        {/* State */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            State *
          </label>
          <select
            name="state"
            value={formData.state}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
            required
          >
            <option value="OK">Oklahoma</option>
            <option value="TX">Texas</option>
          </select>
        </div>

        {/* Insurance Type */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Insurance Type *
          </label>
          <select
            name="insuranceType"
            value={formData.insuranceType}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
            required
          >
            <option value="medicare">Medicare</option>
            <option value="individual">Individual/ACA</option>
            <option value="group">Group Plans</option>
          </select>
        </div>

        {/* Preferred Date & Time */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Preferred Date
          </label>
          <Input
            type="date"
            name="preferredDate"
            value={formData.preferredDate}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Preferred Time
          </label>
          <Input
            type="time"
            name="preferredTime"
            value={formData.preferredTime}
            onChange={handleChange}
          />
        </div>
        <p className="text-xs text-muted-foreground -mt-4">
          Your preferred date/time is a request, not a guaranteed booking — we'll confirm by phone or email.
        </p>

        {/* Notes */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Additional Notes
          </label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Tell us about your insurance needs..."
            rows={4}
            className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
          />
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isSubmitting || bookingCreated}
          className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-2 sm:py-3 rounded-lg transition-colors text-sm sm:text-base leading-tight sm:leading-normal"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Sending...
            </>
          ) : bookingCreated ? (
            formData.insuranceType === 'medicare' ? 'Redirecting...' : 'Request Sent'
          ) : formData.insuranceType === 'medicare' ? (
            <span className="block">Request Appointment &<br className="sm:hidden" /> Complete Document Checklist</span>
          ) : (
            'Request Consultation'
          )}
        </Button>

        {/* Medicare Information Section */}
        {formData.insuranceType === "medicare" && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
            <h3 className="font-semibold text-blue-900 mb-2">What happens next?</h3>
            <p className="text-sm text-blue-800 leading-relaxed">
              We'll follow up to confirm your requested time. To meet federal CMS regulations for our upcoming call, please click the button above to open my secure Spark Storefront. Once there, click "Shop Plans" or "Compare Plans" to trigger the quick electronic Scope of Appointment (SOA) form. Completing this takes less than a minute, gives me permission to share Medicare options with you, and does not obligate you to enroll in any plan.
            </p>
          </div>
        )}
        <p className="text-xs text-muted-foreground text-center">
          * Required fields. We respect your privacy and will never share your information.
        </p>
      </form>
    </Card>
  );
}
