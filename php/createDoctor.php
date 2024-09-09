<?php
include_once 'config.php'; 
include_once 'regex.php';

 //verificar la conexión con la base de datos 
 $conn = db_user();
 if($conn->connect_error){
     die("Error en la conexión: ". $conn->connect_error);
 }else{ 
try{
    //iniciar transacción 
    $conn->begin_transaction();

    //sanitización y validación de los datos del formulario 
    $name_doctor = mysqli_real_escape_string($conn, regex($_POST['nombre1']));
    $last_name = mysqli_real_escape_string($conn, regex($_POST['apellido1'])); 
    $specialty = mysqli_real_escape_string($conn, regex($_POST['especialidad'])); 
    //obtener el id de la especialidad
    $sql = "SELECT id_especialidad FROM especialidades WHERE id_especialidad = ?";
    $stmt = $conn->prepare($sql); 
    $stmt->bind_param("i", $specialty); 
    $stmt->execute();
    $result = $stmt->get_result();
    if($result->num_rows > 0){
        $row = $result->fetch_assoc();
        $id_especialidad = $row['id_especialidad']; 
    
    }else{
        echo "<script>
        alert('La especialidad no existe.');
        window.location = '../index.html';
        </script>";
          // Este echo está colocado únicamente para las pruebas de funcionalidad del sistema 
        //throw new Exception("Especialidad no encontrada");
    }
    $stmt->close();

    //insertar elementos en la tabla 
    $sql = "INSERT INTO doctores (name, lastname, especialidad) VALUES (?,?,?)"; 
    $stmt= $conn->prepare($sql);
    $stmt->bind_param("ssi", $name_doctor, $last_name, $id_especialidad); 
    if($stmt->execute()){
        echo "<script>
        alert('¡Médico registrado exitosamente!');
        window.location = '../index.html';
        </script>";
    }else{
        throw new Exception("Error al insertar datos: " . $stmt->error);
    }
        // confirmar transacción
        $conn->commit();

    }catch(Exeption $e){
        $conn->rollback();
        echo "Error: " . $e->getMessage();
    }
    $conn->close();   

    }

?>