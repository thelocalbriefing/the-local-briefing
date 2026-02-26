// app/components/SubscribeForm.tsx
'use client';

import { useState } from 'react';

const CITIES = [
  { id: 'Englewood, CO', label: 'Englewood, CO' },
  { id: 'Parker, CO', label: 'Parker, CO' },
  { id: 'Austin, TX', label: 'Austin, TX' },
  { id: 'Portland, ME', label: 'Portland, ME' },
];

export default function SubscribeForm() {
  const [email, setEmail] = useState('');
  const [selectedCity, setSelectedCity] = useState(CITIES[0].id);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const GOOGLE_FORM_ACTION_URL = "https://docs.google.com/forms/d/e/1FAIpQLScXk5fAHeMHA5dRJc37ukPAVWIJQET1YpjxS8nrJ_tPBAoXSQ/formResponse";
  const EMAIL_ENTRY_ID = "entry.2133701954";
  const CITY_ENTRY_ID = "entry.328135518";
  const FIRST_NAME_ENTRY_ID = "entry.391375456";
  const LAST_NAME_ENTRY_ID = "entry.79436958";

  // When form is submitted, we manually show "loading" then "success"
  // The actual form submission happens via the target="hidden_iframe"
  const handleSubmit = (e: React.FormEvent) => {
    // We let the form submit naturally to the iframe
    setStatus('loading');
    
    // Simulate success after a short delay since we can't detect cross-origin iframe load
    setTimeout(() => {
      setStatus('success');
      setEmail('');
    }, 1500);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Hidden Iframe to catch the form submission */}
      <iframe 
        name="hidden_iframe" 
        id="hidden_iframe" 
        style={{display:'none'}}
        title="Form Submission Target"
      ></iframe>

      <form 
        action={GOOGLE_FORM_ACTION_URL} 
        method="POST" 
        target="hidden_iframe"
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-2xl p-8 space-y-6 border border-gray-100"
      >
        <div className="space-y-2 text-center">
          <h3 className="text-xl font-semibold text-gray-900">Get the Weekly Update</h3>
          <p className="text-sm text-gray-500">
            One email every Friday morning. No spam, ever.
          </p>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                First Name <span className="text-gray-400 font-normal">(Optional)</span>
              </label>
              <input
                type="text"
                name={FIRST_NAME_ENTRY_ID}
                id="firstName"
                placeholder="Jane"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-2 px-3 border"
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                Last Name <span className="text-gray-400 font-normal">(Optional)</span>
              </label>
              <input
                type="text"
                name={LAST_NAME_ENTRY_ID}
                id="lastName"
                placeholder="Doe"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-2 px-3 border"
              />
            </div>
          </div>

          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
              Select Your City
            </label>
            <select
              name={CITY_ENTRY_ID}
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
              name={EMAIL_ENTRY_ID}
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
