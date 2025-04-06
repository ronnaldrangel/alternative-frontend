import Loader from '@/components/loader/skeleton';
import { useStrapiData } from '@/services/strapiService';

const Index = () => {
  const { data: products, error, isLoading } = useStrapiData('products?populate=*');

  // Imprimir en consola la petición de la API
  console.log('Data:', products);
  console.log('Error:', error);
  console.log('Loading:', isLoading);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="text-red-600 dark:text-red-400">
        Error al cargar los datos: {error.message}
      </div>
    );
  }

  return (
    <>
      <div>
        <p className="text-xl font-semibold mb-4">Enlaces importantes</p>

        {/* Asegúrate de que los datos estén disponibles antes de renderizar */}
        {products && products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className="mb-4 p-4 border rounded-md">
              <p><strong>Nombre:</strong> {product.name}</p>
              <p><strong>Precio regular:</strong> ${product.regularPrice}</p>
              <p><strong>Precio de venta:</strong> ${product.salePrice}</p>
              <p><strong>Fecha de creación:</strong> {new Date(product.createdAt).toLocaleString()}</p>
              <p><strong>Fecha de publicación:</strong> {new Date(product.publishedAt).toLocaleString()}</p>
              <p><strong>Fecha de actualización:</strong> {new Date(product.updatedAt).toLocaleString()}</p>
              <p><strong>ID de documento:</strong> {product.documentId}</p>
              <p><strong>ID:</strong> {product.id}</p>
              {/* Mostrar imagen si existe */}
              {product.img && product.img.url ? (
                <img src={product.img.url} alt={product.name} className="w-full h-auto" />
              ) : (
                <p>No hay imagen disponible</p>
              )}
            </div>
          ))
        ) : (
          <p>No hay productos disponibles.</p>
        )}
      </div>
    </>
  );
};

export default Index;
