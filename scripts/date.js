document.addEventListener('DOMContentLoaded', () => {
  // Copyright year
  document.getElementById('year').textContent = new Date().getFullYear();

  // Last modified
  document.getElementById('lastModified').textContent = `Last Modification: ${document.lastModified}`;
});