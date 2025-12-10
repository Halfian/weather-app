const API_KEY = "3031c3f885d5846159486bd3771c3671";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

export async function fetchWeather(city) {
    const response = await fetch(`${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`);
    if (!response.ok) throw new Error("City not found");
    return response.json();
}