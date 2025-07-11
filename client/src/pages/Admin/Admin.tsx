import React, { useContext, useEffect, useState } from 'react';
import axios from '../../api/axios';
import useNotification from '../../hooks/useNotification';
import useConfirmation from '../../hooks/useConfirmation';
import { UserContext } from '../../contexts/UserContext';
import { useNavigate } from 'react-router-dom';

const Admin: React.FC = () => {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    if (!user?.is_admin) {
        navigate('/');
    }

    const notify = useNotification();
    const confirm = useConfirmation();
    const [products, setProducts] = useState<any[]>([]);
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        name: '',
        category: '',
        price: '',
        description: '',
        stocks: [] as { id_color: number; id_size: number; stock: number }[],
    });
    const [editingId, setEditingId] = useState<number | null>(null);

    // Obtener todos los productos
    const fetchProducts = async () => {
        setLoading(true);
        try {
            const res = await axios.get('/products/all');
            if (res.data.success) setProducts(res.data.products);
        } catch (err: any) {
            notify(err?.response?.data?.mensagge || 'Error al obtener productos', 'error');
        } finally {
            setLoading(false);
        }
    };

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const res = await axios.get('/admin');
            if (res.data.success) setUsers(res.data.users);
        } catch (err: any) {
            notify(err?.response?.data?.message || 'Error al obtener usuarios', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleToggleAdmin = async (id_login: number) => {
        try {
            setLoading(true);
            const res = await axios.patch(`/admin/${id_login}/toggle-admin`);
            if (res.data.success) {
                notify('Rol de admin actualizado', 'success');
                fetchUsers();
            }
        } catch (err: any) {
            notify(err?.response?.data?.message || 'Error al actualizar rol', 'error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
        fetchUsers();
    }, []);

    // Crear producto
    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true);

            const response = await axios.post('/products/create', form);
            if (response.data.success) {
                notify('Producto creado exitosamente', 'success');
                setForm({ name: '', category: '', price: '', description: '', stocks: [] });
                fetchProducts();
            }
        } catch (err: any) {
            notify(err?.response?.data?.mensagge || 'Error al crear producto', 'error');
        } finally {
            setLoading(false);
        }
    };

    // Eliminar producto
    const handleDelete = async (id: number) => {
        confirm(
            '¿Estás seguro de eliminar este producto?',
            async () => {
                setLoading(true);
                try {
                    const response = await axios.delete(`/products/delete/${id}`);
                    if (response.data.success) {
                        notify('Producto eliminado exitosamente', 'success');
                        fetchProducts();
                    }
                } catch (err: any) {
                    notify(err?.response?.data?.mensagge || 'Error al eliminar producto', 'error');
                } finally {
                    setLoading(false);
                }
            },
            () => { } // Cancelar no hace nada
        )
    };

    // Editar producto (cargar datos en el formulario)
    const handleEdit = (product: any) => {
        setEditingId(product.id_product);
        setForm({
            name: product.name,
            category: product.category,
            price: product.price,
            description: product.description,
            stocks: [], // Aquí deberías cargar los stocks si tienes la info
        });
    };

    // Actualizar producto
    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingId) return;
        try {
            setLoading(true);

            const response = await axios.put(`/products/update/${editingId}`, form);

            if (response.data.success) {
                notify('Producto actualizado exitosamente', 'success');
                setEditingId(null);
                setForm({ name: '', category: '', price: '', description: '', stocks: [] });
                fetchProducts();
            }
        } catch (err: any) {
            notify(err?.response?.data?.mensagge || 'Error al actualizar producto', 'error');
        } finally {
            setLoading(false);
        }
    };

    // Manejar cambios en el formulario
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">Administrar Productos</h1>

            <form onSubmit={editingId ? handleUpdate : handleCreate} className="mb-8 space-y-2">
                <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Nombre"
                    className="border p-2 mr-2"
                    required
                />
                <input
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    placeholder="Categoría"
                    className="border p-2 mr-2"
                    required
                />
                <input
                    name="price"
                    value={form.price}
                    onChange={handleChange}
                    placeholder="Precio"
                    min={1}
                    type="number"
                    className="border p-2 mr-2"
                    required
                />
                <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    placeholder="Descripción"
                    className="border p-2 mr-2"
                    required
                />
                {/* Aquí podrías agregar inputs para stocks */}
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                    {editingId ? 'Actualizar' : 'Crear'}
                </button>
                {editingId && (
                    <button
                        type="button"
                        onClick={() => {
                            setEditingId(null);
                            setForm({ name: '', category: '', price: '', description: '', stocks: [] });
                        }}
                        className="ml-2 bg-gray-400 text-white px-4 py-2 rounded"
                    >
                        Cancelar
                    </button>
                )}
            </form>

            {loading ? (
                <p>Cargando...</p>
            ) : (
                <table className="w-full border">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Categoría</th>
                            <th>Precio</th>
                            <th>Descripción</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((prod) => (
                            <tr key={prod.id_product}>
                                <td>{prod.id_product}</td>
                                <td>{prod.name}</td>
                                <td>{prod.category}</td>
                                <td>{prod.price}</td>
                                <td>{prod.description}</td>
                                <td>
                                    <button
                                        onClick={() => handleEdit(prod)}
                                        className="bg-yellow-400 px-2 py-1 rounded mr-2"
                                    >
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => handleDelete(prod.id_product)}
                                        className="bg-red-600 text-white px-2 py-1 rounded"
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            <h1 className="text-2xl font-bold mb-4">Administrar Usuarios</h1>

            {loading ? (
                <p>Cargando...</p>
            ) : (
                <table className="w-full border">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Email</th>
                            <th>Admin</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id_login}>
                                <td>{user.id_login}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.is_admin ? 'Sí' : 'No'}</td>
                                <td>
                                    <button
                                        onClick={() => handleToggleAdmin(user.id_login)}
                                        className={`px-2 py-1 rounded ${user.is_admin ? 'bg-red-600 text-white' : 'bg-green-600 text-white'}`}
                                    >
                                        {user.is_admin ? 'Quitar Admin' : 'Hacer Admin'}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Admin;