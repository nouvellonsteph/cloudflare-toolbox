'use client';

import { useState } from 'react';
import { useVideoStore } from '@/lib/store';
import VideoGrid from './VideoGrid';
import Link from 'next/link';

export default function VideosPage() {
  const { apiToken, setApiToken } = useVideoStore();
  const [inputToken, setInputToken] = useState(apiToken);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setApiToken(inputToken);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-cf-dark dark:text-white mb-8">
        Video Management
      </h1>
      <p className="text-cf-dark dark:text-white mb-8">
              Input an <Link
                href="https://developers.cloudflare.com/fundamentals/api/get-started/create-token/"
                className="text-cf-orange"
              >
                API token
              </Link>{' '} allowing access to Cloudflare stream (make it read-only to be on the safe-side) and visualize all the videos existing on the account. The token won't be stored anywhere but your own machine
      </p>

      <form onSubmit={handleSubmit} className="mb-8">
        <div className="max-w-xl">
          <label
            htmlFor="apiToken"
            className="block text-sm font-medium text-cf-dark dark:text-white"
          >
            API Token
          </label>
          <div className="mt-1 flex rounded-md shadow-sm">
            <input
              type="password"
              name="apiToken"
              id="apiToken"
              value={inputToken}
              onChange={(e) => setInputToken(e.target.value)}
              className="text-cf-gray flex-1 min-w-0 block w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-cf-orange focus:border-cf-orange sm:text-sm"
              placeholder="Enter your Cloudflare API token"
            />
            <button
              type="submit"
              className="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-cf-orange hover:bg-cf-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cf-orange"
            >
              Save
            </button>
          </div>
        </div>
      </form>

      {apiToken ? (
        <VideoGrid />
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-cf-gray">Enter your API token to view videos</p>
        </div>
      )}
    </div>
  );
}
