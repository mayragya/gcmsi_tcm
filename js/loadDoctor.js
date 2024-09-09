console.log('loadDoctor.js'); 
var doctores = [];

async function loadDoctores() {
    try {
        const response = await fetch('../php/getDoctor.php');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        activos = await response.json();
        drawTable();
    } catch (error) {
        console.error('Error fetching doctores:', error);
    }
}

function drawTable() {
    const tbody = document.getElementById("printActivos");
    tbody.innerHTML = ''; // Limpiar contenido anterior

    activos.forEach(activo => {
        const tr = document.createElement("tr");
        tr.innerHTML = `<td>${activo.IdActivo}</td>
                        <td>${activo.DescripcionActivo}</td>
                        <td>${activo.name_estatus}</td>
                        <td>${activo.marca}</td>
                        <td>${activo.NumModelo}</td>
                        <td>${activo.NumSerie}</td>`;
                        
        tbody.appendChild(tr);
    });
}

// Cargar activos y dibujar la tabla inicial
loadActivos();
