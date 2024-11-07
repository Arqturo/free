// app/api/user/getUserLoans/route.js

import { getUserLoans } from '@/services/userServices'; // Import the function
import { NextResponse } from 'next/server';

export async function GET(request) {
  // Retrieve token from headers
  const token = request.headers.get('Authorization')?.replace('Token ', '');

  if (!token) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  // Call the getUserLoans function with the token
  const loansData = await getUserLoans(token);

  // If the response has an error (e.g., 401 Unauthorized), return it
  if (loansData.error) {
    return NextResponse.json(
      { error: loansData.error },
      { status: 401 }
    );
  }

  // Return the loans data as JSON
  return NextResponse.json(loansData);
}