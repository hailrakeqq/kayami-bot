module.exports = {
    name: "setprefix",
    desc: "Команда для сменны префикса",
    use: "setprefix [prefix]",

    async execute (client,message,args,data, prefix) {
        try {
            let roleA = '959790723400601600';
            if (message.member.roles.cache.has(roleA)){
            if(!args[0]){
                return message.channel.send(`префикс: ` + "`" + data.guild.prefix + "`" +`\n\n для смены префикса используйте ` + "`" + data.guild.prefix + "setprefix [prefix]" + "`")
            }

            if(args[0].length >= 5){
                return message.channel.send("`" + "Невозможно установить префикс, убедитесь что длинна не привышает 5 символов" + "`")
            }

            data.guild.prefix = args[0];
            await data.guild.save();
            return message.channel.send(`Префикс успешно изменен на ` + "`" + args[0] +"`")
        }else {
            return message.reply("У вас недостаточно прав для смены префикса")
        }
        } catch (error) {
            console.log(error);
        }
    }

}