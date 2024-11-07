import { NextResponse } from 'next/server';
require('dotenv').config();
const apiUrl = process.env.NEXT_PUBLIC_APP_API_URL;  

export async function POST(request) {
  try {
    const { email } = await request.json();
    

    const response = await fetch(`${apiUrl}/password_reset/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email })
    });

    const data = await response.json();

    if (data.error) {
      return NextResponse.json({ error: 'El correo no se encuentra en el sistema' }, { status: 400 });
    }

    return NextResponse.json({ message: 'Se ha enviado un correo de recuperacion' });

  } catch (error) {
    console.error('Error resetting password:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
