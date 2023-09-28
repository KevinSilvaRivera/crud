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

    tablaProductos.addEventListener('click', async (event) => {
      if (event.target.classList.contains('editar')) {
        const id = event.target.dataset.id;
        const nombre = event.target.dataset.nombre;
        const precio = event.target.dataset.precio;
        editarIdProducto.value = id;
        document.getElementById('editar-nombre-producto').value = nombre;
        document.getElementById('editar-precio-producto').value = precio;
        const editForm = document.querySelector("#editar-producto");
        editForm.style.display = "block";
      } else if (event.target.classList.contains('eliminar')) {
        const id = event.target.dataset.id;
        const editForm = document.querySelector("#editar-producto");
        editForm.style.display = "none";
        try {
          const response = await fetch(`/api/producto/${id}`, {
            method: 'DELETE'
          });
          if (response.ok) {
            event.target.closest('tr').remove();
          } else {
            console.error('Error al eliminar el producto:', response.statusText);
          }
        } catch (error) {
          console.error('Error al eliminar el producto:', error);
        }
      }
    });
  
    formEditarProducto.addEventListener('submit', async (event) => {
      event.preventDefault();
      const id = editarIdProducto.value;
      const nombre = document.getElementById('editar-nombre-producto').value;
      const precio = document.getElementById('editar-precio-producto').value;
      if (!nombre || !precio) {
        alert('Por favor, complete todos los campos.');
        return;
      }
      try {
        const response = await fetch(`/api/producto/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name: nombre, price: precio }),
        });
        if (response.ok) {
          const updatedProduct = await response.json();
          actualizarProductoEnTabla(updatedProduct);
          formEditarProducto.reset();
          const editForm = document.querySelector("#editar-producto");
          editForm.style.display = "none";
        } else {
          console.error('Error al editar el producto:', response.statusText);
        }
      } catch (error) {
        console.error('Error al editar el producto:', error);
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