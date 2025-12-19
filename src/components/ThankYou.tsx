import { CheckCircle, ArrowRight } from 'lucide-react';

export function ThankYou() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 flex items-center justify-center px-6">
      <div className="bg-white rounded-2xl shadow-2xl p-12 max-w-2xl text-center">
        <div className="flex justify-center mb-6">
          <div className="bg-green-100 p-4 rounded-full">
            <CheckCircle className="w-16 h-16 text-green-600" />
          </div>
        </div>

        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Thank You!
        </h1>

        <p className="text-xl text-gray-600 mb-8">
          Your application has been received successfully. Our team will review your agency details and get back to you within 24 hours with next steps to start receiving quality leads.
        </p>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h2 className="font-semibold text-gray-900 mb-2">What happens next?</h2>
          <ul className="text-left space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">1.</span>
              <span>Our team reviews your agency details and experience</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">2.</span>
              <span>We verify your credentials and set up your profile</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">3.</span>
              <span>You'll receive onboarding information and start getting qualified leads within 24 hours</span>
            </li>
          </ul>
        </div>

        <p className="text-gray-600 mb-6">
          Check your email for confirmation and onboarding details.
        </p>

        <button
          onClick={() => window.location.href = '/'}
          className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-teal-600 text-white font-semibold py-3 px-8 rounded-lg hover:from-blue-700 hover:to-teal-700 transition"
        >
          <span>Back to Home</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
