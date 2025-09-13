// Referencias de elementos
const memberContainer = document.getElementById('members-container');
const gridBtn = document.getElementById('grid-view');
const listBtn = document.getElementById('list-view');
const footerYear = document.getElementById('footer-year');
const lastModified = document.getElementById('last-modified');

// Cargar miembros desde JSON
async function loadMembers() {
  try {
    const res = await fetch('data/members.json');
    const members = await res.json();
    displayMembers(members);
  } catch (error) {
    memberContainer.innerHTML = '<p>Error al cargar miembros.</p>';
  }
}

// Mostrar miembros en la página
function displayMembers(members) {
  memberContainer.innerHTML = ''; // limpiar
  members.forEach(member => {
    // Valores predeterminados si faltan
    const name = member.name || 'Nombre del Negocio';
    const tagline = member.info || '';
    const address = member.address || '';
    const phone = member.phone || '';
    const website = member.website || '';
    const image = member.image || 'default.png';
    const membership = member.membership || 1;

    // Insignia de membresía
    let badgeClass = 'member';
    let badgeText = 'Miembro';
    if (membership === 2) { badgeClass = 'silver'; badgeText = 'Plata'; }
    if (membership === 3) { badgeClass = 'gold'; badgeText = 'Oro'; }

    memberContainer.innerHTML += `
      <div class="member-card">
        <img src="images/${image}" alt="${name} logo">
        <div class="member-info">
          <div class="member-name">${name}</div>
          <div class="member-tagline">${tagline}</div>
          <span class="badge ${badgeClass}">${badgeText}</span>
          <div class="member-contact">
            ${address ? `<strong>Dirección:</strong> ${address}<br>` : ''}
            ${phone ? `<strong>Teléfono:</strong> ${phone}<br>` : ''}
            ${website ? `<strong>Sitio web:</strong> <span class="member-url"><a href="${website}" target="_blank">${website}</a></span><br>` : ''}
          </div>
        </div>
      </div>
    `;
  });
}

// Toggle vista Grid/List
gridBtn.addEventListener('click', () => {
  memberContainer.classList.add('grid-view');
  memberContainer.classList.remove('list-view');
  gridBtn.classList.add('active');
  listBtn.classList.remove('active');
});

listBtn.addEventListener('click', () => {
  memberContainer.classList.add('list-view');
  memberContainer.classList.remove('grid-view');
  listBtn.classList.add('active');
  gridBtn.classList.remove('active');
});

// Mostrar año y última modificación
footerYear.textContent = new Date().getFullYear();
lastModified.textContent = document.lastModified;

// Inicializar
loadMembers();

// Mobile menu toggle
const menuToggle = document.getElementById('menu-toggle');
const navList = document.querySelector('.nav-list');

menuToggle.addEventListener('click', () => {
  navList.classList.toggle('open');
});
