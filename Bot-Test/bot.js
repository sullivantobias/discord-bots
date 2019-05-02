const Discord = require('discord.js');
const bot = new Discord.Client();

bot.on('ready', () => {
  console.log("On...")
});

// Create an event listener for messages
client.on('message', message => {
  // If the message is "what is my avatar"
  if (message.content === 'what is my avatar') {
    // Send the user's avatar URL
    message.reply(message.author.avatarURL);
  }

bot.login(process.env.BOT_TOKEN);