// app/api/admin/editUsers/route.js

import { NextResponse } from 'next/server';

const apiUrl = process.env.NEXT_PUBLIC_APP_API_URL;

const handleUnauthorized = () => {
  return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
};

// PUT /api/admin/editUsers
export async function PUT(req) {
  const token = req.headers.get('Authorization');
  const { id, data } = await req.json();

  if (!token || !id || !data) {
    return NextResponse.json({ message: 'Missing token, id, or data' }, { status: 400 });
  }

  try {
    const response = await fetch(`${apiUrl}/pagemaster/update-custom-user/${id}/`, {
      method: "PUT",
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.status === 401) {
      return handleUnauthorized();
    }

    const updatedData = await response.json();
    return NextResponse.json(updatedData);

  } catch (error) {
    return NextResponse.json({ message: 'Server error', error: error.message }, { status: 500 });
  }
}
