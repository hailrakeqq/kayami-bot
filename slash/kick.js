const { MessageEmbed } = require("discord.js");
const { Permissions } = require('discord.js');
module.exports = {
    userPermissions: "KICK_MEMBERS",
    async execute(interaction) {
        const target = interaction.options.getMember("target");
        const reason = interaction.options.getString("reason") || "No reason provided";

        const tEmbed = new MessageEmbed()
            .setColor('GREEN')
            .setTitle(`Пользователя ${target.user.tag} выгнали, причина: \`${reason}\``)

        const fEmbed = new MessageEmbed()
            .setColor('RED')
            .setTitle(`Ты не можешь выгнать этого пользователя`)
        if (!target.kickable) await interaction.reply({ embeds: [fEmbed] })
        if (target.permissions.has([Permissions.FLAGS.KICK_MEMBERS, Permissions.FLAGS.BAN_MEMBERS, Permissions.FLAGS.ADMINISTRATOR]))
            return interaction.reply({ embeds: [fEmbed] });
        await target.send(`Тебя выгнали из сервере ${interaction.guild.name}, причина: \`${reason}\``).catch(console.error)

        target.kick({ reason })

        interaction.reply({ embeds: [tEmbed] })
    }
}

module.exports.interaction = {
    name: "kick",
    description: "кик пользователя",
    use: "kick <@user>",
    userPermissions: ["KICK_MEMBERS"],
    category: "Модерация",
    options: [
        {
            name: "target",
            description: "Укажите пользователя которого хотите выгнать",
            type: "USER",
            required: true
        },
        {
            name: "reason",
            description: "Причина кика",
            type: "STRING",
            required: false
        }
    ]
}
