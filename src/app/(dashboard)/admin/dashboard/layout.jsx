"use client"


import Navbar from "@/components/adminDashboard/Navbar"
import Aside from "@/components/adminDashboard/Aside";

export default function DashboardLayout({ children }) {
    return <main className="flex h-screen flex-col">
        <Navbar/>
        <section className="flex flex-1 overflow-hidden">
            <aside className="w-64 bg-gray-200 p-4 hidden md:block">
              <Aside />
            </aside>        
            
            <main className="flex-1 justify-center overflow-auto p-4">
                {/* Contenido principal aquí */}
                {children}
              </main>
      </section>
        

        </main>
  }