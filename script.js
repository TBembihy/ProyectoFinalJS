document.addEventListener('DOMContentLoaded', () => {
    mostrarProductos();
    cargarCarrito();
});

// Datos de productos
const productos = [
    {
        "id": 1,
        "nombre": "Camiseta Urbana",
        "precio": 4999,
        "imagen": "https://via.placeholder.com/250",
        "descripcion": "Camiseta de algodón 100%."
    },
    {
        "id": 2,
        "nombre": "Jeans Ajustados",
        "precio": 8999,
        "imagen": "https://via.placeholder.com/250",
        "descripcion": "Jeans ajustados de estilo moderno."
    },
    {
        "id": 3,
        "nombre": "Zapatillas Deportivas",
        "precio": 12499,
        "imagen": "https://via.placeholder.com/250",
        "descripcion": "Zapatillas deportivas de alto rendimiento."
    }
];

const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

function mostrarProductos() {
    const contenedor = document.getElementById('productos-contenedor');
    contenedor.innerHTML = '';

    productos.forEach(producto => {
        const productoDiv = document.createElement('div');
        productoDiv.className = 'producto';
        productoDiv.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <div class="contenido">
                <h3>${producto.nombre}</h3>
                <p>${producto.descripcion}</p>
                <div class="precio">$${producto.precio}</div>
                <button onclick="agregarAlCarrito(${producto.id})">Agregar al carrito</button>
            </div>
        `;
        contenedor.appendChild(productoDiv);
    });
}

function agregarAlCarrito(id) {
    const producto = productos.find(p => p.id === id);
    const productoEnCarrito = carrito.find(p => p.id === id);

    if (productoEnCarrito) {
        productoEnCarrito.cantidad += 1;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }

    localStorage.setItem('carrito', JSON.stringify(carrito));
    cargarCarrito();
}

function cargarCarrito() {
    const carritoContenedor = document.getElementById('carrito-items');
    const total = document.getElementById('carrito-total');
    carritoContenedor.innerHTML = '';

    let totalCarrito = 0;

    carrito.forEach(item => {
        const itemLi = document.createElement('li');
        itemLi.innerHTML = `
            ${item.nombre} - $${item.precio} x ${item.cantidad}
            <button onclick="eliminarDelCarrito(${item.id})">Eliminar</button>
        `;
        carritoContenedor.appendChild(itemLi);
        totalCarrito += item.precio * item.cantidad;
    });

    total.innerHTML = `Total: $${totalCarrito}`;
}

function eliminarDelCarrito(id) {
    const index = carrito.findIndex(item => item.id === id);
    if (index !== -1) {
        carrito.splice(index, 1);
        localStorage.setItem('carrito', JSON.stringify(carrito));
        cargarCarrito();
    }
}

function confirmarCompra() {
    alert('Compra confirmada. ¡Gracias por tu compra!');
    localStorage.removeItem('carrito');
    cargarCarrito();
}

// Cambio de pestañas
document.getElementById('home-link').addEventListener('click', () => {
    document.getElementById('productos-contenedor').classList.remove('hidden');
    document.getElementById('carrito-contenedor').classList.add('hidden');
    document.getElementById('pago-section').classList.add('hidden');
});

document.getElementById('carrito-link').addEventListener('click', () => {
    document.getElementById('productos-contenedor').classList.add('hidden');
    document.getElementById('carrito-contenedor').classList.remove('hidden');
    document.getElementById('pago-section').classList.add('hidden');
});

document.getElementById('pago-link').addEventListener('click', () => {
    document.getElementById('productos-contenedor').classList.add('hidden');
    document.getElementById('carrito-contenedor').classList.add('hidden');
    document.getElementById('pago-section').classList.remove('hidden');
});
