<?php
include_once 'config.php'; 

header('Content-Type: application/json'); 

//verificar la conexión con la base de datos 
$conn = db_user();
if($conn->connect_error){
    echo json_encode(["error"=>"Error en la conexión".$conn->connect_error]); 
    exit();
}else{ 

        //consulta sql para extraer datos de la bd 
        $sql = "SELECT 
        citas.id_cita, 
        pacientes.name,
        pacientes.lastname,
        pacientes.phoneNumber, 
        especialidades.name_especialidad,
        citas.hora_cita, 
        citas.fecha_cita
        FROM citas
        JOIN pacientes ON pacientes.id_paciente = citas.paciente
        JOIN especialidades ON especialidades.id_especialidad = citas.especialidad
        ORDER BY id_cita";
         $result = $conn->query($sql);
            $citas = array();
        
                if($result->num_rows > 0 ){
                    //salida de datos en cada fila 
                    while($row = $result->fetch_assoc()){
                    $citas[] = $row;
                    } 
                }else{
                    $citas[]=array("id" => "0","name" => "No hay resultados" , "lastname" => "No hay resultados", "name_especialidad" => "No hay resultados", "hora_cita"=> "No hay resultados", "fecha_cita" => "No hay resultados");  
                }
                $conn->close();
        
                //devolver datos en formato json
                header('Content-Type: application/json'); 
                echo json_encode($citas);

}


?>