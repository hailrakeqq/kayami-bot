const Discord = module.require("discord.js");
const fs = require("fs")
const { MessageEmbed } = require('discord.js');

module.exports.run = async (client,message,args,prefix) => {

    const logChannel = client.channels.cache.get('957691844437889134') 
    || client.channels.fetch('957691844437889134');

    let mb = message.mentions.members.first() || message.member; 
    let color = mb.displayHexColor; 
    let embed = new Discord.MessageEmbed()
    .setImage(mb.displayAvatarURL({dynamic: true ,  size: 4096})) 
    .setColor(color) 
    .setFooter("Аватар пользователя " + mb.user.tag);
    
    logChannel.send({ embeds: [embed] }); 
}

module.exports.help = {
    name: "avatar",
    description: "Команда для вывода авки пользователя"
    
};