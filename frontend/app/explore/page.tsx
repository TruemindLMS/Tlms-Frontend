'use client';

import { useState, useEffect, useRef } from 'react';
import { X, Search, ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface ExploreDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

const exploreRoles = [
  "UI/UX Design",
  "Frontend Development",
  "Backend Development",
  "Product Management",
  "Data Science",
  "DevOps Engineering",
  "Cloud Architecture",
  "Mobile Development",
];

const categories = [
  "Information Technology",
  "Data Science",
  "Personal Development",
  "Business",
  "Marketing",
  "Design",
  "Cybersecurity",
  "Artificial Intelligence",
];

const skills = ["Python", "Excel", "SQL", "Machine Learning", "JavaScript", "React", "Node.js", "AWS"];

const certificates = [
  "Business",
  "Computer Science",
  "Data Science",
  "Information Technology",
  "Project Management",
  "Digital Marketing",
  "Cloud Computing",
  "Cybersecurity",
];

const degrees = ["Bachelor's Degree", "Master's Degree", "Diploma", "Certificate Program"];

export default function ExploreDropdown({ isOpen, onClose }: ExploreDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filterItems = (items: string[]) => {
    if (!searchQuery) return items;
    return items.filter(item =>
      item.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  return (
    <>
      {/* Backdrop with blur */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Dropdown Panel */}
      <div
        ref={dropdownRef}
        className="fixed top-16 left-0 right-0 z-50 max-h-[85vh] overflow-y-auto animate-slide-down"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">

            {/* Header with search and close */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-white/50">
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    placeholder="Search explore options..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    autoFocus
                  />
                </div>
              </div>
              <button
                onClick={onClose}
                className="ml-4 p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            {/* Content Grid */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

                {/* Explore Roles */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center justify-between">
                    Explore Roles
                    <ChevronRight size={16} className="text-gray-400" />
                  </h3>
                  <ul className="space-y-2">
                    {filterItems(exploreRoles).slice(0, 8).map((item) => (
                      <li key={item}>
                        <Link
                          href={`/explore`}
                          onClick={onClose}
                          className="text-gray-600 text-sm hover:text-primary-600 hover:underline transition-colors block py-1"
                        >
                          {item}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  {filterItems(exploreRoles).length > 8 && (
                    <Link
                      href="/explore"
                      onClick={onClose}
                      className="mt-3 text-sm text-primary-600 hover:underline block"
                    >
                      View all roles →
                    </Link>
                  )}
                </div>

                {/* Categories */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center justify-between">
                    Categories
                    <ChevronRight size={16} className="text-gray-400" />
                  </h3>
                  <ul className="space-y-2">
                    {filterItems(categories).slice(0, 8).map((item) => (
                      <li key={item}>
                        <Link
                          href={`/explore`}
                          onClick={onClose}
                          className="text-gray-600 text-sm hover:text-primary-600 hover:underline transition-colors block py-1"
                        >
                          {item}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  {filterItems(categories).length > 8 && (
                    <Link
                      href="/explore"
                      onClick={onClose}
                      className="mt-3 text-sm text-primary-600 hover:underline block"
                    >
                      View all categories →
                    </Link>
                  )}
                </div>

                {/* Trending Skills */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center justify-between">
                    Trending Skills
                    <ChevronRight size={16} className="text-gray-400" />
                  </h3>
                  <ul className="space-y-2">
                    {filterItems(skills).slice(0, 8).map((item) => (
                      <li key={item}>
                        <Link
                          href={`/explore`}
                          onClick={onClose}
                          className="text-gray-600 text-sm hover:text-primary-600 hover:underline transition-colors block py-1"
                        >
                          {item}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  {filterItems(skills).length > 8 && (
                    <Link
                      href="/explore"
                      onClick={onClose}
                      className="mt-3 text-sm text-primary-600 hover:underline block"
                    >
                      View all skills →
                    </Link>
                  )}
                </div>

                {/* Certificates & Degrees */}
                <div>
                  <div className="mb-6">
                    <h3 className="font-semibold text-gray-900 mb-3 flex items-center justify-between">
                      Certificates
                      <ChevronRight size={16} className="text-gray-400" />
                    </h3>
                    <ul className="space-y-2">
                      {filterItems(certificates).slice(0, 4).map((item) => (
                        <li key={item}>
                          <Link
                            href={`/explore`}
                            onClick={onClose}
                            className="text-gray-600 text-sm hover:text-primary-600 hover:underline transition-colors block py-1"
                          >
                            {item}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3 flex items-center justify-between">
                      Degrees
                      <ChevronRight size={16} className="text-gray-400" />
                    </h3>
                    <ul className="space-y-2">
                      {filterItems(degrees).slice(0, 4).map((item) => (
                        <li key={item}>
                          <Link
                            href={`/explore`}
                            onClick={onClose}
                            className="text-gray-600 text-sm hover:text-primary-600 hover:underline transition-colors block py-1"
                          >
                            {item}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 pt-4 border-t border-gray-100">
                    <Link
                      href="/signup"
                      onClick={onClose}
                      className="block text-sm text-gray-700 hover:text-primary-600 transition-colors"
                    >
                      Prepare for an exam →
                    </Link>
                  </div>
                </div>
              </div>

              {/* Bottom CTA */}
              <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                <p className="text-gray-600 text-sm mb-3">Not sure where to start?</p>
                <Link
                  href="/signin"
                  onClick={onClose}
                  className="inline-flex items-center gap-2 px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition"
                >
                  Get Personalized Recommendations
                  <ChevronRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-down {
          animation: slideDown 0.2s ease-out;
        }
      `}</style>
    </>
  );
}