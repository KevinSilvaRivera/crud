const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Conectar a la base de datos MongoDB
mongoose.connect('mongodb://localhost:27017/crud', {
  useNewUrlParser: true, 
  useUnifiedTopology: true,
});

// Definir el modelo para los productos
const Product = mongoose.model('Producto', {
  name: String,
  price: Number,
});

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para cargar la página HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Ruta para obtener todos los productos
app.get('/api/producto', async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los productos' });
  }
});

// Ruta para crear un nuevo producto
app.post('/api/producto', async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el producto' });
  }
});

// Ruta para actualizar un producto por ID
app.put('/api/producto/:id', async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el producto' });
  }
});

// Ruta para eliminar un producto por ID
app.delete('/api/producto/:id', async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndRemove(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json(deletedProduct);
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el producto' });
  }
});

app.listen(port, () => {
  console.log(`Servidor en ejecución en el puerto ${port}`);
});