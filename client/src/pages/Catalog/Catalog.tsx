import React from 'react';
import { Link } from 'react-router-dom';
import { useCatalog } from './hooks/useCatalog';
import CatalogFilters from './components/CatalogFilters';
import ProductCard from './components/ProductCard';
import { LoadingState, ErrorState, EmptyState, ProductGridSkeleton } from './components/CatalogStates';

const Catalog: React.FC = () => {
  const {
    products,
    loading,
    error,
    searchTerm,
    selectedCategory,
    priceRange,
    categories,
    setSearchTerm,
    setSelectedCategory,
    setPriceRange,
    resetFilters,
    refreshProducts
  } = useCatalog();

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <ErrorState message={error} onRetry={refreshProducts} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-black to-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold sm:text-5xl md:text-6xl">
              <span className="block">Catálogo de</span>
              <span className="block text-gray-300">XclusiveShirts</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-300 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Descubre nuestra colección exclusiva de remeras premium. 
              Calidad excepcional y diseños únicos que definen tu estilo.
            </p>
          </div>
        </div>
      </section>


      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Filtros */}
          <CatalogFilters
            searchTerm={searchTerm}
            selectedCategory={selectedCategory}
            priceRange={priceRange}
            categories={categories}
            onSearchChange={setSearchTerm}
            onCategoryChange={setSelectedCategory}
            onPriceRangeChange={setPriceRange}
            onResetFilters={resetFilters}
          />

          {/* Resultados */}
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">
                {loading ? 'Cargando productos...' : `${products.length} productos encontrados`}
              </h2>
              {!loading && products.length > 0 && (
                <div className="text-sm text-gray-500">
                  Mostrando {products.length} de {products.length} productos
                </div>
              )}
            </div>
          </div>

          {/* Grid de productos */}
          {loading ? (
            <ProductGridSkeleton count={8} />
          ) : products.length === 0 ? (
            <EmptyState onReset={resetFilters} />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id_product} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-black text-white">
        <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold sm:text-4xl">
            <span className="block">¿No encontraste lo que buscabas?</span>
          </h2>
          <p className="mt-4 text-lg leading-6 text-gray-300">
            Contáctanos y te ayudaremos a encontrar la remera perfecta para ti.
          </p>
          <div className="mt-8">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-black bg-white hover:bg-gray-100 transition-all duration-300"
            >
              Contactar Asesor
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Catalog;