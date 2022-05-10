const { MessageEmbed } = require("discord.js");
const { Permissions } = require("discord.js");

module.exports = {
    userPermissions: "MANAGE_MESSAGES",

    async execute(interaction) {
        const target = interaction.options.getMember("target");
        const time = interaction.options.getNumber("time")
        const reason = interaction.options.getString("reason");
        let role = interaction.guild.roles.cache.find(role => role.name.toLowerCase() === 'mute')
        const fEmbed = new MessageEmbed()
            .setColor('RED')
            .setTitle(`Ты не можешь замьютить этого пользователя`)
        const tEmbed = new MessageEmbed()
            .setColor('GREEN')
            .setTitle(`Пользователя ${target.user.tag} замьютили на \`${time} мин\`, причина: \`${reason}\``)
        const roleEmbed = new MessageEmbed()
            .setColor('DARKER_GREY')
            .setTitle(`Mute роль не найдена, сейчас она будет создаваться`)
        const trueRoleEmbed = new MessageEmbed()
            .setColor('GREEN')
            .setTitle(`Mute роль не найдена, сейчас она будет создаваться`)
            .setDescription(`Mute роль успешно создана`)
        const muteEmbed = new MessageEmbed()
            .setColor('RED')
            .setTitle(`Пользователь ${target.displayName}, уже в мьюте`)
        const dmEmbed = new MessageEmbed()
            .setColor('RED')
            .setTitle(`Тебя замьютили на сервере ${interaction.guild.name} на ${time} мин, причина:  \`${reason}\``)
            .setTimestamp()
            .setFooter({ text: `${interaction.guild.name}` })
        const dmEmbedEnd = new MessageEmbed()
            .setColor('GREEN')
            .setTitle(`Время мута на сервере \`${interaction.guild.name}\` закончилось, ты снова можешь писать в текстовых каналах`)
            .setTimestamp()
            .setFooter({ text: `${interaction.guild.name}` })
        if (target.permissions.has([Permissions.FLAGS.KICK_MEMBERS, Permissions.FLAGS.BAN_MEMBERS, Permissions.FLAGS.MANAGE_MESSAGES]))
            await interaction.reply({ embeds: [fEmbed], ephemeral: true })
        if (!role) {
            await interaction.reply({ embeds: [roleEmbed] })
            const muterole = await interaction.guild.roles.create({ name: 'mute', permissions: [] })
            await interaction.channel.permissionOverwrites.create(muterole, {
                SEND_MESSAGES: false,
                ADD_REACTIONS: false
            })

            await interaction.editReply({ embeds: [trueRoleEmbed] })
            const role2 = interaction.guild.roles.cache.get(muterole.id)
            if (target.roles.cache.has(role2.id)) interaction.editReply({ embeds: [muteEmbed] })
            target.send({ embeds: [dmEmbed] }).catch(console.error)
            await target.roles.add(role2)
            interaction.editReply({ embeds: [tEmbed] })
            setTimeout(async () => {
                await target.roles.remove(role2)
                target.send({ embeds: [dmEmbedEnd] }).catch(console.error)
            }, (time * 60000))
        }
        if (target.roles.cache.has(role.id)) interaction.reply(`Пользователь ${target.displayName}, уже в мьюте`)
        await target.roles.add(role)
        target.send({ embeds: [dmEmbed] })
        interaction.reply({ embeds: [tEmbed] })
        setTimeout(async () => {
            await target.roles.remove(role)
            target.send({ embeds: [dmEmbedEnd] }).catch(console.error)
        }, (time * 60000))

    }
}


module.exports.interaction = {
    name: "mute",
    description: "мьют пользователя",
    use: "mute <@user>",
    userPermissions: ["MANAGE_MESSAGES"],
    category: "Модерация",
    options: [
        {
            name: "target",
            description: "укажите пользователя которого хотите замутить",
            type: "USER",
            required: true
        },
        {
            name: "time",
            description: "укажите на сколько хотите замутить(в минутах)",
            type: "NUMBER",
            required: true
        },
        {
            name: "reason",
            description: "Причина мьюта",
            type: "STRING",
            required: true
        }
    ]
}