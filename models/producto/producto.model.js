const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    name: String,
    quantity: Number,
    price: Number,
    image: String
},
{
    timestamps: true,
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;