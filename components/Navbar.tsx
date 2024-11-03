'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/videos', label: 'Stream' },
    { href: '/analytics', label: 'Analytics' },
    { href: '/hmac', label: 'HMAC signature' },
    { href: '/network', label: 'Cloudflare Network' },
  ];

  return (
    <nav className="fixed top-0 w-full bg-white dark:bg-gray-800 shadow-cf z-50 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-cf-orange font-bold text-xl">
                CloudApp
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={clsx(
                    'inline-flex items-center px-1 pt-1 border-b-2',
                    pathname === item.href
                      ? 'border-cf-orange text-cf-dark dark:text-white'
                      : 'border-transparent text-cf-gray hover:border-cf-gray dark:text-gray-300'
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}
