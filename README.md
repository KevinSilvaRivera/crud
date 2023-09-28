 # CRUD para componentes de PC

## Introducción

Este proyecto es un CRUD (Crear, Leer, Actualizar, Eliminar) para componentes de PC. Está construido usando HTML, CSS, JavaScript, Express y MongoDB.

## Instrucciones de uso

1. Clonar el repositorio.
2. Instalar las dependencias.
3. Iniciar el servidor.
4. Abrir el navegador y dirigirse a `localhost:3000`.

## Archivos

* `index.html`: Este es el archivo HTML principal. Contiene el formulario para agregar nuevos productos, la tabla de productos y el formulario para editar productos.
* `script.js`: Este archivo contiene el código JavaScript que se encarga de la lógica de la aplicación.
* `style.css`: Este archivo contiene los estilos CSS de la aplicación.
* `server.js`: Este archivo contiene el código JavaScript que se encarga de iniciar el servidor y manejar las peticiones HTTP.
* `package.json`: Este archivo contiene las dependencias del proyecto.

## Código

### HTML

El archivo `index.html` contiene el siguiente código:

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CRUD PARA COMPONENTES DE PC</title>
    <link rel="stylesheet" href="style.css">
</head>

<body>
    <div>
        <main>
            <h1>CRUD PARA PRODUCTOS DE PC</h1>
            <p>ESC. 2023</p>
            <section>
                <h2>Agregar Productos</h2>
                <form class="agregar-productos" id="agregar-producto">
                    <input type="text" id="nombre" placeholder="Nombre del producto" required>
                    <input type="number" id="precio" placeholder="Precio del producto" min="0" required>
                    <button type="submit" id="submit-productos">Agregar</button>
                </form>
            </section>
            <section class="tabla-productos">
                <h2>Tabla de productos</h2>
                <table id="tabla-productos">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Precio</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>