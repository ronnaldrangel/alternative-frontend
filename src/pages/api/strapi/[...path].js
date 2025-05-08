export default async function handler(req, res) {
    const path = req.query.path || [];
    const strapiPath = path.join('/');
    
    // Construir la URL completa usando la variable de entorno del servidor
    const url = `${process.env.STRAPI_INTERNAL_URL}/api/${strapiPath}${
      req.url.includes('?') ? '?' + req.url.split('?')[1] : ''
    }`;
    
    try {
      const response = await fetch(url, {
        method: req.method,
        headers: {
          'Authorization': `Bearer ${process.env.STRAPI_API_TOKEN || process.env.NEXT_PUBLIC_API_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: req.method !== 'GET' ? JSON.stringify(req.body) : undefined,
      });
      
      const data = await response.json();
      return res.status(response.status).json(data);
    } catch (error) {
      console.error('Error al conectar con Strapi:', error);
      return res.status(500).json({ error: error.message });
    }
  }