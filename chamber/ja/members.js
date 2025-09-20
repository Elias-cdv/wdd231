// Referencias de elementos
const memberContainer = document.getElementById('members-container');
const gridBtn = document.getElementById('grid-view');
const listBtn = document.getElementById('list-view');
const footerYear = document.getElementById('footer-year');
const lastModified = document.getElementById('last-modified');

// Datos de respaldo en caso de error
const backupMembers = [
  {
    "name": "TechNova Solutions",
    "address": "123 Innovation Dr, Silicon Valley, CA",
    "phone": "(123) 456-7890",
    "website": "https://www.technova.com",
    "image": "logo1.png",
    "membership": 3,
    "info": "Leading provider of AI solutions."
  },
  {
    "name": "GreenLeaf Energy",
    "address": "45 Eco St, Portland, OR",
    "phone": "(234) 567-8901",
    "website": "https://www.greenleafenergy.com",
    "image": "logo2.png",
    "membership": 2,
    "info": "Sustainable energy company."
  },
  {
    "name": "Skyline Architecture",
    "address": "78 Urban Ave, New York, NY",
    "phone": "(345) 678-9012",
    "website": "https://www.skylinearch.com",
    "image": "logo3.png",
    "membership": 1,
    "info": "Modern and eco-friendly buildings."
  }
];

// Cargar miembros desde JSON
async function loadMembers() {
  try {
    const res = await fetch('data/members.json');
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const members = await res.json();
    
    // Verificar si hay miembros
    if (!members || members.length === 0) {
      throw new Error('No members found in JSON');
    }
    
    displayMembers(members);
  } catch (error) {
    console.error('Error loading members:', error);
    // Usar datos de respaldo
    displayMembers(backupMembers);
    memberContainer.innerHTML += '<p class="error-message">Using sample data</p>';
  }
}

// Mostrar miembros en la página
function displayMembers(members) {
  memberContainer.innerHTML = ''; // limpiar
  
  members.forEach(member => {
    // Valores predeterminados si faltan
    const name = member.name || 'Business Name';
    const tagline = member.info || '';
    const address = member.address || '';
    const phone = member.phone || '';
    const website = member.website || '';
    const image = member.image || 'default.png';
    const membership = member.membership || 1;

    // Insignia de membresía
    let badgeClass = 'member';
    let badgeText = 'Member';
    if (membership === 2) { badgeClass = 'silver'; badgeText = 'Silver'; }
    if (membership === 3) { badgeClass = 'gold'; badgeText = 'Gold'; }

    memberContainer.innerHTML += `
      <div class="member-card">
        <img src="images/${image}" alt="${name} logo" onerror="this.src='images/placeholder.png'">
        <div class="member-info">
          <div class="member-name">${name}</div>
          <div class="member-tagline">${tagline}</div>
          <span class="badge ${badgeClass}">${badgeText}</span>
          <div class="member-contact">
            ${address ? `<strong>Address:</strong> ${address}<br>` : ''}
            ${phone ? `<strong>Phone:</strong> ${phone}<br>` : ''}
            ${website ? `<strong>Website:</strong> <span class="member-url"><a href="${website}" target="_blank">${website}</a></span><br>` : ''}
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
  // Guardar preferencia
  localStorage.setItem('viewPreference', 'grid');
});

listBtn.addEventListener('click', () => {
  memberContainer.classList.add('list-view');
  memberContainer.classList.remove('grid-view');
  listBtn.classList.add('active');
  gridBtn.classList.remove('active');
  // Guardar preferencia
  localStorage.setItem('viewPreference', 'list');
});

// Cargar preferencia de vista guardada
function loadViewPreference() {
  const savedView = localStorage.getItem('viewPreference');
  if (savedView === 'list') {
    listBtn.click();
  } else {
    gridBtn.click();
  }
}

// Mostrar año y última modificación
footerYear.textContent = new Date().getFullYear();
lastModified.textContent = document.lastModified;

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
  loadViewPreference();
  loadMembers();
  
  // Mobile menu toggle
  const menuToggle = document.getElementById('menu-toggle');
  const navList = document.querySelector('.nav-list');
  
  if (menuToggle && navList) {
    menuToggle.addEventListener('click', () => {
      navList.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', 
        navList.classList.contains('open') ? 'true' : 'false');
    });
  }
});