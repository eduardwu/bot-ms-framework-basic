const botBuilder = require('botbuilder');
const messageConfig = require('../config').message;
const messageUtils = require('../utils/messages');

module.exports = [
    (session) => {
        const heroCard = createHeroCard(session);
        const heroMsg = new botBuilder.Message(session).addAttachment(heroCard);
        messageUtils.messageSend(session, heroMsg, messageConfig.default_delay);
        session.endDialog();
    }
];

let createHeroCard = (session) => {
    return new botBuilder.HeroCard(session)
        .title('BotFramework Hero Card')
        .subtitle('Your bots — wherever your users are talking')
        .text('Build and connect intelligent bots to interact with your users naturally wherever they are, from text/sms to Skype, Slack, Office 365 mail and other popular services.')
        .images([
            botBuilder.CardImage.create(session, 'https://sec.ch9.ms/ch9/7ff5/e07cfef0-aa3b-40bb-9baa-7c9ef8ff7ff5/buildreactionbotframework_960.jpg')
        ])
        .buttons([
            botBuilder.CardAction.openUrl(session, 'https://docs.microsoft.com/bot-framework/', 'Get Started')
        ]);
}
