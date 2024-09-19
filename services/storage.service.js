import { join } from 'path';
import { homedir } from 'os';
import { stat, readFile, writeFile } from 'fs/promises';

const fileName = join(homedir(), 'pogodaz-user-settings.json');

const WEATHER_ICON_TO_EMOJI_MAP = {
      '01': '☀️',
      '02': '🌤',
      '03': '☁️',
      '04': '☁️',
      '09': '🌧',
      '10': '🌦',
      '11': '🌩',
      '13': '❄️',
      '50': '🌫',
  };

const saveKeyValue = async (key, value) => {
    let data = {};
    if (await isExist(fileName)) {
        const fileData = await readFile(fileName);
        data = JSON.parse(fileData);
    }

    data[key] = value;
    await writeFile(fileName, JSON.stringify(data));
}

const getValue = async (key) => {
    if (await isExist(fileName)) {
        const fileData = await readFile(fileName);
        const data = JSON.parse(fileData);

        return data[key];
    }

    return undefined;
}

const isExist = async (filePath) => {
    try {
        await stat(filePath);

        return true;
    } catch {
        return false;
    }
}

export { saveKeyValue, getValue, WEATHER_ICON_TO_EMOJI_MAP };