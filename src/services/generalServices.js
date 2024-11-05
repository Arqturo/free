require('dotenv').config();
const apiUrl = process.env.NEXT_PUBLIC_APP_API_URL;

export function listposts(page) {
    async function queryposts() {          
        const response = await fetch(`${apiUrl}/post/?page=${page}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }  
        });  
        const data = await response.json();               
        return data;                                         
    }   

    return queryposts(); 
}

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

export function getPost(postId) {
  async function queryPost() {
      const response = await fetch(`${apiUrl}/post/${postId}/`, {
          method: "GET",
          headers: {
              'Content-Type': 'application/json'
          }
      });

      if (!response.ok) {
          throw new Error(`Error fetching post: ${response.statusText}`);
      }

      const res = await response.json();
      return res; 
  }

  return queryPost();
}


export function fileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
  
      reader.onloadend = () => {
        resolve(reader.result);
      };
  
      reader.onerror = () => {
        reject(new Error('Failed to convert file to Base64'));
      };
  
      reader.readAsDataURL(file);
    });
  }
  
  export function base64ToFile(base64String, fileName) {
    if (!base64String || !base64String.includes(',')) {
      throw new Error('Invalid Base64 string');
    }
  
    const arr = base64String.split(',');
    const mimeMatch = arr[0].match(/:(.*?);/);
    
    if (!mimeMatch || mimeMatch.length < 2) {
      throw new Error('Invalid Base64 string format');
    }
  
    const mime = mimeMatch[1];
    const bstr = atob(arr[1]);
    const n = bstr.length;
    const u8arr = new Uint8Array(n);
  
    for (let i = 0; i < n; i++) {
      u8arr[i] = bstr.charCodeAt(i);
    }
  
    return new File([u8arr], fileName, { type: mime });
  }

 export function removeHtmlTags(text) {
    return text.replace(/<[^>]*>/g, ''); // Removes anything that looks like an HTML tag
}