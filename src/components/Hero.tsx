import { Plane } from 'lucide-react';

export function Hero() {
  return (
    <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-teal-600 text-white py-20 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <div className="flex justify-center mb-6">
          <div className="bg-white/10 backdrop-blur-sm p-4 rounded-full">
            <Plane className="w-12 h-12" />
          </div>
        </div>
        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
          Grow Your Travel Business
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
          Join Advitravels and connect with travelers actively seeking expert travel agents.
          Get qualified leads and expand your client base with our proven platform.
        </p>
      </div>
    </div>
  );
}
