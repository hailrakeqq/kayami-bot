module.exports = {
    name: "kick",
    description: "кик пользователя",
    use: "kick <@user>",
    userPermissions: ["KICK_MEMBERS"],
    category: "Модерация",
    aliases: [],
    options: [
        {
            name: "target",
            description: "target to kick",
            type: "USER",
            required: true
        },
        {
            name: "reason",
            description: "reason to kick",
            type: "STRING",
            required: false
        }
    ],

    async execute(client, interaction, args, data) {
        const target = interaction.options.getMember("target");
        const reason = interaction.options.getString("reason") || "No reason provided";
        //const modRole = '963703818745446470'
        if (target.hasPermission(['KICK_MEMBERS', 'BAN_MEMBERS', 'ADMINISTRATOR']))
            return interaction.reply({
                content: "Ты не можешь выгнать этого пользователя"
            });
        await target.send(
            `Тебя выгнали из сервере ${interaction.guild.name}, причина: ${reason}`
        );

        target.kick({ reason })

        interaction.reply({
            content: `Пользователя ${target.user.tag} выгнали, причина: ${reason}`
        })
    },
    admin: false
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
            description: "target to kick",
            type: "USER",
            required: true
        },
        {
            name: "reason",
            description: "reason to kick",
            type: "STRING",
            required: false
        }
    ]
}