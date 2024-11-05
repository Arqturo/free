"use client"; 
import { useState } from "react";
import Link from 'next/link';
import Image from "next/image";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BookOpenIcon, UserGroupIcon, EnvelopeIcon, HomeIcon, UserCircleIcon } from '@heroicons/react/16/solid';
import { MdAppRegistration } from "react-icons/md";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  const items = [
    { title: "Inicio", icon: <HomeIcon className='size-5 mr-1 text-gray-600 ' />, lin: "/" },
    { title: "Nosotros", icon: <UserGroupIcon className='size-6 mr-1 text-gray-600' />, lin: "#nosotros" },
    { title: "Noticias", icon: <BookOpenIcon className='size-5 mr-1 text-gray-600' />, lin: "/noticias" },
    { title: "Contacto", icon: <EnvelopeIcon className='size-5 mr-1 text-gray-600 '/>, lin: "#contacto" },
    { title: "Iniciar Sesion", icon: <UserCircleIcon className='size-5 mr-1 '/>, lin: "/auth/signin" },
    { title: "Inscripcion", icon: <MdAppRegistration className='size-5 mr-1 '/>, lin: "/inscripcion" }
  ];

  const isHomePage = window.location.pathname === "/"; // Check if on home page

  const handleScroll = (e, link) => {
    e.preventDefault();
    if (isHomePage) {
      const section = document.querySelector(link);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.location.href = `/${link}`; // Redirect to home with section if not on home
    }
  };

  return (
    <>
      <nav className="bg-white shadow-md sticky top-0 z-10">
        <section className="w-full mx-auto px-4 sm:px-2 lg:px-2">
          <section className="px-2 flex justify-between h-16">
            <section className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-2xl font-bold text-gray-800">
                <Image 
                  src="/file.png"
                  alt="Logo CAPROLUZ"
                  width={130}
                  height={43}
                  priority
                />  
              </Link>
            </section>

            <ul className="hidden md:flex md:items-center md:justify-end md:space-x-2">
              {items.map((item) => (
                <li key={item.title} className="mx-[2px]">
                  {item.lin.startsWith('#') ? (
                    <a href={item.lin} className="flex items-center" onClick={(e) => handleScroll(e, item.lin)}>
                      {item.icon}{item.title}
                    </a>
                  ) : (
                    <Link href={item.lin} className="flex text-gray-600 hover:text-gray-900 py-2 rounded-md text-sm font-medium">
                      {item.icon}{item.title}
                    </Link>
                  )}
                </li>
              ))}
            </ul>

            <section className="md:hidden flex items-center">
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" onClick={toggleMenu}>
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-full p-0">
                  <ul className="flex flex-col items-center justify-center h-full bg-slate-100">
                    {items.map((item) => (
                      <li key={item.title} className="px-3 py-1">
                        <Link
                          href={item.lin}
                          className="flex items-center text-gray-600 hover:text-gray-900 px-3 py-4 text-lg font-medium w-full text-center"
                          onClick={(e) => {
                            if (item.lin.startsWith('#')) {
                              handleScroll(e, item.lin);
                            }
                          }}
                        >
                          {item.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </SheetContent>
              </Sheet>
            </section>
          </section>
        </section>
      </nav>
    </>
  );  
}
