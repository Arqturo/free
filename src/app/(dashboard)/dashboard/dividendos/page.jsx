"use client";

import React, { useEffect, useState } from 'react';
import { handleUnauthorized } from '@/services/userServices';

export default function Dividendos() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dividendosData, setDividendosData] = useState(null); 

  useEffect(() => {
    const storedToken = sessionStorage.getItem('token2');
    if (storedToken) {
      const fetchDividendosData = async () => {
        try {
          const response = await fetch('/api/user/getDividendos', {
            method: 'GET',
            headers: {
              'Authorization': `Token ${storedToken}`,
            },
          });

          if (!response.ok) {
            if (response.status === 401) {
              handleUnauthorized();
            } else {
              setError('Failed to fetch dividendos data');
            }
            return;
          }

          const data = await response.json();
          setDividendosData(data); 
        } catch (err) {
          setError(err.message); 
        } finally {
          setLoading(false);
        }
      };

      fetchDividendosData();
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
      {!dividendosData || dividendosData.length === 0 ? (
        <div>No hay ningún estado de Dividendos</div> // Message when there are no records
      ) : (
        <table role="table" className="user_box_table">
          <thead role="rowgroup">
            <tr role="row">
              <th role="columnheader">Codigo Ahorro</th>
              <th role="columnheader">Descripcion</th>
              <th role="columnheader">Saldo Ahorro</th>
            </tr>
          </thead>
          <tbody role="rowgroup">
            {dividendosData?.map((dividendo, index) => (
              <tr key={index} role="row">
                <td data-label="Codigo Ahorro" role="cell">
                  {dividendo.Codigo_Ahorro}
                </td>
                <td data-label="Descripcion" role="cell">
                  {dividendo.Descripcion}
                </td>
                <td data-label="Saldo Ahorro" role="cell">
                  {dividendo.Saldo_Ahorro?.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
