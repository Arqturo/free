"use client"
import React,{useState} from 'react'
import { useRouter } from 'next/navigation'
import { ExternalRedirectButton } from "@/services/generalServices"

export default function ModalError() {

  const [status, setStatus] = useState(true);
  
  const router = useRouter(); 
  
  function setchange() {
    setStatus(false)
    ExternalRedirectButton('/auth/signin');
    
  }

  return (
    <> { status && 

<main className='flex flex-col justify-center items-center w-[100%] h-[135%] absolute bg-transparent opacity-1'>
    <section className='flex flex-col justify-center items-center w-96 h-72 mb-2 bg-gray-400 text-center pt-4 rounded-lg opacity-1 relative'> 
        <span className='text-2xl text-black font-extrabold underline mt-1'>AVISO</span> 
        <p className='flex justify-center text-center items-center w-3/4 font-semibold mt-5 text p-5 rounded-xl bg-green-600 text-white'>
            Su registro ha sido exitoso
        </p>
        <button
            onClick={setchange}
            className='absolute top-2 right-2 p-2 text-white bg-red-500 rounded-full hover:bg-red-600'
        >
            X
        </button>
        <button
            onClick={setchange}
            className='flex justify-center text-center items-center w-2/4 p-3 mt-5 text-white bg-green-700 rounded-lg hover:cursor-pointer hover:bg-green-600'
        >
            Aceptar
        </button>
    </section>
</main>

        
        } 
       
    </>
  )
}
