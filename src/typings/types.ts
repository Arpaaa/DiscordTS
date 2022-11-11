import {
    Client,
    CommandInteraction,
    Message,
    PermissionResolvable,
    SlashCommandBuilder,
} from 'discord.js';

export interface commandInterface {
    name: string;
    description?: string;
    aliases?: Array<string>;
    permissions?: Array<PermissionResolvable>;
    execute: (client: Client, message: Message, ...args: any) => void;
    cooldown?: number;
}

export interface slashCommandInterface {
    data: SlashCommandBuilder | any;
    isGlobalCommand?: boolean | true;
    execute(interaction: CommandInteraction): void;
}

export interface eventInterface {
    name: string;
    once?: Boolean | false;
    execute(client: Client, ...args: any): void;
}

export interface commandCooldownInterface {
    [commandName: string]: {
        [userId: string]: {
            userId: string;
            timeEnd: number;
            timeLeft: number;
        };
    };
}

export interface userCooldownInterface {
    userId: string;
    timeEnd: number;
    timeLeft: number;
}
