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

const { Invite } = require("./scripts/Invite");
const createInvite = new Invite(bot);

createInvite.createInvite();

bot.login(process.env.BOT_TOKEN);
