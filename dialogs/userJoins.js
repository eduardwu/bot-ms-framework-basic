const messageConfig = require('../config').message;
const messageUtils = require('../utils/messages');

module.exports = [
    (session) => {
        messageUtils.messageSend(session,
            `Hi, did you know botframework supports markdown? Click [here](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) for markdown info.
            \nSay the following to get an example of: \n* Buttons: *buttons* \n* Suggestions: **suggestions** \n* Multiple Messages: _multi_ \n* Hero Card: __hero__`,
            messageConfig.default_delay);
        session.endDialog();
    }
];