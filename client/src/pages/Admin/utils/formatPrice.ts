export const formatPrice = (price: number | string): string => {
  const numericPrice = typeof price === 'number' ? price : parseFloat(price || '0');
  return `S/ ${numericPrice.toFixed(2)}`;
}; 