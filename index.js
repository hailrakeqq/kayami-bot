const DiscordJS = require("discord.js"), fs = require("fs"), mongoose = require("mongoose")
const { Client, Intents } = require("discord.js");
const { DisTube } = require("distube")
const { MessageEmbed } = require("discord.js");
const { SoundCloudPlugin } = require('@distube/soundcloud')
const { SpotifyPlugin } = require("@distube/spotify")

global.cfg = require(`./config`)
require('dotenv').config()

global.client = new DiscordJS.Client({
    partials: ['MESSAGE', 'CHANNEL', 'USER', `GUILD_MEMBER`, 'REACTION'],
    intents: 32767,
    allowedMentions: {
        parse: [`users`, `roles`],
        repliedUser: true
    }
})

client.commands = new DiscordJS.Collection()
client.commands.any = []
client.queue = new Map();
client.vote = new Map();
global.GuildModel = require(`./db/guildShm`)
global.MemberModel = require(`./db/memberShm`)
client.db = require('./db/db')

mongoose.connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => { console.log(`Соединение с базой данных установлено!`) }).catch((err) => { console.log(err) })

fs.readdir(`./commands`, (err, ff) => {
    ff.filter(f => fs.lstatSync(`./commands/${f}`).isDirectory()).forEach(dir => {
        fs.readdir(`./commands/${dir}`, (e, files) => {
            if (e) throw e
            if (files && files.length > 0) {
                files.filter(g => g.endsWith(".js") && fs.lstatSync(`./commands/${dir}/${g}`).isFile()).forEach(file => {
                    let props = require(`./commands/${dir}/${file}`)
                    client.commands.set(file.split(".")[0], props)
                    if (props.userPermissions) props.defaultPermissions = false;
                    client.commands.any.push(props)
                })
            }
        })
    })
})


fs.readdir(`./events`, (err, files) => {
    files.forEach(file => {
        const event = require(`./events/${file}`)
        if (event.once) {
            client.once(event.name, (...args) => event.execute(...args, client))
        } else {
            client.on(event.name, (...args) => event.execute(...args, client))
        }
    })
})

let AddEmbed = new MessageEmbed().setColor("PURPLE")
let PlayEmbed = new MessageEmbed()
let addListEmbed = new MessageEmbed().setColor("PURPLE")
let emptyQueueEmbed = new MessageEmbed().setColor(`#8f40ff`)

global.distube = new DisTube(client, {
    plugins: [new SoundCloudPlugin(),
    new SpotifyPlugin({
        parallel: true,
        emitEventsAfterFetching: false,
        api: {
            clientId: "9c4c04d2aeed49b6b2c6b2bfa610c36d",
            clientSecret: "a67aa6364ca04536acf3560c7bf4ee75",
        },
    })],
    searchSongs: 5,
    searchCooldown: 30,
    leaveOnEmpty: true,
    leaveOnFinish: true,
    leaveOnStop: false,
})
    .on("searchResult", (message, result) => {
        let i = 0
        message.channel.send({
            embeds: [addListEmbed
                .setColor("#7289DA").setTitle(`** Выберите что проигровать, со списка ниже **`)
                .setDescription((`${result
                    .map(song => `**${++i}**. ${song.name} - \`${song.formattedDuration}\``)
                    .join("\n")}\n*Введите что то другое или подождите 60 секунд для отмены*`))
            ]
        })
    })

    .on("searchCancel", message => message.channel.send(`${client.emotes.error} | Поиск отменен`))

    .on("searchInvalidAnswer", message =>
        message.channel.send(
            `${client.emotes.error} | Неверный ответ! Вы должны ввести число в диапазоне результатов`
        )
    )
    .on("searchDone", () => { })

    .on('playSong', (queue, song) =>
        queue.textChannel?.send({
            embeds: [PlayEmbed.setColor("PURPLE").setTitle("Музыка")
                .setDescription(`Играет **[${song.name}](${song.url} )  - \`${song.formattedDuration}\`**`)
                .setThumbnail(song.thumbnail)]
        }),
    )

    .on('addSong', (queue, song) =>
        queue.textChannel?.send({
            embeds: [AddEmbed.setTitle(`:white_check_mark: Добавлена новая песня в очередь`)
                .setDescription(`**[${song.name}](${song.url})** - \`${song.formattedDuration}\``)
                .setThumbnail(song.thumbnail)
                .setFooter({ text: `Чтобы посмотреть всю очередь используйте \`queue\`` })
            ]
        })
    )

    .on('addList', (queue, playlist) =>
        queue.textChannel?.send({
            embeds: [addListEmbed
                .setColor("PURPLE").setTitle(`:white_check_mark: Добавлен Плейлист `)
                .setDescription(`\`${playlist.name}\` - ${playlist.songs.length} песен`)
                .setFooter({ text: `Чтобы посмотреть всю очередь используйте \`queue\`` })
            ]
        })
    )

    .on('error', (channel, e) => {
        if (channel) channel.send({
            embeds: [addListEmbed
                .setColor("RED").setTitle(`:x: Ошибка `)
                .setDescription((`Произошла ошибка: ${e}`))
                .setFooter({ text: `Ошибка может значить что вы не выбрали что проигровать или ввели недопустимое значение. Попробуйте заново!` })
            ]
        })
        else console.error(e)
    })

    .on('empty', channel => channel.send('Голосовой канал пуст! Отключаюсь...'))

    .on('searchNoResult', (message, query) =>
        message.channel.send({
            embeds: [addListEmbed
                .setColor("RED").setTitle(`:x: Ошибка `)
                .setDescription(`${client.emotes.error} | Нету результатов для \`${query}\`!`)
            ]
        })
    )

    .on('finish', queue => queue.textChannel?.send({
        embeds: [emptyQueueEmbed.setTitle("Очередь закончилась")
            .setDescription(`Чтобы добавить что то в очередь используйте \n\`play <url> или текст\``)
            .setTimestamp()
        ]
    })
    )

client.on('interactioncreate', (interaction) => require(`./events/interactioncreate`)(client, interaction))
process.on('unhandledRejection', (reason) => { console.log(reason) })

client.login(process.env.BOT_TOKEN)
