const { MessageEmbed } = require("discord.js");
const { Permissions } = require('discord.js');
module.exports = {
    name: "kick",
    desc: "кик пользователя",
    use: "kick <@user> <Причина>",
    category: ":shield: Модерация",
    userPermissions: "KICK_MEMBERS",
    async execute(message, client, args) {
        let target = message.mentions.members.first()
        let reason = args.slice(1).join(" ")
        const tEmbed = new MessageEmbed()
            .setColor('GREEN')
            .addFields([
                {
                    name: `Команда: ${this.desc}`,
                    value: `Пользователя ${target.user} кикнули, причина: \`${reason}\``,
                    inline: false
                }])


        const fEmbed = new MessageEmbed()
            .setColor('RED')
            .setTitle(`Ты не можешь выгнать этого пользователя`)
        const targetSendEmbed = new MessageEmbed().setColor("PURPLE").setDescription(`Тебя выгнали из сервера ${message.guild.name}\nпричина: \`${reason}\``)

        if (!target || target.id === message.member.id) {
            return message.reply({ embeds: [new MessageEmbed().setColor("RED").setDescription(`**Ошибка**, вы не выбрали кого хотите кикнуть`)] }).then(msg => {
                message.delete()
                setTimeout(() => msg.delete(), 3000)
            })
        } else {
            if (!target.kickable) {
                await message.reply({ embeds: [fEmbed] }).then(msg => {
                    message.delete()
                    setTimeout(() => msg.delete(), 5000)
                })
                return
            }
            if (target.permissions.has([Permissions.FLAGS.KICK_MEMBERS, Permissions.FLAGS.BAN_MEMBERS, Permissions.FLAGS.ADMINISTRATOR]))
                return message.reply({ embeds: [fEmbed] }).then(msg => {
                    message.delete()
                    setTimeout(() => msg.delete(), 5000)
                })
            await target.send({ embeds: [targetSendEmbed] }).catch(console.error)

            target.kick({ reason })

            message.reply({ embeds: [tEmbed] })
        }
    }
}
