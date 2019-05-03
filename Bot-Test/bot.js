const Discord = require('discord.js');
const bot = new Discord.Client();

bot.on('ready', () => {
  console.log("On...")
});

const {GuildMemberManagement} = require('./scripts/GuildMemberManagement');
const GuildManagement = new GuildMemberManagement(bot);
// start users management //
GuildManagement.guildMemberIn();
GuildManagement.guildMemberOut();
// end users management //

bot.login(process.env.BOT_TOKEN);