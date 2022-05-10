const { MessageEmbed } = require("discord.js");
const { Permissions } = require("discord.js");

module.exports = {
    userPermissions: "BAN_MEMBERS",
    async execute(interaction) {
        const target = interaction.options.getMember("target");
        const reason = interaction.options.getString("reason") || "No reason provided";
        const fEmbed = new MessageEmbed()
            .setColor('RED')
            .setTitle(`Ты не можешь выгнать этого пользователя`)
        const tEmbed = new MessageEmbed()
            .setColor('GREEN')
            .setTitle(`Пользователя ${target.user.tag} забанили, причина: \`${reason}\``)

        if (!target.bannable) await interaction.reply({ embeds: [fEmbed] })


        if (target.permissions.has([Permissions.FLAGS.KICK_MEMBERS, Permissions.FLAGS.BAN_MEMBERS, Permissions.FLAGS.ADMINISTRATOR]))
            await interaction.reply({ embeds: [fEmbed] })
        await target.send(`Тебя забанили на сервере ${interaction.guild.name}, причина: \`${reason}\``).catch(console.error)
        target.ban({ reason })

        interaction.reply({ embeds: [tEmbed] })

    }
}

module.exports.interaction = {
    name: "ban",
    description: "бан пользователя",
    use: "ban <@user>",
    userPermissions: ["BAN_MEMBERS"],
    category: "Модерация",
    options: [
        {
            name: "target",
            description: "target to ban",
            type: "USER",
            required: true
        },
        {
            name: "reason",
            description: "Причина бана",
            type: "STRING",
            required: false
        }
    ]

}
