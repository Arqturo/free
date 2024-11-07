import { listposts } from '@/services/generalServices'; // Import the listposts function

export async function GET(request) {
  const url = new URL(request.url);
  const page = url.searchParams.get('page') || 1; // Default to page 1 if no page param is provided

  try {
    const posts = await listposts(page); 
    return new Response(JSON.stringify(posts), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch posts' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
