"use client"
import Link from 'next/link';
import React, { useState } from 'react'
import { IoHomeOutline, IoSearchOutline } from "react-icons/io5";
import { GoGear } from "react-icons/go";
import { Edit, Home, LogOut, Menu, Settings, DollarSign, Users, NotebookPen , FileText, MinusCircle , PlusCircle, CircleDivide, NotebookText}  from "lucide-react"




export default function Sidebar() {
    const [isActiveone, setIsActiveone] = useState(false);
    const [isActivetwo, setIsActivetwo] = useState(false);
    const [isActivethree, setIsActivethree] = useState(false);
    const [isActivefour, setIsActivefour] = useState(false);
    const [isActivefive, setIsActivefive] = useState(false);
    const [isActivesix, setIsActivesix] = useState(false);
    const [isActiveseven, setIsActiveseven] = useState(false);

    const turnOff = () => {
        setIsActiveone(false);
        setIsActivetwo(false);
        setIsActivethree(false);
        setIsActivefour(false);
        setIsActivefive(false);
        setIsActivesix(false);
        setIsActiveseven(false);
      };

    const handleToggleone = () => {
        turnOff();
      setIsActiveone(true);

    };

    const handleToggletwo = () => {
        turnOff();
        setIsActivetwo(true);
      };

      const handleTogglethree = () => {
        turnOff();
        setIsActivethree(true);
      };

      const handleTogglefour = () => {
        turnOff();
        setIsActivefour(true);
      };

      const handleTogglefive = () => {
        turnOff();
        setIsActivefive(true);
      };

      const handleTogglesix = () => {
        turnOff();
        setIsActivesix(true);
      };

      const handleToggleseven = () => {
        turnOff();
        setIsActiveseven(true);
      };
  return (
    <section className='absolute '>
                    <div className="hidden md:flex flex-col w-64 border-solid rounded h-screen
                     caproluz_red ">
                        
                        <div className="flex flex-col w-full items-center justify-center mt-0 bg-white">
                                <img src='/file90.png' className='' alt='Logo Caproluz'/>
                                <h2 className='font-bold text-2xl pt-2 '>CAPROLUZ</h2>
                      </div>

                        <div className="flex flex-col flex-1 pt-10 overflow-y-auto">
                            <nav className="flex-1 py-4">
                                <Link href="/dashboard" onClick={handleToggleone} className={`flex items-center align-middle px-4 py-2 text-
                                         rounded-sm text-white ${ isActiveone ? "caproluz_active" : ""} caproluz_option text-[18px]` }>
                                    <IoHomeOutline className='mr-1 ' />
      
                                  
                                    Inicio
                                </Link>

                                <Link href="/dashboard/fianzas" onClick={handleToggletwo} className={`flex items-center px-4 py-2 
                                rounded-sm text-white  ${ isActivetwo ? "caproluz_active" : ""} caproluz_option text-[18px]` }>
                                   <DollarSign className='mr-1 ' />
                                    Consulta de Fianzas
                                </Link>

                                <Link href="/dashboard/prestamos" onClick={handleTogglethree} className={`flex items-center px-4 py-2 
                                rounded-sm text-white  ${ isActivethree ? "caproluz_active" : ""} caproluz_option text-[18px]` }>
                                   <MinusCircle className='mr-1 ' />
                                   Consulta de Prestamos
                                </Link>

                                <Link href="/dashboard/haberes" onClick={handleTogglefour}  className={`flex items-center px-4 py-2 
                                rounded-sm text-white ${ isActivefour ? "caproluz_active" : ""} caproluz_option text-[18px]` }>
                                   <PlusCircle className='mr-1 ' />
                                   Consulta de Haberes
                                </Link>

                                <Link href="/dashboard/dividendos" onClick={handleTogglefive} className={`flex items-center px-4 py-2 
                                rounded-sm text-white ${ isActivefive ? "caproluz_active" : ""} caproluz_option text-[18px]` }>
                                    <CircleDivide className='mr-1 ' />
                                    Consulta de Dividendos
                                </Link>

                                <Link href="/dashboard/solicitudes" onClick={handleTogglesix} className={`flex items-center px-4 py-2 
                                rounded-sm text-white ${ isActivesix ? "caproluz_active" : ""} caproluz_option text-[18px]` }>
                                    <NotebookText className='mr-1 ' />
                                    Consulta de Solicitudes
                                </Link>


                                <Link href="/dashboard/perfil" onClick={handleToggleseven} className={`flex items-center px-4 py-2 
                                rounded-sm text-white ${ isActiveseven ? "caproluz_active" : ""} caproluz_option text-[18px]` }>
                                    <GoGear className='mr-1 ' />
                                    Perfil
                                </Link>

                                    
                            </nav>
                        </div>
                        
                    </div>

            </section>
  )
}
