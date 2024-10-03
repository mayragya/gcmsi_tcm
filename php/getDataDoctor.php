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
    $id_doctor = isset($_GET['id']) ? intval($_GET['id']) : null;

    if($id_doctor){
        //consulta sql a la base de datos
        $sql ="SELECT * FROM doctores WHERE id_doctor = $id_doctor"; 
        $result = $conn->query($sql);
        $doctor = array();

        if ($result->num_rows > 0) {
            // Salida de datos en la fila correspondiente
            $doctor = $result->fetch_assoc();
        } else {
            $doctor = ["id_doctor" => "0", "name" => "No hay resultados", "lastname" => "No hay resultados", "especialidad" => "No hay resultados"];
        }
        $conn->close();
        echo json_encode($doctor);
    }else{
        echo json_encode(["error" => "No se proporcionó un ID de doctor válido"]);
    }


}

    ?>