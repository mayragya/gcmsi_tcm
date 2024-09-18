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
 

async function loadAppointment(){
    try {
        const response = await fetch('../php/getAppointment.php');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        citas = await response.json();
        drawTableAppointment();
    } catch (error) {
        console.error('Error fetching citas:', error);
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

function drawTableAppointment(){
    const tbody = document.getElementById("printAppointment"); 
    tbody.innerHTML = ''; 

    citas.forEach(cita => {
        const tr = document.createElement("tr"); 
        tr.innerHTML = `
        <td>${cita.id_cita}</td>
        <td>${cita.name}</td>
        <td>${cita.lastname}</td>
        <td>${cita.phoneNumber}</td>
        <td>${cita.name_especialidad}</td>
        <td>${cita.hora_cita}</td>
        <td>${cita.fecha_cita}</td>`;
        

        tbody.appendChild(tr); 

    }); 

}


// Cargar datos y dibujar la tabla inicial
loadDoctores();
loadPatient(); 
loadAppointment();