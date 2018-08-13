const messageConfig = require('../config').message;
const messageUtils = require('../utils/messages');

module.exports = [
    (session) => {
        const suggestText = 'Some suggestions';
        const suggestArray = ['1', '2', '3', '4'];
        const suggestMessage = messageUtils.suggestedAnswer(session, suggestText, suggestArray);
        messageUtils.messagePrompt(session, suggestMessage, messageConfig.default_delay);
    },
    (session, args) => {
        messageUtils.messageSend(session, `Sure, ${args.response} it is.`, messageConfig.default_delay);
        session.endDialog();
    }
];
