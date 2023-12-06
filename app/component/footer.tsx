import { Linkedin, Twitter } from "@medusajs/icons";
import { Text } from "@medusajs/ui";
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
      href: "https://twitter.com/AiDetective_xyz",
      icon: () => <Twitter />,
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/company/aidetective/",
      icon: () => <Linkedin />,
    },
  ],
};

export function Footer() {
  return (
    <footer aria-labelledby="footer-heading">
      <div className="pt-12 md:flex md:items-center md:justify-between">
        <Text
          className="mt-8 leading-5 text-xs md:order-1 md:mt-0 text-gray-700 hover:text-gray-800"
          style={{ fontSize: "0.8rem" }}
        >
          Feature/Edits - hello@aidetective.xyz
        </Text>
        <div className="flex space-x-6 md:order-2 ">
          {navigation.legal.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-gray-700 hover:text-gray-800"
              style={{ fontSize: "0.7rem" }}
            >
              <Text className="text-xs">{item.name}</Text>
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
              <item.icon aria-hidden="true" />
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
