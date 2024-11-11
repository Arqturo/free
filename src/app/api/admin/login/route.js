import { NextResponse } from 'next/server';

require('dotenv').config();
const apiUrl = process.env.NEXT_PUBLIC_APP_API_URL; 

export async function POST(request) {
  try {
    const { username, password } = await request.json();

    const response = await fetch(`${apiUrl}/pagemaster/login/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (data.error) {
      return NextResponse.json({ error: data.error }, { status: 401 });
    } else {
      return NextResponse.json({ token: data.token });
    }
  } catch (error) {
    console.error('Error in authentication:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
