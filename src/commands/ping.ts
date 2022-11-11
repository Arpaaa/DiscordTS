import { Client, EmbedBuilder, Message } from 'discord.js';
import { commandInterface } from '../typings/types';

const pingCommand: commandInterface = {
    name: 'ping',
    permissions: ['Administrator'],
    cooldown: 2500,
    async execute(
        client: Client,
        message: Message,
        ...args: string[]
    ): Promise<void> {
        const pingms = `${client.ws.ping} ms`;
        const delay = `${Date.now() - message.createdTimestamp} ms`;

        const pingEmbed: EmbedBuilder = new EmbedBuilder()
            .setTitle('PONG!')
            .setColor(Number(delay.substring(-3, -1)) > 100 ? 'Red' : 'Green')
            .setDescription(`ping: ${pingms}\ndelay: ${delay}`);
        message.reply({ embeds: [pingEmbed] });
    },
};

module.exports = pingCommand;
