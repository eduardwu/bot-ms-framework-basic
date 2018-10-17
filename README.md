# bot-ms-framework-basic
This is a sample project to setup a basic bot in Microsoft Bot Framework V3

## Local Setup
More info see [here](https://github.com/Microsoft/BotFramework-Emulator/wiki/Getting-Started#connect-to-a-bot-running-on-localhost)
* Install the [emulator](https://github.com/Microsoft/BotFramework-Emulator) for local dev
* Get node version 8.11.3
* run `npm install`
* run `npm start`
* start the bot framework emulator
* enter the host `http://localhost:3978/api/messages`
* You can leave the Microsoft App ID, Microsoft App Password and Locale empty for now
* Connect to your local running bot hitting connect

## Deploying
See the `TODO` items
1. [Setup state database](https://docs.microsoft.com/en-us/azure/bot-service/nodejs/bot-builder-nodejs-state-azure-cosmosdb?view=azure-bot-service-3.0)
2. [Register & Configure Bot](https://docs.microsoft.com/en-us/azure/bot-service/bot-service-quickstart-registration?view=azure-bot-service-3.0)
3. Deploy on your platform with the correct environment variables
