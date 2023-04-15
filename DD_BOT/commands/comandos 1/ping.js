const Discord = require("discord.js");

module.exports = {
    name: "ping", //nome do comando
    aliases:[""], //sinonimos do nome do comando

    run: async(client, message, args) =>{

        let embed = new Discord.EmbedBuilder()
        .setColor("Random")
        .setAuthor({name: client.user.username, iconURL: client.user.displayAvatarURL()})
        .setDescription(`Ola, ${message.author}, seu ping esta em: \`carregando...\`.`);

        let embed2 = new Discord.EmbedBuilder()
        .setColor("DarkPurple") //cor da barra lateral
        .setAuthor({name: client.user.username, iconURL: client.user.displayAvatarURL()})
        .setDescription(`Ola, ${message.author}, seu ping esta em: \`${client.ws.ping}ms\`.`);

        message.reply({ embeds:[embed]}).then(msg =>{
            setTimeout(()=>{
                msg.edit({embeds: [embed2]})
            }, 3000) //espera 3 segundos
        })
    }

    
}