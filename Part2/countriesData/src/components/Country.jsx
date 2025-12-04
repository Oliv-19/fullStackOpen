import { useEffect, useState } from "react"
const api_key = import.meta.env.VITE_OPEN_WEATHER_KEY
const url = 'https://api.openweathermap.org/data/2.5/weather?'

function callWeatherApi(latlng){
    const data = fetch(`${url}lat=${latlng[0]}&lon=${latlng[1]}&appid=${api_key}&units=metric`)
        .then(response => response.json())
        
    return data
}

export default function Country({country}){
    const [weather, setWeather] = useState(null)
    useEffect(()=> {
        callWeatherApi(country.latlng)
        .then(data=> setWeather(data))
    }, [])
    return(
        <div>
            <div>
                <h1>{country.name.common}</h1>
                <p>Capital : {country.capital}</p>
                <p>Area: {country.area} </p>
            </div>
            <div>
                <h1>Languages</h1>
                <ul>
                    {Object.values(country.languages).map(lan=> <li key={lan}>{lan}</li>)}
                </ul>
            </div>
            <img src={country.flags.svg} alt={country.flags.alt} width='300px'/>
            <div>
                <h1>Weather in {country.capital}</h1>
                <p>Temperature {weather?.main.temp} Celcius</p>
                <img src={`https://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png`} alt="" />
                <p>Wind {weather?.wind.speed} m/s</p>

            </div>
        </div>
    )
}