'use client'

import { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Edit2 } from "lucide-react"
import { handleUnauthorized } from '@/services/usersAdminServices'

export default function UserTable() {
  const [token, setToken] = useState("")
  const [lista, setLista] = useState([]) // List of users
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editingUser, setEditingUser] = useState(null)
  const [changes, setChanges] = useState({}) // State to store changes
  const [currentPage, setCurrentPage] = useState(1) // State for current page
  const [totalPages, setTotalPages] = useState(0) // State for total pages
  const [cedulaSearch, setCedulaSearch] = useState("") // Search value for cedula

  // Fetch the token and list users when the page loads or when the page changes
  useEffect(() => {
    const tok = sessionStorage.getItem("token")
    if (tok) {
      setToken(tok)
      fetchUsers(tok, currentPage, cedulaSearch)
    }
  }, [currentPage, cedulaSearch]) // Fetch users whenever currentPage or cedulaSearch changes

  // Function to fetch users from the API
  const fetchUsers = async (tok, page, cedula) => {
    try {
      const queryParams = new URLSearchParams({ page: page.toString() })

      // Only add cedula filter if it is not empty
      if (cedula) {
        queryParams.append("cedula", cedula)
      }

      const response = await fetch(`/api/admin/listUsers?${queryParams.toString()}`, {
        headers: {
          'Authorization': `Token ${tok}`, // Pass the token in the Authorization header
        },
      })

      if (!response.ok) {
        if (response.status === 401) {
          handleUnauthorized();
        } else {
          console.error("Failed to fetch users")
          return
        }
      }

      const data = await response.json()

      setLista(data.results)
      setTotalPages(data.total_pages) // Set total pages from response

    } catch (error) {
      console.error("Error fetching users:", error)
    }
  }

  // Function to handle opening the edit modal
  const handleEdit = (user) => {
    setEditingUser(user)
    setIsEditModalOpen(true)
    setChanges({}) // Reset changes when modal opens
  }

  // Function to handle saving changes to a user
  const handleSaveChanges = async (e) => {
    e.preventDefault()

    if (editingUser) {
      const dataToUpdate = { id: editingUser.id, ...changes }

      try {
        const response = await fetch('/api/admin/editUsers', {
          method: 'PUT',
          headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: editingUser.id, data: dataToUpdate }),
        })

        if (!response.ok) {
          if (response.status === 401) {
            handleUnauthorized();
          } else {
            console.error("Failed to save changes")
            return
          }
        }

        const updatedUser = await response.json()

        // Update the user in the list
        setLista(prevLista =>
          prevLista.map(user =>
            user.id === editingUser.id ? { ...user, ...updatedUser } : user
          )
        )

        setIsEditModalOpen(false)
        setEditingUser(null)
        setChanges({}) // Reset changes after saving
      } catch (error) {
        console.error("Error saving changes:", error)
      }
    }
  }

  // Function to handle changes to the input fields
  const handleInputChange = (e) => {
    const { name, value } = e.target

    if (editingUser) {
      if (editingUser[name] !== value) {
        setChanges(prevChanges => ({
          ...prevChanges,
          [name]: value
        }))
      }

      setEditingUser({
        ...editingUser,
        [name]: value
      })
    }
  }

  // Function to handle page changes
  const handlePageChange = (newPage) => {
    if (newPage !== currentPage && newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage)
    }
  }

  // Function to handle search input change
  const handleCedulaSearchChange = (e) => {
    setCedulaSearch(e.target.value)
  }

  // Function to handle search button click
  const handleSearchClick = () => {
    setCurrentPage(1) // Reset to the first page when searching
    fetchUsers(token, 1, cedulaSearch) // Fetch users with cedula filter
  }

  return (
    <div className="container mx-auto p-10">
      {/* Cedula Search Input */}
      <div className="mb-4 flex items-center">
        <Label htmlFor="cedula-search" className="mr-2">Buscar por Cédula</Label>
        <Input
          id="cedula-search"
          value={cedulaSearch}
          onChange={handleCedulaSearchChange}
          className="mr-2"
        />
        <Button onClick={handleSearchClick}>Buscar</Button>
      </div>

      {/* Users Table */}
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
              <TableCell className="font-medium">{user.cedula || 'N/A'}</TableCell>
              <TableCell>{user.full_name || 'N/A'}</TableCell>
              <TableCell>{user.email || 'N/A'}</TableCell>
              <TableCell>{user.phone_number || 'N/A'}</TableCell>
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

      {/* Pagination */}
      <div className="flex justify-between mt-4">
        <Button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Anterior
        </Button>
        <span>Página {currentPage} de {totalPages}</span>
        <Button
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Siguiente
        </Button>
      </div>

      {/* Edit Modal */}
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
