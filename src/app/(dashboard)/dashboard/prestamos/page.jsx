"use client";

import React, { useEffect, useState } from 'react';

import { handleUnauthorized } from '@/services/userServices'; 

export default function Prestamos() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [prestamosData, setPrestamosData] = useState([]); 
  const [token, setToken] = useState(null); // Use state to manage token

  useEffect(() => {
    const storedToken = sessionStorage.getItem('token2');
    if (storedToken) {
      setToken(storedToken);
    }

    const fetchPrestamosData = async () => {
      if (storedToken) {
        try {
          const response = await fetch('/api/user/getUserLoans', {
            method: 'GET',
            headers: {
              'Authorization': `Token ${storedToken}`,
            },
          });

          if (response.status === 401) {
            handleUnauthorized(); 
            return;
          }

          if (!response.ok) {
            throw new Error('Failed to fetch prestamos data');
          }

          const data = await response.json();

          if (data.error) {
            throw new Error(data.error);
          }

          setPrestamosData(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      } else {
        setError("No token found");
        setLoading(false);
      }
    };

    fetchPrestamosData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="user_box">
      {prestamosData.length === 0 ? (
        <div>No hay ningún estado de Préstamos</div> 
      ) : (
        <table role="table" className="user_box_table">
          <thead role="rowgroup">
            <tr role="row">
              <th role="columnheader">Serial</th>
              <th role="columnheader">Código</th>
              <th role="columnheader">Descripción</th>
              <th role="columnheader">Monto</th>
              <th role="columnheader">Saldo</th>
              <th role="columnheader">Tasa</th>
              <th role="columnheader">Estado</th>
            </tr>
          </thead>
          <tbody role="rowgroup">
            {prestamosData.map((item) => (
              <tr role="row" key={item.SERIAL}>
                <td data-label="Serial" role="cell">{item.SERIAL}</td>
                <td data-label="Código" role="cell">{item.CODPTMO}</td>
                <td data-label="Descripción" role="cell">{item.DESCRIP.trim()}</td>
                <td data-label="Monto" role="cell">{item.MONTO}</td>
                <td data-label="Saldo" role="cell">{item.SALDO}</td>
                <td data-label="Tasa" role="cell">{item.TASA}</td>
                <td data-label="Estado" role="cell">{item.STATUS}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
