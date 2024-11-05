"use client"
import React,{useState} from 'react'

export default function ModalError({errorMessage}) {

  const [status, setStatus] = useState(true);
  
  
  return (
    <> { errorMessage && status && 

        <main className='flex flex-col justify-center items-center w-[100%] h-[135%] absolute bg-transparent opacity-1'>
                <section className='flex flex-col justify-center items-center w-96 h-72 mb-2 bg-gray-400 text-center pt-4 rounded-lg opacity-1'> 
                    <span className='  text-2xl text-black font-extrabold underline mt-1'>AVISO</span> 
                      <p className='flex items-center w-3/4 font-semibold mt-5 text p-5 rounded-xl bg-red-700 text-white '>{errorMessage}</p>
                      <button onClick={()=>setStatus(false)} className='flex justify-center w-2/4 p-3 mt-5 text-white bg-red-700 rounded-lg hover:cursor-pointer hover:bg-red-500'>Aceptar</button>
                </section>
          </main> 
        
        } 
    </>
  )
}
