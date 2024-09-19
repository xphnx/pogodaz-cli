#! /usr/bin/env node
import { getArgs } from "./helpers/getArgs.js";
import { getWeather } from "./services/api.service.js";
import { logError, logHelp, logSuccess, printWeather } from "./services/log.service.js";
import { saveKeyValue } from "./services/storage.service.js";

const saveToken = async (value) => {
    if (!value.length) {
        return logError('Token should not be empty');
    }

    try {
        await saveKeyValue('token', value);
        logSuccess('Token was saved!')
    } catch (error) {
        logError(error.message);
    }
}

const saveCity = async (value) => {
    if (!value.length) {
        return logError('City should not be empty');
    }

    try {
        await saveKeyValue('city', value);
        logSuccess('City was saved!')
    } catch (error) {
        logError(error.message);
    }
}

const getForcast = async () => {
    try {
        const weather = await getWeather();

        printWeather(weather);
    } catch (error) {
        logError(error.message);
    } 
}

const init = () => {
    const passedArgs = getArgs(process.argv);

    if (passedArgs['-h']) {
        return logHelp();
    }

    if (passedArgs['-s']) {
        return saveCity(passedArgs['-s']);
    }

    if (passedArgs['-t']) {
        return saveToken(passedArgs['-t']);
    }

    getForcast();
}

init();