require('dotenv').config();
const apiUrl = process.env.NEXT_PUBLIC_APP_API_URL;

export const handleUnauthorized = () => {
    document.cookie.split(";").forEach((c) => {
       document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });
  window.location.href = '/auth/signin';
};

export function getProfile(token) {
    async function queryProfile() {
        const response = await fetch(`${apiUrl}/profile/`, {
            method: "GET",
            headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (response.status === 401) {
            return { error: 'Unauthorized' }; 
        }

        const data = await response.json();
        return data;
    }

    return queryProfile();
}

export function getUserLoans(token) {
    async function queryUserLoans() {
        const response = await fetch(`${apiUrl}/user/loans/`, {
            method: "GET",
            headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (response.status === 401) {
            return { error: 'Unauthorized' };
        }

        const data = await response.json();
        return data;
    }

    return queryUserLoans();
}

export function getHaberes(token) {
  
    async function queryHaberes() {
      const response = await fetch(`${apiUrl}/user/haberes/`, {
        method: 'GET',
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json',
        },
      });
  
      if (response.status === 401) {
        return { error: 'Unauthorized' };
      }
  
      if (!response.ok) {
        return { error: 'Failed to fetch data' };  
      }
  
      const data = await response.json();
      return data;
    }
  
    return queryHaberes();
  }

export function getFianza(token) {
    async function queryFianza() {
        const response = await fetch(`${apiUrl}/user/fianzas/`, {
            method: "GET",
            headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (response.status === 401) {
            return { error: 'Unauthorized' };
        }

        const data = await response.json();
        return data;
    }

    return queryFianza();
}

export function getDividendos(token) {
    async function queryDividendos() {
        const response = await fetch(`${apiUrl}/user/dividendos/`, {
            method: "GET",
            headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (response.status === 401) {
            return { error: 'Unauthorized' };
        }

        const data = await response.json();
        return data;
    }

    return queryDividendos();
}

export function getSolicitudes(token) {
    async function querySolicitudes() {
        const response = await fetch(`${apiUrl}/user/solicitudes/`, {
            method: "GET",
            headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (response.status === 401) {
            return { error: 'Unauthorized' };
        }

        const data = await response.json();
        return data;
    }

    return querySolicitudes();
}



export async function updateProfile(token, data) {
    try {
        const response = await fetch(`${apiUrl}/profile/edit/`, {
            method: 'PUT',
            headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (response.status === 401) {
            return { error: 'Unauthorized' }; 
        }

        if (response.ok) {
            const updatedData = await response.json();
            return updatedData; 
        }

        const error = await response.json();
        throw new Error(error.message || 'Failed to update profile'); 
    } catch (error) {
        console.error('Error updating profile:', error);
        return { error: error.message || 'Unknown error occurred while updating profile' };
    }
}