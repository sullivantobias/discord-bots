// imports
const frenchWords = require("../data/blacklistfrenchwords");
const englishWords = require("../data/blacklistenglishwords");
const { CHANNELS } = require('../data/channels')

/**
 * @class ManageMessages
 * @description manage messages in channels
 */
class ManageMessages {
  /**
   * @constructor
   * @param {*} bot 
   */
  constructor(bot) {
    this.bot = bot;
  }
  /**
   * @method manageMessages
   */
  manageMessages() {
    this.bot.on("message", message => {
      const blacklistFR = frenchWords;
      const blacklistEN = englishWords;

      this.warningAndLog(message, blacklistFR, "FR");
      this.warningAndLog(message, blacklistEN, "EN");
    });
  }
  /**
   * @method warningAndLog
   * @param {*} message 
   * @param {*} list 
   * @param {*} lang 
   */
  warningAndLog(message, list, lang) {
    // check if it's not a bot
    if (!message.author.bot) {
      list.blacklist.forEach(word => {
        // check if word match with list
        if (
          message
            .toString()
            .toLowerCase()
            .trim()
            .split(" ")
            .includes(word)
        ) {
          // get log channel
          const log = this.bot.channels.find(
            channel => channel.id === CHANNELS.logs
          );
          // warning message
          let warning = `${
            message.author
            } | '${word}' n'est pas autorisé, Attention au language 👿`;
          // check lang (fr by default)
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
// export
module.exports.ManageMessages = ManageMessages;
