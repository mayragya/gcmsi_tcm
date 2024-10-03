//Este archivo es loadPacientes.js

document.addEventListener('DOMContentLoaded', function(){
    let liCitas = document.getElementById('pacienteFun');
    liCitas.addEventListener("click", async function(e){
       await loadPacientes();
    });
   var citas = []; 

   async function loadPacientes() {
       try {
           const response = await fetch('../php/getPatient.php'); 
           if(!response.ok){
               throw new Error('Network response was not ok'); 
           }
           pacientes = await response.json(); 
           drawTablePatient(); 
       } catch(error) {
           console.error('Error fetching pacientes:', error); 
       }
   }

   function drawTablePatient(){
       const tbody = document.getElementById("printPatient");
       tbody.innerHTML = ''; // Limpiar contenido anterior 

       pacientes.forEach(paciente => {
           const tr = document.createElement("tr"); 
           tr.innerHTML = `
               <td>${paciente.id_paciente}</td>
               <td>${paciente.name}</td>
               <td>${paciente.lastname}</td>
               <td>${paciente.phoneNumber}</td>
               <td>${paciente.emergencyNumber}</td>
               <td style="text-align: center;">
             <a href="../html/editPaciente.html?id=${paciente.id_paciente}"><img src="../images/edit_4511659.png" style="height: 20px; width: 30px;"></a></td>`;

           tbody.appendChild(tr); 
       }); 
   }
});
