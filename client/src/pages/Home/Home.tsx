import React from 'react';
import {
  HeroSection,
  StatsSection,
  OffersCarousel,
  FeaturesSection,
  CTASection,
  NewsletterSection
} from './components';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <HeroSection />

      {/* Stats Section */}
      <StatsSection />

      {/* Offers Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center mb-12">
            <h2 className="text-base text-black font-semibold tracking-wide uppercase">
              Ofertas especiales
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              No te pierdas estas promociones
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Descuentos exclusivos que cambian constantemente. ¡Aprovecha antes de que se agoten!
            </p>
          </div>
          
          <OffersCarousel />
        </div>
      </section>

      {/* Features Section */}
      <FeaturesSection />

      {/* CTA Section */}
      <CTASection />

      {/* Newsletter Section */}
      <NewsletterSection />
    </div>
  );
};

export default Home; 