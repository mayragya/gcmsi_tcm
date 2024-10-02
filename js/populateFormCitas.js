console.log('populateFormCitas.js'); 
document.addEventListener("DOMContentLoaded", function(){
// Extraer el ID de la URL
const params = new URLSearchParams(window.location.search);
const id = params.get('id'); // Obtener el valor del parámetro 'id'
// Función para cargar los datos de la cita seleccionada por ID
function loadAppointmentById(id) {
    fetch('../php/GetDataAppointment.php?id=' + id)
        .then(response => response.json())
        .then(cita => {
            if (cita.id !== "0" && cita) {
                // Poblar el formulario con los datos obtenidos

                console.log(cita);
                document.getElementById("id_cita").value = cita.id_cita; 
                document.getElementById("nombre3").value = cita.name;
                document.getElementById("apellido3").value = cita.lastname;
                document.getElementById("consultorio").value = cita.especialidad;
                document.getElementById("hora").value = cita.hora_cita;
                document.getElementById("fecha_cita").value = cita.fecha_cita;
            } else {
                alert("No se encontraron resultados para el ID proporcionado");
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            //alert("Hubo un error al obtener los datos de la cita.");
        });
}

// Llamar a la función con un ID específico (ejemplo: 1)
loadAppointmentById(id);

});


function DeleteAppointment() {
    if (confirm("¿Estás seguro de que deseas eliminar esta cita?")) {
        // Obtiene el ID de la cita desde el input hidden
        var idCita = document.getElementById("id_cita").value;

        // Redirige a la URL de eliminación con el ID de la cita como parámetro
        window.location.href = "../php/deleteAppointment.php?id_cita=" + idCita;
    }
}

