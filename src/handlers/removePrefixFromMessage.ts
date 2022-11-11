import { Message } from 'discord.js';
import { PREFIXES } from '../config/config.json';

const removePrefixFromMessage = (message: Message): string => {
    let result: string = '';
    for (const prefix of PREFIXES) {
        if (message.content.startsWith(prefix)) {
            result = message.content.slice(prefix.length);
            break;
        }
    }
    return result;
};

export default removePrefixFromMessage;
