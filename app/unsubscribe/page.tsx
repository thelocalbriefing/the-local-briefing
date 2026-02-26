'use client';

import { useState } from 'react';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';

export default function UnsubscribePage() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    // Google Form Configuration
    // ID: 1FAIpQLSfZPzrZBbfd4EUSjCPO5u5MpXDAgh3fDoyyJGjTbSDLvsSTbw
    const GOOGLE_FORM_ACTION_URL = "https://docs.google.com/forms/d/e/1FAIpQLSfZPzrZBbfd4EUSjCPO5u5MpXDAgh3fDoyyJGjTbSDLvsSTbw/formResponse";
    const EMAIL_ENTRY_ID = "entry.333009615";
    
    try {
        const formData = new FormData();
        formData.append(EMAIL_ENTRY_ID, email);
        
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
        console.error('Unsubscribe error:', error);
        setStatus('error');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />

      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg border border-gray-100">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              Unsubscribe
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              We're sorry to see you go. Enter your email below to be removed from The Local Briefing.
            </p>
          </div>

          {status === 'success' ? (
            <div className="rounded-md bg-green-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-green-800">
                    You have been unsubscribed.
                  </p>
                </div>
              </div>
              <div className="mt-4 text-center">
                <a href="/" className="text-sm font-medium text-green-600 hover:text-green-500">
                  Return to Home
                </a>
              </div>
            </div>
          ) : (
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <label htmlFor="email-address" className="sr-only">Email address</label>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                    status === 'loading' ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
                  } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200`}
                >
                  {status === 'loading' ? 'Processing...' : 'Unsubscribe'}
                </button>
              </div>

              {status === 'error' && (
                <p className="text-center text-sm text-red-600">
                  Something went wrong. Please try again.
                </p>
              )}
            </form>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
