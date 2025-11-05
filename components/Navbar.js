"use client";

import { usePathname } from "next/navigation";
import TransitionLink from "./TransitionLink";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className='w-full bg-white'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center h-16'>
          <div className='flex space-x-8'>
            <TransitionLink
              href='/'
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                pathname === "/"
                  ? "text-black font-semibold"
                  : "text-zinc-600 hover:text-black"
              }`}
            >
              Home
            </TransitionLink>
            <TransitionLink
              href='/about'
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                pathname === "/about"
                  ? "text-black font-semibold"
                  : "text-zinc-600 hover:text-black"
              }`}
            >
              About
            </TransitionLink>
          </div>
        </div>
      </div>
    </nav>
  );
}
