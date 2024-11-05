"use client"
import React from 'react'
import { useRouter,redirect } from 'next/navigation'
import { useEffect , useState } from "react";
import Navbar from "@/components/adminDashboard/Navbar"
import Image from 'next/image';

export default function AdminDashboard() {

    const router = useRouter()
    const [tok,setTok] = useState()
     
    
    useEffect(()=>{
        const token=sessionStorage.getItem('token')  
          token ? setTok(token)
           : redirect('/admin');          

      },[])

    


  return (
    <>
    {tok &&
      <main className='flex md:flex-row flex-col justify-center items-center h-full '> 
          <Image src="/logoo.png" width={130} height={130} alt="logo caproluz" className='opacity-70'/>
          <span className='lg:text-[100px] md:text-[80px] text-[70px] font-bold opacity-70'>CAPROLUZ</span>
          
      </main>       

      }
    </>
  )
}


