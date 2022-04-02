const Discord = module.require("discord.js");
const fs = require("fs")

module.exports.run = async (client,message,args,prefix) => {
let mb = message.mentions.members.first() || message.member; // Если есть упомянание человека в сообщении, то берём его, если нету, то себя. Расскажу чуть позже.
let color = mb.displayHexColor; //Цвет самой высокой роли человека, если цвет невидимый то самой высокой отображаемой роли.
let embed = new Discord.RichEmbed() //Создаём эмбед
.setImage(mb.user.avatarURL) //Устанавливаем картинку - аватар человека.
.setColor(color) //Цвет.
.setFooter("Аватар пользователя " + mb.user.tag); //Устанавливаем в подпись чей это аватар.
message.channel.send({embed}); //Отправляем.
}

module.exports.help = {
    name: "avatar"
};