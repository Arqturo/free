import React from "react";
import Image from 'next/image';
require("dotenv").config();

export default function page() {
  return    <>
    <main className='flex md:flex-row flex-col justify-center items-center h-full '> 
        <Image src="/logoo.png" width={130} height={130} alt="logo caproluz" className='opacity-70'/>
        <span className='lg:text-[100px] md:text-[80px] text-[70px] font-bold opacity-70'>CAPROLUZ</span>
        
    </main>       
  </>
}
