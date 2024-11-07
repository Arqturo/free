// api/user/getProfile/route.
import { getProfile } from "@/services/userServices";

export async function GET(request) {
    const token = request.headers.get('Authorization')?.split(' ')[1]; // "Bearer token"

    if (!token) {
        return new Response(
            JSON.stringify({ error: 'Authorization token is missing' }),
            {
                status: 401,
                headers: {
                    'Set-Cookie': 'token=; Path=/; Max-Age=0; SameSite=Strict;', // Clear token cookie
                },
            }
        );
    }

    try {
        const profile = await getProfile(token);

        if (profile.error) {
            return new Response(JSON.stringify({ error: profile.error }), {
                status: 401,
                headers: {
                    'Set-Cookie': 'token=; Path=/; Max-Age=0; SameSite=Strict;', // Clear token cookie
                },
            });
        }

        return new Response(JSON.stringify(profile), {
            status: 200,
        });
    } catch (error) {
        console.error("Error fetching profile:", error);
        return new Response(JSON.stringify({ error: 'Server error while fetching profile' }), {
            status: 500,
        });
    }
}
