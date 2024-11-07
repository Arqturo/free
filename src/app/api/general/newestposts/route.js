export function newestposts(page) {
    async function queryPosts() {          
        const response = await fetch(`${apiUrl}/post/?page=${page}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }  
        });  
        const data = await response.json();               
        
       
        return data;                                         
    }   

    return queryPosts(); 
}