import dedent from 'dedent';
import chalk from 'chalk';
import { WEATHER_ICON_TO_EMOJI_MAP } from './storage.service.js';

const logHelp = () => {
    console.info(
        dedent`
            ${chalk.bgCyan('HELP')}
            -h: print HELP
            -s [CITY]: set city
            -t [API_KEY]: set token
        `
    )
}
const logError = (error) => {
    console.info(`${chalk.bgRed('ERROR:')} ${error}`)
}
const logSuccess = (message) => {
    console.info(`${chalk.bgGreen('SUCCESS:')} ${message}`)
}

const printWeather = (res) => {
    console.log(
        dedent`
            ${chalk.bgYellow(' WEATHER ')} Погода в городе ${res.name}
            ${WEATHER_ICON_TO_EMOJI_MAP[res.weather[0].icon.slice(0, -1)]}  ${res.weather[0].description}
            Температура: ${res.main.temp} (ощущается как ${res.main.feels_like})
            Влажность: ${res.main.humidity}%
            Скорость ветра: ${res.wind.speed}
        `
    );
}

export { logError, logSuccess, logHelp, printWeather }