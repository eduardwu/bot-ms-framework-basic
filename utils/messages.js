const builder = require('botbuilder');

/**
 * Generic function which sends a message
 * @param {Session} session Conversation object
 * @param {TextOrMessageType} msg Send to user, can be builder message objects or string
 * @param {Number} msgDelay delay of message in ms
 */
exports.messageSend = function(session, msg, msgDelay) {
    session.sendTyping();
    return new Promise(
        (resolve) => {
            setTimeout(
                () => {
                    session.send(msg);
                    resolve();
                },
                msgDelay
            );
        });

};

/**
 * Generic function which sends a message prompting for answer
 * @param {Session} session Conversation object
 * @param {TextOrMessageType} msg Send to user, can be builder message objects or string
 * @param {Number} msgDelay delay of message in ms
 */
exports.messagePrompt = function(session, msg, msgDelay) {
    session.sendTyping();
    return new Promise(
        (resolve) => {
            setTimeout(
                () => {
                    builder.Prompts.text(session, msg);
                    resolve();
                },
                msgDelay
            );
        });
};

/**
 * Generic function which sends a message with choice options
 * @param {Session} session Conversation object
 * @param {TextOrMessageType} msg Send to user, can be builder message objects or string
 * @param {String} items List of items to show, should be separated by '|'
 * @param {Number} msgDelay delay of message in ms
 */
exports.choicePrompt = function(session, msg, items, msgDelay) {
    session.sendTyping();
    return new Promise(
        (resolve) => {
            setTimeout(
                () => {
                    builder.Prompts.choice(session, msg, items, { listStyle: builder.ListStyle.button });
                    resolve();
                },
                msgDelay
            )
        });
};

/**
 * Generic function to create builder message prompts with suggested actions
 * @param {Session} session Conversation object
 * @param {String} text The message accompanying the buttons
 * @param {String[]} suggestions List of suggestions to be shown
 * @returns {Message} Constructed builder message with suggestions
 */
exports.suggestedAnswer = function(session, text, suggestions) {
    let arr = [];
    suggestions.forEach((el) => {
        arr.push(builder.CardAction.imBack(session, el, el));
    });
    return new builder.Message(session)
        .text(text)
        .suggestedActions(builder.SuggestedActions.create(session, arr));
};

/**
 * Generic function to create closed (Yes/No) builder message prompts with buttons
 * @param {Session} session Conversation Object
 * @param {String} text The message accompanying the buttons
 * @returns {Message} Constructed builder message with 'Yes' and 'No' buttons
 */
exports.closedQuestionButtons = (session, text, msgDelay) => {
    const replyItems = 'Yes|No';
    return exports.choicePrompt(session, text, replyItems, msgDelay);
};
