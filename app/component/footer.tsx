"use client";
import { Button, Heading, Input, Text } from "@medusajs/ui";
import Link from "next/link";

const navigation = {
  solutions: [],
  support: [],
  company: [],
  legal: [
    { name: "Privacy", href: "/privacy" },
    { name: "Terms", href: "/terms" },
  ],
  social: [
    {
      name: "Twitter",
      href: "https://twitter.com/aidetective_xyz",
      icon: (props: any) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
        </svg>
      ),
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/company/aidetective/",
      icon: (props: any) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path d="M21.35 0H2.65C1.2 0 0 1.2 0 2.65v18.7C0 22.8 1.2 24 2.65 24h18.7C22.8 24 24 22.8 24 21.35V2.65C24 1.2 22.8 0 21.35 0zM7.53 20.06H4.06V9.35h3.47v10.7zM5.8 7.97a2.53 2.53 0 1 1 0-5.06 2.53 2.53 0 0 1 0 5.06zm14.23 12.1h-3.47v-5.65c0-1.36-.02-3.1-1.9-3.1-1.9 0-2.19 1.48-2.19 3.02v5.72H8.2V9.35h3.36v1.6h.05c.47-.9 1.64-1.85 3.32-1.85 3.54 0 4.19 2.33 4.19 5.35v6.05z" />
        </svg>
      ),
    },
  ],
};

export function Footer() {
  return (
    <footer className="bg-white" aria-labelledby="footer-heading">
      <div className="mx-auto container sm:px-0 px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
        <div className="mt-8 border-t border-gray-900/10 pt-8 md:flex md:items-center md:justify-between">
          <p className="mt-8 leading-5 text-gray-700 md:order-1 md:mt-0">
            AI Detective &copy; {new Date().getFullYear()}
          </p>
          <div className="flex space-x-6 md:order-2">
            {navigation.legal.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-600 hover:text-gray-700"
              >
                <span>{item.name}</span>
              </Link>
            ))}
          </div>
          <div className="flex space-x-6 md:order-2">
            {navigation.social.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-500 hover:text-gray-600"
              >
                <span className="sr-only">{item.name}</span>
                <item.icon className="h-6 w-6" aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
