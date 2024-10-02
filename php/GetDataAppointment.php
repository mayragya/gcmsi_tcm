<?php
include_once 'config.php'; 

header('Content-Type: application/json');

// verificar la conexión con la base de datos 
$conn = db_user();
if($conn->connect_error) {
    echo json_encode(["error" => "Error en la conexión: " . $conn->connect_error]); 
    exit();
}

// Obtener el ID de la cita del parámetro GET o POST
$id_cita = isset($_GET['id']) ? intval($_GET['id']) : null;

if ($id_cita) {
    // Consulta SQL para extraer datos de una cita específica
    $sql = "SELECT 
        citas.id_cita,
        pacientes.name,
        pacientes.lastname,
        pacientes.phoneNumber, 
        citas.especialidad,
        citas.hora_cita, 
        citas.fecha_cita
        FROM citas
        JOIN pacientes ON pacientes.id_paciente = citas.paciente
        JOIN especialidades ON especialidades.id_especialidad = citas.especialidad
        WHERE citas.id_cita = $id_cita";

    $result = $conn->query($sql);
    $cita = array();

    if ($result->num_rows > 0) {
        // Salida de datos en la fila correspondiente
        $cita = $result->fetch_assoc();
    } else {
        $cita = ["id" => "0", "name" => "No hay resultados", "lastname" => "No hay resultados", "name_especialidad" => "No hay resultados", "hora_cita" => "No hay resultados", "fecha_cita" => "No hay resultados"];
    }

    $conn->close();
    echo json_encode($cita);
} else {
    echo json_encode(["error" => "No se proporcionó un ID de cita válido"]);
}
?>
