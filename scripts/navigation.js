document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.getElementById('menu');
  const navMenu = document.getElementById('navMenu');

  menuBtn.addEventListener('click', () => {
    navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
  });

  // Optional: Hide menu on resize if desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) {
      navMenu.style.display = 'flex';
    } else {
      navMenu.style.display = 'none';
    }
  });
});