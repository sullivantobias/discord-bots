/**
 * @class GuildMemberManagement
 */
class GuildMemberManagement {
  constructor(bot) {
    this.bot = bot;
  }

  writeManagement(member, message) {
    const helloChannel = member.guild.channels.find(
      ch => ch.id === "572662974020452378"
    );
    if (!helloChannel) return;
    helloChannel.send(message);
  }

  guildMemberIn() {
    this.bot.on("guildMemberAdd", member => {
      // give the default role for new user //
      const role = member.guild.roles.find("name", "Craqueboule");
      member
        .addRole(role)
        .then(console.log)
        .catch(console.error);

      // say hello to new user //
      this.writeManagement(member, `${member}, Welcome to our server ✅`);
    });
  }

  guildMemberOut() {
    this.bot.on("guildMemberRemove", member => {
      // say farewell to new user //
      this.writeManagement(member, `${member} decided to leave ❌`);
    });
  }
}

module.exports.GuildMemberManagement = GuildMemberManagement;
