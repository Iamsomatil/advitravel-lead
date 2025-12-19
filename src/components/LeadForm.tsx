import { useState, FormEvent } from 'react';
import { Mail, Phone, User, Calendar, MessageSquare, Loader2 } from 'lucide-react';

interface LeadFormProps {
  onSuccess: () => void;
}

export function LeadForm({ onSuccess }: LeadFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone_number: '',
    agency_name: '',
    years_experience: '',
    specializations: '',
    consent_given: false,
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    if (!formData.consent_given) {
      setError('Please agree to the privacy policy to continue.');
      setIsSubmitting(false);
      return;
    }

    try {
      const urlParams = new URLSearchParams(window.location.search);
      const source = urlParams.get('source') || 'organic';

      // Send data to Make.com webhook
      const webhookResponse = await fetch('https://hook.us2.make.com/7q8t8vj9jk3j8tfininoe7pvaq8av3ts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          full_name: formData.full_name,
          email: formData.email,
          phone_number: formData.phone_number,
          agency_name: formData.agency_name,
          years_experience: formData.years_experience,
          specializations: formData.specializations,
          consent_given: formData.consent_given,
          source,
          submitted_at: new Date().toISOString(),
        }),
      });

      if (!webhookResponse.ok) {
        throw new Error('Failed to submit form. Please try again.');
      }

      onSuccess();
    } catch (err) {
      console.error('Error submitting lead:', err);
      setError('Failed to submit form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 max-w-2xl mx-auto -mt-16 relative z-10">
      <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
        Start Getting Quality Leads
      </h2>
      <p className="text-gray-600 mb-8 text-center">
        Join our network of professional travel agents and start receiving qualified leads from travelers worldwide.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="full_name" className="block text-sm font-medium text-gray-700 mb-2">
            Full Name *
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              id="full_name"
              required
              value={formData.full_name}
              onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
              className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              placeholder="John Doe"
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email Address *
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="email"
              id="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              placeholder="john@example.com"
            />
          </div>
        </div>

        <div>
          <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number *
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="tel"
              id="phone_number"
              required
              value={formData.phone_number}
              onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
              className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              placeholder="+1 (555) 123-4567"
            />
          </div>
        </div>

        <div>
          <label htmlFor="agency_name" className="block text-sm font-medium text-gray-700 mb-2">
            Agency Name *
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              id="agency_name"
              required
              value={formData.agency_name}
              onChange={(e) => setFormData({ ...formData, agency_name: e.target.value })}
              className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              placeholder="Your Travel Agency"
            />
          </div>
        </div>

        <div>
          <label htmlFor="years_experience" className="block text-sm font-medium text-gray-700 mb-2">
            Years of Experience *
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="number"
              id="years_experience"
              required
              min="0"
              value={formData.years_experience}
              onChange={(e) => setFormData({ ...formData, years_experience: e.target.value })}
              className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              placeholder="5"
            />
          </div>
        </div>

        <div>
          <label htmlFor="specializations" className="block text-sm font-medium text-gray-700 mb-2">
            Specializations
          </label>
          <div className="relative">
            <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <textarea
              id="specializations"
              rows={4}
              value={formData.specializations}
              onChange={(e) => setFormData({ ...formData, specializations: e.target.value })}
              className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
              placeholder="Tell us about your specialties (e.g., luxury travel, adventure tours, corporate travel, specific destinations...)"
            />
          </div>
        </div>

        <div className="flex items-start">
          <input
            type="checkbox"
            id="consent"
            required
            checked={formData.consent_given}
            onChange={(e) => setFormData({ ...formData, consent_given: e.target.checked })}
            className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="consent" className="ml-3 text-sm text-gray-600">
            I agree to be contacted by Advitravels and consent to the collection and processing of my personal data in accordance with the privacy policy. *
          </label>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-blue-600 to-teal-600 text-white font-semibold py-4 px-6 rounded-lg hover:from-blue-700 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Submitting...</span>
            </>
          ) : (
            <span>Join Our Network</span>
          )}
        </button>
      </form>
    </div>
  );
}
