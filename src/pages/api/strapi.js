// pages/api/strapi.js
export default async function handler(req, res) {
  const { endpoint } = req.query;  // Puedes enviar el endpoint que deseas consultar desde el frontend

  try {
    // Usar la variable de entorno NEXT_PUBLIC_BACKEND_URL para la URL base
    const strapiUrl = `${process.env.BACKEND_URL}/api/${endpoint}`;
    
    const response = await fetch(strapiUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${process.env.API_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: 'Failed to fetch data from Strapi' });
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error while fetching data from Strapi' });
  }
}
