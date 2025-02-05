//backend/controllers/orderController.js
import Order from "../models/orderModel.js";

const orderController = {
  createOrder: async (req, res) => {
    try {
      const newOrder = new Order(req.body);
      const savedOrder = await newOrder.save();
      res.status(201).json(savedOrder);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Error creating order", error: error.message });
    }
  },

  getOrderById: async (req, res) => {
    try {
      const { id } = req.params;
      const order = await Order.findById(id);
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      res.json(order);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Error fetching order", error: error.message });
    }
  },

  updateOrder: async (req, res) => {
    try {
      const { id } = req.params;
      const updatedOrder = await Order.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      if (!updatedOrder) {
        return res.status(404).json({ message: "Order not found" });
      }
      res.json(updatedOrder);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Error updating order", error: error.message });
    }
  },

  deleteOrder: async (req, res) => {
    try {
      const { id } = req.params;
      const deletedOrder = await Order.findByIdAndDelete(id);
      if (!deletedOrder) {
        return res.status(404).json({ message: "Order not found" });
      }
      res.json({ message: "Order deleted successfully" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Error deleting order", error: error.message });
    }
  },

  getAllOrders: async (req, res) => {
    try {
      const orders = await Order.find({});
      res.json(orders);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Error fetching orders", error: error.message });
    }
  },
};

export default orderController;
