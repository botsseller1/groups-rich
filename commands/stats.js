module.exports = {
  aliases: ["stats", "info"],
  description: "Get info about your/a group",
  usage: "",
  category: "groups",
  run: async message => {
    let group = message.client.db.filter(c => c.name).find(c => c.members.map(m => m.id).includes(message.author.id) || c.name.toLowerCase() == message.args.join(' ').toLowerCase());
    if (!group) return message.channel.send("> :x: انت غير موجود في أي قروب !");
    let admins = group.members.filter(c => c.role == "admin" || c.role == "co-owner" || c.role == "owner").map(a => Object({ role: a.role, member: message.guild.members.get(a.id) }));

    await message.channel.send({
      embed: {
        title: group.name,
        author: { name: "group Info", icon_url: message.guild.iconURL },
        fields: [
          {
            name: "General Info",
            value: `Name: ${group.name}\nMembers: ${group.members.length}\nOwner: <@${group.owner}>\nCreated At: ${new Date(group.createdAt).toLocaleString()}\nActivated: ${group.activated ? "Yes" : "No"}`,
            inline: true
          }, {
            name: "Admins [" + admins.length + "]",
            value: admins.map(a => `${a.member} | \`${a.role}\``).join("\n"),
            inline: true
          }
        ],
        footer: { text: message.author.tag, icon_url: message.author.avatarURL }
      }
    });
  }
};
