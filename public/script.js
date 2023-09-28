
document.addEventListener('DOMContentLoaded', () => {
    const formAgregarProducto = document.getElementById('agregar-producto');
    const formEditarProducto = document.getElementById('editar-producto');
    const tablaProductos = document.getElementById('tabla-productos');
    const tbodyProductos = document.querySelector('.tabla-productos tbody');
    const editarIdProducto = document.getElementById('editar-id-producto');
  
    formAgregarProducto.addEventListener('submit', async (event) => {
      event.preventDefault();
      const nombre = document.getElementById('nombre').value;
      const precio = document.getElementById('precio').value;
      if (!nombre || !precio) {
        alert('Por favor, complete todos los campos.');
        return;
      }
      try {
        const response = await fetch('/api/producto', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name: nombre, price: precio }),
        });
        const newProduct = await response.json();
        agregarProductoATabla(newProduct);
        formAgregarProducto.reset();
      } catch (error) {
        console.error('Error al agregar el producto:', error);
      }
    });
  
async function cargarProductos() {
      try {
        const response = await fetch('/api/producto');
        const products = await response.json();
        tbodyProductos.innerHTML = '';
        products.forEach(agregarProductoATabla);
      } catch (error) {
        console.error('Error al cargar los productos:', error);
      }
    }
  
    function agregarProductoATabla(producto) {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${producto.name}</td>
        <td>${producto.price}</td>
        <td>
          <button class="editar" data-id="${producto._id}" data-nombre="${producto.name}" data-precio="${producto.price}">Editar</button>
          <button class="eliminar" data-id="${producto._id}">Eliminar</button>
        </td>
      `;
      tbodyProductos.appendChild(row);
    }
  
    function actualizarProductoEnTabla(producto) {
      const row = tbodyProductos.querySelector(`[data-id="${producto._id}"]`).parentNode.parentNode;
      row.innerHTML = `
        <td>${producto.name}</td>
        <td>${producto.price}</td>
        <td>
          <button class="editar" data-id="${producto._id}" data-nombre="${producto.name}" data-precio="${producto.price}">Editar</button>
          <button class="eliminar" data-id="${producto._id}">Eliminar</button>
        </td>
      `;
    }
  
    cargarProductos();
  });
