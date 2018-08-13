/**
 * Middleware functionality of bot builder SDK.
 * https://docs.microsoft.com/en-us/azure/bot-service/nodejs/bot-builder-nodejs-intercept-messages?view=azure-bot-service-3.0
 */
module.exports = {
    handleIncomingMessage: (session, next) => {
        console.log(`Incoming Message: ${session.message.text}`);
        next();
    },
    handleIncomingEvent: (event, next) => {
        console.log(`Incoming Event Type: ${event.type}`);
        next();
    },
    handleOutgoingEvent: (event, next) => {
        console.log(`Outgoing: ${event.text}`);
        next();
    }
};
