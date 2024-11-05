"use client"
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import ModalPassword from "./ModalPassword";
import Swal from 'sweetalert2';  
require('dotenv').config();
const apiUrl = process.env.NEXT_PUBLIC_APP_API_URL;

function Page() {
  const router = useRouter();
  const [status2, setStatus2] = useState(false);

  async function onsubmit(e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const dataToSend2 = {
      email: email,
      password: password
    };

    const response = await fetch(apiUrl + '/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataToSend2)
    });

    const data = await response.json();

    if (data.error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Correo o contraseña inválida',
        confirmButtonText: 'Aceptar'
      });
    } else {
      // Save the token to sessionStorage as token2
      sessionStorage.setItem('token2', data.token); 
      router.push('/dashboard');
    }
  }

  function openModal() {
    setStatus2(true);
  }

  return (
    <section className="flex w-full font-poppins items-center ">
      <div className="flex h-screen w-full justify-center items-center bg-gradient-to-r from-slate-200 to-gray-300">
        <div className="flex p-2 w-full md:w-3/5 lg:w-[40vw]">
          <div id="back-div" className="w-full rounded-xl border-4 border-slate-300">
            <div className="flex flex-col justify-center border-none rounded-xl bg-white shadow-lg p-6 pb-10">
              <h1 className="pt-8 pb-6 font-bold dark:text-gray-400 text-4xl md:text-5xl text-center cursor-default">
                Iniciar sesión
              </h1>
              <form onSubmit={onsubmit} className="space-y-4">
                <div>
                  <label htmlFor="email" className="mb-2 dark:text-gray-400 text-lg">
                    Correo electronico
                  </label>
                  <input
                    id="email"
                    className="border p-3 dark:bg-indigo-700 dark:text-gray-300 
                      dark:border-gray-700 shadow-md placeholder:text-base 
                      ease-in-out duration-300 border-gray-300 rounded-lg w-full"
                    type="email"
                    placeholder="usuario@gmail.com"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="password" className="mb-2 dark:text-gray-400 text-lg">
                    Contraseña
                  </label>
                  <input
                    id="password"
                    className="border p-3 shadow-md dark:bg-indigo-700
                      dark:text-gray-300 dark:border-gray-700 placeholder:text-base 
                      ease-in-out duration-300 border-gray-300 rounded-lg w-full"
                    type="password"
                    placeholder="********"
                    minLength={8}
                    required
                  />
                </div>
                <button
                  className="bg-gradient-to-r text-lg from-gray-500 to-stone-700 shadow-lg mt-6 p-2 text-white rounded-lg w-full hover:scale-105 hover:from-stone-700 hover:to-gray-500 transition duration-300 ease-in-out"
                  type="submit"
                >
                  Iniciar sesión
                </button>
              </form>

              <button className="flex mt-6 mb-2 group justify-center items-center text-blue-500 transition-all duration-100 ease-in-out"
              >
                <span
                  className="flex text-center bg-left-bottom bg-gradient-to-r text-sm from-blue-400
                  to-blue-400 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] 
                  transition-all duration-500 ease-out"
                  onClick={openModal}
                >
                  ¿Olvidaste tu Contraseña?
                </span>
              </button>

              <div className="flex flex-col mt-4 items-center justify-center text-sm">
                <h3 className="dark:text-gray-300">
                  ¿No tienes cuenta?
                  <Link
                    className="group text-blue-500 transition-all duration-100 ease-in-out"
                    href="/auth/signup"
                  >
                    <span
                      className="ml-1 bg-left-bottom bg-gradient-to-r from-blue-400 to-blue-400 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out"
                    >
                      Registrate
                    </span>
                  </Link>
                </h3>
              </div>

              <div
                id="third-party-auth"
                className="flex items-center justify-center mt-5 flex-wrap"
              >
               {/* <button className="hover:scale-105 ease-in-out duration-300 shadow-lg p-2 rounded-lg m-1 flex">
                  <img
                    className="max-w-[25px]"
                    src="https://ucarecdn.com/8f25a2ba-bdcf-4ff1-b596-088f330416ef/"
                    alt="Google"
                  />
                  Iniciar Sesión con Correo
                </button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      {status2 && <ModalPassword status2={status2} setStatus2={setStatus2} />}
    </section>
  )
}

export default Page;
