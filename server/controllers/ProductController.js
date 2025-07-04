import handleError from '../utils/handleError.js';

class ProductController {
  constructor(service) {
    this.service = service;
  }

  create = async (req, res) => {
    const { name, category, price, description, stocks } = req.body;

    try {
      if (!name || !category || !price || !description || !stocks) throw { status: 400, message: 'Todos los campos son requeridos' };
      
      const id_product = await this.service.create(name, category, price, description, stocks);

      res.status(200).json({
        message: 'Se creó el producto correctamente',
        id_product
      });
    } catch (err) {
      handleError(res, err);
    }
  }
}

export default ProductController;
