console.log('loadData.js');  

var doctores = []; 
var pacientes = []; 
var citss = []; 

async function loadDoctores(){
    try {
        const response = await fetch('../php/getDoctor.php');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        doctores = await response.json();
        drawTableDoctor();
    } catch (error) {
        console.error('Error fetching doctores:', error);
    }
}

async function loadPatient(){
    try {
        const response = await fetch('../php/getPatient.php');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        pacientes = await response.json();
        drawTablePatient();
    } catch (error) {
        console.error('Error fetching pacientes:', error);
    }
}


function drawTableDoctor() {
    const tbody = document.getElementById("printDoctores");
    tbody.innerHTML = ''; // Limpiar contenido anterior

    doctores.forEach(doctor => {
        const tr = document.createElement("tr");
        tr.innerHTML = `<td>${doctor.id_doctor}</td>
                        <td>${doctor.name}</td>
                        <td>${doctor.lastname}</td>
                        <td>${doctor.name_especialidad}</td>`;
                        
        tbody.appendChild(tr);
    });
}

function drawTablePatient(){
    const tbody = document.getElementById("printPatient"); 
    tbody.innerHTML = ''; 

    pacientes.forEach(paciente => {
        const tr = document.createElement("tr"); 
        tr.innerHTML = `
        <td>${paciente.id_paciente}</td>
        <td>${paciente.name}</td>
        <td>${paciente.lastname}</td>
        <td>${paciente.phoneNumber}</td>
        <td>${paciente.emergencyNumber}</td>`;

        tbody.appendChild(tr); 

    }); 

}


// Cargar datos y dibujar la tabla inicial
loadDoctores();
loadPatient(); 
