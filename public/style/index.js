
const userLocation = document.getElementById("userLocation"),
  convertor = document.querySelector(".converter"),
  weatherIcon = document.querySelector(".weatherIcon"),
  temperature = document.querySelector(".temperature"),
  feelsLike = document.querySelector(".feelsLike"),
  description = document.querySelector(".description"),
  date = document.querySelector(".date"),
  locate = document.querySelector(".locate"),
  Hvalue = document.querySelector(".Hvalue"),
  WNvalue = document.querySelector(".WNvalue"),
  SRvalue = document.getElementById("SRvalue"),
  SSvalue = document.getElementById("SSvalue"),
  Cvalue = document.querySelector(".Cvalue"),
  Pvalue = document.querySelector(".Pvalue"),
  UVvalue = document.querySelector(".UVvalue"),
  day1icon = document.querySelector(".day1-icon"),
  day2icon = document.querySelector(".day2-icon"),
  day3icon = document.querySelector(".day3-icon"),
  day4icon = document.querySelector(".day4-icon"),
  day5icon = document.querySelector(".day5-icon");
  


WEATHER_API_ENDPOINT= "https://api.openweathermap.org/data/2.5/weather";
WEATHER_API_DATA = "https://api.openweathermap.org/data/3.0/onecall";
API_KEY = "48432a848a1265b89934538afb14526e";
TOMM_API_KEY= "ikuxNq4HwLK3sjL2hjtWogJrxDykkd5t"
//Function to fetch weather data
async function fetchWeatherData(city) {
  try {
    // Step 1: Fetch city weather data to get coordinates
    const cityResponse = await fetch(`${WEATHER_API_ENDPOINT}?q=${city}&appid=${API_KEY}&units=metric`);
    if (!cityResponse.ok) throw new Error("City not found");
    const cityData = await cityResponse.json();
    const date = new Date(cityData.dt * 1000);
    console.log(date.toLocaleTimeString());
    console.log(cityData);
   // Format the date
 
    const latitude = cityData.coord.lat;
    const longitude = cityData.coord.lon;

    // Step 2: Fetch detailed weather data using coordinates
    let uvData = 1.85; // Default UV Index
    try {
      const uvResponse = await fetch(`${WEATHER_API_DATA}?apikey=${API_KEY}&lat=${latitude}&lon=${longitude}`);
      if (uvResponse.ok) {
        const uvDetails = await uvResponse.json();
        const uvData = uvDetails.data_day.uvindex[0];
        console.log(uvDetails);
      }
    } catch {
      console.log("Failed to fetch detailed weather data. Using default UV Index.");
    }

    // Step 3: Update the UI with both datasets
    updateWeatherUI(cityData, uvData);
  } catch (error) {

    console.error(error.message);
    alert("Failed to fetch weather data. Please try again.");

  }
}
 function formatDate(timestamp) {
  return new Date(timestamp * 1000).toLocaleString("en-US", {
    weekday: "long",   // Full day name (e.g., Wednesday) 
    year: "numeric",   // Full year (e.g., 2023)
    month: "long",     // Full month name (e.g., April)
    day: "numeric",    // Numeric day (e.g., 8)
    hour: "numeric",   // Hour (e.g., 4)
    minute: "numeric", // Minute (e.g., 40) 
    hour12: true       // 12-hour format with AM/PM
  });
}
function formatDate2(timestamp) {
  const options = {
    weekday: "long", // Full weekday name
    day: "numeric",  // Numeric day
    year: "numeric", // Full numeric year
  };

  return new Date(timestamp * 1000).toLocaleDateString("en-US", options);
}

function formatDate2(timestamp, offsetDays = 0) {
  const date = new Date(timestamp * 1000);
  date.setDate(date.getDate() + offsetDays); 
  const options = {
    weekday: "long", 
    day: "numeric",  
    year: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
}

// Function to update the UI
function updateWeatherUI(data, uvData) {
  weatherIcon.innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="Weather Icon">`;
  temperature.innerHTML = `${data.main.temp} &deg;C`;
  feelsLike.innerHTML = `Feels like: ${data.main.feels_like} &deg;C`;
  date.innerHTML = `${formatDate(data.dt)}`;
  description.innerHTML = `<i class="fa-brands fa-cloudversify" <i>  &nbsp; ${data.weather[0].description}`;
  Hvalue.innerHTML = `${data.main.humidity}%`;
  WNvalue.innerHTML = `${data.wind.speed} m/s`;
  Cvalue.innerHTML = `${data.clouds.all}%`;
  Pvalue.innerHTML = `${data.main.pressure} hPa`;
  SSvalue.innerHTML = `${new Date(data.sys.sunset * 1000).toLocaleTimeString()} Sunset`;
  SRvalue.innerHTML = `${new Date(data.sys.sunrise * 1000).toLocaleTimeString()} Sunrise`;
  locate.innerHTML = `${data.name}, ${data.sys.country}`;
  UVvalue.innerHTML = `${uvData}`;

  // Update the 5-day forecast dynamically
  for (let i = 1; i <= 7; i++) {
    const daydate = document.querySelector(`.day${i}-date`);
    const dayicon = document.querySelector(`.day${i}-icon`); 
    const daytemp = document.querySelector(`.day${i}-temp`);
    daytemp.innerHTML = "temperature data not available!"; 

    daydate.innerHTML = formatDate2(data.dt, i); // Increment date for each day
    dayicon.innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="Weather Icon">`; // Example for icons
  }
}

// Event listener for search
document.querySelector(".fa-search").addEventListener("click", () => {
  const city = userLocation.value.trim();
  if (city) fetchWeatherData(city);
});

// Initial default weather data for a specific city
fetchWeatherData("Delhi");
