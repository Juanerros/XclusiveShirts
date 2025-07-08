import axios from '../../api/axios';
import React, { useEffect, useState } from 'react';
import useNotification from '../../hooks/useNotification';
import { useNavigate } from 'react-router-dom';

type CatalogItem = {
    id_product: number;
    name: string;
    category: string;
    price: number;
    description: string;
};

const Catalog: React.FC = () => {
    const navigate = useNavigate();
    const notify = useNotification();
    const [items, setItems] = useState<CatalogItem[]>([]);
    const [loading, setLoading] = useState(true);

    const handleOpenProduct = (id: number) => {
        navigate(`/product/${id}`);
    };

    useEffect(() => {
        const fetchCatalog = async () => {
            try {
                setLoading(true);

                const response = await axios.get('/products/all');

                if (response.data.success) {
                    const data = response.data.products as CatalogItem[];
                    setItems(data);
                }
            } catch (err: any) {
                const error = err?.response?.data?.message || 'Error al procesar la solicitud';
                notify(error, 'error');
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchCatalog();
    }, []);

    if (loading) return <div>Cargando catálogo...</div>;

    return (
        <div>
            <h1 className='m-5' >Catálogo de Productos</h1>
            <div className="m-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {items.map(item => (
                    <div
                        key={item.id_product}
                        className="flex flex-col justify-between h-full border p-4 rounded shadow cursor-pointer transform transition-transform duration-400 hover:-translate-y-2"
                    >
                        <div>
                            <h2 className="text-xl font-bold">{item.name}</h2>
                            <p className="text-gray-600">{item.category}</p>
                            <p className="text-lg font-semibold">${item.price}</p>
                            <p className="text-gray-800 mt-2">{item.description}</p>
                        </div>
                        <div className="mt-4 flex flex-col gap-2">
                            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={() => { notify('Funcionalidad no implementada', 'info') }}>
                                Añadir al carrito
                            </button>
                            <button
                                className="bg-black text-white px-4 py-2 rounded hover:bg-white hover:text-black border border-black transition-colors"
                                onClick={() => handleOpenProduct(item.id_product)}
                            >
                                Ver Detalles
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Catalog;