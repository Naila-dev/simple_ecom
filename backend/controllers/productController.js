const Product = require('../models/Product');
const asyncHandler = require('express-async-handler');

// @desc Get all products
// @route GET /api/products
const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
});

// @desc Get single product
// @route GET /api/products/:id
const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
});

// @desc Create a product (Admin/User)
// @route POST /api/products
const createProduct = asyncHandler(async (req, res) => {
    const { name, description, price, countInStock, image } = req.body;

    const product = new Product({
        user: req.user._id,
        name,
        description,
        image,
        price,
        countInStock,
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
});

// @desc Update product
// @route PUT /api/products/:id
const updateProduct = asyncHandler(async (req, res) => {
    const { name, description, price, countInStock, image } = req.body;
    const product = await Product.findById(req.params.id);

    if (product) {
        product.name = name || product.name;
        product.description = description || product.description;
        product.image = image || product.image;
        product.price = price || product.price;
        product.countInStock = countInStock || product.countInStock;

        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
});

// @desc Delete product
// @route DELETE /api/products/:id
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        await product.remove();
        res.json({ message: 'Product removed' });
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
});

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};
