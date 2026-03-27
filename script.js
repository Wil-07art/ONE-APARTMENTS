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
        { nombre: "Shampoo jacuzzi", precio: 0, stock: 1 },
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
        { nombre: "Shampoo jacuzzi", precio: 0, stock: 1 },
        { nombre: "Condones Today", precio: 40000, stock: 2 },
        { nombre: "Jp Chenet", precio: 20000, stock: 3 },
        { nombre: "Corona", precio: 13000, stock: 3 },
        { nombre: "Vino", precio: 45000, stock: 1 }
    ],
    sede3: [
        { nombre: "Pringless", precio: 12000, stock: 1 },
        { nombre: "Papas lasschiss 65g", precio: 6900, stock: 3 },
        { nombre: "Ferrero R X8", precio: 40000, stock: 1 },
        { nombre: "Shampoo jacuzzi", precio: 0, stock: 1 },
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
        { nombre: "Shampoo jacuzzi", precio: 0, stock: 3 },
        { nombre: "Condones Today", precio: 40000, stock: 5 },
        { nombre: "Aguila ligth", precio: 8000, stock: 4 },
        { nombre: "Pilsen", precio: 8000, stock: 4 },
        { nombre: "Jp Chenet", precio: 20000, stock: 12 },
        { nombre: "Vino", precio: 45000, stock: 1 }
    ]
};

const danosCatalogo = [
    { nombre: "LLAVERO APARTAMENTO", precio: 50000 },
    { nombre: "LLAVE ", precio: 50000 },
    { nombre: "TOALLA DE BAÑO GRANDE", precio: 60000 },
    { nombre: "TOALLA PEQUEÑA", precio: 25000 },
    { nombre: "CONTROL TV", precio: 150000 },
    { nombre: "ELECTRODOMESTICO", precio: 2500000 },
    { nombre: "DAÑO A LA HABIRACION", precio: 1000000 },
    { nombre: "SABANA RESORTE", precio: 60000 },
    { nombre: "SABANA LISA", precio: 60000 },
    { nombre: "ALMOHADA", precio: 50000 },
    { nombre: "FUNDA ALMOHADA", precio: 30000 },
    { nombre: "PROTECTOR ALMOHADA", precio: 25000 },
    { nombre: "PROTECTOR COLCHON", precio: 200000 },
    { nombre: "POSILLO", precio: 20000 },
    { nombre: "VASO", precio: 30000 },
    { nombre: "COPA", precio: 50000 },
    { nombre: "PLATO PLANO", precio: 30000 },
    { nombre: "PLATO HONDO", precio: 30000 },
    { nombre: "TENEDOR GRANDE", precio: 20000 },
    { nombre: "TENEDOR PEQUEÑO", precio: 20000 },
    { nombre: "CUCHARA GRANDE", precio: 20000 },
    { nombre: "CUCHARA PEQUEÑA", precio: 20000 },
    { nombre: "CUCHILLO DE COCINA", precio: 20000 },
    { nombre: "CUCHILLO DE MESA", precio: 20000 },
    { nombre: "SACA CORCHO", precio: 20000 }
];

let inventarioActivo = [];
let listaDanosSeleccionados = [];
let sedeActual = 'sede1';

function toggleDanos() {
    const div = document.getElementById('seccionDanos');
    div.classList.toggle('hidden');
}

function cambiarSede(idSede, btn) {
    document.querySelectorAll('.btn-sede').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    sedeActual = idSede;
    inventarioActivo = sedes[idSede].map(p => ({ ...p, fisico: p.stock }));
    listaDanosSeleccionados = danosCatalogo.map(d => ({ ...d, cantidad: 0 }));
    
    document.getElementById('huesped').value = "";
    document.getElementById('habitacion').value = "";
    renderDanos();
    render();
}

function ajustarDano(index, delta) {
    let nuevaCant = listaDanosSeleccionados[index].cantidad + delta;
    if (nuevaCant >= 0) {
        listaDanosSeleccionados[index].cantidad = nuevaCant;
        renderDanos();
        render();
    }
}

function agregarDanoPersonalizado() {
    const nom = document.getElementById('otroDanoNombre');
    const pre = document.getElementById('otroDanoPrecio');
    if (nom.value && pre.value) {
        listaDanosSeleccionados.push({ 
            nombre: nom.value.toUpperCase(), 
            precio: parseInt(pre.value), 
            cantidad: 1 
        });
        nom.value = ""; pre.value = "";
        renderDanos();
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

function renderDanos() {
    const contenedor = document.getElementById('listaDanosCheck');
    contenedor.innerHTML = listaDanosSeleccionados.map((d, i) => `
        <div class="dano-row">
            <div class="dano-info">
                <span class="dano-label">${d.nombre}</span>
                <span class="dano-sub">$${d.precio.toLocaleString()} c/u</span>
            </div>
            <div class="controles">
                <div class="btn-qty" onclick="ajustarDano(${i}, -1)">−</div>
                <div class="qty-num">${d.cantidad}</div>
                <div class="btn-qty" onclick="ajustarDano(${i}, 1)">+</div>
            </div>
        </div>
    `).join('');
}

function render() {
    const contenedor = document.getElementById('listaProductos');
    contenedor.innerHTML = '';
    let total = 0;

    inventarioActivo.forEach((p, i) => {
        const cobro = p.stock - p.fisico;
        total += (cobro * p.precio);
        contenedor.innerHTML += `
            <div class="producto-row">
                <div class="info">
                    <span class="p-name">${p.nombre}</span>
                    <span class="p-stock">Stock: ${p.stock} | $${p.precio.toLocaleString()}</span>
                    <span class="p-cobrar" style="color: ${cobro > 0 ? 'red' : 'black'}">Cobrar: ${cobro}</span>
                </div>
                <div class="controles">
                    <div class="btn-qty" onclick="ajustar(${i}, -1)">−</div>
                    <div class="qty-num">${p.fisico}</div>
                    <div class="btn-qty" onclick="ajustar(${i}, 1)">+</div>
                </div>
            </div>
        `;
    });

    listaDanosSeleccionados.forEach(d => {
        total += (d.precio * d.cantidad);
    });

    document.getElementById('totalFinal').innerText = `$${total.toLocaleString()}`;
}

function generarPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const huesped = document.getElementById('huesped').value || "CLIENTE";
    const suite = document.getElementById('habitacion').value || "S/N";
    const sedeActivaBtn = document.querySelector('.btn-sede.active');
    const sedeTexto = sedeActivaBtn ? sedeActivaBtn.innerText : "GENERAL";

    const filas = [];
    inventarioActivo.filter(p => (p.stock - p.fisico) > 0).forEach(p => {
        const c = p.stock - p.fisico;
        filas.push([p.nombre, `$${p.precio.toLocaleString()}`, c, `$${(p.precio * c).toLocaleString()}`]);
    });

    listaDanosSeleccionados.filter(d => d.cantidad > 0).forEach(d => {
        filas.push([`DAÑO: ${d.nombre}`, `$${d.precio.toLocaleString()}`, d.cantidad, `$${(d.precio * d.cantidad).toLocaleString()}`]);
    });

    if (filas.length === 0) {
        alert("No hay consumos ni daños para facturar.");
        return;
    }

    doc.setFillColor(0, 0, 0);
    doc.rect(0, 0, 210, 40, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(20);
    doc.text("ONE APARTMENTS", 14, 20);
    doc.setFontSize(10);
    doc.text(`${sedeTexto} | ${new Date().toLocaleString()}`, 14, 32);

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

// Inicialización por defecto
cambiarSede('sede1', document.querySelector('.btn-sede'));
