const messageUtils = require('../utils/messages');

module.exports = [
    (session) => {
        const multiMsgArray = [
            'These',
            'Messages',
            'Are',
            'Send',
            'In',
            'Intervals',
            'Of',
            'One',
            'Second'];
        for (let i = 0; i < multiMsgArray.length; i++) {
            messageUtils.messageSend(session, multiMsgArray[i], ((i + 1) * 1000));
        }
        session.endDialog();
    }
];
