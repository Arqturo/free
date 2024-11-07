import { NextResponse } from 'next/server';
require('dotenv').config();
const apiUrl = process.env.NEXT_PUBLIC_APP_API_URL;

export async function POST(request) {
  try {
    const { email, password } = await request.json();
    

    // Make the API call to the external service
    const response = await fetch(`${apiUrl}/login/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (data.error) {
      return NextResponse.json({ error: 'Correo o contraseña inválida' }, { status: 400 });
    }

    return NextResponse.json({ token: data.token });

  } catch (error) {
    console.error('Error logging in:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
