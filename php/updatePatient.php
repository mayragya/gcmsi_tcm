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
    $id_patient = mysqli_real_escape_string($conn, regex($_POST['id_paciente'])); 
    $name_patient = mysqli_real_escape_string($conn, regex($_POST['nombre2']));
    $last_name = mysqli_real_escape_string($conn, regex($_POST['apellido2'])); 
    $phoneNumber = mysqli_real_escape_string($conn, regex($_POST['telefono2']));
    $emergencyNumber = mysqli_real_escape_string($conn, regex($_POST['telefonoE'])); 

    //actualizar elementos en la tabla 
    $sql = "UPDATE pacientes SET name = ?, lastname = ?, phoneNumber = ?, emergencyNumber = ? WHERE id_paciente = ? "; 
    $stmt= $conn->prepare($sql);
    $stmt->bind_param("ssssi", $name_patient, $last_name, $phoneNumber, $emergencyNumber, $id_patient);

    if($stmt->execute()){
        echo "<script>
        alert('¡Paciente actualizado exitosamente!');
        window.location = '../index.html';
        </script>";
    }else{
        throw new Exception("Error al actualizar datos: " . $stmt->error);
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