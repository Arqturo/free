"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react"; // Ensure you're importing the icon you want to use
import Aside from "./Aside"; // Assuming this is your sidebar component
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"; // Adjust based on your UI library

export default function NavDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State for sidebar

  return (
    <div className="flex items-center justify-between rounded-sm w-full h-16 bg-gradient-to-b from-sky-700 to-blue-500 px-6">
      {/* Sidebar Trigger */}
      <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" className="mr-2 md:hidden">
            <Menu className="h-6 w-6 text-white" />
            <span className="sr-only">Toggle sidebar</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[240px] sm:w-[300px]">
          <Aside /> {/* Your sidebar component */}
        </SheetContent>
      </Sheet>

      <div className="flex flex-col pr-3 text-center">
        <h3 className="text-white">Bienvenido</h3>
      </div>

      <div className="group relative inline-block items-center cursor-pointer">
        <svg className="w-10 px-1 h-10 text-gray-200 border-solid border-2 border-slate-300 rounded-full" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
        </svg>
        <div className="hidden group-hover:block absolute right-0 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" tabIndex={-1}>
          <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md" role="menuitem" tabIndex={-1}>
            Perfil
          </a>
          <a href="/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md" role="menuitem" tabIndex={-1}>
            Cerrar Sesión
          </a>
        </div>
      </div>
    </div>
  );
}