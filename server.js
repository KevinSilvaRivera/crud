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


//Continuar desde aqui