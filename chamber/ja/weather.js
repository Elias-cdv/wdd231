const apiKey = "dab1e2987f824d66aa1061d4a3da36d9"; 
const city = "Guayaquil,EC"; 
const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric&lang=en`;

// Icon mapping for weather conditions
const weatherIcons = {
  '01d': '☀️', // clear sky (day)
  '01n': '🌙', // clear sky (night)
  '02d': '⛅', // few clouds (day)
  '02n': '☁️', // few clouds (night)
  '03d': '☁️', // scattered clouds
  '03n': '☁️',
  '04d': '☁️', // broken clouds
  '04n': '☁️',
  '09d': '🌧️', // shower rain
  '09n': '🌧️',
  '10d': '🌦️', // rain (day)
  '10n': '🌧️', // rain (night)
  '11d': '⛈️', // thunderstorm
  '11n': '⛈️',
  '13d': '❄️', // snow
  '13n': '❄️',
  '50d': '🌫️', // mist
  '50n': '🌫️'
};

// Cache para datos meteorológicos
let weatherCache = {
  data: null,
  timestamp: 0
};

// Tiempo de validez del cache (10 minutos)
const CACHE_DURATION = 10 * 60 * 1000;

async function showWeather() {
  const currentTime = Date.now();
  
  // Usar cache si está disponible y es reciente
  if (weatherCache.data && (currentTime - weatherCache.timestamp) < CACHE_DURATION) {
    displayWeatherData(weatherCache.data);
    return;
  }
  
  try {
    const res = await fetch(weatherUrl);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    
    const data = await res.json();
    
    // Guardar en cache
    weatherCache = {
      data: data,
      timestamp: currentTime
    };
    
    displayWeatherData(data);
  } catch(error) {
    console.error("Error fetching weather:", error);
    document.getElementById("current-weather").innerHTML = "<p>Weather data unavailable</p>";
    document.getElementById("forecast").innerHTML = "<p>Forecast unavailable</p>";
  }
}

function displayWeatherData(data) {
  // Current weather
  const current = data.list[0];
  const currentTemp = Math.round(current.main.temp);
  const currentDesc = current.weather[0].description;
  const currentIcon = current.weather[0].icon;
  const humidity = current.main.humidity;

  document.getElementById("temp-actual").textContent = `${currentTemp}°C`;
  document.getElementById("desc-actual").textContent = currentDesc;
  document.getElementById("humidity").textContent = humidity;
  document.getElementById("weather-icon").innerHTML = weatherIcons[currentIcon] || '☀️';

  // 3-day forecast
  const forecastContainer = document.getElementById("forecast");
  forecastContainer.innerHTML = "";
  
  // Get unique days
  const forecastDays = [];
  const uniqueDays = new Set();
  
  for (const item of data.list) {
    const date = new Date(item.dt_txt);
    const day = date.toLocaleDateString('en-US', { weekday: 'long' });
    
    if (!uniqueDays.has(day) && forecastDays.length < 3) {
      uniqueDays.add(day);
      forecastDays.push({
        day: day,
        temp: Math.round(item.main.temp),
        desc: item.weather[0].description,
        icon: item.weather[0].icon
      });
    }
  }

  forecastDays.forEach(day => {
    forecastContainer.innerHTML += `
      <div class="forecast-day">
        <div class="forecast-icon">${weatherIcons[day.icon] || '☀️'}</div>
        <h4>${day.day}</h4>
        <p>${day.temp}°C</p>
        <p class="forecast-desc">${day.desc}</p>
      </div>
    `;
  });
}

async function showSpotlights() {
  try {
    // Try to load from members.json first
    const res = await fetch('data/members.json');
    if (!res.ok) throw new Error('Cannot load members.json');
    
    const allMembers = await res.json();
    
    // Filter only gold or silver members
    const filtered = allMembers.filter(m => m.membership === 3 || m.membership === 2);
    
    if (filtered.length === 0) {
      throw new Error('No gold or silver members found');
    }
    
    // Randomly select 2-3 members
    const spotlight = [];
    const availableMembers = [...filtered]; // Copia para no modificar el original
    
    while (spotlight.length < 2 && availableMembers.length > 0) {
      const index = Math.floor(Math.random() * availableMembers.length);
      spotlight.push(availableMembers.splice(index, 1)[0]);
    }
    
    // Insert into HTML
    const container = document.querySelector(".spotlights-container");
    if (!container) return;
    
    container.innerHTML = "";
    
    spotlight.forEach(m => {
      const levelClass = m.membership === 3 ? "gold" : "silver";
      const levelText = m.membership === 3 ? "Gold" : "Silver";
      
      container.innerHTML += `
        <div class="spotlight-card">
          <img src="images/${m.image}" alt="${m.name} logo" onerror="this.src='images/placeholder.png'">
          <div class="spotlight-info">
            <h3>${m.name}</h3>
            <p>${m.address}</p>
            <p>${m.phone}</p>
            <span class="badge ${levelClass}">${levelText}</span>
            <a href="${m.website}" target="_blank">Visit Website</a>
          </div>
        </div>
      `;
    });

  } catch(error) {
    console.error("Error loading spotlights:", error);
    // Use sample data as fallback
    const sampleMembers = [
      {
        name: "TechNova Solutions",
        address: "123 Innovation Dr",
        phone: "(123) 456-7890",
        website: "https://www.technova.com",
        image: "logo1.png",
        membership: 3
      },
      {
        name: "GreenLeaf Energy",
        address: "45 Eco St",
        phone: "(234) 567-8901",
        website: "https://www.greenleafenergy.com",
        image: "logo2.png",
        membership: 2
      }
    ];
    
    const container = document.querySelector(".spotlights-container");
    if (container) {
      container.innerHTML = "";
      
      sampleMembers.forEach(m => {
        const levelClass = m.membership === 3 ? "gold" : "silver";
        const levelText = m.membership === 3 ? "Gold" : "Silver";
        
        container.innerHTML += `
          <div class="spotlight-card">
            <img src="images/${m.image}" alt="${m.name} logo" onerror="this.src='images/placeholder.png'">
            <div class="spotlight-info">
              <h3>${m.name}</h3>
              <p>${m.address}</p>
              <p>${m.phone}</p>
              <span class="badge ${levelClass}">${levelText}</span>
              <a href="${m.website}" target="_blank">Visit Website</a>
            </div>
          </div>
        `;
      });
    }
  }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
  showWeather();
  showSpotlights();
  
  // Actualizar el clima cada 10 minutos
  setInterval(showWeather, 10 * 60 * 1000);
});