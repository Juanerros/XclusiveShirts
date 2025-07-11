import React from 'react';
import { Link } from 'react-router-dom';

const CTASection: React.FC = () => {
  return (
    <section className="bg-black">
      <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
          <span className="block">¿Listo para renovar tu guardarropa?</span>
          <span className="block text-gray-300">Encuentra tu estilo perfecto.</span>
        </h2>
        <p className="mt-4 text-lg leading-6 text-gray-300">
          Únete a miles de clientes satisfechos que han encontrado su camisa perfecta en XclusiveShirts.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/catalog"
            className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-black bg-white hover:bg-gray-100 transition-all duration-300"
          >
            Ver Catálogo Completo
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center px-5 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-white hover:text-black transition-all duration-300"
          >
            Contactar Asesor
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTASection; 