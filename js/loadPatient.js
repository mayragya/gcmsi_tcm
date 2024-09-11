// console.log('loadPatient.js'); 
// var pacientes = []; 

// async function loadPatient(){
//     try{
//         const response = await fetch('../php/getPatient.php'); 
//         if(!response.ok){
//             throw new Error('Network response was not ok'); 
//            }
//            doctores = await response.json();     
//            drawTable(); 
//     }catch(error){
//         console.error('Error fetching pacientes:', error);
//     }

// }
// function drawTable(){
//     const tbody = document.getElementById("printPatient"); 
//     tbody.innerHTML = ''; 

//     pacientes.forEach(paciente => {
//         const tr = document.createElement("tr"); 
//         tr.innerHTML = `
//         <td>${paciente.id_paciente}</td>
//         <td>${paciente.name}</td>
//         <td>${paciente.lastname}</td>
//         <td>${paciente.phoneNumber}</td>
//         <td>${paciente.emergencyNumber}</td>`;

//         tbody.appendChild(tr); 

//     }); 

// }

// //cargar datos y dibujar tabla inicial
// loadPatient();

