// js/products.js
// Módulo responsable de cargar products.json y renderizar tarjetas de producto.
// Exporta initProductsPage() para que la página lo invoque.

/////////////////////// UTIL: escapar texto (previene XSS al usar innerHTML) ///////////////////
function escapeHtml(str = '') {
  const div = document.createElement('div');
  div.textContent = String(str);
  return div.innerHTML;
}

/////////////////////// FETCH (async + try...catch) ///////////////////
export async function fetchProducts(path = 'data/products.json') {
  try {
    const res = await fetch(path);
    if (!res.ok) throw new Error(`HTTP ${res.status} - ${res.statusText}`);
    const data = await res.json();
    return data; // array de productos
  } catch (err) {
    console.error('Failed to load products:', err);
    return []; // devolvemos array vacío como fallback
  }
}

/////////////////////// CREAR TARJETA ///////////////////
export function createProductCard(product) {
  // product debe tener: id, name, price, image, description (según tu JSON)
  const card = document.createElement('article');
  card.className = 'product-card';
  // Usamos escapeHtml para proteger texto; usamos loading="lazy" en img
  card.innerHTML = `
    <img src="${escapeHtml(product.image)}" alt="${escapeHtml(product.name)}" loading="lazy">
    <h3>${escapeHtml(product.name)}</h3>
    <p class="product-desc">${escapeHtml(product.description)}</p>
    <p class="price">$${Number(product.price).toFixed(2)}</p>
    <div class="product-actions">
      <button class="view-btn" data-id="${escapeHtml(product.id)}" aria-label="View ${escapeHtml(product.name)}">View More</button>
      <button class="buy-btn" data-id="${escapeHtml(product.id)}" aria-label="Buy ${escapeHtml(product.name)}">Buy</button>
    </div>
  `;
  return card;
}

/////////////////////// RENDER: insertar todos los productos ///////////////////
export async function renderProducts(containerSelector = '.products-container', jsonPath = 'data/products.json') {
  const container = document.querySelector(containerSelector);
  if (!container) {
    console.error(`Container not found: ${containerSelector}`);
    return;
  }

  // Mostrar loader sencillo (opcional)
  container.innerHTML = '<p>Loading products…</p>';

  const products = await fetchProducts(jsonPath);

  // Limpia y renderiza
  container.innerHTML = '';
  if (!products.length) {
    container.innerHTML = '<p>No products available.</p>';
    return;
  }

  // Recorrer y agregar tarjetas
  products.forEach(product => {
    const card = createProductCard(product);
    container.appendChild(card);
  });

  // Delegación de eventos: escucha clicks en botones dentro del container
  container.addEventListener('click', (e) => {
    const viewBtn = e.target.closest('.view-btn');
    if (viewBtn) {
      const id = viewBtn.dataset.id;
      handleViewProduct(id, products);
      return;
    }
    const buyBtn = e.target.closest('.buy-btn');
    if (buyBtn) {
      const id = buyBtn.dataset.id;
      handleBuyProduct(id, products);
      return;
    }
  });
}

/////////////////////// HANDLERS (stubs: los completarás luego) ///////////////////
function handleViewProduct(id, products) {
  const product = products.find(p => String(p.id) === String(id));
  if (!product) return;
  // Por ahora: abrir un alert o modal (a futuro: modal accesible)
  alert(`${product.name}\n\n${product.description}\n\nPrice: $${product.price}`);
}

function handleBuyProduct(id, products) {
  const product = products.find(p => String(p.id) === String(id));
  if (!product) return;
  // Por ahora: simulamos añadir al carrito haciendo console.log
  console.log('Add to cart (simulated):', product);
  // Aquí puedes llamar a storage.js para guardar en localStorage (más adelante)
  // Ejemplo: addToCart(product)
  // y mostrar una confirmación al usuario
  const confirmAdd = confirm(`Add "${product.name}" to cart?`);
  if (confirmAdd) {
    // simple visual feedback
    alert(`${product.name} was added to your cart (simulated).`);
  }
}

/////////////////////// INIT (helper que la página invoca) ///////////////////
export function initProductsPage(containerSelector = '.products-container', jsonPath = 'data/products.json') {
  // Espera a DOMContentLoaded antes de renderizar
  document.addEventListener('DOMContentLoaded', () => {
    renderProducts(containerSelector, jsonPath);
  });
}
