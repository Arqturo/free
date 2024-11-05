'use client'

import { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { listusers, editUsers } from "@/services/usersAdminServices"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Edit2 } from "lucide-react"

export default function UserTable() {
  const [token, setToken] = useState("")
  const [lista, setLista] = useState([])
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editingUser, setEditingUser] = useState(null)
  const [changes, setChanges] = useState({}); // Estado para almacenar cambios
  const [currentPage, setCurrentPage] = useState(1); // Estado para la página actual
  const [totalPages, setTotalPages] = useState(0); // Estado para el total de páginas

  useEffect(() => {
    const tok = sessionStorage.getItem("token")
    if (tok) {
      setToken(tok)
      fetchUsers(tok, currentPage);
    }
  }, [currentPage]); // Fetch users whenever currentPage changes

  const fetchUsers = async (tok, page) => {
    const datos = await listusers(tok, page) // Pass the current page
    setLista(datos.results)
    setTotalPages(datos.total_pages) // Set total pages from response
  }

  const handleEdit = (user) => {
    setEditingUser(user)
    setIsEditModalOpen(true)
    setChanges({}); // Reiniciar cambios al abrir el modal
  }

  const handleSaveChanges = (e) => {
    e.preventDefault()

    if (editingUser) {
      const dataToUpdate = { id: editingUser.id, ...changes };

      editUsers(token, dataToUpdate); // Enviar solo los cambios

      setLista(prevLista => 
        prevLista.map(user => 
          user.id === editingUser.id ? { ...user, ...changes } : user
        )
      );

      setIsEditModalOpen(false)
      setEditingUser(null)
      setChanges({}); // Reiniciar cambios después de guardar
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (editingUser) {
      if (editingUser[name] !== value) {
        setChanges(prevChanges => ({
          ...prevChanges,
          [name]: value
        }));
      }
      
      setEditingUser({
        ...editingUser,
        [name]: value
      });
    }
  }

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  }

  return (
    <div className="container mx-auto p-10">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Cédula</TableHead>
            <TableHead>Nombre Completo</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Teléfono</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {lista?.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{user.cedula}</TableCell>
              <TableCell>{user.full_name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.phone_number}</TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="icon" onClick={() => handleEdit(user)}>
                  <Edit2 className="h-4 w-4" />
                  <span className="sr-only">Editar</span>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex justify-between mt-4">
        <Button disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>Anterior</Button>
        <span>Página {currentPage} de {totalPages}</span>
        <Button disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)}>Siguiente</Button>
      </div>

      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Editar Usuario</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSaveChanges}>
            <div className="grid gap-4 py-4">
              {/* Cédula */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="cedula" className="text-right">Cédula</Label>
                <Input
                  id="cedula"
                  name="cedula"
                  value={editingUser?.cedula || ''}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>

              {/* Nombre Completo */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="full_name" className="text-right">Nombre</Label>
                <Input
                  id="full_name"
                  name="full_name"
                  value={editingUser?.full_name || ''}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>

              {/* Email */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={editingUser?.email || ''}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>

              {/* Teléfono */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone_number" className="text-right">Teléfono</Label>
                <Input
                  id="phone_number"
                  name="phone_number"
                  value={editingUser?.phone_number || ''}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
            </div>

            <DialogFooter>
              <Button type="submit">Guardar cambios</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
