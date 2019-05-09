const Discord = require("discord.js");
const bot = new Discord.Client();

bot.on("ready", () => {
  console.log("Runnin...");
});

const { GuildMemberManagement } = require("./scripts/GuildMemberManagement");
const GuildManagement = new GuildMemberManagement(bot);
// start users management //
GuildManagement.guildMemberIn();
GuildManagement.guildMemberOut();
// end users management //

const { ManageMessages } = require("./scripts/ManageMessages");
const ManageMsg = new ManageMessages(bot);

ManageMsg.manageMessages();

bot.login(process.env.BOT_TOKEN);
