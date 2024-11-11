import { importUsers } from '@/services/usersAdminServices'; 

export async function POST(req) {
  // Extract form data
  const formData = await req.formData();
  const token = formData.get('token');
  const file = formData.get('file');

  if (!token) {
    return new Response(JSON.stringify({ error: 'No hubo token' }), { status: 400 });
  }

  if (!file) {
    return new Response(JSON.stringify({ error: 'No hay Archivo' }), { status: 400 });
  }

  try {
    const result = await importUsers(token, file);

    return new Response(JSON.stringify({ message: 'Archivo Cargado exitosamente', result }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message || 'Fallo al importar usuarios' }), { status: 500 });
  }
}
