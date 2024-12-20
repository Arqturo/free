"use client";

import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import './Perfil.css'; // Import the CSS file
import { handleUnauthorized } from '@/services/userServices'; // Import the function

export default function Perfil() {
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState(null);
  const [formData, setFormData] = useState({
    email: '',
    phone_number: '',
    full_name: '',
    room_address: '',
    birth_date: '',
  });
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = sessionStorage.getItem('token2');
    if (storedToken) {
      setToken(storedToken);
    }

    const fetchProfileData = async () => {
      if (storedToken) {
        try {
          const response = await fetch('/api/user/getProfile', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${storedToken}`,
            },
          });

          if (response.ok) {
            const data = await response.json();
            setProfileData(data);
            setFormData({
              email: data.email || '',
              phone_number: data.phone_number || '',
              full_name: data.full_name || '',
              room_address: data.room_address || '',  
              birth_date: data.birth_date || '',    
            });
          } else if (response.status === 401) {
            handleUnauthorized();
          } else {
            const error = await response.json();
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: error.message || 'No se pudo cargar los datos del perfil.',
            });
          }
        } catch (err) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: err.message || 'Hubo un error al cargar el perfil.',
          });
        } finally {
          setLoading(false);
        }
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se encontró el token.',
        });
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se encontró el token.',
      });
      return;
    }

    try {
      const response = await fetch('/api/user/updateProfile', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),  
      });

      if (response.ok) {
        const updatedData = await response.json();
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'Perfil actualizado con éxito!',
        });
        setProfileData({ ...profileData, ...formData });
      } else if (response.status === 401) {
        handleUnauthorized();
      } else {
        const error = await response.json();
        throw new Error(error.message || 'Error al actualizar el perfil');
      }
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Error al actualizar perfil',
        text: err.message || 'Algo salió mal.',
      });
    }
  };

  if (loading) {
    return <div className="loading">Cargando...</div>;
  }

  return (
    <div className="perfil-container">
      <h2 className="perfil-title">Perfil</h2>
      <form className="perfil-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input
            className="form-input"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Número de Teléfono:</label>
          <input
            className="form-input"
            type="tel"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Nombre Completo:</label>
          <input
            className="form-input"
            type="text"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Dirección de habitación:</label>
          <input
            className="form-input"
            type="text"
            name="room_address"
            value={formData.room_address}
            onChange={handleChange}
            placeholder="Ingrese su dirección"
          />
        </div>

        <div className="form-group">
          <label>Fecha de Nacimiento:</label>
          <input
            className="form-input"
            type="date"
            name="birth_date"
            value={formData.birth_date}
            onChange={handleChange}
            required
          />
        </div>

        <button className="form-button" type="submit">Actualizar Perfil</button>
      </form>
      {profileData && (
        <div className="profile-info">
          <h3>Información de Su Perfil:</h3>
          <p><strong>Cédula:</strong> {profileData.cedula}</p>
          <p><strong>Email:</strong> {profileData.email}</p>
          <p><strong>Número de Teléfono:</strong> {profileData.phone_number}</p>
          <p><strong>Nombre Completo:</strong> {profileData.full_name}</p>
          <p><strong>Dirección de habitación:</strong> {profileData.room_address || 'No proporcionada'}</p>
          <p><strong>Fecha de Nacimiento:</strong> {profileData.birth_date || 'No proporcionada'}</p>
        </div>
      )}
    </div>
  );
}
