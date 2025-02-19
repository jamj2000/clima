"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";



export default function Menu() {
  const pathname = usePathname()

  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen)
 

  return (
    <div>
      <div className="flex items-center">
        <button
          onClick={toggleMenu}
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-900 rounded-lg lg:hidden bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-900 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded={menuOpen}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className={`w-5 h-5 ${menuOpen ? "hidden" : ""}`}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
          <svg
            className={`w-5 h-5 ${menuOpen ? "" : "hidden"}`}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <div
        onClick={toggleMenu}       
        className={`${menuOpen ? "" : "hidden"
          } z-10 absolute right-0 w-screen lg:relative lg:block lg:w-auto`}
        id="navbar-default"
      >
        <ul
          className="w-full md:absolute md:top-[50] lg:static font-medium flex flex-col p-4 lg:p-0 mt-4 border border-gray-100 rounded-sm bg-sky-400 lg:flex-row lg:space-x-8  lg:mt-0 lg:border-0 dark:bg-gray-800 dark:border-gray-700">

          <li>
            <Link
              href="/proyectos"
              className={`
                ${pathname.startsWith('/proyectos') && 'bg-blue-700 text-pretty'} 
                block py-2 px-3 text-white hover:text-white hover:outline hover:outline-gray-200 hover:outline-1 rounded  md:border-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent
                `}
            >
              Proyectos
            </Link>
          </li>

          <li>
            <Link
              href="/recintos"
              className={`
                ${pathname.startsWith('/recintos') && 'bg-blue-700'}
                block py-2 px-3 text-white hover:text-white hover:outline hover:outline-gray-200 hover:outline-1 rounded  md:border-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent
                `}
            >
              Recintos
            </Link>
          </li>

          <li>
            <Link
              href="/equipos"
              className={`
                ${pathname.startsWith('/equipos') && 'bg-blue-700'} 
                block py-2 px-3 text-white hover:text-white hover:outline hover:outline-gray-200 hover:outline-1 rounded  md:border-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent
              `}
            >
              Equipos
            </Link>
          </li>

          <li>
            <Link
              href="/about"
              className={`
                ${pathname.startsWith('/about') && 'bg-blue-700'} 
                block py-2 px-3 text-white hover:text-white hover:outline hover:outline-gray-200 hover:outline-1 rounded  md:border-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent
              `}
            >
              Sobre mí
            </Link>
          </li>

        </ul>
      </div>
    </div>
  );
}

