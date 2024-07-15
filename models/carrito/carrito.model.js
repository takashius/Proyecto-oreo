const mongoose = require('mongoose');

const CartSchema = mongoose.Schema({
    image: String,
    name: String,
    price: Number,
    quantity: Number,
},
{
    timestamps: true,
});

const Cart = mongoose.model('Cart', CartSchema);

module.exports = Cart;