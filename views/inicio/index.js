const shopIcon = document.querySelector('#shop-icon');
const cart = document.querySelector('#cart');
const table = document.querySelector('#table-body');
const tableClear = document.querySelector('#table-clear');
const closeCart = document.querySelector('#close-cart');



shopIcon.addEventListener('click', e => {
    cart.classList.add('h-96', 'p-4');
    
});

closeCart.addEventListener('click', e => {
    cart.classList.remove('h-96', 'p-4');
    console.log(closeCart);
}); 


