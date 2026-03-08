const sedes = {
    sede1: [
        { nombre: "Agua PH+ 477ML", precio: 10000, stock: 5 },
        { nombre: "Coca-cola Orignal", precio: 7000, stock: 3 },
        { nombre: "Gatorade", precio: 8000, stock: 5 },
        { nombre: "Redbull", precio: 18000, stock: 2 },
        { nombre: "Electrolit", precio: 21000, stock: 2 },
        { nombre: "Pringless", precio: 12000, stock: 1 },
        { nombre: "Papas lasschiss 65g", precio: 6900, stock: 3 },
        { nombre: "Mani 35G", precio: 5000, stock: 1 },
        { nombre: "Ferrero R X8", precio: 40000, stock: 1 },
        { nombre: "Shampoo jacuzzi", precio: 15000, stock: 2 },
        { nombre: "Condones Today", precio: 40000, stock: 2 },
        { nombre: "Aguila ligth", precio: 8000, stock: 2 },
        { nombre: "Pilsen", precio: 8000, stock: 2 },
        { nombre: "Jp Chenet", precio: 20000, stock: 3 },
        { nombre: "Vino", precio: 45000, stock: 1 }
    ],
    sede2: [
        { nombre: "Agua PH+ 477ML", precio: 10000, stock: 5 },
        { nombre: "Coca-cola Orignal", precio: 7000, stock: 3 },
        { nombre: "Coca-cola zero", precio: 7000, stock: 3 },
        { nombre: "Gatorade", precio: 8000, stock: 5 },
        { nombre: "Redbull", precio: 18000, stock: 2 },
        { nombre: "Electrolit", precio: 21000, stock: 2 },
        { nombre: "Pringless", precio: 12000, stock: 1 },
        { nombre: "Papas lasschiss", precio: 15000, stock: 2 },
        { nombre: "Ferrero R X8", precio: 40000, stock: 1 },
        { nombre: "Shampoo jacuzzi", precio: 15000, stock: 2 },
        { nombre: "Condones Today", precio: 40000, stock: 2 },
        { nombre: "Jp Chenet", precio: 20000, stock: 3 },
        { nombre: "Corona", precio: 13000, stock: 3 },
        { nombre: "Vino", precio: 45000, stock: 1 }
    ],
    sede3: [
        { nombre: "Pringless", precio: 12000, stock: 1 },
        { nombre: "Papas lasschiss 65g", precio: 6900, stock: 3 },
        { nombre: "Ferrero R X8", precio: 40000, stock: 1 },
        { nombre: "Shampoo jacuzzi", precio: 15000, stock: 2 },
        { nombre: "Condones Today", precio: 40000, stock: 2 },
        { nombre: "Vino", precio: 45000, stock: 1 }
    ],
    Apto: [
        { nombre: "Agua PH+ 477ML", precio: 10000, stock: 10 },
        { nombre: "Coca-cola Orignal", precio: 7000, stock: 8 },
        { nombre: "Gatorade", precio: 8000, stock: 10 },
        { nombre: "Redbull", precio: 18000, stock: 12 },
        { nombre: "Electrolit", precio: 21000, stock: 12 },
        { nombre: "Pringless", precio: 12000, stock: 4 },
        { nombre: "Papas lasschiss 65g", precio: 6900, stock: 5 },
        { nombre: "Ferrero R X8", precio: 40000, stock: 1 },
        { nombre: "Shampoo jacuzzi", precio: 15000, stock: 3 },
        { nombre: "Condones Today", precio: 40000, stock: 5 },
        { nombre: "Aguila ligth", precio: 8000, stock: 4 },
        { nombre: "Pilsen", precio: 8000, stock: 4 },
        { nombre: "Jp Chenet", precio: 20000, stock: 12 },
        { nombre: "Vino", precio: 45000, stock: 1 }
    ]
};

// Catálogo de daños comunes
const danosComunes = [
    { nombre: "Control TV Perdido", precio: 80000 },
    { nombre: "Copa Rota", precio: 15000 },
    { nombre: "Toalla Dañada/Manchada", precio: 45000 },
    { nombre: "Cobija/Lencería Manchada", precio: 120000 }
];

let sedeActual = 'sede1';
let inventarioActivo = [];
let listaDanosSeleccionados = [];

function cambiarSede(idSede, btn) {
    document.querySelectorAll('.btn-sede').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    sedeActual = idSede;
    inventarioActivo = sedes[idSede].map(p => ({ ...p, fisico: p.stock }));
    listaDanosSeleccionados = [];
    document.getElementById('huesped').value = "";
    document.getElementById('habitacion').value = "";
    renderDanos();
    render();
}

function toggleDanos() {
    const div = document.getElementById('seccionDanos');
    div.classList.toggle('hidden');
}

