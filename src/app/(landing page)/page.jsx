'use client'; // This makes the component a Client Component

import { useEffect } from "react";
import { useRouter } from "next/navigation"; // Use next/navigation instead of next/router

export default function SigninPage() {
  const router = useRouter();

  useEffect(() => {
    // Check if we're in the browser (client-side)
    if (typeof window !== "undefined") {
      router.push("/auth/signin"); // Navigate to the signin page
    }
  }, [router]);

  return null; // You can render a loading indicator here if desired
}
