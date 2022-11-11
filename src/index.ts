console.clear();

import {
    Client,
    Events,
    GatewayIntentBits,
    Message,
    Partials,
} from 'discord.js';
import logger from './utils/logger';

import { TOKEN } from './config/config.json';
import GatewayIntentsList from './config/GatewayIntentsList';
import eventHandlers from './handlers/eventHandlers';

logger.info('Starting this application, please wait...', '', '\n');
const client: Client = new Client({
    intents: [GatewayIntentsList],
    partials: [Partials.Message, Partials.GuildMember, Partials.GuildMember],
});

eventHandlers(client);

client.login(TOKEN);
