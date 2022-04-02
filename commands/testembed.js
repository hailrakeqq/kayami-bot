const Discord = module.require("discord.js");
const { MessageEmbed } = require("discord.js");
const fs = require("fs");

module.exports.run = async (client,message,args,prefix) => {
    const logChannel = client.channels.cache.get('957691844437889134') 
    || client.channels.fetch('957691844437889134');
    const exampleEmbed = new MessageEmbed()
    .setColor('#0099ff')
	.setTitle('Some title')
    .setTimestamp()

    logChannel.send({ embeds: [exampleEmbed] });
}
module.exports.help = {
    name: "testem" 
};