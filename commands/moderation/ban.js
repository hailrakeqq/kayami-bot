const { MessageEmbed } = require("discord.js");
const { Permissions } = require("discord.js");

module.exports = {
    name: "ban",
    desc: "бан пользователя",
    use: "ban <@user> <Причина>",
    category: ":shield: Модерация",
    userPermissions: "BAN_MEMBERS",
    async execute(message, client, args) {
        let target = message.mentions.members.first()
        let reason = args.slice(1).join(" ")
        const fEmbed = new MessageEmbed()
            .setColor('RED')
            .setTitle(`Ты не можешь выгнать этого пользователя`)
        const tEmbed = new MessageEmbed()
            .setColor('GREEN')
            .addFields([
                {
                    name: `Команда: ${this.desc}`,
                    value: `Пользователя ${target.user} забанили, причина: \`${reason}\``,
                    inline: false
                }])

        const targetSendEmbed = new MessageEmbed().setColor("RED").setDescription(`Тебя забанили на сервере ${message.guild.name}\nпричина: \`${reason}\``)
        if (!target || target.id === message.member.id) {
            return message.reply({ embeds: [new MessageEmbed().setColor("RED").setDescription(`**Ошибка**, вы не выбрали кого хотите забанить`)] }).then(msg => {
                message.delete()
                setTimeout(() => msg.delete(), 3000)
            })
        } else {
            if (!target.bannable) {
                await message.reply({ embeds: [fEmbed] }).then(msg => {
                    message.delete()
                    setTimeout(() => msg.delete(), 5000)
                })
                return
            }

            if (target.permissions.has([Permissions.FLAGS.KICK_MEMBERS, Permissions.FLAGS.BAN_MEMBERS, Permissions.FLAGS.ADMINISTRATOR]))
                await message.reply({ embeds: [fEmbed] }).then(msg => {
                    message.delete()
                    setTimeout(() => msg.delete(), 5000)
                })
            await target.send({ embeds: [targetSendEmbed] }).catch(console.error)
            target.ban({ reason })

            message.reply({ embeds: [tEmbed] })
        }
    }
}
