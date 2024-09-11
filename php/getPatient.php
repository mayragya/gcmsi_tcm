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
        $sql = "SELECT * FROM pacientes ";
          $result = $conn->query($sql);
            $pacientes = array();
        
                if($result->num_rows > 0 ){
                    //salida de datos en cada fila 
                    while($row = $result->fetch_assoc()){
                    $pacientes[] = $row;
                    }
                }else{
                    $pacientes[]=array("id_paciente" => "0","name" => "No hay resultados" , "lastname" => "No hay resultados", "phoneNumber" => "No hay resultados", "emergencyNumber" => "No hay resultados");  
                }
                $conn->close();
        
                //devolver datos en formato json
                header('Content-Type: application/json'); 
                echo json_encode($pacientes);

}


?>