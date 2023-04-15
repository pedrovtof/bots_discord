const Discord = require("discord.js");//discord js ofc  npm i discord.js
const client = new Discord.Client({intents:[ 1, 512, 32768, 2, 128]});//discord js ofc cliente
const config = require("./config.json");//abre token do bot
const fs = require ("fs"); //biblioteca local - npm i fs
const {QuickDB } = require("quick.db"); //npm i quick.db 
const db = new QuickDB(); //npm i better-sqlite3


client.login(config.token)

client.commands = new Discord.Collection(); //comandos colection
client.aliases = new Discord.Collection(); //apelidos colection
client.categoies = fs.readdirSync(`./commands/`); //pasta de comandos local

fs.readdirSync(`./commands/`).forEach(local => { //verifica itens da pasta
    const comandos = fs.readdirSync(`./commands/${local}`).filter(arquivo => arquivo.endsWith('js'))

    for(let file of comandos){
        let puxar = require(`./commands/${local}/${file}`)

        if (puxar.name){
                client.commands.set(puxar.name, puxar)
        }
        if(puxar.aliases && Array.isArray(puxar.aliases))
        puxar.aliases.forEach(x => client.aliases.set(x, puxar.name))
    }
});


client.on("ready", ()=>{
    console.log(`Estou online em ${client.user.username}!`) //avisa que esta ligado
})
 

client.on("messageCreate", async(message) => { //comando ping

    let prefix = config.prefix;

    if (message.author.bot) return; //valida se mensagem for de um bot
    if (message.channel.type === Discord.ChannelType.DM) return;  //valida se mensagem for de um bot

    if (!message.content.toLowerCase().startsWith(prefix.toLowerCase())) return;

    if(!message.content.startsWith(prefix))return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);

    let cmd = args.shift().toLowerCase()
    if(cmd.length === 0) return;
    let command = client.commands.get(cmd)
    if(!command) command = client.commands.get(client.aliases.get(cmd))

    try {
        command.run(client, message, args)
    } catch (err) {
        console.error('Erro: ' + err); //avisa erro
    }
})

client.on("messageCreate", async (message) => { //comando antilink
    if(message.author.bot) return; //antilink_${interaction.guild.id}
    let confirm = await db.get(`antilink_${message.guild.id}`);
    if(confirm === false || confirm === null){
        return;
    } else if(confirm === true){
        if(message.member.permissions.has(Discord.PermissionFlagsBits.Administrator)) return; // se possuir acesso de adm bot permite links
        if(message.content.includes("http")) { //valida se tem http no link
            message.delete()
            message.channel.send(`${message.author} não envie links no server!`)
        }
    }
})


