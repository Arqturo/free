"use client";

import React, { useEffect, useState } from 'react';
import NewCardBlog from './card/NewCardBlog';
import { newestposts, fileToBase64, base64ToFile } from '@/services/generalServices';

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const page = 1;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`/api/general/newestposts?page=${page}`);

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();

        const fetchedPosts = data.results.results.slice(0, 3);

        if (Array.isArray(fetchedPosts)) {
          setPosts(fetchedPosts);
        } else {
          setError('Unexpected response format.');
        }
      } catch (err) {
        setError('Failed to fetch posts. Please try again later.');
        console.error(err);
      }
    };

    fetchPosts();
  }, [page]);

  return (
    <section className='flex flex-col mt-10 pb-10'>
      <h2 className='text-sky-800 text-4xl font-bold text-center mt-5'>Ultimas Actividades y Noticias</h2>
      {error && <p className="text-red-500 text-center">{error}</p>} {/* Display error message if any */}
      <section className='flex flex-wrap justify-evenly mt-4'>
        {posts.map(post => {
          let imageUrl = '';

          if (post.image) {
            try {
              const file = base64ToFile(post.image, 'image.png'); 
              imageUrl = URL.createObjectURL(file);
            } catch (error) {
              console.error('Error creating image URL:', error);
            }
          }

          return (
            <NewCardBlog
              key={post.id}
              id={post.id}
              image={imageUrl || '/fondo.jpg'}
              title={post.title}
              description={post.description} 
            />
          );
        })}
      </section>
    </section>
  );

}
