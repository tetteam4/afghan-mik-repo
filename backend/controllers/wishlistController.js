// backend/controllers/wishlistController.js
import Wishlist from "../models/wishlistModel.js";

const wishlistController = {
  // Get user's wishlist
  getWishlist: async (req, res) => {
    try {
      const userId = req.user.id; // Assuming you have authentication middleware
      const wishlist = await Wishlist.findOne({ userId }).populate("products"); // Populate products

      if (!wishlist) {
        return res.status(200).json({ products: [] }); // Return an empty array if the wishlist doesn't exist
      }

      res.json(wishlist.products); // Send the products array in the response
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Error fetching wishlist", error: error.message });
    }
  },

  // Add product to wishlist
  addProductToWishlist: async (req, res) => {
    try {
      const userId = req.user.id;
      const productId = req.body.productId;

      // Check if the wishlist exists
      let wishlist = await Wishlist.findOne({ userId });

      if (!wishlist) {
        // Create a new wishlist if it doesn't exist
        wishlist = new Wishlist({ userId, products: [productId] });
      } else {
        // Add the product to the wishlist if it's not already there
        if (!wishlist.products.includes(productId)) {
          wishlist.products.push(productId);
        }
      }

      await wishlist.save();
      res.status(200).json({ message: "Product added to wishlist" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({
          message: "Error adding product to wishlist",
          error: error.message,
        });
    }
  },

  // Remove product from wishlist
  removeProductFromWishlist: async (req, res) => {
    try {
      const userId = req.user.id;
      const productId = req.params.productId;

      const wishlist = await Wishlist.findOne({ userId });

      if (!wishlist) {
        return res.status(404).json({ message: "Wishlist not found" });
      }

      // Remove the product from the wishlist
      wishlist.products = wishlist.products.filter(
        (product) => product.toString() !== productId
      );
      await wishlist.save();
      res.json({ message: "Product removed from wishlist" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({
          message: "Error removing product from wishlist",
          error: error.message,
        });
    }
  },
};

export default wishlistController;
