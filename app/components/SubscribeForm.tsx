// app/components/SubscribeForm.tsx
'use client';

import { useState } from 'react';

const CITIES = [
  { id: 'Englewood', label: 'Englewood, CO' },
  { id: 'Parker', label: 'Parker, CO' },
  { id: 'Austin', label: 'Austin, TX' },
  { id: 'Portland, ME', label: 'Portland, ME' },
];

// Main Signup Form Configuration
// Form ID: 1FAIpQLScXfR9-J-fJ-fJ-fJ-fJ-fJ-fJ-fJ (Example - Need real one)
// Using a placeholder for now, user needs to provide the real "Subscribe" form details
// Entry IDs needed: Email, City

export default function SubscribeForm() {
  const [email, setEmail] = useState('');
  const [selectedCity, setSelectedCity] = useState(CITIES[0].id);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    // Google Form Configuration
    // Form ID: 1FAIpQLScXk5fAHeMHA5dRJc37ukPAVWIJQET1YpjxS8nrJ_tPBAoXSQ
    const GOOGLE_FORM_ACTION_URL = "https://docs.google.com/forms/d/e/1FAIpQLScXk5fAHeMHA5dRJc37ukPAVWIJQET1YpjxS8nrJ_tPBAoXSQ/formResponse";
    const EMAIL_ENTRY_ID = "entry.2133701954";
    const CITY_ENTRY_ID = "entry.328135518";

    try {
        const formData = new FormData();
        formData.append(EMAIL_ENTRY_ID, email);
        formData.append(CITY_ENTRY_ID, selectedCity);
        
        // Mode 'no-cors' is required for Google Forms to avoid CORS errors in browser
        await fetch(GOOGLE_FORM_ACTION_URL, {
            method: "POST",
            body: formData,
            mode: "no-cors"
        });
        
        // Google Forms with no-cors doesn't return a readable status, so we assume success if no error thrown
        setStatus('success');
        setEmail('');
    } catch (error) {
        console.error('Subscribe error:', error);
        setStatus('error');
    }
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
