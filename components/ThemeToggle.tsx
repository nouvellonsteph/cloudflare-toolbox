'use client';

import { useTheme } from './ThemeProvider';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cf-orange bg-gray-200 dark:bg-gray-700"
      role="switch"
      aria-checked={theme === 'dark'}
    >
      <span className="sr-only">Toggle theme</span>
      <span
        className={`${
          theme === 'dark' ? 'translate-x-6' : 'translate-x-1'
        } inline-block w-4 h-4 transform rounded-full transition-transform duration-200 ease-in-out ${
          theme === 'dark' ? 'bg-cf-orange' : 'bg-white'
        }`}
      >
        {theme === 'dark' ? (
          <span className="text-[10px] flex items-center justify-center">🌙</span>
        ) : (
          <span className="text-[10px] flex items-center justify-center">☀️</span>
        )}
      </span>
    </button>
  );
}