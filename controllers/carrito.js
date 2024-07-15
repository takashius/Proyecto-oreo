const cartRouter = require('express').Router();
const Cart = require('../models/carrito/carrito.model');

cartRouter.post('/', async (req, res) => {
    try {
        const cart = await Cart.create(req.body);
        res.status(200).json(cart);
    } catch {
        res.status(500).json({message: error.message})
    }
});

cartRouter.get('/', async (req, res) => {
    try {
        const cart = await Cart.find({});
        res.status(200).json(cart);
    } catch {
        res.status(500).json({message: error.message})
    }
});

cartRouter.get('/')

module.exports = cartRouter; 