module.exports = async (client) => {
    try {
        client.user.setPresence({
           activities : [{
               name: "!help",
               type: 2
           }]
        })
        await console.log(`${client.user.tag} Запущен!!!`)
    } catch (err){
        console.log(err)
    }
}