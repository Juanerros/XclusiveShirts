import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-gray-50 to-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:w-1/2 lg:pb-28 xl:pb-32">
            <svg
              className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2"
              fill="currentColor"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <polygon points="50,0 100,0 50,100 0,100" />
            </svg>

            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block xl:inline">Bienvenido a</span>{' '}
                  <span className="block text-black xl:inline">XclusiveShirts</span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Descubre nuestra colección exclusiva de camisas premium. 
                  Cada pieza está diseñada con atención al detalle y materiales de la más alta calidad 
                  para personas que valoran el estilo auténtico.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <Link
                      to="/catalog"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-black hover:bg-gray-800 md:py-4 md:text-lg md:px-10 transition-all duration-300"
                    >
                      Explorar Catálogo
                    </Link>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <Link
                      to="/contact"
                      className="w-full flex items-center justify-center px-8 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10 transition-all duration-300"
                    >
                      Conoce Más
                    </Link>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <div className="h-56 w-full bg-gradient-to-br from-gray-900 to-black sm:h-72 md:h-96 lg:w-full lg:h-full flex items-center justify-center">
            <div className="text-center text-white p-8">
              <div className="w-32 h-32 mx-auto mb-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-2">Estilo Exclusivo</h3>
              <p className="text-gray-300">Diseños únicos que no encontrarás en ningún otro lugar</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-black font-semibold tracking-wide uppercase">Números que hablan</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              La confianza de miles de clientes
            </p>
          </div>

          <div className="mt-10">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="bg-gray-50 rounded-lg p-6 text-center">
                <div className="text-3xl font-bold text-black">10K+</div>
                <div className="text-gray-600 mt-2">Clientes Satisfechos</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-6 text-center">
                <div className="text-3xl font-bold text-black">500+</div>
                <div className="text-gray-600 mt-2">Diseños Únicos</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-6 text-center">
                <div className="text-3xl font-bold text-black">98%</div>
                <div className="text-gray-600 mt-2">Satisfacción</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-6 text-center">
                <div className="text-3xl font-bold text-black">24h</div>
                <div className="text-gray-600 mt-2">Envío Express</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-black font-semibold tracking-wide uppercase">¿Por qué elegirnos?</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Calidad que marca la diferencia
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Cada camisa es creada con pasión y dedicación, usando solo los mejores materiales y técnicas de confección.
            </p>
          </div>

          <div className="mt-16">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10 lg:grid-cols-3">
              <div className="relative">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-black text-white">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="mt-5">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Calidad Premium</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Materiales de primera calidad cuidadosamente seleccionados para garantizar durabilidad y comodidad excepcional.
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-black text-white">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="mt-5">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Envío Express</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Entrega en 24-48 horas en toda la península. Tu nueva camisa llegará cuando la necesites.
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-black text-white">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <div className="mt-5">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Diseños Exclusivos</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Colecciones únicas creadas por diseñadores expertos que no encontrarás en ningún otro lugar.
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-black text-white">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="mt-5">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Garantía Total</h3>
                  <p className="mt-2 text-base text-gray-500">
                    30 días de garantía completa. Si no estás satisfecho, te devolvemos el dinero sin preguntas.
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-black text-white">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                  </svg>
                </div>
                <div className="mt-5">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Soporte 24/7</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Atención al cliente disponible las 24 horas para resolver cualquier duda o consulta.
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-black text-white">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <div className="mt-5">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Mejor Precio</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Calidad premium al mejor precio del mercado. Sin intermediarios, directo del fabricante.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
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

      {/* Newsletter Section */}
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
    </div>
  );
};

export default Home; 