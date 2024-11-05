"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Carousel } from "antd";

export default function Inicio() {
  const [page, setPage] = useState(1);
  const [imageVisible, setImageVisible] = useState(true);

  useEffect(() => {
    let int = setInterval(() => {
      setPage((prev) => (prev + 1 >= 4 ? 1 : prev + 1));
    }, 5000);

    return () => clearInterval(int);
  }, [page]);

  const handleprevpage = () => {
    setPage((prev) => (prev - 1 <= 0 ? 3 : prev - 1));
  };
  const handlenextpage = () => {
    setPage((prev) => (prev + 1 >= 4 ? 1 : prev + 1));
  };

  return (
    <>
      <div
        id="inicio"
        className="w-full border-solid  border-b-2 border-slate-300 shadow "
      >
        <motion.img
          src={`/fondo${page}.jpg`}
          alt="fondo"
          className={`w-full sm:h-[91.5vh] h-[80vh]  object-center object-fill transition duration-1000 ease-out`}
          transition={{
            duration: 1,
            ease: "easeOut",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0.5 }} // animación de salida
          layout={true}
        />
      </div>

      <div
        onClick={handleprevpage}
        className="z-10 absolute bottom-1/2 left-4 text-3xl font-semibold"
      >
        <span className="inline-block transition-transform hover:-traslate-x-1 motion-reduce::transform-none text-gray-200 cursor-pointer hover:text-sky-600">
          &lt;-
        </span>
      </div>
      <div
        onClick={handlenextpage}
        className="z-10 absolute bottom-1/2 right-4 text-3xl font-semibold"
      >
        <span className="inline-block transition-transform hover:traslate-x-1 motion-reduce::transform-none text-gray-200 cursor-pointer hover:text-sky-600">
          -&gt;
        </span>
      </div>
    </>
  );
}
