"use client"
import React,{useEffect, useState} from 'react'
require('dotenv').config();
const apiUrl = process.env.NEXT_PUBLIC_APP_API_URL;
 

export default function ModalPassword({status2, setStatus2}) {

    const [status, setStatus] = useState(false);

  const [message, setMessage] = useState("");
  
  
  
  async function submit_reset_password(e) {

        e.preventDefault()

        setStatus(true)
        
        const email = document.getElementById('reset_email').value;

        const dataSend = {
            email: email           
        };

        const response = await fetch(apiUrl+'/password_reset/' , {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataSend)
          })
          const data = await response.json()

          if(data.error ){
            setMessage("El correo no se encuentra en el sistema")
        }
        else{
            setMessage("Se ha enviado un correo de recuperacion")
        }

      setStatus(false)
    
  }
  function cambio() {
    setStatus2(false)
    
  }

  return (
    <> { status2 && 
       
        <main className='flex flex-col justify-center items-center w-[100%] h-[135%] absolute bg-transparent opacity-1'>
            
                <section  className='flex flex-col justify-center items-center w-96 h-96 mb-2 bg-gray-400 text-center pt-4 rounded-lg opacity-1'> 
                     <button onClick={cambio} className='flex justify-end bg-red-600 text-white hover:bg-red-500 py-1 px-3 rounded-lg'>X</button>
                      <form onSubmit={submit_reset_password} className='flex flex-col justify-center items-center'>
                            <span className=' mt-4 text-2xl text-black font-extrabold underline '>Cambia tu clave</span> 
                            <label htmlFor='reset_email' className='flex justify-center text-center items-center w-3/4 font-semibold mt-2 text p-5 rounded-xl text-black '>Escribe tu correo electronico para restablecer tu contraseña:</label>
                            <input id="reset_email" type="email" className='pl-2 rounded-xl h-8 w-3/4' required/>
                            <button  type="submit" disabled={status} className={`${status ? "cursor-not-allowed ": "hover:cursor-pointer "}flex justify-center text-center items-center w-2/4 p-3 mt-5 text-white bg-green-700 rounded-lg  hover:bg-green-600`}>Aceptar</button>
                      </form>
                       {message ? <span className='flex mt-4 font-semibold text-center'>{message}</span> : " "} 
                   
                </section>
          </main> 
        
        } 
         
       
    </>
  )
}