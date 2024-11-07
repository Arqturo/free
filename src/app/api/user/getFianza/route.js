
import { getFianza } from '@/services/userServices';  // Importing the getFianza function

export async function GET(req) {
  try {
    const token = req.headers.get('Authorization')?.split(' ')[1];  // Extract the token from headers
    if (!token) {
      return new Response('Unauthorized', { status: 401 });
    }

    const data = await getFianza(token);  // Use the getFianza function to fetch the data
    if (data.error) {
      return new Response(data.error, { status: 401 });  // Return 401 if there's an error
    }

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },  // Respond with JSON
    });
  } catch (err) {
    console.error('Error fetching fianza data:', err);
    return new Response('Internal Server Error', { status: 500 });
  }
}
