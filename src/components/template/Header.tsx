"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { List } from "@phosphor-icons/react";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="flex justify-between items-center p-4 bg-[#D2E6EF] shadow-md sticky top-0 z-50">
      <div>
        <Image src="/images/logo.svg" width={180} height={160} alt="logo" />
      </div>
      <nav className="hidden md:flex items-center gap-10 mr-10">
        <Link href="/" passHref>
          <p className="hover:text-blue-500 hover:underline cursor-pointer">
            Home
          </p>
        </Link>
        <Link href="/about" passHref>
          <p className="hover:text-blue-500 hover:underline cursor-pointer">
            Sobre
          </p>
        </Link>
        <Link href="/contactUs" passHref>
          <p className="hover:text-blue-500 hover:underline cursor-pointer">
            Fale Conosco
          </p>
        </Link>
      </nav>
      <button
        className="md:hidden text-blue-500"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <List size={32} />
      </button>
      {menuOpen && (
        <nav className="absolute top-16 left-0 w-full bg-[#D2E6EF] shadow-md flex flex-col items-center gap-4 py-4 md:hidden">
          <Link href="/" passHref>
            <p
              className="hover:text-blue-500 hover:underline cursor-pointer"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </p>
          </Link>
          <Link href="/about" passHref>
            <p
              className="hover:text-blue-500 hover:underline cursor-pointer"
              onClick={() => setMenuOpen(false)}
            >
              Sobre
            </p>
          </Link>
          <Link href="/contactUs" passHref>
            <p
              className="hover:text-blue-500 hover:underline cursor-pointer"
              onClick={() => setMenuOpen(false)}
            >
              Fale Conosco
            </p>
          </Link>
        </nav>
      )}
    </header>
  );
};

export default Header;
