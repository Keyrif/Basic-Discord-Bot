const Discord = require("discord.js");
const bot = new Discord.Client();
const fs = require('fs')
const generated = new Set();
const talkedRecently = new Set();
const prefix = 'YOUR PREFIX';

bot.commands = new Discord.Collection();


bot.on("ready", () => {
  console.log(`Logged in as ${bot.user.tag}!`);
  bot.user.setActivity(`!help | ${bot.guilds.cache.size} servers`, { type: "STREAMING", url: "https://twitch.tv/sa" })
});
bot.on("guildCreate", () => {
  bot.user.setActivity(`!help | ${bot.guilds.cache.size} servers`, { type: "STREAMING", url: "https://twitch.tv/sa" })
});

bot.on("guildDelete", () => {
  bot.user.setActivity(`!help | ${bot.guilds.cache.size} servers`, { type: "STREAMING", url: "https://twitch.tv/sa" })
});

bot.on("message", message => {
  if (message.author.bot) return false;

  if (message.content.includes("@here") || message.content.includes("@everyone")) return false;

  if (message.mentions.has(bot.user.id)) {
    message.channel.send("Hey! My prefix is `!`\nFor more type `!help`");
  };
  if (message.content.toLowerCase() === (prefix + 'help')) {
    const helpembed = new Discord.MessageEmbed()
      .setColor('ffffff')
      .setTitle('HELP')
      .setDescription('!gay\n!lotto\n!ping\n!servers\n!invite')
      .setFooter(`Requested by ${message.author.tag}`, `${message.author.displayAvatarURL({ dynamic: true, size: 1024 })}`)

    message.channel.send(helpembed);
  };
  if (message.content.toLowerCase().startsWith((prefix + 'gay'))) {
    const randomgay = Math.floor(Math.random() * 100) + 1
    const user = message.mentions.users.first() || message.author;
    const gayEmbed = new Discord.MessageEmbed()
      .setColor('ffffff')
      .setTitle('GAY!')
      .setDescription(`**${user.username}** este ${randomgay}% gay  🏳️‍🌈`)
    message.channel.send(gayEmbed);
  }
  if (message.content.toLowerCase() === (prefix + 'invite')) {
    const exampleEmbed = new Discord.MessageEmbed()
      .setColor('ffffff')
      .setTitle('CHECK YOUR DMs!')
      .setDescription('The invite link has been generated in your DMs!\nIf you have not received anything be sure to have DMs turned on in the server settings!')
      .setImage('https://i.imgur.com/7I0KXQa.png')
      .setFooter(`Requested by ${message.author.tag}`, `${message.author.displayAvatarURL({ dynamic: true, size: 1024 })}`)
    message.author.send('YOUR LINK HERE')

    message.channel.send(exampleEmbed);
  }
  if (message.content.toLowerCase() === (prefix + 'servers')) {
    message.channel.send(`I am in **${bot.guilds.cache.size}** servers!`)
  }
  if (message.content.toLowerCase() === (prefix + 'lotto')) {

    const random = Math.floor(Math.random() * 49) + 1
    const random2 = Math.floor(Math.random() * 49) + 1
    const random3 = Math.floor(Math.random() * 49) + 1
    const random4 = Math.floor(Math.random() * 49) + 1
    const random5 = Math.floor(Math.random() * 49) + 1
    const random6 = Math.floor(Math.random() * 49) + 1
    message.channel.send(`Lotto 6/49...\n**RESULTS:** \nThe lucky numbers are: **${random}**, **${random2}**, **${random3}**, **${random4}**, **${random5}**, **${random6}**`)
  }
  if (message.content.toLowerCase() === (prefix + 'ping')) {

    const lat = Date.now() - message.createdTimestamp
    const APIlat = Math.round(bot.ws.ping)
    const pingembed = new Discord.MessageEmbed()
    .setColor('ffffff')
    .setTitle('PING')
    .setDescription(`Latency: **${lat <= '300' ? lat + '**ms**  🟢' : lat + '**ms**  🔴'}**\nAPI Latency: **${APIlat <= '300' ? APIlat + '**ms**  🟢' : APIlat + '**ms**  🔴'}**\n  \n🟢 - the bot is stable (NO LAG)\n🔴 - the bot is unstable (LAGGY)`)
    message.channel.send(pingembed)
  }
});


bot.login('YOUR TOKEN'); 
