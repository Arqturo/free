"use client"
import { useState } from "react"
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { RxAvatar } from "react-icons/rx";
import { Button } from "@/components/ui/button"
import {Accordion,AccordionContent,AccordionItem,AccordionTrigger,} from "@/components/ui/accordion"  
import {DropdownMenu,DropdownMenuContent,DropdownMenuItem,DropdownMenuSeparator,DropdownMenuTrigger,} from "@/components/ui/dropdown-menu"


import { useRouter } from 'next/navigation'
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Edit, Home, LogOut, Menu, Settings, Users, NotebookPen , FileText, PlusCircle} from "lucide-react"
import Aside from "./Aside";

export default function Component() {

    const router = useRouter()

    const [isAvatarMenuOpen, setIsAvatarMenuOpen] = useState(false)
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)


  function cerrar() {
    sessionStorage.removeItem('token');
    router.push('/admin');
    }


  return (

    
    <>
      <header className="flex items-center justify-between p-4 bg-slate-200 border-b-2 border-slate-300 shadow-md">
        <section className="flex items-center">
            <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
                <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="mr-2 md:hidden">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Toggle sidebar</span>
                </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[240px] sm:w-[300px]">
                <div className="py-4">
                    <h2 className="text-lg font-semibold mb-4">Menu</h2>
                    <Aside />
                </div>
                </SheetContent>
            </Sheet>
            <Image src="/filerm.png" width={130} height={43} alt="" priority/>
        </section>

        <DropdownMenu open={isAvatarMenuOpen} onOpenChange={setIsAvatarMenuOpen}>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-12 w-12 rounded-full border-none ">
              <Avatar className="h-12 w-12 rounded-full border-none">
             
                <AvatarFallback className="rounded-full bg-transparent border-none"><RxAvatar className="w-9 h-9 border-none text-gray-500"/></AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
           {/* <DropdownMenuItem onClick={() => console.log("Editar perfil")}>
              <Edit className="mr-2 h-4 w-4" />
              <span>Editar perfil</span>
            </DropdownMenuItem> */}
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={cerrar}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Cerrar sesión</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>

    </>    
  )
}