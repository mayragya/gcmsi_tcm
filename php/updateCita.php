<?php

include_once 'config.php'; 
include_once 'regex.php'; 

// Verificar la conexión con la base de datos 
$conn = db_user();
if ($conn->connect_error) {
    die("Error en la conexión: " . $conn->connect_error);
} else {
    try {
        // Iniciar transacción 
        $conn->begin_transaction();

        // Sanitización y validación de los datos del formulario
        $id_cita = mysqli_real_escape_string($conn, regex($_POST['id_cita'])); 
        $name_patient = mysqli_real_escape_string($conn, regex($_POST['nombre3']));
        $last_name = mysqli_real_escape_string($conn, regex($_POST['apellido3'])); 
         // Obtener el id del paciente 
         $sql = "SELECT id_paciente FROM pacientes WHERE name = ? AND lastname = ?";
         $stmt = $conn->prepare($sql);
         $stmt->bind_param("ss", $name_patient, $last_name);
         $stmt->execute();
         $result = $stmt->get_result();
         if ($result->num_rows > 0) {
             $row = $result->fetch_assoc();
             $id_paciente = $row['id_paciente'];
         } else {
             throw new Exception("El paciente no está registrado.");
         }
         $stmt->close();
         $hour = mysqli_real_escape_string($conn, regex($_POST['hora']));
         $date = mysqli_real_escape_string($conn, regex($_POST['fecha_cita']));
        $specialty = mysqli_real_escape_string($conn, regex($_POST['consultorio']));
        // Relacionar id especialidad 
        $sql = "SELECT id_especialidad FROM especialidades WHERE id_especialidad = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $specialty);
        $stmt->execute();
        $result = $stmt->get_result();
        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            $id_especialidad = $row['id_especialidad'];
        } else {
            throw new Exception("Especialidad no encontrada.");
        }
        $stmt->close();

        // Buscar doctor por especialidad 
        $sql = "SELECT id_doctor FROM doctores WHERE especialidad = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $id_especialidad);
        $stmt->execute();
        $result = $stmt->get_result();
        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            $id_doctor = $row['id_doctor'];
        } else {
            throw new Exception("Doctor de especialidad no disponible.");
        }
        $stmt->close();

        // Insertar elementos en la tabla 
        $sql = "UPDATE citas SET paciente = ?, doctor = ?, especialidad = ?, hora_cita = ?, fecha_cita = ? WHERE id_cita = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("iiissi", $id_paciente, $id_doctor, $id_especialidad, $hour, $date, $id_cita);
        if ($stmt->execute()) {
            echo "<script>
            alert('¡Cita actualizada exitosamente!');
            window.location = '../index.html';
            </script>";
        } else {
            throw new Exception("Error al actualizar datos: " . $stmt->error);
        }

        // Confirmar transacción
        $conn->commit();

    } catch (Exception $e) {
        $conn->rollback();
        echo json_encode(['success' => false, 'message' => $e->getMessage()]);
    }
    $conn->close();
}
?>
