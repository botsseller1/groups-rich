const { RichEmbed } = require("discord.js");

module.exports = {
    aliases: ["top", "leaderboard"],
    description: "See the groups leaderboard.",
    usage: "",
    category: "info",
    run: async message => {
      let groups = message.client.db.filter(c => c.name && c.activated).array();
      let sorted = groups.sort((a, b) => b.level - a.level);
      let top = sorted.splice(0, 10);
      let i = 1;
      let text = top.map(group => `#${i++} | **${group.name}** LEVEL: \`${group.level}\``).join("\n");
      
      let embed = new RichEmbed()
        .setAuthor(`${message.guild.name} groups Leaderboard`, message.guild.iconURL)
        .setThumbnail(message.guild.iconURL ? message.guild.iconURL.replace(".webp", ".png").replace(".jpg", ".png").replace(".jpeg", ".png") : null)
        .setDescription(text == "" ? "No groups :(" : text)
        .setFooter(message.author.tag, message.author.avatarURL)
        .setTimestamp();

      await message.channel.send(embed);
    }
}