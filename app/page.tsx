import Link from 'next/link';
//import { VideoCamera, Graph, Lock, Globe } from 'cloudflare/component-icon';

const features = [
  {
    title: 'Cloudflare Stream',
    description: 'Manage and stream your videos with Cloudflare Stream',
    href: '/videos',
    icon: '📹',
  },
  {
    title: 'Analytics',
    description: 'Visualize your Cloudflare analytics using GraphQL technology',
    href: '#',
    icon: '📈',
  },
  {
    title: 'HMAC Signature',
    description: 'Craft and debug HMAC signatures with Cloudflare Firewall',
    href: '#',
    icon: '🔐',
  },
  {
    title: 'Cloudflare Network',
    description: 'Navigate Cloudflare network of POP',
    href: '#',
    icon: '🌐',
  },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-cf-blue to-cf-orange py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-cf-dark dark:text-white sm:text-5xl md:text-6xl">
              Welcome to{' '}
              <Link
                href="https://developers.cloudflare.com/"
                className="text-cf-orange"
              >
                Cloudflare
              </Link>{' '}
              Toolbox!
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-cf-dark dark:text-white sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              A comprehensive toolbox for Cloudflare features and products
            </p>
          </div>
        </div>
      </div>

      {/* Feature Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <Link
              key={feature.title}
              href={feature.href}
              className="block group"
            >
              <div className="h-full rounded-lg border border-gray-200 dark:border-gray-700 p-6 transition-shadow hover:shadow-cf-hover bg-white dark:bg-gray-800">
                {feature.icon}
                <h3 className="text-lg font-semibold text-cf-dark dark:text-white group-hover:text-cf-orange">
                  {feature.title}
                </h3>
                <p className="mt-2 text-cf-gray dark:text-gray-300">
                  {feature.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
