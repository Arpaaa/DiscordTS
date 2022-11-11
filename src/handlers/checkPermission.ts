import { Message, PermissionsBitField } from 'discord.js';
import { commandCollection } from '../handlers/commandHandlers';
import { commandInterface } from '../typings/types';

const checkPermission = (
    message: Message,
    command: commandInterface
): boolean => {
    if (
        message.member?.permissions.has(
            PermissionsBitField.resolve(command.permissions)
        )
    )
        return true;
    return false;
};

export default checkPermission;
