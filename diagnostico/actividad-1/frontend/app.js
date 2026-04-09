const API_URL = "http://localhost:3000";

const unidades = {
    "Vidrio": "kg",
    "Hierro": "kg",
    "Aluminio": "kg",
    "Cobre": "kg",
    "Bronce": "kg",
    "Cartón": "kg",
    "Papel Blanco": "kg",
    "Tapas de plástico": "kg",
    "Aceite de girasol": "m³",
    "Baterías de vehículos": "unidades"
};

function setFechaActual() {
    const hoy = new Date().toISOString().split('T')[0];
    document.getElementById('fecha').value = hoy;
}

function mostrarAlerta(mensaje, tipo) {
    const alert = tipo === 'success' 
        ? document.getElementById('successAlert') 
        : document.getElementById('errorAlert');

    alert.textContent = mensaje;
    alert.style.display = 'block';
    setTimeout(() => alert.style.display = 'none', 3000);
}

// Obtener stock desde backend
async function cargarStock() {
    try {
        const res = await fetch(`${API_URL}/stock`);
        const data = await res.json();

        const tbody = document.getElementById('stockTable');
        tbody.innerHTML = '';

        data.forEach(item => {
            const fila = tbody.insertRow();
            fila.innerHTML = `
                <td>${item.material}</td>
                <td>${unidades[item.material] || '-'}</td>
                <td>${item.stock.toFixed(2)}</td>
                <td>${item.ultima_actualizacion || 'N/A'}</td>
            `;
        });

    } catch (error) {
        mostrarAlerta("Error al cargar stock", "error");
    }
}

// Obtener historial desde backend
async function cargarHistorial() {
    try {
        const res = await fetch(`${API_URL}/movimientos`);
        const data = await res.json();

        const tbody = document.getElementById('historialTable');
        tbody.innerHTML = '';

        data.forEach(mov => {
            const fila = tbody.insertRow();
            fila.innerHTML = `
                <td>${mov.fecha}</td>
                <td>${mov.material}</td>
                <td>${mov.tipo}</td>
                <td>${mov.cantidad}</td>
            `;
        });

    } catch (error) {
        mostrarAlerta("Error al cargar historial", "error");
    }
}

// Enviar movimiento al backend
document.getElementById('stockForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const material = document.getElementById('material').value;
    const cantidad = parseFloat(document.getElementById('cantidad').value);
    const tipo = document.getElementById('tipo').value;
    const fecha = document.getElementById('fecha').value;

    if (cantidad <= 0) {
        mostrarAlerta('La cantidad debe ser mayor a 0', 'error');
        return;
    }

    try {
        const res = await fetch(`${API_URL}/movimientos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                material,
                tipo,
                cantidad,
                fecha,
            })
        });

        const data = await res.json();

        if (!res.ok) {
            mostrarAlerta(data.error || "Error en la operación", "error");
            return;
        }

        mostrarAlerta("Movimiento registrado correctamente", "success");

        cargarStock();
        cargarHistorial();
        setFechaActual();

    } catch (error) {
        mostrarAlerta("Error al conectar con el servidor", "error");
    }
});

// Inicializar
setFechaActual();
cargarStock();
cargarHistorial();