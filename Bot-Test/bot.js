const Discord = require("discord.js");
const bot = new Discord.Client();

bot.on("ready", () => {
  console.log("Runnin...");

  const { GuildMemberManagement } = require("./scripts/GuildMemberManagement");
  const guildMemberManagement = new GuildMemberManagement(bot);
  // start users management //
  guildMemberManagement.guildMemberIn();
  guildMemberManagement.guildMemberOut();
  // end users management //

  const { ManageMessages } = require("./scripts/ManageMessages");
  const manageMessages = new ManageMessages(bot);
  // start messages management //
  manageMessages.manageMessages();
  // end messages management //

  const { CommandsManagement } = require("./scripts/CommandsManagement");
  const commandsManagement = new CommandsManagement(bot);
  // start commands management //
  commandsManagement.activeCommands();
  // end commands  management //

  const { Rss } = require("./scripts/Rss");
  const rss = new Rss(bot);
  // start rss  management //
  rss.getTwitterFlux();
  rss.getYoutubeFlux();
  // end  rss  management //
});
const { VARIABLES } = require('./data/variables')
// init bot
bot.login(VARIABLES.bot_token);
