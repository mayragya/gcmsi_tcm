//Este archivo es loadCitas.js

document.addEventListener('DOMContentLoaded', function(){
    let liCitas = document.getElementById('citasFun');
    liCitas.addEventListener("click", async function(e){
       await loadCitas();
    });
   var citas = []; 

   async function loadCitas() {
       try {
           const response = await fetch('../php/getAppointment.php'); 
           if(!response.ok){
               throw new Error('Network response was not ok'); 
           }
           citas = await response.json(); 
           drawTable(); 
       } catch(error) {
           console.error('Error fetching citas:', error); 
       }
   }

   function drawTable(){
       const tbody = document.getElementById("printAppointment");
       tbody.innerHTML = ''; // Limpiar contenido anterior 

       citas.forEach(cita => {
           const tr = document.createElement("tr"); 
           tr.innerHTML = `
               <td>${cita.id_cita}</td>
               <td>${cita.name}</td>
               <td>${cita.lastname}</td>
               <td>${cita.phoneNumber}</td>
               <td>${cita.name_especialidad}</td>
               <td>${cita.hora_cita}</td>
               <td>${cita.fecha_cita}</td>
               <td style="text-align: center;">
                   <a href="../html/editCitas.html?id=${cita.id_cita}"><img src="../images/edit_4511659.png" style="height: 20px; width: 30px;"></a></td>`;

           tbody.appendChild(tr); 
       }); 
   }
});
