module.exports = {
  aliases: ["members"],
  description: "Displays your group members",
  usage: "",
  category: "groups",
  run: async message => {
    let group = message.client.db.filter(c => c.name).find(c => c.members.map(m => m.id).includes(message.author.id) || c.name.toLowerCase() == message.args.join(' ').toLowerCase());
    if (!group) return message.channel.send("> :x: انت غير موجود في أي قروب !");

    await message.channel.send({
      embed: {
        title: group.name,
        author: { name: "group Members", icon_url: message.guild.iconURL },
        description: group.members.map(m => message.guild.members.get(m.id) || m.id).join('\n'),
        footer: { text: message.author.tag, icon_url: message.author.avatarURL }
      }
    });
  }
};
