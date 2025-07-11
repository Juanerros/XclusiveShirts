import React from 'react';

interface Feature {
  title: string;
  description: string;
  iconPath: string;
}

const FeaturesSection: React.FC = () => {
  const features: Feature[] = [
    {
      title: "Calidad Premium",
      description: "Materiales de primera calidad cuidadosamente seleccionados para garantizar durabilidad y comodidad excepcional.",
      iconPath: "M5 13l4 4L19 7"
    },
    {
      title: "Envío Express",
      description: "Entrega en 24-48 horas en toda la península. Tu nueva camisa llegará cuando la necesites.",
      iconPath: "M13 10V3L4 14h7v7l9-11h-7z"
    },
    {
      title: "Diseños Exclusivos",
      description: "Colecciones únicas creadas por diseñadores expertos que no encontrarás en ningún otro lugar.",
      iconPath: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
    },
    {
      title: "Garantía Total",
      description: "30 días de garantía completa. Si no estás satisfecho, te devolvemos el dinero sin preguntas.",
      iconPath: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    },
    {
      title: "Soporte 24/7",
      description: "Atención al cliente disponible las 24 horas para resolver cualquier duda o consulta.",
      iconPath: "M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
    },
    {
      title: "Mejor Precio",
      description: "Calidad premium al mejor precio del mercado. Sin intermediarios, directo del fabricante.",
      iconPath: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-black font-semibold tracking-wide uppercase">
            ¿Por qué elegirnos?
          </h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Calidad que marca la diferencia
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Cada camisa es creada con pasión y dedicación, usando solo los mejores materiales y técnicas de confección.
          </p>
        </div>

        <div className="mt-16">
          <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10 lg:grid-cols-3">
            {features.map((feature, index) => (
              <div key={index} className="relative">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-black text-white">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={feature.iconPath} />
                  </svg>
                </div>
                <div className="mt-5">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-base text-gray-500">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection; 