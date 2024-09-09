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
    $name_patient = mysqli_real_escape_string($conn, regex($_POST['nombre2']));
    $last_name = mysqli_real_escape_string($conn, regex($_POST['apellido2'])); 
    $phoneNumber = mysqli_real_escape_string($conn, regex($_POST['telefono2']));
    $emergencyNumber = mysqli_real_escape_string($conn, regex($_POST['telefonoE'])); 

    //insertar elementos en la tabla 
    $sql = "INSERT INTO pacientes (name, lastname, phoneNumber, emergencyNumber) VALUES (?,?,?,?)"; 
    $stmt= $conn->prepare($sql);
    $stmt->bind_param("ssss", $name_patient, $last_name, $phoneNumber, $emergencyNumber);

    if($stmt->execute()){
        echo "<script>
        alert('¡Paciente registrado exitosamente!');
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