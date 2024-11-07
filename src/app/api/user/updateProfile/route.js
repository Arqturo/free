import { updateProfile } from '@/services/userServices';

export async function PUT(request) {
    const token = request.headers.get('Authorization')?.split(' ')[1]; // "Bearer token"

    if (!token) {
        return new Response(
            JSON.stringify({ error: 'Authorization token is missing' }),
            { status: 401 }
        );
    }

    const data = await request.json();

    const updatedProfile = await updateProfile(token, data);

    if (updatedProfile.error) {
        return new Response(
            JSON.stringify({ error: updatedProfile.error }),
            { status: 401 } 
        );
    }

    return new Response(JSON.stringify(updatedProfile), {
        status: 200,
    });
}