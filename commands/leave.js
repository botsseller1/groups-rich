module.exports = {
  aliases: ["leave"],
  description: "Leave a group",
  usage: "",
  category: "groups",
  run: async message => {
    let group = message.client.db.filter(c => c.name).find(c => c.members.map(m => m.id).includes(message.author.id));
    if (!group) return message.channel.send("> :x: انت غير موجود في أي قروب !");
    if (!group.activated) return message.channel.send("> :x: هذا القروب غير مفعل !");

    if (group.owner == message.author.id) return message.channel.send("> :x: لا يمكنك الخروج من قروبك !");
    let member = group.members.find(m => m.id == message.author.id);
    if (!member) return message.channel.send("> :x: انت غير موجود في أي قروب !");

    let role = message.guild.roles.find(r => r.name == "group | " + group.name);
    if (role) await message.member.removeRole(role.id);
    await message.client.db.set(group.name, group.members.filter(m => m.id != message.author.id), "members");
    await message.react("✅");
  }
};
