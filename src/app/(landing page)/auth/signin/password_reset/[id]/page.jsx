"use client"
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useParams, usePathname } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import ModalError from '../../../signup/ModalError';
import Link from 'next/link';
require('dotenv').config();
const apiUrl = process.env.NEXT_PUBLIC_APP_API_URL;

export default function PasswordReset({ params }) {
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const [control, setControl] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const searchParams = useSearchParams();

  const uid = searchParams.get('uid');
  const token = searchParams.get('token');

  function submit(e) {
    e.preventDefault();
    const password = document.getElementById('Npassword').value;
    const Rpassword = document.getElementById('RNpassword').value;

    if (password === Rpassword) {
      const new_password = document.getElementById('Npassword').value;

      setPasswordMismatch(false);
      const dataSend = {
        uid: uid,
        token: token,
        new_password: new_password           
      };

      async function submit2() {
        const response = await fetch(apiUrl + '/password_reset_confirm/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(dataSend)
        });

        const data = await response.json();

        if (data.error) {
          setErrorMessage("Error al cambiar la contraseña, vuelva a solicitar un nuevo codigo");
        } else {
          setControl(true);
        }
      }
      submit2();
    } else {
      setPasswordMismatch(true); // Contraseñas no coinciden, mostrar mensaje
    }
  }

  return (
    <main className='flex justify-center w-screen h-screen items-center bg-slate-50'>
      {!control ? 
        <form onSubmit={submit} className='flex flex-col flex-wrap bg-slate-400 p-16 rounded-xl border-2 border-solid border-gray-400 shadow-lg'>
          <h1 className='mb-5 text-center text-2xl font-bold underline'>Cambiar Contraseña</h1>
          <label htmlFor="Npassword" className='font-semibold mt-3'>Nueva Contraseña:</label>
          <input type="password" id='Npassword' minLength={8} required className='rounded-md mt-2 h-8'/>
          <label htmlFor="RNpassword" className='mt-2 font-semibold'>Repita la nueva Contraseña:</label>
          <input type="password" id='RNpassword' minLength={8} required className='rounded-md mt-2 h-8'/>
          <button type='submit' className='mt-5 p-4 bg-green-700 hover:bg-green-600 rounded-xl font-bold text-white'> Cambiar contraseña </button>
          
          {passwordMismatch && (
            <span className='mt-4 text-red-600 text-center font-semibold'>Las contraseñas no coinciden</span>
          )}
          {errorMessage && (
            <span className='flex flex-wrap mt-4 text-red-600 text-center font-semibold'>Vuelva a solicitar un nuevo link</span>
          )}
        </form>
        :
        <section className='flex flex-col items-center bg-slate-400 p-8 rounded-xl border-2 border-solid border-gray-400 shadow-lg'>
          <h2 className='text-center mb-5 font-bold text-3xl '>Felicidades!</h2>
          <span className='font-bold text-green-700 text-2xl mb-5'>Contraseña cambiada con exito</span>
          <Link href="/auth/signin">
            <button className='p-4 bg-green-700 hover:bg-green-600 rounded-xl font-bold text-white'>Aceptar</button>
          </Link>
        </section>
      } 
    </main>
  );
}