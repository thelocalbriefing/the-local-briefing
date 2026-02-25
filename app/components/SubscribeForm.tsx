// app/components/SubscribeForm.tsx
'use client';

import { useState } from 'react';

const CITIES = [
  { id: 'englewood', label: 'Englewood, CO' },
  { id: 'parker', label: 'Parker, CO' },
  { id: 'austin', label: 'Austin, TX' },
  { id: 'portland_me', label: 'Portland, ME' },
];

export default function SubscribeForm() {
  const [email, setEmail] = useState('');
  const [selectedCity, setSelectedCity] = useState(CITIES[0].id);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    // Simulate API call for now (we'll implement the real one later)
    setTimeout(() => {
      setStatus('success');
      setEmail('');
    }, 1500);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="bg-white shadow-xl rounded-2xl p-8 space-y-6 border border-gray-100">
        <div className="space-y-2 text-center">
          <h3 className="text-xl font-semibold text-gray-900">Get the Weekly Update</h3>
          <p className="text-sm text-gray-500">
            One email every Friday morning. No spam, ever.
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
              Select Your City
            </label>
            <select
              id="city"
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-2 px-3 border"
            >
              {CITIES.map((city) => (
                <option key={city.id} value={city.id}>
                  {city.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-2 px-3 border"
            />
          </div>

          <button
            type="submit"
            disabled={status === 'loading' || status === 'success'}
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white transition-colors duration-200 ${
              status === 'success'
                ? 'bg-green-600 hover:bg-green-700 cursor-default'
                : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
            }`}
          >
            {status === 'loading' ? 'Subscribing...' : status === 'success' ? 'You\'re In! 🎉' : 'Subscribe Free'}
          </button>
        </div>
        
        {status === 'success' && (
          <p className="text-sm text-green-600 text-center animate-fade-in">
            Check your inbox (or spam) for a confirmation!
          </p>
        )}
      </form>
    </div>
  );
}
