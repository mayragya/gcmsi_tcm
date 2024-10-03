console.log('populateFormPaciente.js'); 
document.addEventListener("DOMContentLoaded", function(){
// Extraer el ID de la URL
const params = new URLSearchParams(window.location.search);
const id = params.get('id'); // Obtener el valor del parámetro 'id'
// Función para cargar los datos de la cita seleccionada por ID
function loadPatientById(id) {
    fetch('../php/getDataPatient.php?id=' + id)
        .then(response => response.json())
        .then(paciente => {
            if (paciente.id !== "0" && paciente) {
                // Poblar el formulario con los datos obtenidos

                console.log(paciente);
                document.getElementById("id_paciente").value = paciente.id_paciente; 
                document.getElementById("nombre2").value = paciente.name;
                document.getElementById("apellido2").value = paciente.lastname;
                document.getElementById("telefono2").value = paciente.phoneNumber;
                document.getElementById("telefonoE").value = paciente.emergencyNumber;
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
loadPatientById(id);

});


function DeletePatient() {
    if (confirm("¿Estás seguro de que deseas eliminar este registro?")) {
        // Obtiene el ID del medico desde el input hidden
        var idPatient = document.getElementById("id_paciente").value;

        // Redirige a la URL de eliminación con el ID del doctor como parámetro
        window.location.href = "../php/deletePatient.php?id_patient=" + idPatient;
    }
}

