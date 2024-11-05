import card from "./card.module.css"

export default function Cards() {

    return (
        <section className="flex flex-row flex-wrap  justify-center mt-8 gap-4 ">
                {/* mision */}
            <section className="flex flex-col  md:w-5/12 w-11/12 bg-gradient-to-l from-slate-300 to-slate-100 text-slate-800  
                                    border   border-slate-300  p-4 gap-4 rounded-xl shadow-md m-4 transition duration-1000 hover:scale-y-105">

                <h2 className="flex text-xl font-bold capitalize rounded-md justify-center text-center text-sky-800">
                     Misión
                </h2>

                <article className="flex rounded-md text-justify">
                    <p className="leading-7 space-y-5 ">
                    Proporcionar a sus asociados calidad de vida acorde a las exigencias del 
                    entorno ofreciendo facilidades socio/económicas para el mejoramiento de su 
                    capacidad adquisitiva, a través de la intermediación del dinero, el diseño y 
                    desarrollo de estrategias, políticas y planes, enmarcados en las leyes, 
                    estatutos y normas contando con un personal altamente calificado honesto y 
                    abocado al servicio, soportado en una plataforma tecnológica de vanguardia. 
                    Clientes/Socios: Personal docente, de investigación, activos, jubilados de LUZ 
                    y trabajadores de CAPROLUZ.
                    </p>
                </article>

            </section>

                {/* vision */}
            <section className="flex flex-col  md:w-5/12 w-11/12 bg-gradient-to-l from-slate-300 to-r-slate-100 text-slate-800  
                                    border   border-slate-300  p-4 gap-4 rounded-xl shadow-md m-4 transition duration-1000 hover:scale-y-105">

                <h2 className=" text-xl font-bold capitalize rounded-md text-center text-sky-800">
                    Vision
                </h2>

                <article className="flex rounded-md text-justify">
                    <p className="leading-7 space-y-5 ">
                    Ubicarse en los primeros lugares entre las instituciones de su tipo, 
                    nacionales e internacionales, mediante el fortalecimiento de la capacidad financiera,
                    ampliación de la cobertura de los beneficios sociales, basados en el mejoramiento de
                    la calidad de los servicios prestados e introducción y desarrollo de nuevos planes de
                    ahorro y préstamo, con lo que se aspira superar las expectativas de sus asociados.
                    </p>
                </article>

            </section>

                {/* valores institucionales */}
            <section className="flex flex-col  md:w-5/12 w-11/12 bg-gradient-to-l from-slate-300 to-r-slate-100 text-slate-800  
                                    border   border-slate-300  p-4 gap-4 rounded-xl shadow-md m-4 transition duration-1000 hover:scale-y-105 ">

                <h2 className=" text-xl font-bold capitalize rounded-md text-center text-sky-800">
                    Valores Institucionales
                </h2>

                <article className="flex rounded-md justify-center text-justify">
                    <ul className='w-6/6 list-disc pl-3 justify-center mt-1 text-slate-800'>

                        <li className='leading-7 space-y-5 '>
                            <strong>Servicio al cliente:</strong> Dedicará sus esfuerzos a lograr una
                             administración orientada fundamentalmente hacia la atención y
                              servicio permanente de sus asociados.
                        </li>

                        <li className='leading-7 space-y-5 '>
                            <strong> Excelencia:</strong> Sus operaciones estarán enmarcadas en la innovación
                             y mejora continua buscando la excelencia, tanto en sus procesos como en
                              su recurso humano.

                        </li>

                        <li className='leading-12 space-y-20 '>
                            <strong>Honestidad: </strong>No escatimará esfuerzos para fortalecer
                             su administración, credibilidad y ética.

                        </li>

                        <li className='leading-7 space-y-20'>
                            <strong> Responsabilidad Social: </strong>Promoverá acciones que redunden en 
                            el mejoramiento de la calidad de vida tanto de sus asociados como de sus
                             empleados asegurando su permanencia en el tiempo.
                        </li>
                    </ul>
                </article>

            </section>

                {/* objetivos estrategicos */}
            <section className="flex flex-col  md:w-5/12 w-11/12 bg-gradient-to-l from-slate-300 to-r-slate-100 text-slate-800  
                                    border   border-slate-300 justify-center p-4 gap-4 rounded-xl shadow-lg m-4 mb-4
                                    transition duration-1000 hover:scale-y-105">

                <h2 className=" text-xl font-bold capitalize rounded-md text-center text-sky-800">
                    Objetivos Estrategicos
                </h2>

                <article className="flex rounded-md justify-center text-justify">

                    <ul className='w-6/6 list-disc pl-3 justify-center mt-1 text-slate-800'>

                        <li className='leading-7 space-y-5 '>
                            <strong>Calidad del Servicio:</strong> Asegurar la satisfacción de nuestros
                             clientes/asociados mediante el continuo mejoramiento de la calidad de los
                              procesos y servicios.

                        </li>

                        <li className='leading-7 space-y-5 '>
                            <strong>Crecimiento:</strong> Garantizar la expansión de los beneficios, 
                            tecnología, estructura financiera y organizativa.

                        </li>

                        <li className='leading-12 space-y-20 '>
                            <strong> Recurso Humano:</strong> Incrementar la productividad y 
                            oportunidades al personal a través de capacitación,
                             comunicación, trabajo en equipo y satisfacción.

                        </li>

                        <li className='leading-7 space-y-20'>
                            <strong>Rentabilidad:</strong> Lograr el retorno total de los aportes e 
                            inversión a los socios mediante beneficios socio/económicos justos y
                             atractivos que nos sitúen como la primera caja de ahorros del país.
                        </li>
                    </ul>

                </article>

            </section>

            {/* historia */}
            <section className={`flex flex-col  md:w-8/12 w-11/12  bg-gradient-to-l from-slate-300 to-r-slate-100 text-slate-800  
                                    border   border-slate-300 justify-center p-4 gap-4 rounded-xl shadow-lg m-4 mb-6 pb-5 
                                     ${card.efec}`}>

                <h2 className=" text-2xl font-bold capitalize rounded-md text-center text-sky-800">
                    Historia
                </h2>

                <article className=" flex flex-col rounded-md  mt-5 text-justify">

                    <p>
                         La Caja de Ahorros del Profesorado de la Universidad del Zulia (CAPROLUZ), 
                         se fundó el 13 de enero de 1961. Entre los profesores que gestionaron su creación
                         destacan: Jesús Morillo González, Luis Moreno Guerra, Julio César García Otero, 
                         Roberto Atencio González, Luis Hueck y Paulo Emilio Márquez, quienes concurrieron 
                         ante el rector Antonio Borjas Romero y obtuvieron el apoyo para su constitución.
                         La creación de CAPROLUZ se justificó por la necesidad de contar con una institución
                         que se abocara al mejoramiento socio-económico del profesorado, habida cuenta de 
                         que ya para entonces existía un organismo encargado de velar por sus intereses 
                         gremiales: la Asociación de Profesores de la Universidad del Zulia (APUZ)

                        <br /> <br />                                           
               
                         Con la firme resolución de constituir la Caja de Ahorros, APUZ,
                         publicó un comunicado en el diario Panorama, el 10 de enero de 1961, 
                         donde convocaba a los profesores universitarios interesados en participar 
                         en la Asamblea Constitutiva de la Caja de Ahorros. En la asamblea se eligió la
                         directiva y se aprobaron los estatutos constitutivos. 
                        <br /><br /> 
                     
                         CAPROLUZ inició sus operaciones en dos oficinas del edificio rectoral de 
                         La Ciega. A medida que aumentaban las operaciones, se requería más personal y
                         más espacio físico. En esa época, los conflictos universitarios circundaban la
                         sede rectoral, lo que afectaba el funcionamiento de la Caja. Esta situación 
                         recurrente que acarreaban los conflictos universitarios, junto a la necesidad
                         de contar con espacios adecuados, apresuró la mudanza de CAPROLUZ al edificio
                         de la antigua Residencia Universitaria. A finales del tercer trimestre de 1973,
                         se muda al edificio Claret, ubicado en la Av. 15, esquina 76. De ese modo se
                         solucionaron las antiguas restricciones y se adecuó la prestación de los 
                         servicios a requerimientos de los asociados. En 1985 CAPROLUZ se muda de
                         nuevo a la urbanización Cantaclaro, calle 52, esquina Av. 11D; ya que el 
                         volumen de sus operaciones hizo insuficiente las oficinas del edificio
                         Claret. Con esta medida, y debido a la amplitud de las nuevas instalaciones, 
                         logró atenuar las dificultades operativas que obstaculizaban su labor.
                        <br/> <br />                                
                                           
                    
                        En 1970 se sugirió que la Caja podría instalarse en el edificio Grano de Oro,
                        solución que no fue acogida por la Junta Directiva. Se consideró más útil 
                        comisionar al presidente Dr. Luis Moreno Guerra, para que conversara con el
                        Rector sobre la posibilidad de conseguir un terreno en LUZ, para construir 
                        la sede.
                    
                        <br/><br />                                      
                       
                        Dos años más tarde, CAPROLUZ logró que la Universidad le donara un terreno 
                        situado en la Av. 15 (prolongación Delicias), que reunía los requisitos deseados,
                        por sus dimensiones y su localización. De manera insólita la Asamblea de Asociados
                        rechazó tal donación, lo que retardó el proyecto de construcción del edificio,
                        hasta que, pocos años después, el IPPLUZ (por sugerencia de la Caja de Ahorros) 
                        aceptó para sí el terreno en cuestión. 
                        <br/> <br /> 

                         En 1981, con el proyecto de sede en manos del IPPLUZ, se realizó el proceso de 
                         licitación. La buena pro favoreció a la empresa SISAN, SA. El aporte de la Caja 
                         para sufragar la edificación de la sede, que ahora involucraba al IPPLUZ y a la 
                         APUZ, se conformaría en parte con el descuento de los ahorros de cada uno de los 
                         asociados y con préstamos de la banca. 
                        <br/> <br />                        
                     
                        Las obligaciones de pago, los derechos de propiedad y administración partirían 
                        del porcentaje de ocupación de espacio de cada uno de los organismos, que en el
                        caso de CAPROLUZ llegaba al 25%. El 22 de julio de 1988, superados todos los 
                        problemas, CAPROLUZ ocupó los espacios que le correspondían en el edificio de 
                        los organismos parauniversitarios. En mayo de 1990, la Asamblea de Asociados 
                        aprobó la compra del edificio IPPLUZ. Actualmente, la Caja de Ahorros dispone 
                        de espacios que permiten a sus asociados facilidad y comodidad en sus operaciones, 
                        lo que redunda en su propio beneficio, objetivo por el cual se fundó la Asociación 
                        y que ha guiado sus pasos desde su fundación. 
                        
                        <br/> <br />                                
                   </p>
                </article>  
            </section>

               
        </section>
    )
}
