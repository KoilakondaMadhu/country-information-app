// Get references to HTML elements
const countryInfo = document.querySelector('.country-info');

// Function to fetch country data
const fetchCountryData = async () => {
  try {
    // Make an API request to get country data
    const response = await fetch('https://restcountries.com/v3.1/all');
    if (response.ok) {
      const data = await response.json();
      
      // Randomly select a country from the data
      const randomIndex = Math.floor(Math.random() * data.length);
      const randomCountry = data[randomIndex];

      // Update the HTML with country information
      countryInfo.innerHTML = `
        <h2>${randomCountry.name.common}</h2>
        <p>Capital: ${randomCountry.capital[0]}</p>
        <p>Region: ${randomCountry.region}</p>
        <p>Population: ${randomCountry.population}</p>
        <img src="${randomCountry.flags.svg}" alt="${randomCountry.name.common} Flag">
      `;
    } else {
      countryInfo.innerHTML = '<p>Failed to fetch country data.</p>';
    }
  } catch (error) {
    console.error('Error fetching country data:', error);
    countryInfo.innerHTML = '<p>An error occurred while fetching country data.</p>';
  }
};

// Add an event listener to fetch country data when the page loads
window.addEventListener('load', fetchCountryData);
