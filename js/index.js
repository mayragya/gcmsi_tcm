function toggleMenu() {
    const menu = document.getElementById('menu');
    menu.style.display = (menu.style.display === 'block') ? 'none' : 'block';
  }
  
  function showTable(tableId) {
    const tableContainers = document.querySelectorAll('.table-container > div');
    tableContainers.forEach(container => {
      container.style.display = 'none';
    });
  
    document.getElementById(tableId + '-container').style.display = 'block';
  }
  
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

  //teclado

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