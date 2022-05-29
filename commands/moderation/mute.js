const { MessageEmbed } = require("discord.js");
const { Permissions } = require("discord.js");

module.exports = {
    name: "mute",
    desc: "мут пользователя",
    use: "mute <@user> <Время(в минутах)> <причина>",
    category: ":shield: Модерация",
    userPermissions: "MANAGE_MESSAGES",

    async execute(message, client, args) {
        let target = message.mentions.members.first()
        const time = args[1]
        let reason = args.slice(2).join(" ")
        const fEmbed = new MessageEmbed()
            .setColor('RED')
            .setTitle(`Ты не можешь замьютить этого пользователя`)
        const tEmbed = new MessageEmbed()
            .setColor('GREEN')
            .addFields([
                {
                    name: `Команда: ${this.desc}`,
                    value: `Пользователя ${target.user} замьютили на \`${time} мин\`, причина: \`${reason}\``,
                    inline: false
                }])
        const roleEmbed = new MessageEmbed()
            .setColor('DARKER_GREY')
            .setTitle(`Mute роль не найдена, сейчас она будет создаваться`)
        const wrongTime = new MessageEmbed().setColor("RED").setDescription('Вы некорректно указали время или не указали вовсе')
        const muteEmbed = new MessageEmbed()
            .setColor('RED')
            .addFields([
                {
                    name: `Команда: ${this.desc}`,
                    value: `Пользователь ${target.user}, уже в мьюте`,
                    inline: false
                }])

        const dmEmbed = new MessageEmbed()
            .setColor('RED')
            .setDescription(`Тебя замьютили на сервере ${message.guild.name} на \`${time} мин\`,\nпричина:  \`${reason}\``)
            .setTimestamp()
            .setFooter({ text: `${message.guild.name}` })
        const dmEmbedEnd = new MessageEmbed()
            .setColor('GREEN')
            .setDescription(`Время мута на сервере \`${message.guild.name}\` закончилось, ты снова можешь писать в текстовых каналах`)
            .setTimestamp()
            .setFooter({ text: `${message.guild.name}` })
        if (!target) {
            return message.reply({ embeds: [new MessageEmbed().setColor("RED").setDescription(`**Ошибка**, вы не выбрали кого хотите замьютить`)] }).then(msg => {
                message.delete()
                setTimeout(() => msg.delete(), 3000)
            })
        } else {
            let role = message.guild.roles.cache.find(role => role.name.toLowerCase() === 'mute')

            if (isNaN(time)) return message.reply({ embeds: [wrongTime] }).then(msg => {
                message.delete()
                setTimeout(() => msg.delete(), 3000)
            })
            if (target.permissions.has([Permissions.FLAGS.KICK_MEMBERS, Permissions.FLAGS.BAN_MEMBERS, Permissions.FLAGS.MANAGE_MESSAGES]))
                await message.reply({ embeds: [fEmbed], ephemeral: true }).then(msg => {
                    message.delete()
                    setTimeout(() => msg.delete(), 5000)
                })
            if (!role) {
                await message.reply({ embeds: [roleEmbed] })
                const muterole = await message.guild.roles.create({ name: 'mute', permissions: [] })
                await message.channel.permissionOverwrites.create(muterole, {
                    SEND_MESSAGES: false,
                    ADD_REACTIONS: false
                })


                const role2 = message.guild.roles.cache.get(muterole.id)
                if (target.roles.cache.has(role2.id)) message.reply({ embeds: [muteEmbed] })
                target.send({ embeds: [dmEmbed] }).catch(console.error)
                await target.roles.add(role2)
                message.reply({ embeds: [tEmbed] })
                setTimeout(async () => {
                    await target.roles.remove(role2)
                    target.send({ embeds: [dmEmbedEnd] }).catch(console.error)
                }, (time * 60000))
            }
            if (target.roles.cache.has(role.id)) {
                message.reply({ embeds: [muteEmbed] })
                return
            }
            await target.roles.add(role)
            target.send({ embeds: [dmEmbed] })
            message.reply({ embeds: [tEmbed] })
            setTimeout(async () => {
                await target.roles.remove(role)
                target.send({ embeds: [dmEmbedEnd] }).catch(console.error)
            }, (time * 60000))
        }
    }
}
