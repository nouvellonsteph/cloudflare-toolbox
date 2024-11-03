'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false); // State to control the side menu

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/videos', label: 'Stream' },
    { href: '/analytics', label: 'Analytics' },
    { href: '/hmac', label: 'HMAC signature' },
    { href: '/network', label: 'Cloudflare Network' },
  ];

  const toggleMenu = () => setIsOpen(!isOpen); // Toggle the side menu

  return (
    <nav className="fixed top-0 w-full bg-white dark:bg-gray-800 shadow-cf z-50 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-cf-orange font-bold text-xl">
                Cloudflare Toolbox
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
            <button
              className="ml-4 sm:hidden p-2 rounded-md text-cf-gray hover:text-cf-dark dark:hover:text-white"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {/* Icon for opening/closing the menu */}
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Side menu slider */}
      {isOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 z-40 sm:hidden" onClick={toggleMenu}>
          <div className="fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-800 shadow-lg z-50">
            <div className="flex flex-col p-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={clsx(
                    'block py-2 px-4 text-cf-gray hover:bg-gray-200 dark:hover:bg-gray-700',
                    pathname === item.href ? 'font-bold text-cf-dark dark:text-white' : ''
                  )}
                  onClick={toggleMenu} // Close menu on item click
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
