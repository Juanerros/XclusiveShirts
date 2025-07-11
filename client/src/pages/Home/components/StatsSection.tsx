import React from 'react';

const StatsSection: React.FC = () => {
  const stats = [
    {
      value: "10K+",
      label: "Clientes Satisfechos"
    },
    {
      value: "500+",
      label: "Diseños Únicos"
    },
    {
      value: "98%",
      label: "Satisfacción"
    },
    {
      value: "24h",
      label: "Envío Express"
    }
  ];

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-black font-semibold tracking-wide uppercase">
            Números que hablan
          </h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            La confianza de miles de clientes
          </p>
        </div>

        <div className="mt-10">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6 text-center">
                <div className="text-3xl font-bold text-black">{stat.value}</div>
                <div className="text-gray-600 mt-2">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection; 