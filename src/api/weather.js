import axios from "axios";

const API_KEY=import.meta.env.VITE_OPENWEATHER_API_KEY

export const fetchWeatherbyCoords=async(lat,len)=>{
    const res = await axios.get('https://api.openweathermap.org/data/2.5/weather',{
        params: {
            lat,
            len,
            units:'matric',
            lang:'kr',
            appid: API_KEY
        }
    })

    return res.data
}