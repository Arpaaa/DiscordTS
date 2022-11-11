import {
    CommandInteraction,
    EmbedBuilder,
    SlashCommandBuilder,
    User,
} from 'discord.js';
import { slashCommandInterface } from '../../typings/types';
import logger from '../../utils/logger';

const avatarCommand: slashCommandInterface = {
    data: new SlashCommandBuilder()
        .setName('avatar')
        .setDescription('Get user avatar')
        .addSubcommand((subcommand) =>
            subcommand
                .setName('user')
                .setDescription('Menampilkan avatar user')
                .addUserOption((options) =>
                    options
                        .setName('user')
                        .setDescription('Pilih user')
                        .setRequired(true)
                )
        ),
    isGlobalCommand: true,
    async execute(interaction: CommandInteraction) {
        const user: User | null = interaction.options.getUser('user');

        if (!user) {
            logger.warn('user data tidak ditemukan');
            return;
        }

        const userAvatar: string | null = user.avatarURL({
            forceStatic: true,
            size: 256,
        });

        const avatarEmbed: EmbedBuilder = new EmbedBuilder()
            .setTitle(`${user.tag} Avatar is...`)
            .setDescription(`[png](${user.avatarURL({ extension: 'png' })})`)
            .setImage(userAvatar)
            .setColor('Blurple')
            .setTimestamp();

        await interaction
            .reply({ embeds: [avatarEmbed] })
            .catch((err) => logger.error(err));
    },
};

module.exports = avatarCommand;
