const restify = require('restify');
const botBuilder = require('botbuilder');
const botBuilderAzure = require('botbuilder-azure');
const config = require('./config');
const middleware = require('./utils/middleware');

/**
 * Setup Restify server
 */
let server = restify.createServer();
// Configure port
server.listen(config.server.port);
// Create chat connector for communicating with the Bot Framework Service
//TODO #02: Register the bot to obtain the appId and appPassword for your bot. Set these in your environment variables.
let connector = new botBuilder.ChatConnector({
    appId: config.app.id,
    appPassword: config.app.password
});
// Configure end point for messages
server.post(config.server.end_point, connector.listen());

/**
 * Main Conversation
 */
let bot = new botBuilder.UniversalBot(connector, [
    (session) => {
        switch (session.message.text.toLowerCase()) {
            case 'hero':
            case 'herocard':
            case 'hero card':
                session.beginDialog('heroCard');
                break;
            case 'button':
            case 'buttons':
                session.beginDialog('choice');
                break;
            case 'suggestion':
            case 'suggestions':
                session.beginDialog('suggestions');
                break;
            case 'multi':
                session.beginDialog('multi');
                break;
            default:
                session.send(`You said: *${session.message.text}*.`);
        }
    },
    (session) => {
        session.endConversation();
    }
]);

/**
 * Actions on conversationUpdate.
 * Used to trigger dialog when user is added
 */
bot.on('conversationUpdate', (activity) => {
    if (activity.membersAdded && typeof (activity.membersAdded[0].name) !== 'undefined') {
        // Ignore when bot is added
        if (activity.membersAdded[0].name !== 'Bot') {
            bot.beginDialog(activity.address, 'userJoins');
        }
    }
});

/**
 * References to dialogs
 */
bot.dialog('heroCard', require('./dialogs/heroCard'));
bot.dialog('choice', require('./dialogs/choice'));
bot.dialog('suggestions', require('./dialogs/suggestions'));
bot.dialog('multi', require('./dialogs/multi'));
bot.dialog('userJoins', require('./dialogs/userJoins'));

/**
 * Middleware listener, add here global functions,  loggers, etc.
 * either on a send <outgoing> or receive <incoming> event or after receive with botbuilder on the session.
 * https://docs.microsoft.com/en-us/azure/bot-service/nodejs/bot-builder-nodejs-intercept-messages?view=azure-bot-service-3.0
 */
bot.use({
    // Comes into botbuilder if it is a message received. It will be assigned to the correct session
    botbuilder: (session, next) => {
        middleware.handleIncomingMessage(session, next);
    },
    // Comes into receive if it is any event received. It will NOT be assigned to a session
    receive: (event, next) => {
        middleware.handleIncomingEvent(event, next);
    },
    // Comes into send if it is any event being send
    send: (event, next) => {
        middleware.handleOutgoingEvent(event, next);
    }
});

/**
 * Configure and set state storage in a State DB
 * https://docs.microsoft.com/en-us/azure/bot-service/nodejs/bot-builder-nodejs-state-azure-cosmosdb?view=azure-bot-service-3.0
 * TODO #01: Setup and configure the state database. Set the config in the environment variables.
 */
    const databaseOptions = {
        host: config.stateDataBase.db_host,
        masterKey: config.stateDataBase.db_master_key,
        database: config.stateDataBase.db_name,
        collection: config.stateDataBase.db_collection
    };
    const databaseClient = new botBuilderAzure.DocumentDbClient(databaseOptions);
    const botStorage = new botBuilderAzure.AzureBotStorage({ gzipData: false }, databaseClient);
if(!config.server.local_dev) {
    bot.set('storage', botStorage);
}
