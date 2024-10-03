<?php
include_once 'config.php'; 

header('Content-Type: application/json'); 

//verificar la conexión con la base de datos 
$conn = db_user();
if($conn->connect_error){
    echo json_encode(["error"=>"Error en la conexión".$conn->connect_error]); 
    exit();
}else{ 
    // Obtener el ID del doctor del parámetro GET
    $id_patient = isset($_GET['id']) ? intval($_GET['id']) : null;

    if($id_patient){
        //consulta sql a la base de datos
        $sql ="SELECT * FROM pacientes WHERE id_paciente = $id_patient"; 
        $result = $conn->query($sql);
        $paciente = array();

        if ($result->num_rows > 0) {
            // Salida de datos en la fila correspondiente
            $paciente = $result->fetch_assoc();
        } else {
            $doctor = ["id_paciente" => "0", "name" => "No hay resultados", "lastname" => "No hay resultados", "phoneNumber" => "No hay resultados", "emergencyNumber" => "No hay resultados"];
        }
        $conn->close();
        echo json_encode($paciente);
    }else{
        echo json_encode(["error" => "No se proporcionó un ID dec válido"]);
    }


}

 ?>