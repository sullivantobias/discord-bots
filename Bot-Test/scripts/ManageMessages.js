/**
 * @class ManageMessages
 */
const frenchWords = require("../data/blacklistfrenchwords");
const englishWords = require("../data/blacklistenglishwords");

class ManageMessages {
  constructor(bot) {
    this.bot = bot;
  }

  manageMessages() {
    this.bot.on("message", message => {
      const blacklistFR = frenchWords;
      const blacklistEN = englishWords;

      this.warningAndLog(message, blacklistFR, "FR");
      this.warningAndLog(message, blacklistEN, "EN");
    });
  }
  warningAndLog(message, list, lang) {
    // check if it's not a bot //
    if (!message.author.bot) {
      list.blacklist.forEach(word => {
        if (
          message
            .toString()
            .toLowerCase()
            .trim()
            .split(" ")
            .includes(word)
        ) {
          // get log channel //
          const log = this.bot.channels.find(
            channel => channel.name === "logs"
          );
          // warning message
          let warning = `${
            message.author
          } | '${word}' n'est pas autorisé, Attention au language 👿`;
          // check lang (fr by default) //
          if (lang === "EN")
            warning = `${
              message.author
            } | '${word}' is forbidden , pay attention to your language 👿`;

          message.channel.send(warning);
          // logs //
          log.send(`${message.author} used the word: ${word}`);
        }
      });
    }
  }
}

module.exports.ManageMessages = ManageMessages;
