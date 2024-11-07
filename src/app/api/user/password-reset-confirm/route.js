import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { uid, token, new_password } = await request.json();
    
    const apiUrl = process.env.NEXT_PUBLIC_APP_API_URL;

    const response = await fetch(`${apiUrl}/password_reset_confirm/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ uid, token, new_password })
    });

    const data = await response.json();

    if (data.error) {
      return NextResponse.json({ error: 'Error al cambiar la contraseña, vuelva a solicitar un nuevo código' }, { status: 400 });
    }

    return NextResponse.json({ message: 'Contraseña cambiada con éxito' });

  } catch (error) {
    console.error('Error confirming password reset:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
