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