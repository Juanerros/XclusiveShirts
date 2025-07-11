export interface Color {
  id_color: number;
  name: string;
}

export interface Size {
  id_size: number;
  name: string;
}

export interface Stock {
  id_stock: number;
  id_product: number;
  id_color: number;
  id_size: number;
  stock: number;
}

export interface Product {
  id_product: number;
  name: string;
  category: string;
  price: number;
  description: string;
  image?: string;
}

export interface ProductDetail extends Product {
  colors: Color[];
  sizes: Size[];
  stocks: Stock[];
}

// Datos mock que simulan la base de datos
export const mockColors: Color[] = [
  { id_color: 1, name: 'Negro' },
  { id_color: 2, name: 'Blanco' },
  { id_color: 3, name: 'Azul Marino' },
  { id_color: 4, name: 'Gris' },
  { id_color: 5, name: 'Rojo' }
];

export const mockSizes: Size[] = [
  { id_size: 1, name: 'XS' },
  { id_size: 2, name: 'S' },
  { id_size: 3, name: 'M' },
  { id_size: 4, name: 'L' },
  { id_size: 5, name: 'XL' },
  { id_size: 6, name: 'XXL' }
];

export const mockProducts: Product[] = [
  {
    id_product: 1,
    name: 'Remera Clásica Premium',
    category: 'Casual',
    price: 2950,
    description: 'Remera de algodón 100% premium con corte clásico. Perfecta para el uso diario con un toque de elegancia. Confeccionada con materiales de primera calidad.',
    image: 'https://via.placeholder.com/400x400/000000/FFFFFF?text=Remera+Clásica'
  },
  {
    id_product: 2,
    name: 'Remera Deportiva Pro',
    category: 'Deportiva',
    price: 3450,
    description: 'Remera deportiva con tecnología DryFit. Ideal para entrenamientos y actividades físicas. Tejido transpirable y ligero.',
    image: 'https://via.placeholder.com/400x400/1E40AF/FFFFFF?text=Remera+Deportiva'
  },
  {
    id_product: 3,
    name: 'Remera Formal Executive',
    category: 'Formal',
    price: 4250,
    description: 'Remera de corte formal con acabados premium. Perfecta para ocasiones especiales y ambientes corporativos. Elegancia y comodidad.',
    image: 'https://via.placeholder.com/400x400/374151/FFFFFF?text=Remera+Formal'
  },
  {
    id_product: 4,
    name: 'Remera Vintage Style',
    category: 'Vintage',
    price: 3750,
    description: 'Remera con diseño vintage único. Corte relajado y estampados exclusivos. Para quienes buscan un estilo distintivo y auténtico.',
    image: 'https://via.placeholder.com/400x400/DC2626/FFFFFF?text=Remera+Vintage'
  }
];

export const mockStocks: Stock[] = [
  // Remera Clásica Premium - Disponible en todos los colores y tallas
  { id_stock: 1, id_product: 1, id_color: 1, id_size: 2, stock: 15 },
  { id_stock: 2, id_product: 1, id_color: 1, id_size: 3, stock: 20 },
  { id_stock: 3, id_product: 1, id_color: 1, id_size: 4, stock: 18 },
  { id_stock: 4, id_product: 1, id_color: 2, id_size: 2, stock: 12 },
  { id_stock: 5, id_product: 1, id_color: 2, id_size: 3, stock: 25 },
  { id_stock: 6, id_product: 1, id_color: 2, id_size: 4, stock: 22 },
  { id_stock: 7, id_product: 1, id_color: 4, id_size: 3, stock: 8 },
  { id_stock: 8, id_product: 1, id_color: 4, id_size: 4, stock: 10 },

  // Remera Deportiva Pro
  { id_stock: 9, id_product: 2, id_color: 3, id_size: 2, stock: 14 },
  { id_stock: 10, id_product: 2, id_color: 3, id_size: 3, stock: 16 },
  { id_stock: 11, id_product: 2, id_color: 3, id_size: 4, stock: 19 },
  { id_stock: 12, id_product: 2, id_color: 1, id_size: 3, stock: 11 },
  { id_stock: 13, id_product: 2, id_color: 1, id_size: 4, stock: 13 },
  { id_stock: 14, id_product: 2, id_color: 5, id_size: 2, stock: 7 },
  { id_stock: 15, id_product: 2, id_color: 5, id_size: 3, stock: 9 },

  // Remera Formal Executive
  { id_stock: 16, id_product: 3, id_color: 1, id_size: 3, stock: 12 },
  { id_stock: 17, id_product: 3, id_color: 1, id_size: 4, stock: 15 },
  { id_stock: 18, id_product: 3, id_color: 1, id_size: 5, stock: 8 },
  { id_stock: 19, id_product: 3, id_color: 2, id_size: 3, stock: 10 },
  { id_stock: 20, id_product: 3, id_color: 2, id_size: 4, stock: 14 },
  { id_stock: 21, id_product: 3, id_color: 3, id_size: 4, stock: 6 },

  // Remera Vintage Style
  { id_stock: 22, id_product: 4, id_color: 1, id_size: 2, stock: 5 },
  { id_stock: 23, id_product: 4, id_color: 1, id_size: 3, stock: 8 },
  { id_stock: 24, id_product: 4, id_color: 4, id_size: 2, stock: 6 },
  { id_stock: 25, id_product: 4, id_color: 4, id_size: 3, stock: 7 },
  { id_stock: 26, id_product: 4, id_color: 5, id_size: 3, stock: 4 },
  { id_stock: 27, id_product: 4, id_color: 5, id_size: 4, stock: 5 }
]; 