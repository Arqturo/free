// src/app/api/getPost/route.js
import { getPost } from '@/services/generalServices'; // Import the getPost function

export async function GET(request) {
  const url = new URL(request.url);
  const postId = url.searchParams.get('postId'); // Get the postId query parameter

  if (!postId) {
    return new Response(JSON.stringify({ error: 'postId is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const post = await getPost(postId); // Call the getPost function to fetch the post
    return new Response(JSON.stringify(post), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: `Failed to fetch post: ${error.message}` }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
