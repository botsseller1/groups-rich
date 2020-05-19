module.exports = {
    aliases: ["rank"],
    description: "See your group rank.",
    usage: "< group name >",
    category: "info",
    run: async message => {
      if (!message.args[0]) return message.channel.send("> :clipboard: يرجى كتابة أسم القروب !");
      let group = message.client.db.filter(c => c.name).find(c => c.name.toLowerCase() == message.args.join(" ").toLowerCase());
      if (!group) return message.channel.send("> :x: لم يتم العثور على قروب بـ هذا الأسم !");
      if (!group.activated) return message.channel.send("> :x: هذا القروب غير مفعل !");
      
      let groups = message.client.db.filter(c => c.name).array();
      let sorted = groups.sort((a, b) => b.level - a.level);
      let rank = sorted.map(c => c.name).indexOf(group.name) + 1;
      let total = 1500 * (Math.pow(2, group.level) - 1);
      
      let embed = new(require("discord.js")).RichEmbed()
        .setAuthor(group.name, message.guild.iconURL)
        .setColor(message.member.displayColor)
        .setDescription(`>>> **group XP**: ${group.xp || 0} / ${total}\n**group Rank**: ${rank || 1}\n**group Level**: ${group.level || 1}`)
        .setFooter(message.author.tag, message.author.avatarURL);

        
      await message.channel.send(embed);
    }
}