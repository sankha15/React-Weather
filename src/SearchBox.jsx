import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "./SearchBox.css";
export default function SearchBox({ updateInfo }) {
    const API_URL = "https://api.openweathermap.org/data/2.5/weather";
    const API_KEY = "60fcc08552a184bf25c8a24518979843";
    let [city, setCity] = useState("");
    let [error, setError] = useState(false);
    let getWeatherInfo = async () => {
        try {
            let response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
            let data = await response.json();
            console.log(data);
            let result = {
                city: city,
                temp: data.main.temp,
                tempMin: data.main.temp_min,
                tempMax: data.main.temp_max,
                humidity: data.main.humidity,
                feelsLike: data.main.feels_like,
                weather: data.weather[0].description,
            };
            console.log(result);
            return result;
        }
        catch (err) {
            throw (err);
        }
    };

    let handleChange = (evt) => {
        setCity(evt.target.value);
    };
    let handleSubmit = async (evt) => {
        try{
        evt.preventDefault();
        console.log(city);
        setCity("");
        let newInfo = await getWeatherInfo();
        updateInfo(newInfo);
        }
        catch (err) {
            setError("true");
        }
    };
    return (
        <div className='SearchBox'>
            <form onSubmit={handleSubmit}>
                <TextField id="city" label="City Name" variant="outlined" required value={city} onChange={handleChange} />
                <br />
                <br />
                <Button variant="contained" type='submit'>Search</Button>
                {error && <p style={{ color: "red" }}>Error fetching weather data</p>}
            </form>
        </div>
    );
}