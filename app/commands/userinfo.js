const { MessageEmbed } = require("discord.js"),
moment = require('moment');
const config = require('../../config.json')
const prefix = config.prefix
module.exports = {
    name: "userinfo",
    desc: "Команда для получения информации о пользователе",
    use: "userinfo",
    async execute (client,message,args,data)  {
        const logChannel = client.channels.cache.get('957691844437889134') 
        || client.channels.fetch('957691844437889134');
        let mbr = message.mentions.members.first() || message.member;
        let roleCount = await mbr.roles.cache.map(x => "<@&" + x.id + ">").join(" ");
        let joinDate = await moment(mbr.joinedTimestamp).format('MMMM Do YYYY, HH:mm:ss');
        let createDate = await moment(mbr.user.createdTimestamp).format('MMMM Do YYYY, HH:mm:ss');

        let embed = new MessageEmbed()
            .setAuthor({name: mbr.user.tag})
            .setThumbnail(mbr.user.displayAvatarURL({dynamic: true}))
            .addFields([
                {
                    name: `Пользователь`,
                    value: `${mbr.user} [${mbr.user.id}]`,
                    inline: false
                },
                {
                    name: `Создан`,
                    value: createDate,
                    inline: false
                },
                {
                    name: `Присоединился`,
                    value: joinDate,
                    inline: false
                },
                {
                    name: `Роли`,
                    value: roleCount,
                    inline: false
                }]
            )
            .setColor(config.color)
            .setFooter({text:`Используйте ${prefix}userinfo <user> что бы узнать о пользователе больше!` })
        return logChannel.send({ embeds: [embed]})
    }
}
    
