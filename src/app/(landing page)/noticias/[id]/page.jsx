"use client"; 

import React, { useEffect, useState } from 'react';
import './new.css';

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { getPost } from '@/services/generalServices.js';

function Page() {
  const [post, setPost] = useState(null);
  const [loadingError, setLoadingError] = useState(false); // State to track loading errors
  const postId = window.location.pathname.split('/').pop(); 

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await getPost(postId);
        if (!data || data.error) { 
          setLoadingError(true);
          setTimeout(() => {
            if (loadingError) {
              window.location.href = '/404'; 
            }
          }, 3000); 
        } else {
          setPost(data); 
          setLoadingError(false);
        }
      } catch (error) {
        console.error('Error fetching post:', error);
        setLoadingError(true); 
        setTimeout(() => {
          if (loadingError) {
            window.location.href = '/404';
          }
        }, 3000); 
      }
    };

    fetchPost();
  }, [postId, loadingError]); // Include loadingError in dependencies

  if (!post && !loadingError) return <div>Cargando...</div>; 

  return (
    <>
      <Header /> 
      <div className="article-container bg-gradient-to-l from-slate-300 to-r-slate-100">
        <div className='article-true-container'>
          <img 
            src={post?.image || 'path/to/your/image.jpg'} 
            alt="Article Visual" 
            className="article-image"
          />
          <h1 className="article-title">{post?.title}</h1>
          <div 
            className="article-content" 
            dangerouslySetInnerHTML={{ __html: post?.content }} 
          />
          <div className="article-meta">
            <span className="article-author">{post?.author}</span>
            <span className="article-date">Fecha de edicion: {post?.updated_at}</span>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Page;
