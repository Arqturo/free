'use client';

import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2'; 
import './admins.css';

export default function AdminPage() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [token, setToken] = useState("");

  useEffect(() => {
    const tok = sessionStorage.getItem("token");
    if (tok) {
      setToken(tok); 
    }
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const uploadExcel = async (token, file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('token', token);  

    try {
      const response = await fetch('/api/admin/uploadExcel', {
        method: 'POST',
        body: formData,
      });

      if (response.status === 401) {
        throw new Error('No autorizado. Por favor inicia sesión de nuevo.');
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error uploading the file');
      }

      return await response.json();
    } catch (error) {
      throw new Error(error.message || 'Unexpected error occurred');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      Swal.fire({
        icon: 'error',
        title: 'No se ha seleccionado ningún archivo',
        text: 'Por favor selecciona un archivo Excel para subir.',
      });
      return;
    }

    if (!token) {
      Swal.fire({
        icon: 'error',
        title: 'No autorizado',
        text: 'No se pudo encontrar un token válido. Por favor inicia sesión de nuevo.',
      });
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await uploadExcel(token, file);

      Swal.fire({
        icon: 'success',
        title: 'Carga exitosa',
        text: result.message || '¡El archivo se ha subido correctamente!',
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error al cargar',
        text: error.message || 'Ocurrió un error al intentar subir el archivo.',
      });
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className='upload_excel'>
      <main className="admin-page">
        <h1 className="page-title">Página de Administración</h1>

        <div className="upload-container">
          <h2>Subir archivo Excel para actualizar lista de inscritos</h2>

          <form onSubmit={handleSubmit} className="upload-form">
            <input
              type="file"
              accept=".xlsx, .xls"
              onChange={handleFileChange}
              className="file-input"
            />

            {loading ? (
              <button type="submit" className="submit-btn" disabled>
                Cargando...
              </button>
            ) : (
              <button type="submit" className="submit-btn">
                Subir archivo
              </button>
            )}
          </form>

          {error && <p className="error-message">{error}</p>}
        </div>
      </main>
    </div>
  );
}
