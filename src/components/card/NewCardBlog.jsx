import { Description } from "@radix-ui/react-dialog";
import Image from "next/image";
import React from "react";
import { removeHtmlTags } from "@/services/generalServices";
import Link from 'next/link'; 


export default function NewCardBlog({
  id = "1",
  image = "/fondo.jpg",
  title = "Noteworthy technology acquisitions 2021",
  description = "Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.",
  author = "CAPROLUZ"
}) {
  const truedescription = removeHtmlTags(description);
  return (
    <section key={id} className="flex flex-col flex-wrap xl:w-1/4 lg:w-1/4 md:w-1/4 mx-5 items-center justify-center mt-10 bg-white border-2 border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <Link href={'/leer-noticias/${id}'} className="flex">
        <Image
          src={image}
          alt=""
          width={540}
          height={320}
          className="flex rounded-lg lg:w-[540px] lg:h-80 md:w-[450] md:pt-2 w-350 object-cover"
        />
      </Link>
      <section className="p-5">
        <a href="#">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {title}
          </h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 text-center">
          {truedescription}
        </p>
      </section>
      <Link href={`/noticias/${id}`}>
      <button className="mb-8 border-2 border-gray-400 hover:bg-gray-300 px-4 py-2 rounded-2xl font-semibold">
    Leer más
</button>
</Link>
    </section>
  );
}
