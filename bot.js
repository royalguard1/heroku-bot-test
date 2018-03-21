const commando = require('discord.js-commando');
const bot = new commando.Client({
    owner: '196788356229627915'
});

const TOKEN = 'NDI0OTE4ODc0MDAyMjkyNzUw.DZKCbQ.SHXy-hE3tgWcmEz8L7ejhzuz8t8';

bot.registry
    .registerDefaultTypes()
    .registerGroups([
        ['test', 'Test']
    ])
    .registerDefaultGroups()
    .registerDefaultCommands()
    .registerCommandsIn(__dirname + "/commands");

bot.login(process.env.BOT_TOKEN);
