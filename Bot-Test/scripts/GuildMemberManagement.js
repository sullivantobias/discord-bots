// imports
const { CHANNELS } = require('../data/channels')

/**
 * @class GuildMemberManagement
 * @description manage in and out members
 */
class GuildMemberManagement {
  /**
   * @constructor
   * @param {*} bot 
   */
  constructor(bot) {
    this.bot = bot;
  }
  /**
   * @method writeManagement
   * @param {*} member 
   * @param {*} message 
   */
  writeManagement(member, message) {
    // retrieve helloChannel
    const helloChannel = member.guild.channels.find(
      ch => ch.id === CHANNELS.welcome
    );
    // if there is no channel 
    if (!helloChannel) return;

    helloChannel.send(message);
  }
  /**
   * @method guildMemberIn
   */
  guildMemberIn() {
    this.bot.on("guildMemberAdd", member => {
      // give the default role for new user
      const role = member.guild.roles.find("name", "Craqueboule");
      member
        .addRole(role)
        .then(console.log)
        .catch(console.error);

      // say hello to new user
      this.writeManagement(member, `${member}, Welcome to our server ✅`);
    });
  }
  /**
   * @method guildMemberOut
   */
  guildMemberOut() {
    this.bot.on("guildMemberRemove", member => {
      // say farewell to new user //
      this.writeManagement(member, `${member} decided to leave ❌`);
    });
  }
}
//export
module.exports.GuildMemberManagement = GuildMemberManagement;
