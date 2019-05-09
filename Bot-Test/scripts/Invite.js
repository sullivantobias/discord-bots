/**
 * @class Invite
 */
const command = require("../data/commands");

class Invite {
    constructor(bot) {
        this.bot = bot
    }

    createInvite() {
        var options = {
            maxAge: 0,
        };

        this.bot.on('message', msg => {
            if (msg.channel.id === '572686187014258689') {
                switch (msg.toString()) {
                    case command.help.val:
                        msg.channel.send('--------COMMANDS--------');
                        for (const cmd in command) {
                            msg.channel.send(`**command**: ${command[cmd].val} | **desc**: ${command[cmd].desc}`)
                        };
                        break
                    case command.invite.val:
                        // Create an invite to a channel
                        msg.channel.createInvite(options)
                            .then(invite => msg.channel.send('Invitation: ' + invite))
                            .catch(console.error);
                        break
                    default:
                        break
                }
            }
        });

    }
}

module.exports.Invite = Invite