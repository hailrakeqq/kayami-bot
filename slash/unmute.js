const { MessageEmbed } = require("discord.js");
const { Permissions } = require("discord.js");

module.exports = {
    userPermissions: "MANAGE_MESSAGES",

    async execute(interaction) {
        const target = interaction.options.getMember("target");
        const time = interaction.options.getNumber("time")
        let role = interaction.guild.roles.cache.find(role => role.name.toLowerCase() === 'mute')
        const tEmbed = new MessageEmbed()
            .setColor('GREEN')
            .setTitle(`Пользователя ${target.user.tag} успешно размьютили`)
        const failEmbed = new MessageEmbed()
            .setColor('RED')
            .setTitle(`Пользователь ${target.displayName}, не в мьюте`)
        if (target.roles.cache.has(role.id)) {
            await target.roles.remove(role)
            interaction.reply({ embeds: [tEmbed] })
            target.send(`Тебя размьютили на сервере \`${interaction.guild.name}\` , ты снова можешь писать в текстовых каналах`)
                .catch(console.error)
        } else interaction.reply({ embeds: [failEmbed] })
    }
}

module.exports.interaction = {
    name: "unmute",
    description: "анмьют пользователя",
    use: "unmute <@user>",
    category: "Модерация",
    options: [
        {
            name: "target",
            description: "укажите пользователя которого хотите размьютить",
            type: "USER",
            required: true
        }
    ]
}