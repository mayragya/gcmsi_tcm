<?php
include_once 'config.php'; 
 //verificar conexión con la base de datos 
 $conn = db_user();
 if($conn->connect_error){
     die("Error en la conexión: ". $conn->connect_error);
 }else{ 
try{
    if (isset($_GET['id_doctor'])) {
        $id_doctor = intval($_GET['id_doctor']);
    
        // Consulta para eliminar el registro con el ID proporcionado.
        $sql = "DELETE FROM doctores WHERE id_doctor = ?";
        if ($stmt = $conn->prepare($sql)) {
            $stmt->bind_param("i", $id_doctor);
            if ($stmt->execute()) {
                echo "<script>
                alert('¡Registro eliminado exitosamente!');
                window.location = '../index.html';
                </script>";
            } else {
                echo "Error al eliminar el registro: " . $stmt->error;
            }
            $stmt->close();
        } else {
            echo "Error en la preparación de la consulta: " . $conn->error;
        }
    } else {
        echo "ID no proporcionado";
    }
    
}catch(Exeption $e){
    echo "Error: " . $e->getMessage();
}
    $conn->close();
 }
?>