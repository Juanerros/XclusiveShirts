import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="text-center">
                <h1 className="text-6xl font-bold text-gray-900">404</h1>
                <p className="mt-4 text-xl text-gray-600">Página no encontrada</p>
                <p className="mt-2 text-gray-500">Lo sentimos, la página que buscas no existe.</p>
                <Link to={'/'} >Volver a inicio</Link>
            </div>
        </div>
    );
}

export default NotFound;