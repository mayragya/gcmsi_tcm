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
    $name_patient = mysqli_real_escape_string($conn, regex($_POST['nombre3']));
    $last_name = mysqli_real_escape_string($conn, regex($_POST['apellido3'])); 
   //obtener el id del paciente 
   $sql = "SELECT id_paciente FROM pacientes WHERE name = ? AND lastname = ?";
    $stmt = $conn->prepare($sql); 
    $stmt->bind_param("ss", $name_patient, $last_name); 
    $stmt->execute();
    $result = $stmt->get_result();
    if($result->num_rows > 0){
        $row = $result->fetch_assoc();
        $id_paciente = $row['id_paciente']; 
    
    }else{
        // echo "<script>
        // alert('El paciente no está registrado.');
        // window.location = '../index.html';
        // </script>";
          // Este echo está colocado únicamente para las pruebas de funcionalidad del sistema 
        throw new Exception("El paciente no está registrado");
    }
    $stmt->close();

    $hour = mysqli_real_escape_string($conn, regex($_POST['hora'])); 
    $date = mysqli_real_escape_string($conn, regex($_POST['fecha_cita'])); 
    $specialty = mysqli_real_escape_string($conn, regex($_POST['consultorio'])); 
    //relacionar id especialidad 
    $sql = "SELECT id_especialidad FROM especialidades WHERE id_especialidad = ?";
    $stmt = $conn->prepare($sql); 
    $stmt->bind_param("i", $specialty); 
    $stmt->execute();
    $result = $stmt->get_result();
    if($result->num_rows > 0){
        $row = $result->fetch_assoc();
        $id_especialidad = $row['id_especialidad']; 
    
    }else{
        // echo "<script>
        // alert('La especialidad no existe.');
        // window.location = '../index.html';
        // </script>";
          // Este echo está colocado únicamente para las pruebas de funcionalidad del sistema 
        throw new Exception("Especialidad no encontrada");
    }
    $stmt->close();

    //buscar doctor por especialidad 
    $sql = "SELECT id_doctor FROM doctores WHERE especialidad = ?";
    $stmt = $conn->prepare($sql); 
    $stmt->bind_param("i", $id_especialidad); 
    $stmt->execute();
    $result = $stmt->get_result();
    if($result->num_rows > 0){
        $row = $result->fetch_assoc();
        $id_doctor = $row['id_doctor']; 
        
    }else{
        // echo "<script>
        // alert('Doctor de especialidad no disponible.');
        // window.location = '../index.html';
        // </script>";
          // Este echo está colocado únicamente para las pruebas de funcionalidad del sistema 
        throw new Exception("Doctor de especialidad no disponible.");
    }
    $stmt->close();

    //insertar elementos en la tabla 
    $sql = "INSERT INTO citas (paciente, doctor, especialidad, hora_cita, fecha_cita) VALUES (?,?,?,?,?)"; 
    $stmt= $conn->prepare($sql);
    $stmt->bind_param("iiiss", $id_paciente, $id_doctor, $id_especialidad, $hour, $date); 
    if($stmt->execute()){
        echo "<script>
        alert('¡Cita registrado exitosamente!');
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