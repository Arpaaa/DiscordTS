import { eventInterface } from '../typings/types';
import { Client, Events } from 'discord.js';
import GatewayIntentsList from '../config/GatewayIntentsList';
import logger from '../utils/logger';
import chalk from 'chalk';

const readyEvent: eventInterface = {
    name: Events.ClientReady,
    once: true,
    execute(client: Client): void {
        logger.info(
            `Bot was Ready...\n     ${chalk.greenBright(
                `Bot Information : \nBot Tag    : ${
                    client.user?.tag
                } \nBot Id     : ${
                    client.user?.id
                } \n    Intents List :\n${GatewayIntentsList.join(', ')}`
            )}`,
            '\n',
            '\n'
        );
    },
};

module.exports = readyEvent;
