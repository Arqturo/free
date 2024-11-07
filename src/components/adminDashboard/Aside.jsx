import React from 'react'
import { Button } from "@/components/ui/button"
import {Accordion,AccordionContent,AccordionItem,AccordionTrigger,} from "@/components/ui/accordion"  
import { Edit, Home, LogOut, Menu, Settings, Users, NotebookPen , FileText, PlusCircle} from "lucide-react"
import Link from 'next/link'

export default function Aside() {
    const sidebarItems = [
        { icon: Home, label: "Inicio" , link: "/admin/dashboard"},
        { icon: Users, label: "Usuarios", subItems: [
          { icon: FileText, label: "Usuarios registrados", link: "/admin/dashboard/users" }
        //  { icon: PlusCircle, label: "Administradores",link: "/admin/dashboard/admins" }
        ] },
        { icon: Settings, label: "Configuración" , link: "/admin/dashboard/users" },
      ]
  return (
    <nav className="space-y-2 ">
        {sidebarItems.map((item, index) => (
            item.subItems ? (
                <Accordion type="single" collapsible key={index} className="border-none">
                    <AccordionItem value={item.label} className="border-none">
                        <AccordionTrigger className="flex items-center py-2 px-4 w-full text-left hover:bg-gray-200 hover:no-underline">      

                           <Link href={item.link ? item.link : "/admin/dashboard"} className='flex'>
                            <div className="flex items-center">
                                                <item.icon className="mr-2 h-4 w-4" />
                                                <span>{item.label}</span> 
                            </div>
                            </Link>
                        </AccordionTrigger>

                       <AccordionContent>
                            <div className="pl-6 space-y-1">
                                {item.subItems.map((subItem, subIndex) => (
                                  <Link href={subItem.link }  key={subIndex} className='flex'>
                                    <Button variant="ghost" className="w-full justify-start">
                                            <subItem.icon className="mr-2 h-4 w-4" />
                                            {subItem.label}
                                    </Button>
                                  </Link>
                                ))}
                            </div>
                       </AccordionContent>
                    </AccordionItem>
                </Accordion>
            ) : (
                    <Link href={item.link } key={index} className='flex'>
                        <Button  variant="ghost" className="w-full justify-start">
                                <item.icon className="mr-2 h-4 w-4" />
                                {item.label}
                        </Button>
                   </Link>
            )
        ))}
  </nav>
  )
}
