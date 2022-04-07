const Discord = module.require("discord.js");
const fs = require("fs");

module.exports = {
    name: "ping",
    desc: "testcommand",
    use: 'ping',
    async execute (client,message,args,data)  {
	message.reply('qq')
    }
}
