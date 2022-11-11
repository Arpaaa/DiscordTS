import { Client } from 'discord.js';
import { eventInterface } from '../typings/types';
import path from 'path';
import fs from 'fs';
import logger from '../utils/logger';
import chalk from 'chalk';

const eventHandlers = (client: Client): void => {
    const eventPath = path.join(__dirname, '..', 'events');
    const eventFiles = fs
        .readdirSync(eventPath)
        .filter((f) => f.endsWith('.js'));

    logger.info(
        `Handling ${chalk.greenBright(
            eventFiles.length
        )} Events File...\n[ ${chalk.greenBright(eventFiles)} ]`
    );

    for (const file of eventFiles) {
        const event: eventInterface = require(path.join(eventPath, file));
        if ('once' in event) {
            client.once(event.name, (...args: any) =>
                event.execute(client, ...args)
            );
        } else {
            client.on(event.name, (...args: any) =>
                event.execute(client, ...args)
            );
        }
    }
};

export default eventHandlers;
