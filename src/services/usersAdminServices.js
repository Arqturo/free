require('dotenv').config();
const apiUrl = process.env.NEXT_PUBLIC_APP_API_URL;


export const handleUnauthorized = () => {

    document.cookie.split(";").forEach((c) => {
        document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });
    window.location.href = '/admin';
};



export function listusers(token, page) {
    async function queryusers() {          
        const response = await fetch(`${apiUrl}/pagemaster/search-custom-users/?page=${page}`, {
            method: "GET",
            headers: {
                'Authorization': `token ${token}`, 
                'Content-Type': 'application/json'
            }  
        });
        
        if (response.status === 401) {
            handleUnauthorized();
            return;
        }

        const data = await response.json();               
        return data;                                          
    }   

    return queryusers();             
}

export function editUsers(token, data) {
    async function queryusers() {      
        const response = await fetch(`${apiUrl}/pagemaster/update-custom-user/${data.id}/`, {
            method: "PUT",
            headers: {
                'Authorization': `Token ${token}`, 
                'Content-Type': 'application/json'
            },  
            body: JSON.stringify(data)    
        });

        if (response.status === 401) {
            handleUnauthorized();
            return;
        }

        const res = await response.json();
        return res; 
    }   

    return queryusers();                  
}

export function listposts(token, page) {
    async function queryposts() {          
        const response = await fetch(`${apiUrl}/post/?page=${page}`, {
            method: "GET",
            headers: {
                'Authorization': `token ${token}`, 
                'Content-Type': 'application/json'
            }  
        });  

        const data = await response.json();               
        return data;                                         
    }   

    return queryposts(); 
}

export function editPost(token, postId, data) {
    async function queryPost() {
        const response = await fetch(`${apiUrl}/post/${postId}/modify/`, {
            method: "PUT",
            headers: {
                'Authorization': `token ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.status === 401) {
            handleUnauthorized();
            return;
        }

        const res = await response.json();
        return res; // Return the response data
    }

    return queryPost(); 
}

export function deletePost(token, postId) {
    async function queryPost() {
        const response = await fetch(`${apiUrl}/post/${postId}/modify`, {
            method: "DELETE",
            headers: {
                'Authorization': `token ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (response.status === 401) {
            handleUnauthorized();
            return;
        }

        if (response.ok) {
            return { success: true }; // Indicate success
        }

        const error = await response.json();
        throw new Error(error.message || "Failed to delete post");
    }

    return queryPost(); 
}

export function addPost(token, data) {
    async function queryPost() {
        const response = await fetch(`${apiUrl}/post/create/`, {
            method: "POST",
            headers: {
                'Authorization': `token ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.status === 401) {
            handleUnauthorized();
            return;
        }

        if (response.ok) {
            const res = await response.json();
            return res; 
        }

        const error = await response.json();
        throw new Error(error.message || "Failed to create post");
    }

    return queryPost();
}

export function importUsers(token, file) {
    async function queryImportUsers() {
        const formData = new FormData();
        formData.append('file', file);  

        const response = await fetch(`${apiUrl}/pagemaster/import-users/`, {
            method: "POST",
            headers: {
                'Authorization': `Token ${token}`, 
            },
            body: formData,  
        });

        if (response.status === 401) {
            handleUnauthorized();
            return;
        }

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.detail || "Failed to import users");
        }

        const res = await response.json();
        return res; 
    }

    return queryImportUsers();
}