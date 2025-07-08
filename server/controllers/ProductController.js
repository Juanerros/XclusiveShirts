import handleError from '../utils/handleError.js';

class ProductController {
  constructor(service) {
    this.service = service;
  }

  getById = async (req, res) => {
    const { id } = req.params;

    try {
      if (!id) throw { status: 400, message: 'El ID del producto es requerido' };

      const product = await this.service.getById(id);

      res.status(200).json({
        success: true,
        message: 'Se obtuvo el producto correctamente',
        product
      })
    } catch (err) {
      handleError(res, err);
    }
  }

  getAllProducts = async (req, res) => {
    try {
      const products = await this.service.getAllProducts();

      res.status(200).json({
        success: true,
        message: 'Se obtuvieron los productos correctamente',
        products
      });
    } catch (err) {
      handleError(res, err);
    }
  }


  getAllInfo = async (req, res) => {
    try {
      const products = await this.service.getAll();

      res.status(200).json({
        success: true,
        message: 'Se obtuvieron los productos correctamente',
        products
      });
    } catch (err) {
      handleError(res, err);
    }
  }

  create = async (req, res) => {
    const { name, category, price, description, stocks } = req.body;

    try {
      if (!name || !category || !price || !description || !stocks) throw { status: 400, message: 'Todos los campos son requeridos' };

      const id_product = await this.service.create(name, category, price, description, stocks);

      res.status(201).json({
        success: true,
        message: 'Se creó el producto correctamente',
        id_product
      });
    } catch (err) {
      handleError(res, err);
    }
  }

  update = async (req, res) => {
    const { id } = req.params;
    const { name, category, price, description, stocks } = req.body;

    try {
      if (!id) throw { status: 400, message: 'El ID del producto es requerido' };
      if (!name || !category || !price || !description || !stocks) throw { status: 400, message: 'Todos los campos son requeridos' };

      await this.service.update(id, name, category, price, description, stocks);

      res.status(200).json({
        success: true,
        message: 'Se actualizó el producto correctamente'
      });
    } catch (err) {
      handleError(res, err);
    }
  }

  delete = async (req, res) => {
    const { id } = req.params;

    try {
      if (!id) throw { status: 400, message: 'El ID del producto es requerido' };

      await this.service.delete(id);

      res.status(200).json({
        success: true,
        message: 'Se eliminó el producto correctamente'
      });
    } catch (err) {
      handleError(res, err);
    }
  }
}

export default ProductController;
