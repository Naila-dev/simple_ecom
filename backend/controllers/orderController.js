const asyncHandler = require('express-async-handler');
const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Product = require('../models/Product');

// @desc    Place order from cart
// @route   POST /api/orders
const placeOrder = asyncHandler(async (req, res) => {
    const { shippingAddress, paymentMethod } = req.body;
    const cart = await Cart.findOne({ user: req.user._id }).populate('items.product');

    if (!cart || cart.items.length === 0) {
        res.status(400);
        throw new Error('Cart is empty');
    }

    const totalPrice = cart.items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

    const order = new Order({
        user: req.user._id,
        items: cart.items,
        shippingAddress,
        paymentMethod,
        totalPrice,
        isPaid: true,
        paidAt: Date.now()
    });

    const createdOrder = await order.save();

    // Clear cart after order
    cart.items = [];
    await cart.save();

    res.status(201).json(createdOrder);
});

// @desc    Get all orders for a user
// @route   GET /api/orders
const getUserOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id }).populate('items.product');
    res.json(orders);
});

module.exports = { placeOrder, getUserOrders };
