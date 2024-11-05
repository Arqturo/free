'use client'

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { listposts, base64ToFile } from "@/services/generalServices"
import NewCardBlog from '@/components/card/NewCardBlog'

export default function Page() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [error, setError] = useState(null);

  const fetchPosts = async (page) => {
    try {
      const data = await listposts(page);
      if (data && data.results) {
        setPosts(data.results.results);
        setTotalPages(data.results.total_pages);
      } else {
        setError("No posts found.");
      }
    } catch (err) {
      setError("Error fetching posts.");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPosts(currentPage);
  }, [currentPage]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

  return (
    <main className='flex flex-col w-full text-center justify-center items-center'>
      <Image src="/banner3.jpg" alt='Imagen de publicidad' width={1280} height={320} className="flex w-[100vw] md:h-80 h-40 "/>
      <h2 className='text-sky-800 text-4xl mt-16 font-bold'>Noticias</h2>

      {error && <div className='text-red-500'>{error}</div>}

      <section className='flex flex-wrap pt-10 w-full justify-center gap-1 mb-5'>
        {posts.map(post => {
          let imageUrl = '';

          if (post.image) {
            try {
              const file = base64ToFile(post.image, 'image.png'); // Transform the Base64 to a File
              imageUrl = URL.createObjectURL(file); // Create a URL for the image
            } catch (error) {
              console.error('Error creating image URL:', error);
            }
          }

          return (
            <NewCardBlog 
              key={post.id} 
              id={post.id} // Pass the post ID for linking
              title={post.title} 
              description={post.description} 
              image={imageUrl || '/fondo.jpg'} // Use created URL or fallback image
            />
          );
        })}
      </section>

      <div className='flex justify-between w-full max-w-md mx-auto mb-5'>
        <button 
          onClick={handlePrevPage} 
          disabled={currentPage === 1} 
          className='bg-blue-500 text-white px-4 py-2 rounded'
        >
          Previous
        </button>
        <span className='self-center'>{`Page ${currentPage} of ${totalPages}`}</span>
        <button 
          onClick={handleNextPage} 
          disabled={currentPage === totalPages} 
          className='bg-blue-500 text-white px-4 py-2 rounded'
        >
          Next
        </button>
      </div>
    </main>
  );
}
