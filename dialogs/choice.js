const messageConfig = require('../config').message;
const messageUtils = require('../utils/messages');

module.exports = [
    (session) => {
        const choicesMsg = 'Prompting multiple choices, please select one of the options';
        const choiceArray = ['Button 1', 'Button 2', 'Button 3', 'Button 4'];
        messageUtils.choicePrompt(session, choicesMsg, choiceArray, messageConfig.default_delay);
    },
    (session, args) => {
        messageUtils.messageSend(session, `Your choice was ${args.response.index + 1}`, messageConfig.default_delay);
        session.endDialog();
    }
];
