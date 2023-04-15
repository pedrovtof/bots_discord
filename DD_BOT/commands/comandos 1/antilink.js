const Discord = require ("discord.js");//npm i discord.js
const {QuickDB } = require("quick.db"); //npm i quick.db 
const db = new QuickDB(); //npm i better-sqlite3

module.exports = {
    name: "antilink", //nome do comando
    description: "", //coloque descrição do comando
    type: Discord.ApplicationCommandType.ChatInput,

    run: async (client, interaction) => {

        if(!interaction.member.permissions.has(Discord.PermissionFlagsBits.Administrator)){
            interaction.reply({content: `Voce não possui permissão para este comando`, ephermeral: true}) 
            } else{
                let embed_g = new Discord.EmbedBuilder() //mensagem embed
                .setColor("Green") //define cor
                .setDescription(`Ola, o sistema de anti-link foi \`Ativado\`.`) //defini resposta

                let embed_r = new Discord.EmbedBuilder()
                .setColor("Red")
                .setDescription(`Ola, o sistema de anti-link foi \`Desativado\`.`)

                let confirm = await db.get(`antilink_${interaction.guild.id}`);

                if(confirm === null || confirm === false ){
                    interaction.reply({ embeds: [embed_g] })
                    await db.set(`antilink_${interaction.guild.id}`, true)
                } else if (confirm === true){
                    interaction.reply({ embeds: [embed_r] })
                    await db.set(`antilink_${interaction.guild.id}`, false)
                }
        }
    }
}


