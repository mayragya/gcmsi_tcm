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
        doctores.id_doctor, 
        doctores.name,
        doctores.lastname,
        especialidades.name_especialidad
        FROM doctores 
        JOIN 
        especialidades ON especialidades.id_especialidad = doctores.especialidad
        ORDER BY id_doctor";
         $result = $conn->query($sql);
            $doctores = array();
        
                if($result->num_rows > 0 ){
                    //salida de datos en cada fila 
                    while($row = $result->fetch_assoc()){
                    $doctores[] = $row;
                    } 
                }else{
                    $doctores[]=array("id_doctor" => "0","name" => "No hay resultados" , "lastname" => "No hay resultados", "name_especialidad" => "No hay resultados");  
                }
                $conn->close();
        
                //devolver datos en formato json
                header('Content-Type: application/json'); 
                echo json_encode($doctores);

}


?>