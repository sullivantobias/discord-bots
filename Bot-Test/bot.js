const Discord = require('discord.js');
const bot = new Discord.Client();

bot.on('ready', () => {
  console.log("On...")
});

bot.on('guildMemberAdd', member => {
  const channel = member.guild.channels.find(ch => ch.name === 'hello');
  if (!channel) return;
  channel.send(`Welcome to the server, ${member}`);
});

bot.login(process.env.BOT_TOKEN);