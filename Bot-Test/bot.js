const Discord = require('discord.js');
const bot = new Discord.Client();

bot.on('ready',  () => {
  console.log("Je suis connecté !")
});

bot.on('message', message => {
  if (message.content === 'ping') {
    message.reply('pong !')
  }
});

bot.login('NTczNDE2MjA1NTMzMTg0MDAw.XMr3OA.eGKl5HclYm2VPPjIeL3qTzaWeAY');