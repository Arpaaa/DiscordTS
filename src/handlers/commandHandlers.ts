import { Collection } from 'discord.js';
import { commandInterface } from '../typings/types';
import fs from 'fs';
import path from 'path';
import logger from '../utils/logger';
import chalk from 'chalk';

logger.info('Command handler was loaded...', '\n');

// Message Command Section

const commandPath = path.join(__dirname, '..', 'commands');
export const commandCollection: Collection<string, commandInterface> =
    new Collection();

const commandFiles = fs
    .readdirSync(commandPath)
    .filter((f) => f.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(path.join(commandPath, file));
    commandCollection.set(command.name, command);
}
logger.info(
    `${chalk.greenBright(commandCollection.size)} commands was loaded...`
);
logger.info(`There are [ ${chalk.greenBright(commandFiles)} ] commands`);
