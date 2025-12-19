import { useState } from 'react';
import { Hero } from './components/Hero';
import { LeadForm } from './components/LeadForm';
import { ThankYou } from './components/ThankYou';

function App() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return <ThankYou />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50">
      <Hero />
      <div className="px-6 pb-20">
        <LeadForm onSuccess={() => setSubmitted(true)} />
      </div>

      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} Advitravels. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
