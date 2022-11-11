import { GatewayIntentBits } from 'discord.js';

const GatewayIntentsList: Array<GatewayIntentBits> = [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
];
export default GatewayIntentsList;
