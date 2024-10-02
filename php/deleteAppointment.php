<?php
include_once 'config.php'; 
 //verificar conexión con la base de datos 
 $conn = db_user();
 if($conn->connect_error){
     die("Error en la conexión: ". $conn->connect_error);
 }else{ 
try{
    if (isset($_GET['id_cita'])) {
        $id_cita = intval($_GET['id_cita']);
    
        // Consulta para eliminar el registro con el ID proporcionado.
        $sql = "DELETE FROM citas WHERE id_cita = ?";
        if ($stmt = $conn->prepare($sql)) {
            $stmt->bind_param("i", $id_cita);
            if ($stmt->execute()) {
                echo "<script>
                alert('¡Cita eliminada exitosamente!');
                window.location = '../index.html';
                </script>";
            } else {
                echo "Error al eliminar la cita: " . $stmt->error;
            }
            $stmt->close();
        } else {
            echo "Error en la preparación de la consulta: " . $conn->error;
        }
    } else {
        echo "ID de cita no proporcionado";
    }
    
}catch(Exeption $e){
    echo "Error: " . $e->getMessage();
}
    $conn->close();
 }
?>