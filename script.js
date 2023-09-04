// Replace 'YOUR_API_KEY' with your actual OpenWeatherMap API key
const apiKey = 'YOUR_API_KEY';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

// Get references to HTML elements
const weatherData = document.querySelector('.weather-data');

// Function to fetch weather data
const fetchWeatherData = async () => {
  try {
    // Use the Geolocation API to get the user's current location
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;

        // Make an API request to get weather data using the user's location
        const response = await fetch(
          `${apiUrl}?lat=${latitude}&lon=${longitude}&appid=${apiKey}`
        );

        if (response.ok) {
          const data = await response.json();

          // Extract relevant weather information
          const city = data.name;
          const temperature = data.main.temp;
          const description = data.weather[0].description;

          // Update the HTML with weather information
          weatherData.innerHTML = `
            <h2>Weather in ${city}</h2>
            <p>Temperature: ${temperature}°C</p>
            <p>Description: ${description}</p>
          `;
        } else {
          weatherData.innerHTML = '<p>Failed to fetch weather data.</p>';
        }
      });
    } else {
      weatherData.innerHTML = '<p>Geolocation is not supported by your browser.</p>';
    }
  } catch (error) {
    console.error('Error fetching weather data:', error);
    weatherData.innerHTML = '<p>An error occurred while fetching weather data.</p>';
  }
};

// Call the fetchWeatherData function when the page loads
window.addEventListener('load', fetchWeatherData);
