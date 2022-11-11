import { CommandInteraction, Events } from 'discord.js';
import { eventInterface } from '../typings/types';
import logger from '../utils/logger';
import chatInputCommand from '../interactionHandlers/chatInputCommand';

const interactionCreate: eventInterface = {
    name: Events.InteractionCreate,
    execute(client, interaction: CommandInteraction) {
        if (interaction.isChatInputCommand()) {
            chatInputCommand(interaction);
        }
    },
};

module.exports = interactionCreate;
