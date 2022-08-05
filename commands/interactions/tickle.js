const { MessageEmbed } = require("discord.js");
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const config = require('../../config.json')

module.exports = {
    name: "tickle",
    desc: "щекотать пользователя",
    use: "tickle <@user>",
    category: ":people_with_bunny_ears_partying: Взаимодействия",
    aliases: [],

    async execute(message, client, args) {
        const requestType = "tickle"
        const url = `https://api.otakugifs.xyz/gif?reaction=${requestType}&format=gif`
        const response = await fetch(url)
            .then(async response => {
                let mb = message.member;
                if (message.mentions.members.size > 0) mb = message.mentions.members.first()
                if (args[1] = '' || mb.id == message.author.id) message.reply('Ошибка, нужно тегнуть c кем хотите взаимодействовать^.^')
                else {
                    const result = await response.json()
                    const gif = await result.url
                    const embed = new MessageEmbed()
                        .setColor(config.color)
                        .addFields([
                            {
                                name: `Реакция: ${this.desc}`,
                                value: `${message.member.user} щекотать пользователя ${mb.user}  (─‿‿─)`,
                                inline: false
                            }])
                        .setTimestamp().setFooter({ text: `${message.member.user.tag}` })
                        .setImage(gif)
                    message.channel.send({ embeds: [embed] });
                }
            })
    },
    admin: false
}