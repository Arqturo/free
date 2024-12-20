"use client"
import Link from 'next/link'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import ModalError from './ModalError';
import ModalSucces from "./ModalSucces"

export default function Page() {
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSucces, setIsSucces] = useState(false);
  const router = useRouter();

  async function register(dataToSend) {
    try {
      const response = await fetch('/api/user/register', {  
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSend)
      });

      const data = await response.json();
      console.log(data);

      // Handling different response cases
      if (data.error) {
        setErrorMessage("Usted no se encuentra inscrito en la caja de ahorro");
      } else if (data.cedula) {
        setErrorMessage("Usted ya se encuentra registrado en el sistema");
      } else if (data.email) {
        setErrorMessage("El correo ya está asociado a una cuenta en el sistema");
      } else {
        setIsSucces(true);  
      }
    } catch (error) {
      console.error('Error de servidor:', error);
      setErrorMessage("Ocurrió un error al comunicarse con el servidor. Por favor, inténtelo más tarde.");
    } finally {
      setIsLoading(false);  
    }
  }

  function registerSubmit(e) {
    e.preventDefault();
    setErrorMessage("");
    setIsLoading(true);

    const cedula = document.getElementById('cedula').value;
    const fullname = document.getElementById('fullname').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const Rpassword = document.getElementById('Rpassword').value;
    const prefix_phone = document.getElementById('prefix').value;
    const phone = document.getElementById('phone').value;
    const roomAddress = document.getElementById('room_address').value;
    const birthDate = document.getElementById('birth_date').value; 

    const dataToSend = {
      cedula: cedula,
      full_name: fullname,
      email: email,
      password: password,
      phone_number: prefix_phone.toString() + phone.toString(),
      room_address: roomAddress, 
      birth_date: birthDate 
    };

    if (password === Rpassword) {
      register(dataToSend);  
    } else {
      setErrorMessage("Las claves no coinciden, vuelva a introducirla.");
      setIsLoading(false);
    }
  }

  return (
    <main className="flex h-screen w-full justify-center font-poppins items-center bg-gradient-to-r from-slate-200 to-gray-300">
      <section id="back-div" className="lg:w-2/4 sm:w-4/5 mt-5 rounded-xl border-4 border-slate-300">
        <section className="border-none rounded-xl bg-white shadow-lg p-4">
          <h1 className="pt-4 pb-6 font-bold dark:text-gray-400 text-5xl text-center cursor-default">
            Registrate
          </h1>

          <form onSubmit={registerSubmit} className="space-y-4 pt-4">
            <article>
              <label htmlFor="cedula" className="mb-2 dark:text-gray-400 text-lg">Cedula:</label>
              <input id="cedula"
                className="border p-3 dark:bg-indigo-700 dark:text-gray-300 dark:border-gray-700 
                shadow-md placeholder:text-base ease-in-out duration-300
                border-gray-300 rounded-lg w-full"
                type="number"
                placeholder="14525355"
                required
              />
            </article>

            <article>
              <label htmlFor="fullname" className="mb-2 dark:text-gray-400 text-lg">Nombre completo:</label>
              <input id="fullname"
                className="border p-3 dark:bg-indigo-700 dark:text-gray-300 dark:border-gray-700 
                shadow-md placeholder:text-base ease-in-out duration-300
                border-gray-300 rounded-lg w-full"
                type="text"
                placeholder="Nombre y Apellido"
                required
              />
            </article>

            <article>
              <label htmlFor="email" className="mb-2 dark:text-gray-400 text-lg">Correo Electronico:</label>
              <input id="email"
                className="border p-3 shadow-md dark:bg-indigo-700 dark:text-gray-300 
                dark:border-gray-700 placeholder:text-base ease-in-out 
                duration-300 border-gray-300 rounded-lg w-full"
                type="email"
                placeholder="usuario@gmail.com"
                minLength={8}
                required
              />
            </article>

            <article>
              <label htmlFor="password" className="mb-2 dark:text-gray-400 text-lg">Contraseña:</label>
              <input id="password"
                className="border p-3 shadow-md dark:bg-indigo-700 dark:text-gray-300 
                dark:border-gray-700 placeholder:text-base 
                ease-in-out duration-300 border-gray-300 rounded-lg w-full"
                type="password"
                placeholder="********"
                minLength={8}
                required
              />
            </article>

            <article>
              <label htmlFor="Rpassword" className="mb-2 dark:text-gray-400 text-lg">Repetir Contraseña:</label>
              <input id="Rpassword"
                className="border p-3 shadow-md dark:bg-indigo-700 dark:text-gray-300 
                dark:border-gray-700 placeholder:text-base ease-in-out 
                duration-300 border-gray-300 rounded-lg w-full"
                type="password"
                placeholder="********"
                minLength={8}
                required
              />
            </article>

            <article>
              <label htmlFor="room_address" className="mb-2 dark:text-gray-400 text-lg">Dirección de habitación:</label>
              <input id="room_address"
                className="border p-3 shadow-md dark:bg-indigo-700 dark:text-gray-300 
                dark:border-gray-700 placeholder:text-base 
                ease-in-out duration-300 border-gray-300 rounded-lg w-full"
                type="text"
                placeholder="Dirección de habitación"
              />
            </article>


            <article>
              <label htmlFor="birth_date" className="mb-2 dark:text-gray-400 text-lg">Fecha de Nacimiento:</label>
              <input id="birth_date"
                className="border p-3 shadow-md dark:bg-indigo-700 dark:text-gray-300 
                dark:border-gray-700 placeholder:text-base 
                ease-in-out duration-300 border-gray-300 rounded-lg w-full"
                type="date"
                required
              />
            </article>

            <article className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-2/2 px-3 mb-6 md:mb-0">
                <label className="mb-2 dark:text-gray-400 text-lg" htmlFor="phone">
                  Número teléfonico:
                </label>
                <div className="flex">
                  <select className="flex w-4/4 text-gray-700 border
                  border-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none
                  focus:bg-white" id="prefix" required>
                    <option value="0412">0412</option>
                    <option value="0414">0414</option>
                    <option value="0424">0424</option>
                    <option value="0416">0416</option>
                  </select>
                  <input className="flex ml-2 w-[73.5%] text-gray-700 
                  border border-gray-200 rounded-lg py-3 px-4 leading-tight 
                  focus:bg-white" id="phone" type="tel" placeholder="9999999" required />
                </div>
              </div>
            </article>

            <button
              className={`bg-gradient-to-r text-lg from-gray-500 to-stone-700 shadow-lg mt-6 p-2 
              text-white rounded-lg w-full hover:scale-105 transition duration-300 ease-in-out
              ${isLoading ? 'cursor-not-allowed opacity-60' : 'hover:from-stone-700 hover:to-gray-500'}`}
              type="submit"
              disabled={isLoading}
            >
              Registrarse
            </button>
          </form>

          <section className="flex flex-col mt-4 pb-4 items-center justify-center text-sm">
            <h3 className="dark:text-gray-300"> ¿Ya tienes cuenta?
              <Link className="group text-blue-400 transition-all duration-100 ease-in-out" href="/auth/signin">
                <span className="ml-1 bg-left-bottom bg-gradient-to-r from-blue-400 to-blue-400 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
                  Inicia Sesión
                </span>
              </Link>
            </h3>
          </section>
        </section>
      </section>
      {errorMessage ? <ModalError errorMessage={errorMessage} /> : ""}
      {isSucces && <ModalSucces />}
    </main>
  )
}
