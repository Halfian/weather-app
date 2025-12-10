import { useState } from 'react'
import { fetchWeather } from './api/weather'

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  const handleSearch = async () => {
    try {
      const data = await fetchWeather(city);
      setWeather(data);
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
      <div style={{ 
        fontFamily: "sans-serif", 
        padding: "20px", 
        marginLeft: "auto", 
        marginRight: "auto", 
        textAlign: "center", 
        backgroundColor: "#05ccdeff", 
        borderRadius: "10px", 
        width: "300px", 
        marginTop: "50px", 
        boxShadow: "5px 4px 10px rgba(0, 0, 0, 0.5)" }}>
        <h1>🌦️ Weather App</h1>
        <p>Beginner small project using React</p>
        <input 
          style={{ marginTop: "20px", padding: "5px", borderRadius: "3px", border: "1px solid #ccc", width: "200px", textAlign: "center" }}
          type="text" 
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city"
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleSearch} style={{padding: "4px", marginLeft: "5px"}}>Search</button>

        {weather && (
          <div style={{
            marginTop: "50px",
            marginLeft: "auto",
            marginRight: "auto",
            padding: "15px",
            border: "1px solid #ccc",
            borderRadius: "10px",
            width: "250px",
            backgroundColor: "#f9f9f9"
          }}>
            <h2>{weather.name}</h2>
            <p>Temp: {weather.main.temp} C</p>
            <p>Wind speed: {weather.wind.speed} km/h</p>
            <p>Description: {weather.weather[0].description}</p>
          </div>
        )}
      </div>
    </>
  );
}

export default App
