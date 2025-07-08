import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from '../../api/axios';
import useNotification from '../../hooks/useNotification';

interface CatalogItem {
    id: string;
    name: string;
    description: string;
    category: string;
    price: number;
    images: string[];
}

const CatalogById: React.FC = () => {
    const notify = useNotification();
    const { id } = useParams<{ id: string }>();
    const [item, setItem] = useState<CatalogItem | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchItem = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`/products/get/${id}`);
                if (response.data.success) {
                    const data = response.data.product as CatalogItem;
                    setItem(data);
                }
            } catch (err: any) {
                const error = err?.response?.data?.message || 'Error al procesar la solicitud';
                notify(error, 'error');
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchItem();
    }, [id]);

    if (loading) return <div>Cargando...</div>;
    if (!item) return <div>No se encontró el producto.</div>;

    return (
        <div className="p-8 max-w-2xl mx-auto">
            {item.images && item.images.length === 0 ? (
                <div className="mb-4">
                    <img src="/images/no-image.png" alt="No disponible" className="w-full h-64 object-cover rounded" />
                </div>
            ) : item.images && (
                <div className="mb-4">
                    {item.images.map((image, index) => (
                        <img
                            key={index}
                            src={image}
                            alt={item.name}
                            className="w-full h-64 object-cover rounded mb-2"
                        />
                    ))}
                </div>
            )}
            <Link to={'/catalog'}>Volver al catalogo</Link>

            <h1 className="text-3xl font-bold mb-4">{item.name}</h1>
            <p className="text-gray-600 mb-2">Categoría: {item.category}</p>
            <p className="text-lg font-semibold mb-4">${item.price}</p>
            <p className="text-gray-800">{item.description}</p>
            <div className="mt-6">
                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                    onClick={() => notify('Funcionalidad no implementada', 'info')}>
                    Agregar al carrito
                </button>
            </div>
        </div>
    );
};

export default CatalogById;