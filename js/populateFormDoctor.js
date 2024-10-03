console.log('populateFormDoctor.js'); 
document.addEventListener("DOMContentLoaded", function(){
// Extraer el ID de la URL
const params = new URLSearchParams(window.location.search);
const id = params.get('id'); // Obtener el valor del parámetro 'id'
// Función para cargar los datos de la cita seleccionada por ID
function loadDoctorById(id) {
    fetch('../php/getDataDoctor.php?id=' + id)
        .then(response => response.json())
        .then(doctor => {
            if (doctor.id !== "0" && doctor) {
                // Poblar el formulario con los datos obtenidos

                console.log(doctor);
                document.getElementById("id_doctor").value = doctor.id_doctor; 
                document.getElementById("nombre1").value = doctor.name;
                document.getElementById("apellido1").value = doctor.lastname;
                document.getElementById("especialidad").value = doctor.especialidad;
            } else {
                alert("No se encontraron resultados para el ID proporcionado");
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            //alert("Hubo un error al obtener los datos de la cita.");
        });
}

// Llamar a la función con un ID específico 
loadDoctorById(id);

});


function DeleteDoctor() {
    if (confirm("¿Estás seguro de que deseas eliminar este registro?")) {
        // Obtiene el ID del medico desde el input hidden
        var idDoctor = document.getElementById("id_doctor").value;

        // Redirige a la URL de eliminación con el ID del doctor como parámetro
        window.location.href = "../php/deleteDoctor.php?id_doctor=" + idDoctor;
    }
}

