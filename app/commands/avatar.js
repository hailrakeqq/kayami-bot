const Discord = module.require("discord.js");
const fs = require("fs")
const { MessageEmbed } = require('discord.js');
module.exports = {
    name: "avatar",
    desc: "Команда для вывода авки пользователя",
    use: "avatar",
    
 async execute (client,message,args,data) {

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


}