import { CommandInteraction } from 'discord.js';
import { slashCommands } from '../handlers/slashCommandHandler';
import logger from '../utils/logger';

const chatInputCommand = (interaction: CommandInteraction) => {
    const command = slashCommands.get(interaction.commandName);

    if (!command) {
        logger.warn(
            `User ${interaction.user.tag} ran ${interaction.commandName} but the command is not found`
        );
        return;
    }
    logger.userChat(interaction.user.tag, `/${interaction.commandName}`);

    try {
        command.execute(interaction);
    } catch (error) {
        logger.error(error);
        interaction.reply({
            content:
                'Sesuatu ada yang salah. jika kamu menemukan ini terus menerus harap hubungi Developer',
            ephemeral: true,
        });
    }
};

export default chatInputCommand;
