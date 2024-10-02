/*function loadContent(page) {
  fetch(page)
      .then(response => response.text())
      .then(data => {
          document.getElementById('content').innerHTML = data;
      })
      .catch(error => console.log('Hubo un problema al cargar el contenido: ', error));
}*/

var tablaDoctor = fetch('../html/doctores.html'); 
var table = document.getElementById('content'); 
table.appendChild(tablaDoctor); 
  // Funciones para el pop-up
  function openPopup(popupId) {
    document.getElementById(popupId).style.display = 'flex';
  }
  
  // Función para cerrar el pop-up
  function closePopup() {
    const popups = document.querySelectorAll('.popup');
    popups.forEach(popup => {
      popup.style.display = 'none';
    });
  }



function loadContent(files, elementId) { let combinedContent= '';
  Promise.all(files.map(file => fetch(file).then(response => response.text())))
  .then(dataArray =>{
    dataArray.forEach(content => {
      combinedContent += content;
     });
     document.getElementById(elementId).innerHTML= combinedContent;
  })
      .catch(error => console.log('Hubo un problema al cargar el contenido: ', error));
}


function conectarEditar(){
  loadContent(['../html/editCitas.html'], 'contentE');
}


async function loadDoctor() {
  try{
      const response = await fetch('../php/getDoctor.php'); 
      if(!response.ok){
      }
      let data = await response.json(); 
      return data;
  }catch(error){
      console.error('Error fetching doctores:', error); 
      return ({error:'error'});
  }
}

function drawTableDoctor(doctores){
  try {
    const tbody = document.getElementById("printDoctores");
  doctores.forEach(doctor => {
    console.log(doctor);
      let tr = document.createElement("tr"); 
      tr.innerHTML = `<td>${doctor.id_doctor}</td>
                      <td>${doctor.name}</td>
                      <td>${doctor.lastname}</td>
                      <td>${doctor.name_especialidad}</td>
                      <td><a href="../html/editCitas.html?id=${doctor.id_doctor}">
                      <img src="../images/edit_4511659.png" style="height: 20px; width: 30px;"></a></td>`;
      tbody.appendChild(tr); 
      console.log(tbody);
  }); 
  } catch (error) {
    console.log(error);
  }
} 
//cargar información y dubijar la tabla inicial

async function conectarDoctores(){
  loadContent(['../html/doctores.html'], 'content');
  let response = await loadDoctor(); 
  await drawTableDoctor(response);
  console.log(response);
}


async function conectarPaciente(){
  loadContent(['pagina.php','paciente.html'], 'content');
}

async function loadCitas() {
    try{
        const response = await fetch('../php/getAppointment.php'); 
        if(!response.ok){
        }
        let data = await response.json(); 
        return data;
    }catch(error){
        console.error('Error fetching citas:', error); 
        return ({error:'error'});
    }
}

 function drawTable(citas){
    try {
      const tbody = document.getElementById("printAppointment");
    citas.forEach(cita => {
      console.log(cita);
        let tr = document.createElement("tr"); 
        tr.innerHTML = `<td>${cita.id_cita}</td>
                        <td>${cita.name}</td>
                        <td>${cita.lastname}</td>
                        <td>${cita.phoneNumber}</td>
                        <td>${cita.name_especialidad}</td>
                        <td>${cita.hora_cita}</td>
                        <td>${cita.fecha_cita}</td>
                        <td><a href="../html/editCitas.html?id=${cita.id_cita}">
                        <img src="../images/edit_4511659.png" style="height: 20px; width: 30px;"></a></td>`;
        tr.innerHTML = '<a>hola mundo</a>';
        tbody.appendChild(tr); 
        console.log(tbody);
    }); 
    } catch (error) {
      console.log(error);
    }
 } 
 //cargar información y dubijar la tabla inicial




async function conectarCitas(){
  loadContent(['../html/citas.html'], 'content');
  let response = await loadCitas(); 
  await drawTable(response);
  console.log(response);
}
/*
  let activeInput = null;
  // Mostrar teclado cuando se hace clic en un campo de texto
  document.querySelectorAll('input[type="text"], input[type="tel"]').forEach(input => {
      input.addEventListener('focus', function() {
          activeInput = this;
          document.getElementById('virtualKeyboard').style.display = 'block';
      });
  });

  // Insertar caracteres en el campo activo
  function insertCharacter(char) {
      if (activeInput) {
          activeInput.value += char;
      }
  }

  // Borrar el último carácter
  function backspace() {
      if (activeInput) {
          activeInput.value = activeInput.value.slice(0, -1);
      }
  }

  // Ocultar teclado cuando se hace clic fuera del campo de texto
  document.addEventListener('click', function(event) {
      if (!event.target.closest('input[type="text"], input[type="tel"], .keyboard')) {
          document.getElementById('virtualKeyboard').style.display = 'none';
      }
  });
*/

