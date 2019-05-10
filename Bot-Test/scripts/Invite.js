/**
 * @class Invite
 */
const command = require("../data/commands");

class Invite {
  constructor(bot) {
    this.bot = bot;
  }

  activeCommands() {
    var options = {
      maxAge: 0
    };

    this.bot.on("message", msg => {
      if (msg.channel.id === "572686187014258689") {
        switch (msg.toString()) {
          case command.help.val:
            msg.channel.send("--------COMMANDS--------");
            for (const cmd in command) {
              msg.channel.send(
                `**command**: ${command[cmd].val} | **desc**: ${
                  command[cmd].desc
                }`
              );
            }
            for (const cmd in command.urls) {
              msg.channel.send(
                `**command**: ${command.urls[cmd].val} | **desc**: ${
                  command.urls[cmd].desc
                }`
              );
            }
            break;
          case command.invite.val:
            // Create an invite to a channel
            msg.channel
              .createInvite(options)
              .then(invite => msg.channel.send("Invitation: " + invite))
              .catch(console.error);
            break;
          default:
            const value = msg.toString().split("-")[1];
            let isExists = false;
            for (let url in command.urls) {
              value === url ? (isExists = true) : (isExists = false);
              if (isExists && msg.toString().startsWith("!url-")) {
                this.getUrl(msg, command.urls[value].url);
              }
            }
            break;
        }
      }
    });
  }
  getUrl(msg, url) {
    msg.channel.send(url);
  }
}

module.exports.Invite = Invite;
