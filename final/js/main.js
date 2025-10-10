// js/main.js
import { fetchProducts } from './products.js';

document.addEventListener('DOMContentLoaded', async () => {
  const container = document.querySelector('#products-container');
  if (!container) return;

  try {
    const products = await fetchProducts('data/products.json');
    if (!products.length) {
      container.innerHTML = '<p>No products found.</p>';
      return;
    }

    // --- Seleccionar 3 productos aleatorios ---
    const randomProducts = [];
    const usedIndices = new Set();

    while (randomProducts.length < 3 && usedIndices.size < products.length) {
      const randomIndex = Math.floor(Math.random() * products.length);
      if (!usedIndices.has(randomIndex)) {
        usedIndices.add(randomIndex);
        randomProducts.push(products[randomIndex]);
      }
    }

    // --- Renderizar las tarjetas ---
    container.innerHTML = ''; // limpia el contenedor
    randomProducts.forEach(product => {
      const card = document.createElement('article');
      card.className = 'product-card';
      card.innerHTML = `
        <img src="${product.image}" alt="${product.name}" loading="lazy">
        <h3>${product.name}</h3>
        <p class="product-desc">${product.description}</p>
        <p class="price">$${product.price}</p>
        <div class="product-actions">
          <button class="view-btn">View More</button>
          <button class="buy-btn">Buy</button>
        </div>
      `;
      container.appendChild(card);
    });

  } catch (err) {
    console.error('Error loading random products:', err);
    container.innerHTML = '<p>Error loading products.</p>';
  }
});

