import React from 'react'
import Image from 'next/image'

export default function CardPost() {
  return (
    <div className="flex  flex-col items-center max-w-2xl bg-white border cursor-pointer border-gray-100 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ">

        <a href="/post/1" className='w-full'>
            <Image className="flex rounded-t-lg w-full" src="/images.jpg" alt="" width={150} height={150}/>
        </a>
        <div className="p-5">
            <a href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
            </a>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>

        
        </div>
        
        <button className='mb-10'>Leer mas</button>
    </div>

  )
}
