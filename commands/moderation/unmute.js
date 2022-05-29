const { MessageEmbed } = require("discord.js");
const { Permissions } = require("discord.js");

module.exports = {
    name: "unmute",
    desc: "анмут пользователя",
    use: "unmute <@user>",
    category: ":shield: Модерация",
    userPermissions: "MANAGE_MESSAGES",

    async execute(message, client, args) {
        let target = message.mentions.members.first()
        let role = message.guild.roles.cache.find(role => role.name.toLowerCase() === 'mute')
        const tEmbed = new MessageEmbed()
            .setColor('GREEN')
            .addFields([
                {
                    name: `Команда: ${this.desc}`,
                    value: `Пользователя ${target.user} успешно размьютили`,
                    inline: false
                }])

        const targetSendEmbed = new MessageEmbed().setColor("AQUA").setDescription(`Тебя размьютили на сервере \`${message.guild.name}\` , ты снова можешь писать в текстовых каналах`)
        const failEmbed = new MessageEmbed()
            .setColor('RED')
            .addFields([
                {
                    name: `Команда: ${this.desc}`,
                    value: `Пользователь ${target.user}, не в мьюте`,
                    inline: false
                }])
        if (!target) {
            return message.reply({ embeds: [new MessageEmbed().setColor("RED").setDescription(`**Ошибка**, вы не выбрали кого хотите размьютить`)] }).then(msg => {
                message.delete()
                setTimeout(() => msg.delete(), 3000)
            })
        } else {
            if (target.roles.cache.has(role.id)) {
                await target.roles.remove(role)
                message.reply({ embeds: [tEmbed] })
                target.send({ embeds: [targetSendEmbed] })
                    .catch(console.error)
            } else message.reply({ embeds: [failEmbed] })
        }
    }
}
