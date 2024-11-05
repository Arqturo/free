import React from 'react'
import Cards from './card/CardsNosotros'

export default function Nosotros() {


    return (
        <section id = "nosotros" className='w-full flex flex-col items-center '>
            <article className='flex flex-col w-full items-center  pt-20'>
                <h2 className='text-sky-800 text-4xl font-bold'>SOMOS CAPROLUZ</h2>
                <h3 className='text-gray-800 pb-2 italic font-semibold '>Caja de Ahorros del profesorado de LUZ</h3>
            </article>


            <Cards />


        </section>

    )
}
