import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { FaFacebook, FaInstagram , FaWhatsapp, FaXTwitter ,  FaThreads } from "react-icons/fa6";



export default function Contact() {

  const ruta   = {
      instagram:"/instagram2.gif" ,
      youtube:"/youtubeA.gif" ,
      whatsapp:"/whatsappp.gif" ,
      facebook:"/facebookA.gif",
      twitter:"/twitterA.gif"
  }
  return (
    <section id="contacto" className='flex flex-col pt-5   '>
        <h3 className='text-sky-800 text-4xl font-bold text-center'>Contacto </h3>

        <span className='pt-3 text-center font-bold'> Av 15 Delicias Edf. CAPROLUZ</span>

        <section className='flex justify-center item-center pt-14 pb-14'>
               
            <iframe src="https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d5544.677852586163!2d-71.6282253792462!3d10.681981141824057!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e6!4m0!4m5!1s0x8e89992022e75ced%3A0x367899ade7663ce8!2spiso%201%20y%202%2C%20local%2C%20Edificio%20CAPROLUZ%2C%2059-222%20Avenida%2015%20Las%20Delicias%2C%20Maracaibo%204005%2C%20Zulia!3m2!1d10.684570899999999!2d-71.62441849999999!5e0!3m2!1ses-419!2sve!4v1728304839917!5m2!1ses-419!2sve" 
            width="1000" height="450"  loading="lazy" ></iframe>
        </section>  
        <section className='flex gap-5 justify-center pb-10 pt-8 '>
            <Link href="https://www.facebook.com/people/Caproluz/100086031383637/" target='_blank'> 
                 <FaFacebook   alt='icon-facebook' className='size-[35px] text-blue-800 hover:text-blue-600 hover:scale-y-105'/> 
            </Link>

            <Link href="https://www.instagram.com/caproluz/" target='_blank'> 
                 <FaInstagram   alt='icon instagram' className='size-[37px] text-rose-600 hover:text-rose-500 hover:scale-y-105'/> 
            </Link>

            <Link href="https://api.whatsapp.com/send/?phone=584246157090" target='_blank'> 
                <FaWhatsapp   alt='icon whatsapp' className='size-[37px] text-green-600 hover:text-green-500 hover:scale-y-105'/> 
            </Link>

            <Link href="https://x.com/CAPROLUZOFICIAL" target='_blank'> 
               <FaXTwitter   alt='icon X' className='size-[35px] text-black hover:text-gray-700 hover:scale-y-105'/> 
            </Link>
            
            <Link href="https://www.threads.net/@caproluz?hl=es-la" target='_blank'> 
               <FaThreads   alt='icon threads' className='size-[35px] text-black hover:text-gray-700 hover:scale-y-105'/> 
            </Link>
            
            
        </section>
    </section>
  )
}
