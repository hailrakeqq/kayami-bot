const { MessageEmbed } = require("discord.js");
module.exports = async (interaction) => {
    if (!interaction.isCommand()) return;
    const argsF = {}; //Создание аргументов
    argsF.slash = true;
    if (interaction.options._group) argsF.group = interaction.options._group; //Если это группа - добавить в аргумент
    if (interaction.options._subcommand) argsF.subcommand = interaction.options._subcommand; //Если это sub группа - добавить в аргумент
    for (const it of interaction.options._hoistedOptions) argsF[it.name] = it.value; //Добавить опции в аргументы
    const command = await client.commands.get(interaction.commandName);
    const args = argsF; //Приравнивание функции*
    interaction.author = interaction.user;
    interaction.channel = client.channels.cache.get(interaction.channelId);
    interaction.guild = interaction.member.guild;
    if (command.userPermissions) {
        const authorPerms = interaction.channel.permissionsFor(interaction.member)
        if (!authorPerms || !authorPerms.has(command.userPermissions)) {
            const error1 = new MessageEmbed()
                .setColor("RED")
                .setDescription(`Ты не имеешь прав что бы использовать эту команду: ${command.userPermissions}`)
            return interaction.reply({ embeds: [error1], ephemeral: true })
        }
    }
    if (command) command.execute(interaction)
}
