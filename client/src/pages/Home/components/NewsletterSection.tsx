import React from 'react';

const NewsletterSection: React.FC = () => {
  return (
    <section className="bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Mantente al día con las últimas tendencias
            </h2>
            <p className="mt-3 max-w-3xl text-lg text-gray-500">
              Suscríbete a nuestro newsletter y recibe ofertas exclusivas, nuevas colecciones y consejos de estilo directamente en tu correo.
            </p>
          </div>
          <div className="mt-8 lg:mt-0">
            <form className="sm:flex">
              <label htmlFor="email-address" className="sr-only">
                Correo electrónico
              </label>
              <input
                id="email-address"
                name="email-address"
                type="email"
                autoComplete="email"
                required
                className="w-full px-5 py-3 border border-gray-300 shadow-sm placeholder-gray-400 focus:ring-1 focus:ring-black focus:border-black sm:max-w-xs rounded-md"
                placeholder="Ingresa tu email"
              />
              <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3 sm:flex-shrink-0">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-all duration-300"
                >
                  Suscribirse
                </button>
              </div>
            </form>
            <p className="mt-3 text-sm text-gray-500">
              No enviamos spam. Puedes darte de baja en cualquier momento.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection; 