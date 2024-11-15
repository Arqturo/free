"use client";

import React, { useEffect, useState } from 'react';
import { handleUnauthorized } from '@/services/userServices';

export default function Solicitudes() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [solicitudesData, setSolicitudesData] = useState(null); 

  useEffect(() => {
    const storedToken = sessionStorage.getItem('token2');
    if (storedToken) {
      const fetchSolicitudesData = async () => {
        try {
          const response = await fetch('/api/user/getSolicitudes', {
            method: 'GET',
            headers: {
              'Authorization': `Token ${storedToken}`,
            },
          });

          if (!response.ok) {
            if (response.status === 401) {
              handleUnauthorized();
            } else {
              setError('Failed to fetch solicitudes data');
            }
            return;
          }

          const data = await response.json();
          setSolicitudesData(data); 
        } catch (err) {
          setError(err.message); 
        } finally {
          setLoading(false);
        }
      };

      fetchSolicitudesData();
    } else {
      setError("No token found");
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="user_box">
      {!solicitudesData || solicitudesData.length === 0 ? (
        <div>No hay ninguna solicitud pendiente</div>
      ) : (
        <table role="table" className="user_box_table">
          <thead role="rowgroup">
            <tr role="row">
              <th role="columnheader">Serial</th>
              <th role="columnheader">Apellidos</th>
              <th role="columnheader">Nombre</th>
              <th role="columnheader">Monto Solicitado</th>
              <th role="columnheader">Monto Prestamo</th>
              <th role="columnheader">Descripcion</th>
              <th role="columnheader">Numero de Cuotas</th>
              <th role="columnheader">Tasa</th>
              <th role="columnheader">Status</th>
            </tr>
          </thead>
          <tbody role="rowgroup">
            {solicitudesData?.map((solicitud, index) => (
              <tr key={index} role="row">
                <td data-label="Serial" role="cell">{solicitud.Serial}</td>
                <td data-label="Apellidos" role="cell">{solicitud.Apellidos}</td>
                <td data-label="Nombre" role="cell">{solicitud.Nombre}</td>
                <td data-label="Solicitado" role="cell">{solicitud.Monto_Solicitado?.toFixed(2)}</td>
                <td data-label="Prestamo" role="cell">{solicitud.Monto_Prestamo?.toFixed(2)}</td>
                <td data-label="Descripcion" role="cell">{solicitud.Descripcion}</td>
                <td data-label="Num Cuotas" role="cell">{solicitud.Numero_Cuotas}</td>
                <td data-label="Tasa" role="cell">{solicitud.Tasa}</td>
                <td data-label="Status" role="cell">{solicitud.Status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
