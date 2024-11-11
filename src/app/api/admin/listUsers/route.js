// app/api/admin/listUsers/route.js

import { NextResponse } from 'next/server';

const apiUrl = process.env.NEXT_PUBLIC_APP_API_URL;

const handleUnauthorized = () => {
  return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
};

// GET /api/admin/listUsers
export async function GET(req) {
  const token = req.headers.get('Authorization');

  if (!token) {
    return handleUnauthorized();
  }

  const url = new URL(req.url);
  const page = url.searchParams.get('page');
  const cedula = url.searchParams.get('cedula');  // Extract cedula from query parameters

  if (!page) {
    return NextResponse.json({ message: 'Missing page parameter' }, { status: 400 });
  }

  // Prepare URL parameters
  let fetchUrl = `${apiUrl}/pagemaster/search-custom-users/?page=${page}`;
  if (cedula) {
    fetchUrl += `&cedula=${cedula}`;  // Append cedula filter to the URL if provided
  }

  try {
    const response = await fetch(fetchUrl, {
      method: "GET",
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 401) {
      return handleUnauthorized();
    }

    const data = await response.json();
    return NextResponse.json(data);

  } catch (error) {
    return NextResponse.json({ message: 'Server error', error: error.message }, { status: 500 });
  }
}
