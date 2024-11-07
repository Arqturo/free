"use client";

import React, { useEffect, useState } from 'react';
import { handleUnauthorized } from '@/services/userServices';

export default function Fianzas() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fianzaData, setFianzaData] = useState([]);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = sessionStorage.getItem('token2');
    if (storedToken) {
      setToken(storedToken);
    }

    const fetchFianzaData = async () => {
      if (storedToken) {
        try {
          const response = await fetch('/api/user/getFianza', {
            method: 'GET',
            headers: {
              'Authorization': `Token ${storedToken}`,
            },
          });

          if (!response.ok) {
            if (response.status === 401) {
              handleUnauthorized();
            } else {
              setError('Failed to fetch fianzas data');
            }
            return;
          }

          const data = await response.json();
          setFianzaData(data);
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

    fetchFianzaData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='user_box'>
      {fianzaData.length === 0 ? (
        <div>No hay ningún estado de Fianzas</div>
      ) : (
        <table role="table" className='user_box_table'>
          <thead role="rowgroup">
            <tr role="row">
              <th role="columnheader">Cedula del Fiador</th>
              <th role="columnheader">Cedula Socio</th>
              <th role="columnheader">Nombre Socio</th>
              <th role="columnheader">Saldo</th>
              <th role="columnheader">Descripcion</th>
              <th role="columnheader">Desde</th>
              <th role="columnheader">Hasta</th>
            </tr>
          </thead>
          <tbody role="rowgroup">
            {fianzaData.map((item) => (
              <tr role="row" key={item.CEDFIA}>
                <td data-label='Cedula de Fiador' role="cell">{item.CEDFIA}</td>
                <td data-label='Cedula Socio' role="cell">{item.CEDSOC}</td>
                <td data-label='Nombre Socio' role="cell">{item.NOMBRESOCIO}</td>
                <td data-label='Saldo' role="cell">{item.SALDO}</td>
                <td data-label='Descripcion' role="cell">{item.DESCRIP.trim()}</td>
                <td data-label='Desde' role="cell">{item.DESDE}</td>
                <td data-label='Hasta' role="cell">{item.HASTA}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
