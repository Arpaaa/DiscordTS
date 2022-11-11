import moment from 'moment';
import colors, { Color } from 'colors';
import COLORS from './colors';

const addTimeAndOutpuTypeAfterLineBreak = (
    message: string,
    type: string
): string => {
    return message.replace(
        /[\n]/g,
        `\n[${colors.white(logger.getTime())}] ${type}: `
    );
};
const logger = {
    getTime: (): string => moment(new Date()).format('HH:mm:ss'),
    log: (message: any, beforeText: any = '', afterText: any = ''): void => {
        message = addTimeAndOutpuTypeAfterLineBreak(message, 'LOG');
        console.log(
            `${beforeText}[${logger.getTime()}] LOG: ${message} ${afterText}`
        );
    },
    info: (message: any, beforeText: any = '', afterText: any = ''): void => {
        message = addTimeAndOutpuTypeAfterLineBreak(message, 'INFO');
        console.log(
            COLORS.INFO(
                `${beforeText}[${colors.white(
                    logger.getTime()
                )}] INFO: ${message} ${afterText}`
            )
        );
    },
    warn: (message: any, beforeText: any = '', afterText: any = ''): void => {
        message = addTimeAndOutpuTypeAfterLineBreak(message, 'WARN');
        console.log(
            COLORS.WARN(
                `${beforeText}${__filename}
[${colors.white(logger.getTime())}] WARN: ${message} ${afterText}`
            )
        );
    },
    error: (message: any, beforeText: any = '', afterText: any = ''): void => {
        message = addTimeAndOutpuTypeAfterLineBreak(message, 'ERROR');
        console.log(
            COLORS.ERROR(
                `${beforeText}${__filename} 
[${colors.white(logger.getTime())}] ERROR: ${message} ${afterText}`
            )
        );
    },
    userChat: (
        username: string,
        message: any,
        beforeText: any = '',
        afterText: any = ''
    ): void => {
        message = addTimeAndOutpuTypeAfterLineBreak(message, 'INFO');
        console.log(
            COLORS.CHAT(
                `${beforeText}[${colors.white(
                    logger.getTime()
                )}] ${username}: ${message} ${afterText}`
            )
        );
    },
};

export default logger;
