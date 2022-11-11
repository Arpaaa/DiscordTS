import { Client, Events, Message } from 'discord.js';

import logger from '../utils/logger';
import discordCooldown from 'discord-cooldown';

import {
    commandInterface,
    eventInterface,
    userCooldownInterface,
} from '../typings/types';
import { commandCollection } from '../handlers/commandHandlers';
import removePrefixFromMessage from '../handlers/removePrefixFromMessage';
import checkPrefix from '../handlers/checkPrefix';
import checkPermission from '../handlers/checkPermission';

const messageCreate: eventInterface = {
    name: Events.MessageCreate,
    async execute(client: Client, message: Message): Promise<void> {
        if (message.author.bot) return;
        if (!checkPrefix(message)) return;
        message.content = removePrefixFromMessage(message);
        const args: string[] = message.content.trim().split(' ');

        const command: commandInterface | undefined =
            commandCollection.get(args[0]) ||
            commandCollection.find(
                (cmd) => cmd.aliases && command?.aliases?.includes(args[0])
            );
        if (!command) return;
        if (!checkPermission(message, command)) {
            message.reply(
                `Kamu tidak memiliki akses untuk menjalankan command ini.`
            );
            return;
        }
        logger.userChat(message.author.tag, message.content);

        const userDataCooldown: userCooldownInterface =
            discordCooldown.checkUserCooldown(message.author.id, command.name);
        if (userDataCooldown) {
            const reply = await message.reply(
                'Command masih cooldown, tunggu beberapa saat untuk menggunakan command ini lagiii...'
            );
            setTimeout(() => reply.delete(), userDataCooldown.timeLeft);
            return;
        }
        try {
            command.execute(client, message, ...args);
        } catch (err) {
            logger.error(err);
        }
        discordCooldown.addUser(
            message.author.id,
            command.name,
            command.cooldown
        );
    },
};

module.exports = messageCreate;
