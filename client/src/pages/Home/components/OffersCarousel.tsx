import React, { useState, useEffect } from 'react';

interface OfferSlide {
  id: number;
  title: string;
  subtitle: string;
  discount: string;
  image: string;
  buttonText: string;
}

const OffersCarousel: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const offers: OfferSlide[] = [
    {
      id: 1,
      title: "Oferta Flash",
      subtitle: "¡Solo por tiempo limitado!",
      discount: "30% OFF",
      image: "descuentos/descuento1.jpg",
      buttonText: "Comprar Ahora"
    },
    {
      id: 2,
      title: "Liquidación de Temporada",
      subtitle: "Últimas unidades disponibles",
      discount: "50% OFF",
      image: "descuentos/descuento2.jpg",
      buttonText: "Ver Ofertas"
    },
    {
      id: 3,
      title: "Nuevos Diseños",
      subtitle: "Colección exclusiva 2024",
      discount: "15% OFF",
      image: "descuentos/descuento3.jpg",
      buttonText: "Descubrir"
    }
  ];

  // Auto-slide cada 3 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % offers.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [offers.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % offers.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + offers.length) % offers.length);
  };

  return (
    <div className="relative overflow-hidden rounded-xl shadow-lg bg-gray-100">
      {/* Slides Container */}
      <div 
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {offers.map((offer) => (
          <div
            key={offer.id}
            className="w-full flex-shrink-0 relative"
          >
            {/* Background Image */}
            <div className="relative h-64 md:h-80 lg:h-96">
              <img
                src={offer.image}
                alt={offer.title}
                className="w-full h-full object-cover"
              />
              
              {/* Overlay oscuro para mejorar la legibilidad del texto */}
              <div className="absolute inset-0 bg-black bg-opacity-40"></div>
              
              {/* Content */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white px-4">
                  <h3 className="text-2xl md:text-4xl font-bold mb-2">
                    {offer.title}
                  </h3>
                  <p className="text-lg md:text-xl mb-4 text-gray-200">
                    {offer.subtitle}
                  </p>
                  <div className="text-4xl md:text-6xl font-extrabold mb-6 text-yellow-400">
                    {offer.discount}
                  </div>
                  <button className="bg-white text-black px-8 py-3 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors transform hover:scale-105 duration-200">
                    {offer.buttonText}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-all duration-200"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-all duration-200"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
        <div className="flex space-x-2">
          {offers.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentSlide
                  ? 'bg-white scale-125'
                  : 'bg-white bg-opacity-50 hover:bg-opacity-75'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white bg-opacity-30">
        <div 
          className="h-full bg-white transition-all duration-300 ease-linear"
          style={{ 
            width: `${((currentSlide + 1) / offers.length) * 100}%`,
          }}
        />
      </div>
    </div>
  );
};

export default OffersCarousel; 