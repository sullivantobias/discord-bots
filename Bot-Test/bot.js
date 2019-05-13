const Discord = require("discord.js");
const bot = new Discord.Client();

bot.on("ready", () => {
  console.log("Runnin...");

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

  createInvite.activeCommands();


  const { Rss } = require("./scripts/Rss");
  const fluxRss = new Rss(bot);

  fluxRss.getFlux()

});

bot.login(process.env.BOT_TOKEN || "NTczNTMwNTE5NjMxOTUzOTIx.XNnhtA.cOcgDT93Gjj5f6cF092ZEXMvRt8");
