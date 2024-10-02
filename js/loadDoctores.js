//este archivo es loadDoctores.js 

document.addEventListener('DOMContentLoaded', function(){
    let liDoctores = document.getElementById('doctorFun');
    liDoctores.addEventListener("click", async function(e) {
        await loadDoctor(); 
    }); 
    var doctores = []; 

    async function loadDoctor(){
        try{
            const response = await fetch('../php/getDoctor.php'); 
            if(!response.ok){
                throw new Error('Network response was not ok');
            }
            doctor = await response.json();
            drawTableDoctor();
        }catch(error){
            console.error('Error fetching doctores:', error); 
        }
    }
    function drawTableDoctor(){
        const tbody = document.getElementById("printDoctores"); 
        //tbody.innerHTML = ''; // Limpiar contenido anterior
        doctores.forEach(doctor => {
            const tr = document.createElement("tr"); 
            tr.innerHTML = `
            <td>${doctor.id_doctor}</td>
            <td>${doctor.name}</td>
            <td>${doctor.lastname}</td>
            <td>${doctor.name_especialidad}</td>
            <td style="text-align: center;">
            <a href="../html/editDoctores.html?id=${doctor.id_doctor}"><img src="../images/edit_4511659.png" style="height: 20px; width: 30px;"></a></td>`;

            tbody.appendChild(tr); 
        }); 
    }
}); 