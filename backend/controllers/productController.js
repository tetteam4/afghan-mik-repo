// backend/controllers/productController.js
import Product from "../models/productModel.js";

const productController = {
  // getProducts: async (req, res) => {
  //   try {
  //     const products = await Product.find({});
  //     res.json(products);
  //   } catch (error) {
  //     console.error(error);
  //     res
  //       .status(500)
  //       .json({ message: "Error fetching products", error: error.message });
  //   }
  // },
  getProducts: async (req, res) => {
    try {
      const { category, brand, price_gte, price_lte, sort, search } = req.query;

      let query = {}; // Start with an empty query

      // --- FILTERS ---
      if (category) {
        query.category = category;
      }
      if (brand) {
        query.brand = brand;
      }
      if (price_gte && price_lte) {
        query.price = {
          $gte: parseFloat(price_gte),
          $lte: parseFloat(price_lte),
        };
      } else if (price_gte) {
        query.price = { $gte: parseFloat(price_gte) };
      } else if (price_lte) {
        query.price = { $lte: parseFloat(price_lte) };
      }

      if (search) {
        query.name = { $regex: search, $options: "i" };
      }
      // --- SORTING ---
      let sortOptions = {};
      if (sort) {
        const [field, order] = sort.split("_");
        sortOptions[field] = order === "asc" ? 1 : -1;
      } else {
        sortOptions = { createdAt: -1 }; // Default: Sort by newest
      }

      const products = await Product.find(query).sort(sortOptions);
      res.json(products);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Error fetching products", error: error.message });
    }
  },
  createProduct: async (req, res) => {
    try {
      if (req.user.role !== "seller" && req.user.role !== "admin") {
        return res
          .status(403)
          .json({ message: "Only sellers can create products" });
      }
      const sellerId = req.user.id;
      const newProduct = new Product({ ...req.body, seller: sellerId });
      const savedProduct = await newProduct.save();
      res.status(201).json(savedProduct);
    } catch (err) {
      console.error(err);
      res
        .status(400)
        .json({ message: "Error creating product", error: err.message });
    }
  },

  getProductById: async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(product);
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ message: "Error fetching product", error: err.message });
    }
  },

  updateProduct: async (req, res) => {
    try {
      const { id } = req.params;
      const product = await Product.findById(id);

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      if (
        product.seller.toString() !== req.user.id &&
        req.user.role !== "admin"
      ) {
        return res
          .status(403)
          .json({ message: "Unauthorized to update this product" });
      }

      const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      if (!updatedProduct) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(updatedProduct);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Error updating product", error: error.message });
    }
  },

  deleteProduct: async (req, res) => {
    try {
      const { id } = req.params;
      const product = await Product.findById(id);

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      if (
        product.seller.toString() !== req.user.id &&
        req.user.role !== "admin"
      ) {
        return res
          .status(403)
          .json({ message: "Unauthorized to delete this product" });
      }

      const deletedProduct = await Product.findByIdAndDelete(id);
      if (!deletedProduct) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json({ message: "Product deleted successfully" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Error deleting product", error: error.message });
    }
  },
};

export default productController;
