const formulario = document.getElementById('formulario');
const submitBtn = document.getElementById('submit-btn');

formulario.addEventListener('submit', e => {
  event.preventDefault(); 

  const nameProduct = document.getElementById('name-product').value;
  const descripcion = document.getElementById('descripcion').value;
  const precio = document.getElementById('precio').value;


  fetch('http://localhost:3003/endpoint/products', {
    method: 'POST',
    body: formData, 
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Error al crear el producto');
    }
    return response.json(); // Convertir la respuesta a JSON
  })
  .then(data => {
    console.log('Producto creado:', data); 
    
  })
  .catch(error => {
    console.error('Error:', error);
    
  });
});
