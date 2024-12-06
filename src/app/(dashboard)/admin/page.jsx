"use client"

import { useState } from "react"
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Lock, User } from "lucide-react"
import Swal from 'sweetalert2'

export default function AdminLogin() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Call the new API route for login
    const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (data.error) {
      // If there's an error (invalid credentials), show the alert
      Swal.fire({
        title: 'Error!',
        text: data.error,
        icon: 'error',
        confirmButtonText: 'Continuar'
      });
    } else {
      // If login is successful, show success alert and save the token in sessionStorage
      await Swal.fire({
        title: "Inicio exitoso!",
        icon: "success"
      });
      sessionStorage.setItem('token', data.token);
      router.push('/admin/dashboard'); // Redirect to the admin dashboard
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-2">
      <Card className="w-full max-w-md border-2 border-slate-300">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Panel de Administración</CardTitle>
          <CardDescription className="text-center">
            Ingresa tus credenciales para acceder
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Nombre de usuario</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
                  <Input
                    id="username"
                    placeholder="Ingresa tu nombre de usuario"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Ingresa tu contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={handleSubmit}>
            Iniciar sesión
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
