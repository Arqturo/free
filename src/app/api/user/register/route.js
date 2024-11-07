require('dotenv').config();
const apiUrl = process.env.NEXT_PUBLIC_APP_API_URL;  

export async function POST(request) {
  try {
    const dataToSend = await request.json();

    const response = await fetch(apiUrl + '/register/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSend),
    });

    const data = await response.json();

    console.log(data);

    if (data.error) {
      return new Response(
        JSON.stringify({ error: "Usted no se encuentra inscrito en la caja de ahorro" }),
        { status: 400 }
      );
    } else if (data.cedula) {
      return new Response(
        JSON.stringify({ error: "Usted ya se encuentra registrado en el sistema" }),
        { status: 400 }
      );
    } else if (data.email) {
      return new Response(
        JSON.stringify({ error: "El correo ya está asociado a una cuenta en el sistema" }),
        { status: 400 }
      );
    }

    return new Response(
      JSON.stringify({ message: 'Registration successful', user: data }),
      { status: 201 }  
    );
  } catch (error) {
    console.error('Error al registrar el usuario:', error);

    return new Response(
      JSON.stringify({ error: "Ocurrió un error al comunicarse con el servidor. Por favor, inténtelo más tarde." }),
      { status: 500 }
    );
  }
}
