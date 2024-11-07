"use client";

import React, { useEffect, useState } from 'react';
import { handleUnauthorized } from '@/services/userServices';

export default function Haberes() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [haberesData, setHaberesData] = useState(null); 

  useEffect(() => {
    const storedToken = sessionStorage.getItem('token2');
    if (storedToken) {
      const fetchHaberesData = async () => {
        try {
          const response = await fetch('/api/user/getUserHaberes', {
            method: 'GET',
            headers: {
              'Authorization': `Token ${storedToken}`,
            },
          });

          if (!response.ok) {
            if (response.status === 401) {
              handleUnauthorized();
            } else {
              setError('Failed to fetch haberes data');
            }
            return;
          }

          const data = await response.json();
          setHaberesData(data); 
        } catch (err) {
          setError(err.message); 
        } finally {
          setLoading(false);
        }
      };

      fetchHaberesData();
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
      {!haberesData || haberesData.length === 0 ? (
        <div>No hay ningún estado de Haberes</div> // Message when there are no records
      ) : (
        <table role="table" className="user_box_table">
          <thead role="rowgroup">
            <tr role="row">
              <th role="columnheader">Total Agravados</th>
              <th role="columnheader">Disponibilidad</th>
              <th role="columnheader">50%</th>
              <th role="columnheader">Total Embargos</th>
              <th role="columnheader">Total Fianzas</th>
              <th role="columnheader">Saldo Final</th>
            </tr>
          </thead>
          <tbody role="rowgroup">
            {haberesData?.[0] && (
              <tr role="row">
                <td data-label="Total Agravados" role="cell">
                  {haberesData[0].Total_Agravados?.toFixed(2)}
                </td>
                <td data-label="Disponibilidad" role="cell">
                  {haberesData[0].Disponibilidad?.toFixed(2)}
                </td>
                <td data-label="50%" role="cell">
                  {haberesData[0]["50_Porcentaje_Disponibilidad"]?.toFixed(2)}
                </td>
                <td data-label="Total Embargos" role="cell">
                  {haberesData[0].Total_Embargos?.toFixed(2)}
                </td>
                <td data-label="Total Fianzas" role="cell">
                  {haberesData[0].Total_Fianzas?.toFixed(2)}
                </td>
                <td data-label="Saldo Final" role="cell">
                  {haberesData[0].Saldo_Final?.toFixed(2)}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
