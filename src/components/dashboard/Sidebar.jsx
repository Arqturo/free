"use client"
import Link from 'next/link';
import React, { useState } from 'react'
import { IoHomeOutline, IoSearchOutline } from "react-icons/io5";
import { GoGear } from "react-icons/go";
import { Edit, Home, LogOut, Menu, Settings, DollarSign, Users, NotebookPen , FileText, MinusCircle , PlusCircle, CircleDivide, NotebookText}  from "lucide-react"




export default function Sidebar() {
    const [isActive, setIsActive] = useState(false);

    const handleToggle = () => {
      setIsActive(!isActive);
    };
  return (
    <section className='absolute '>
                    <div className="hidden md:flex flex-col w-64 border-solid rounded h-screen
                    bg-gradient-to-b from-sky-700 to-blue-500 ">
                        
                        <div className="flex flex-col w-full items-center justify-center mt-1">
                                <img src='/file90.png' className='' alt='Logo Caproluz'/>
                                <h2 className='font-bold text-2xl pt-2 '>CAPROLUZ</h2>
                      </div>

                        <div className="flex flex-col flex-1 pt-10 overflow-y-auto">
                            <nav className="flex-1 py-4">
                                <Link href="/dashboard" onClick={handleToggle} className={`flex items-center align-middle px-4 py-2 text-
                                         rounded-sm text-white ${ isActive ? "bg-sky-400" : ""} hover:bg-sky-400 text-[18px]` }>
                                    <IoHomeOutline className='mr-1 ' />
      
                                  
                                    Inicio
                                </Link>

                                <Link href="/dashboard/fianzas"  className={`flex items-center px-4 py-2 
                                rounded-sm text-white  hover:bg-sky-400 text-[18px]` }>
                                   <DollarSign className='mr-1 ' />
                                    Fianzas
                                </Link>

                                <Link href="/dashboard/prestamos"  className={`flex items-center px-4 py-2 
                                rounded-sm text-white  hover:bg-sky-400 text-[18px]` }>
                                   <MinusCircle className='mr-1 ' />
                                    Prestamos
                                </Link>

                                <Link href="/dashboard/haberes"  className={`flex items-center px-4 py-2 
                                rounded-sm text-white  hover:bg-sky-400 text-[18px]` }>
                                   <PlusCircle className='mr-1 ' />
                                    Haberes
                                </Link>

                                <Link href="/dashboard/dividendos" onClick={handleToggle} className="flex items-center px-4 py-2 
                                 rounded-md text-white hover:bg-sky-400 text-[18px]">
                                    <CircleDivide className='mr-1 ' />
                                    Dividendos
                                </Link>

                                <Link href="/dashboard/solicitudes" onClick={handleToggle} className="flex items-center px-4 py-2 
                                 rounded-md text-white hover:bg-sky-400 text-[18px]">
                                    <NotebookText className='mr-1 ' />
                                    Solicitudes
                                </Link>


                                <Link href="/dashboard/perfil" onClick={handleToggle} className="flex items-center px-4 py-2 
                                 rounded-md text-white hover:bg-sky-400 text-[18px]">
                                    <GoGear className='mr-1 ' />
                                    Perfil
                                </Link>

                                    
                            </nav>
                        </div>
                        
                    </div>

            </section>
  )
}