function renderDanos() {
    const contenedor = document.getElementById('listaDanosCheck');
    contenedor.innerHTML = danosComunes.map((d, i) => `
        <div class="dano-item">
            <label><input type="checkbox" onchange="toggleDanoItem(${i}, this)"> ${d.nombre}</label>
            <span>$${d.precio.toLocaleString()}</span>
        </div>
    `).join('');
}

function toggleDanoItem(index, checkbox) {
    if (checkbox.checked) {
        listaDanosSeleccionados.push(danosComunes[index]);
    } else {
        listaDanosSeleccionados = listaDanosSeleccionados.filter(d => d.nombre !== danosComunes[index].nombre);
    }
    render();
}

function agregarDanoPersonalizado() {
    const nom = document.getElementById('otroDanoNombre');
    const pre = document.getElementById('otroDanoPrecio');
    if (nom.value && pre.value) {
        listaDanosSeleccionados.push({ nombre: nom.value, precio: parseInt(pre.value) });
        nom.value = ""; pre.value = "";
        render();
    }
}

function ajustar(index, delta) {
    let nuevo = inventarioActivo[index].fisico + delta;
    if (nuevo >= -5 && nuevo <= inventarioActivo[index].stock) {
        inventarioActivo[index].fisico = nuevo;
        render();
    }
}

function render() {
    const contenedor = document.getElementById('listaProductos');
    contenedor.innerHTML = '';
    let total = 0;

    // Calcular total de productos
    inventarioActivo.forEach((p, i) => {
        const cobro = p.stock - p.fisico;
        total += (cobro * p.precio);
        if (cobro > 0 || p.fisico < 0) {
            contenedor.innerHTML += `
                <div class="producto-row">
                    <div class="info">
                        <span class="p-name">${p.nombre}</span>
                        <span class="p-stock">Precio: $${p.precio.toLocaleString()}</span>
                        <span class="p-cobrar">Cobrar: ${cobro}</span>
                    </div>
                    <div class="controles">
                        <div class="btn-qty" onclick="ajustar(${i}, -1)">−</div>
                        <div class="qty-num">${p.fisico}</div>
                        <div class="btn-qty" onclick="ajustar(${i}, 1)">+</div>
                    </div>
                </div>
            `;
        } else {
            // Mostrar todos aunque no tengan cobro para poder ajustar
            contenedor.innerHTML += `
                <div class="producto-row">
                    <div class="info">
                        <span class="p-name">${p.nombre}</span>
                        <span class="p-stock">Stock: ${p.stock}</span>
                    </div>
                    <div class="controles">
                        <div class="btn-qty" onclick="ajustar(${i}, -1)">−</div>
                        <div class="qty-num">${p.fisico}</div>
                        <div class="btn-qty" onclick="ajustar(${i}, 1)">+</div>
                    </div>
                </div>
            `;
        }
    });

    // Sumar daños al total
    listaDanosSeleccionados.forEach(d => total += d.precio);
    document.getElementById('totalFinal').innerText = `$${total.toLocaleString()}`;
}

function generarPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const huesped = document.getElementById('huesped').value || "Cliente";
    const suite = document.getElementById('habitacion').value || "S/N";
    const sedeTexto = document.querySelector('.btn-sede.active').innerText;

    const filas = [];
    
    // Consumos
    inventarioActivo.filter(p => (p.stock - p.fisico) > 0).forEach(p => {
        const c = p.stock - p.fisico;
        filas.push([p.nombre, `$${p.precio.toLocaleString()}`, c, `$${(p.precio * c).toLocaleString()}`]);
    });

    // Daños
    listaDanosSeleccionados.forEach(d => {
        filas.push([`⚠️ DAÑO: ${d.nombre}`, `$${d.precio.toLocaleString()}`, 1, `$${d.precio.toLocaleString()}`]);
    });

    if (filas.length === 0) {
        alert("No hay consumos ni daños para facturar.");
        return;
    }

    doc.setFillColor(0, 0, 0);
    doc.rect(0, 0, 210, 40, 'F');
    doc.setTextColor(255, 255, 255);
    doc.text("ONE APARTMENTS", 14, 20);
    doc.setFontSize(10);
    doc.text(`${sedeTexto} | ${new Date().toLocaleString()}`, 14, 30);

    doc.setTextColor(0, 0, 0);
    doc.text(`HUÉSPED: ${huesped.toUpperCase()} | SUITE: ${suite}`, 14, 50);

    doc.autoTable({
        head: [['CONCEPTO', 'PRECIO', 'CANT.', 'SUBTOTAL']],
        body: filas,
        startY: 60,
        headStyles: { fillColor: [0, 0, 0] }
    });

    doc.setFontSize(14);
    doc.text(`TOTAL A PAGAR: ${document.getElementById('totalFinal').innerText}`, 14, doc.lastAutoTable.finalY + 15);
    doc.save(`Factura_One_${suite}.pdf`);
}

cambiarSede('sede1', document.querySelector('.btn-sede'));
