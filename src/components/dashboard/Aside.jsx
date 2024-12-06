"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import Aside from "./Aside";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheettwo";
import { useRouter } from "next/navigation";
import { ExternalRedirectButton } from "@/services/generalServices";

const domain = process.env.NEXT_PUBLIC_APP_DOMAIN_URL;

export default function NavDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = sessionStorage.getItem('token2');
    console.log('JWT Token:', token);

    if (token) {
      fetch('/api/user/getProfile', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
        .then(response => response.json())
        .then(data => {
          console.log('Profile Data:', data);
          if (data && data.full_name) {
            const fullName = data.full_name;
            setFirstName(fullName.split(" ")[0]);
          }
        })
        .catch(err => {
          console.error('Error fetching profile:', err);
          setError('Error fetching profile');
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setError('No token found');
      setLoading(false);
    }
  }, []);

  const handleLogout = () => {
    if (typeof sessionStorage !== "undefined") {
      sessionStorage.setItem('token2', 'none');
    }
    ExternalRedirectButton('/');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex items-center justify-between rounded-sm w-full h-16 caproluz_red px-6 fixed z-9999 sm:z-auto customnav">
      <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" className="mr-2 md:hidden">
            <Menu className="h-6 w-6 text-white" />
            <span className="sr-only">Toggle sidebar</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[240px] sm:w-[300px]">
          <Aside />
        </SheetContent>
      </Sheet>

      <div className="flex flex-col pr-3 text-center user__name">
        <h3 className="text-white">Bienvenido/a, {firstName}</h3>
      </div>

      <div className="group relative inline-block items-center cursor-pointer">
        <svg className="w-10 px-1 h-10 text-gray-200 border-solid border-2 border-slate-300 rounded-full" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
        </svg>
        <div className="hidden group-hover:block absolute right-0 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" tabIndex={-1}>
          {/* Profile Link with domain prepended */}
          <a href={`${domain}/dashboard/perfil`} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md" role="menuitem" tabIndex={-1}>
            Perfil
          </a>
          {/* Logout with domain prepended */}
          <a href="#" onClick={handleLogout} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md" role="menuitem" tabIndex={-1}>
            Cerrar Sesión
          </a>
        </div>
      </div>
    </div>
  );
}
