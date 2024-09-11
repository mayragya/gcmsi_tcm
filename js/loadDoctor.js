// console.log('loadDoctor.js'); 
// var doctores = [];

// async function loadDoctores() {
//     try {
//         const response = await fetch('../php/getDoctor.php');
//         if (!response.ok) {
//             throw new Error('Network response was not ok');
//         }
//         doctores = await response.json();
//         drawTable();
//     } catch (error) {
//         console.error('Error fetching doctores:', error);
//     }
// }

// function drawTableDoctor() {
//     const tbody = document.getElementById("printDoctores");
//     tbody.innerHTML = ''; // Limpiar contenido anterior

//     doctores.forEach(doctor => {
//         const tr = document.createElement("tr");
//         tr.innerHTML = `<td>${doctor.id_doctor}</td>
//                         <td>${doctor.name}</td>
//                         <td>${doctor.lastname}</td>
//                         <td>${doctor.name_especialidad}</td>`;
                        
//         tbody.appendChild(tr);
//     });
// }

// // Cargar datos y dibujar la tabla inicial
// loadDoctores();
