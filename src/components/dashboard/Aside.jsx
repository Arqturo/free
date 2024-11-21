import React from 'react'
import { Button } from "@/components/ui/button"
import {Accordion,AccordionContent,AccordionItem,AccordionTrigger,} from "@/components/ui/accordion"  
import { Edit, Home, LogOut, Menu, Settings, DollarSign, Users, NotebookPen , FileText, MinusCircle , PlusCircle,  CircleDivide, NotebookText} from "lucide-react"
import Link from 'next/link'

export default function Aside() {
    const sidebarItems = [
        { icon: Home, label: "Inicio" , link: "/dashboard"},
        { icon: NotebookPen, label: "Consultas de estado", subItems: [
          { icon: DollarSign, label: "Fianzas", link: "/dashboard/fianzas" },
          { icon: MinusCircle, label: "Prestamos",link: "/dashboard/prestamos" },
          { icon: PlusCircle, label: "Haberes",link: "/dashboard/haberes" },
          { icon: CircleDivide, label: "Dividendos",link: "/dashboard/dividendos" },
          { icon: NotebookText, label: "Solicitudes",link: "/dashboard/solicitudes" },
        ] },
        { icon: Settings, label: "Perfil" , link: "/dashboard/perfil"}
      ]
  return (
    <nav className="space-y-2 ">
        {sidebarItems.map((item, index) => (
            item.subItems ? (
                <Accordion type="single" collapsible key={index} className="border-none">
                    <AccordionItem value={item.label} className="border-none">
                    <Link href={item.link ? item.link : "#"} className='flex'>

                        <AccordionTrigger className="flex items-center py-2 px-4 w-full text-left caproluz_red hover:no-underline">      
                            <div className="flex items-center">
                                                <item.icon className="mr-2 h-4 w-4" />
                                                <span>{item.label}</span> 
                            </div>
                        </AccordionTrigger>
                        </Link>


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
