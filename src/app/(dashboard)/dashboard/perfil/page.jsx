"use client";

import React, { useEffect, useState } from 'react';
import { getProfile, updateProfile } from '@/services/userServices'; // Adjust the import path as necessary
import Swal from 'sweetalert2';
import './Perfil.css'; // Import the CSS file

export default function Perfil() {
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState(null);
  const [formData, setFormData] = useState({ email: '', phone_number: '', full_name: '' });
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = sessionStorage.getItem('token2');
    if (storedToken) {
      setToken(storedToken);
    }

    const fetchProfileData = async () => {
      if (storedToken) {
        try {
          const data = await getProfile(storedToken);
          setProfileData(data);
          setFormData({
            email: data.email,
            phone_number: data.phone_number,
            full_name: data.full_name,
          });
        } catch (err) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: err.message,
          });
        } finally {
          setLoading(false);
        }
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se encontró el token',
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
    if (token) {
      try {
        await updateProfile(token, formData);
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'Perfil actualizado con éxito!',
        });
        setProfileData({ ...profileData, ...formData });
      } catch (err) {
        Swal.fire({
          icon: 'error',
          title: 'Error, correo o cedula no unicos',
          text: err.message,
        });
      }
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
        <button className="form-button" type="submit">Actualizar Perfil</button>
      </form>
      {profileData && (
        <div className="profile-info">
          <h3>Información de Su Perfil:</h3>
          <p><strong>Cédula:</strong> {profileData.cedula}</p>
          <p><strong>Email:</strong> {profileData.email}</p>
          <p><strong>Número de Teléfono:</strong> {profileData.phone_number}</p>
          <p><strong>Nombre Completo:</strong> {profileData.full_name}</p>
        </div>
      )}
    </div>
  );
}
