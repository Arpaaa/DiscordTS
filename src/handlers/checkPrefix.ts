import { Message } from 'discord.js';
import { PREFIXES } from '../config/config.json';

const checkPrefix = (msg: Message): boolean => {
    let result: boolean = false;
    for (const prefix of PREFIXES) {
        if (msg.content.startsWith(prefix)) {
            result = true;
            break;
        } else continue;
    }
    return result;
};

export default checkPrefix;
