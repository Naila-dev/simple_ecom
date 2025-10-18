const express = require('express');
const router = express.Router();
const { getCart, addToCart, removeFromCart } = require('../controllers/cartController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
    .get(protect, getCart)
    .post(protect, addToCart);

router.delete('/:productId', protect, removeFromCart);

module.exports = router;
