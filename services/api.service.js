import axios from "axios";
import { getValue } from "./storage.service.js"

const getWeather = async () => {
    const token = await getValue('token');
    const city = await getValue('city');

    if (!token) {
        throw new Error('Token was not found! Please set token.')
    }

    if (!city) {
        throw new Error('City was not found! Please set city.')
    }

    const { data: suggestions } = await axios.get('http://ru.api.openweathermap.org/geo/1.0/direct', {
        params: {
            q: city,
            appid: token,
        }
    });

    if (!suggestions.length) {
        throw new Error('City was not found')
    }

    const { lat, lon } = suggestions?.at(0);

    const { data } = await axios.get('https://ru.api.openweathermap.org/data/2.5/weather', {
        params: {
            lat,
            lon,
            appid: token,
            lang: 'ru',
            units: 'metric',
        }
    });

    return data;
}

export { getWeather };