import Image from 'next/image'
import Marquee from 'react-fast-marquee'

export default function Consejo() {

  return (
    <section className="flex flex-col mt-10  justify-center items-center">
           <Image 
                src = "/aniversario-caproluz1.png"
                alt="aniversario caproluz"
                height={400}
                width={400}
                className="rounded lg:w-[400px] lg:h-[400px] md:h-[330px] md:w-[330] h-[300px] w-[300px]"
            />  
                <h3 className="text-sky-800 text-4xl mt-5 font-bold text-center ">Consejo de Administración</h3>

            
                <section className="flex h-full justify-center items-center w-full  ">

                    <section className="h-[500px] mt-10 shadow-md shadow-slate-200 rounded-2xl md:w-[80%] w-[90%] justify-center items-center  ">

                        <Marquee gradient gradientWidth={30} pauseOnHover={false} className=" border-t rounded-2xl  overflow-hidden grid items-start ">

                          <div className=" flex  flex-col justify-center  h-[480px] items-center mx-2 py-3 ">
                            <span className=' font-semibold text-2xl py-4 text-sky-900'>Presidente</span>
                            <img src="/luis carrillo.jpg" className=" w-96 h-5/6  object-cover rounded-2xl" alt="
                            Presidente Luis Carrillo" />
                            <span className='pt-4 font-semibold text-center text-2xl  text-gray-700'>Luis Carrillo</span>
                          </div>

                          <div className=" flex  flex-col justify-center  h-[480px] items-center mx-2 py-3 ">
                            <span className=' font-semibold text-2xl py-4 text-sky-900'>Tesorera Gerente</span>
                            <img src="/maria rossell.jpg" className=" w-96 h-5/6 rounded-2xl object-cover " alt="Tesorera Maria Rossell" />
                            <span className='pt-4 font-semibold text-center text-2xl  text-gray-700 '>María Rossell</span>
                          </div>

                          <div className=" flex  flex-col justify-center  h-[480px] items-center mx-2 py-3 ">
                            <span className=' font-semibold text-2xl py-4 text-sky-900'>Secretario</span>
                            <img src="/edinson castro.jpg" className=" w-96  h-5/6 rounded-2xl object-cover" alt="Secretario Edinson Castro" />
                            <span className='pt-4 font-semibold text-center text-2xl  text-gray-700 '>Edinson Castro</span>
                          </div>
                        
                        </Marquee>
                    </section>

                
                 </section>        


                 <h3 className="text-sky-800 text-4xl  font-bold text-center mt-14">Consejo de vigilancia</h3>
            
             <section className="flex h-full justify-center items-center w-full mt-5 ">

                <section className="h-[500px] mt-10 shadow-md shadow-slate-100  rounded-2xl w-[100%] md:w-[45%] justify-center items-center  ">

                    <Marquee gradient gradientWidth={30} pauseOnHover={false} className=" border-t rounded-2xl  overflow-hidden grid items-start m-0">

                      <div className=" flex  flex-col justify-center  h-[480px] items-center  py-3 mr-4">
                        <span className=' font-semibold text-2xl py-2 text-sky-900'>Presidente</span>
                        <img src="/maria delgado.jpg" className=" w-96 h-5/6  object-cover rounded-2xl" alt="
                        Presidente Maria Delgado" />
                        <span className='pt-4 font-semibold text-center text-2xl  text-gray-700'>María Delgado</span>
                      </div>

                      <div className=" flex  flex-col justify-center  h-[480px] items-center  py-3 mr-4">
                        <span className=' font-semibold text-2xl py-2 text-sky-900'>Vice-Presidenta</span>
                        <img src="/isbeida sanchez.jpg" className=" w-96 h-5/6 rounded-2xl object-cover " alt="Vice-Presidente Isbeida Sanchez" />
                        <span className='pt-4 font-semibold text-center text-2xl  text-gray-700 '>Isbeida Sánchez</span>
                      </div>

                    
                     </Marquee>
                   </section>


                </section> 


                 {/* <div className=" h-[450px] mt-10 shadow-md shadow-slate-200 rounded-2xl w-[85%] justify-center items-center ">
                    <Marquee gradient pauseOnHover={false} className=" border-t rounded-2xl  overflow-hidden grid items-start gap-3 ">

                      <div className=" flex  flex-col justify-center  h-[400px] items-center m-2  ">
                        <span className=' font-semibold text-2xl py-2 text-gray-900'>Presidente</span>
                        <img src="/perfil.png" className="w-80 h-5/6 rounded-3xl object-cover" alt="" />
                        <span className='pt-2 font-semibold text-center text-2xl  text-gray-700'>Luis Antonio Carrillo</span>
                      </div>

                      <div className=" flex flex-col justify-center  h-[400px] items-center mx-2 ">
                        <span className=' font-semibold text-2xl py-2 text-gray-900'>Tesorero Gerente</span>
                        <img src="/perfil5.jpg" className="w-80 h-5/6 rounded-3xl object-cover" alt="" />
                        <span className='pt-2 font-semibold text-center text-2xl  text-gray-700 '>Luis Antonio Carrillo</span>
                      </div>

                      <div className=" flex  flex-col justify-center  h-[400px] items-center mx-2  ">
                        <span className=' font-semibold text-2xl py-2 text-gray-900'>Secretario</span>
                        <img src="/perfil2.png" className="w-80 h-5/6 rounded-3xl object-cover" alt="" />
                        <span className='pt-2 font-semibold text-center text-2xl  text-gray-700 '>Luis Antonio Carrillo</span>
                      </div>
                      <div className=" flex  flex-col justify-center h-[400px] items-center mx-2   ">
                        <span className=' font-semibold text-2xl py-2 text-gray-900'>Presidente</span>
                        <img src="/perfil2.png" className="w-80 h-5/6 rounded-3xl object-cover" alt="" />
                        <span className='pt-2 font-semibold text-center text-2xl   text-gray-700'>Luis Antonio Carrillo</span>
                      </div>
                      <div className=" flex  flex-col justify-center h-[400px] items-center mx-2  ">
                        <span className=' font-semibold text-2xl py-2 text-gray-900 '>Presidente</span>
                        <img src="/perfil2.png" className="w-80 h-5/6 rounded-3xl object-cover" alt="" />
                         <span className='pt-2 font-semibold text-center text-2xl  text-gray-700 '>Luis Antonio Carrillo</span>
                      </div>
                    </Marquee>
                 </div> */}


    </section>
  )
}
