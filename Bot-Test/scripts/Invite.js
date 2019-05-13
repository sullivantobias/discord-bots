/**
 * @class Invite
 */
const command = require("../data/commands");

class Invite {
  constructor(bot) {
    this.bot = bot;
    this.embedCommands = {};
  }

  activeCommands() {
    var options = {
      maxAge: 0
    };

    this.bot.on("message", msg => {
      let desc = '';

      if (msg.channel.id === "572686187014258689") {
        switch (msg.toString()) {
          case command.help.val:
            for (const cmd in command) {
              if (command[cmd].val !== undefined) {
                desc += `**cmd**: ${command[cmd].val} | **desc**: ${command[cmd].desc} \n`
              }
            }

            for (const cmd in command.urls) {
              desc += `**cmd**: ${command.urls[cmd].val} | **desc**: ${command.urls[cmd].desc} \n`
            }

            this.embedCommands = {
              color: 0xCC0000,
              title: '✍️✍️COMMANDS✍️✍️',
              description: desc,
              footer: {
                text: `© Oropo | ${new Date().toLocaleString([], { year: '2-digit', month: '2-digit' })}`,
              },
            }

            msg.channel.send(
              { embed: this.embedCommands }
            );

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
