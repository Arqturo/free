'use client'

import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Edit2, Save, X, Plus } from "lucide-react"
import Image from 'next/image'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { listposts, deletePost, editPost, addPost } from "../../../../../services/usersAdminServices"
import { fileToBase64, base64ToFile } from '@/services/generalServices'

export default function PostListEditor() {
  const [posts, setPosts] = useState([]) 
  const [editingPost, setEditingPost] = useState(null)
  const [addingPost, setAddingPost] = useState(false) 
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [token, setToken] = useState("")

  useEffect(() => {
    const tok = sessionStorage.getItem("token")
    if (tok) {
      setToken(tok)
      fetchPosts(tok, currentPage)
    }
  }, [currentPage])

  const fetchPosts = async (tok, page) => {
    try {
      const datos = await listposts(tok, page);
      if (datos && datos.results && Array.isArray(datos.results.results)) {
        setPosts(datos.results.results); 
        setTotalPages(datos.results.total_pages || 0); 
      } else {
        console.error('Invalid data format', datos);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  }

  const startEditing = (post) => {
    setEditingPost(post);
  }

  const cancelEditing = () => setEditingPost(null)

  const savePost = async (post) => {
    await editPost(token, post.id, post)
    setEditingPost(null)
    const tok = sessionStorage.getItem("token")
    fetchPosts(tok, currentPage);
  }

  const handleDelete = async (post) => {
    if (post) {
      await deletePost(token, post.id);
      const tok = sessionStorage.getItem("token")
      cancelEditing(); 
      fetchPosts(tok, currentPage);
      setCurrentPage(1);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage)
    }
  }

  const addNewPost = async (post) => {
    await addPost(token, post)
    setAddingPost(false)
    const tok = sessionStorage.getItem("token")
    fetchPosts(tok, currentPage);
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Lista de Posts</h1>
        <Button onClick={() => setAddingPost(true)}>
          <Plus className="mr-2 h-4 w-4" /> Agregar Post
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {posts.map(post => {
          let imageUrl = '';

          if (post.image) {
            try {
              const file = base64ToFile(post.image, 'image.png'); 
              imageUrl = URL.createObjectURL(file);
            } catch (error) {
              console.error('Error creating image URL:', error);
            }
          }

          return (
            <Card key={post.id}>
              <CardHeader>
                <CardTitle>{post.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <Image 
                  src={imageUrl || ''} 
                  alt={post.title} 
                  width={300} 
                  height={300} 
                  className="w-full h-48 object-cover mb-4"
                />
                <div dangerouslySetInnerHTML={{ __html: post.description }} className="mb-2" />
                <p className="text-sm text-muted-foreground">Escrito por {post.author}</p>
                <p className="text-sm text-muted-foreground">
                  Ultima edición el: {post.updated_at}
                </p> 
              </CardContent>
              <CardFooter>
                <Button onClick={() => startEditing(post)}>
                  <Edit2 className="mr-2 h-4 w-4" /> Editar
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>

      <div className="flex justify-between mt-4">
        <Button disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>Anterior</Button>
        <span>Página {currentPage} de {totalPages}</span>
        <Button disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)}>Siguiente</Button>
      </div>

      <PostEditModal
        post={editingPost}
        onSave={savePost}
        onCancel={cancelEditing}
        onDelete={handleDelete}
      />

      <PostAddModal
        open={addingPost}
        onClose={() => setAddingPost(false)}
        onAdd={addNewPost}
      />
    </div>
  )
}

function PostEditModal({ post, onSave, onCancel, onDelete }) {
  const [title, setTitle] = useState(post?.title || '');
  const [description, setDescription] = useState(post?.description || '');
  const [image, setImage] = useState(post?.image || '');
  const [author, setAuthor] = useState(post?.author || 'CAPROLUZ');
  const [content, setContent] = useState(post?.content || '');

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setDescription(post.description);
      setImage(post.image);
      setAuthor(post.author);
      setContent(post.content);
    }
  }, [post]);

  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
      const base64String = await fileToBase64(file);
      setImage(base64String);
    } else {
      alert("Por favor, selecciona una imagen en formato JPEG o PNG.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedPost = {
      id: post.id,
      title,
      description,
      image,
      author,
      content,
    };
    await onSave(updatedPost);
  };

  return (
    <Dialog open={!!post} onOpenChange={onCancel}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Editar Post</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Título</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Título"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="author">Autor</Label>
            <Input
              id="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Autor"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Descripción</Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descripción"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="content">Contenido</Label>
            <CKEditor
              editor={ClassicEditor}
              data={content}
              onChange={(event, editor) => {
                const data = editor.getData();
                setContent(data);
              }}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="image">Imagen</Label>
            <Input
              id="image"
              type="file"
              accept=".jpg,.jpeg,.png"
              onChange={handleImageChange}
            />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onCancel}>
              <X className="mr-2 h-4 w-4" /> Cancelar
            </Button>
            <Button type="submit">
              <Save className="mr-2 h-4 w-4" /> Guardar
            </Button>
            <Button type="button" variant="destructive" onClick={onDelete}>
              <X className="mr-2 h-4 w-4" /> Eliminar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function PostAddModal({ open, onClose, onAdd }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [author, setAuthor] = useState('CAPROLUZ');
  const [content, setContent] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');

  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
      const base64String = await fileToBase64(file);
      setImage(base64String);
      setPreviewUrl(URL.createObjectURL(file)); 
    } else {
      alert("Por favor, selecciona una imagen en formato JPEG o PNG.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      title,
      description,
      image,
      author,
      content,
    };
    await onAdd(newPost);
    // Reset fields after adding
    setTitle('');
    setDescription('');
    setImage('');
    setAuthor('CAPROLUZ');
    setContent('');
    setPreviewUrl('');
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Agregar Post</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Título</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Título"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="author">Autor</Label>
            <Input
              id="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Autor"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Descripción</Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descripción"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="content">Contenido</Label>
            <CKEditor
              editor={ClassicEditor}
              data={content}
              onChange={(event, editor) => {
                const data = editor.getData();
                setContent(data);
              }}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="image">Imagen</Label>
            <Input
              id="image"
              type="file"
              accept=".jpg,.jpeg,.png"
              onChange={handleImageChange}
            />
            {previewUrl && (
              <Image
                src={previewUrl}
                alt="Vista previa"
                width={300}
                height={300} 
              />
            )}
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              <X className="mr-2 h-4 w-4" /> Cancelar
            </Button>
            <Button type="submit">
              <Save className="mr-2 h-4 w-4" /> Agregar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
