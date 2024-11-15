import { getDividendos } from '@/services/userServices'; 

export async function GET(req) {
  try {
    const token = req.headers.get('Authorization')?.split(' ')[1]; 
    if (!token) {
      return new Response('Unauthorized', { status: 401 });
    }

    const data = await getDividendos(token);  
    if (data.error) {
      return new Response(data.error, { status: 401 });  
    }

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },  
    });
  } catch (err) {
    console.error('Error fetching dividendos data:', err);
    return new Response('Internal Server Error', { status: 500 });
  }
}
