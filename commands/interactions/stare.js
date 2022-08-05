const { MessageEmbed } = require("discord.js");
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const config = require('../../config.json')

module.exports = {
    name: "stare",
    desc: "глазеть",
    use: "stare <@user>",
    category: ":people_with_bunny_ears_partying: Взаимодействия",
    aliases: [],

    async execute(message, client, args) {
        const requestType = "stare"
        const url = `https://api.otakugifs.xyz/gif?reaction=${requestType}&format=gif`
        const response = await fetch(url)
            .then(async response => {
                const result = await response.json()
                const gif = await result.url
                const embed = new MessageEmbed()
                    .setColor(config.color)
                    .addFields([
                        {
                            name: `Реакция: ${this.desc}`,
                            value: `${message.member.user} глазеет :3`,
                            inline: false
                        }])
                    .setTimestamp().setFooter({ text: `${message.member.user.tag}` })
                    .setImage(gif)
                message.channel.send({ embeds: [embed] });
            })
    },
    admin: false
}