const {MessageEmbed} = require("discord.js");
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const config = require('../../config.json')
module.exports = {
    name: "pat",
    desc: "Команда для того что бы погладить кого то",
    use: "pat <@user>",
    async execute (client,message,args,data)  {
        let mbr = message.mentions.members.first() || message.member;
        if(args[1] = '' || mbr.id == message.author.id){
            message.reply('Ошибка, нужно тегнуть кого погладить') 
        } else {
        let res = fetch('https://some-random-api.ml/animu/pat')
        .then(res => res.json()).then(json => {
            const embed = new MessageEmbed()
                .setColor(config.color)
                .setTitle(`${message.member.user.username} погладил ${mbr.user.username}  ^-^`)
                .setImage(json.link) 
            message.channel.send({ embeds: [embed]});
        });
    }
    }
}