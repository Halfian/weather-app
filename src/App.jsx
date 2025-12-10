import { useState, useEffect } from 'react'
import { fetchWeather } from './api/weather'

function App() {
  const [city, setCity] = useState("");
  const [cities, setCities] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("cities")) || [];
    setCities(saved);
  }, []);  

  const handleSearch = async () => {
    try {
      const data = await fetchWeather(city);
      const newCities = [...cities, data];
      setCities(newCities);
      localStorage.setItem("cities", JSON.stringify(newCities));
      setCity("");
    } catch (err) {
      alert(err.message);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <>
      <div className="weather-app-container">
        <h1>🌦️ Weather App Dashboard</h1>
        <p>Beginner small project using React</p>
        <input 
          className="city"
          type="text" 
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city"
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleSearch}>Add city</button>
        <input
        type="text"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Filter cities" 
        />

        <div style={{ display: "flex", flexWrap: "wrap", gap: "15px", marginTop: "20px" }}>
          {cities
            .filter(c => c.name.toLowerCase().includes(filter.toLowerCase()))
            .map((c, i) => (
            <WeatherCard key={i} data={c} />
          ))}
        </div>
      </div>
    </>
  );
}

function WeatherCard({ data }) {
  const temp = data.main.temp;
  const badge = temp > 30 ? "Hot 🔥" : temp < 10 ? "Cold ❄️" : "Mild 🌤️";

  return (
    <div className="weather-card">
      <h2>{data.name}</h2>
      <p>{badge}</p>
      <p><strong>Temp: {temp} °C</strong></p>
      <p>Wind speed: {data.wind.speed} m/s</p>
      <p>Description: {data.weather[0].description}</p>
    </div>
  )
}

export default App
