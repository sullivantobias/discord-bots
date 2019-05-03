/**
 * @class GuildMemberManagement
 */
class GuildMemberManagement {
  constructor(bot) {
    this.bot = bot
  }

  guildMemberIn() {
    this.bot.on('guildMemberAdd', member => {
      const channel = member.guild.channels.find(ch => ch.name === 'hello');
      if (!channel) return;
      channel.send(`${member}, Welcome to our server ✅`)
    });
  }

  guildMemberOut() {
    this.bot.on('guildMemberRemove', member => {
      const channel = member.guild.channels.find(ch => ch.name === 'hello');
      if (!channel) return;
      channel.send(`${member} decided to leave ❌`)
    });
  }
}

module.exports.GuildMemberManagement = GuildMemberManagement;