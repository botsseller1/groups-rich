module.exports = {
  aliases: ["kick"],
  description: "Kick a member from your group",
  usage: "< @member >",
  category: "groups",
  run: async message => {
    let group = message.client.db.filter(c => c.name).find(c => c.owner == message.author.id || c.members.find(m => m.id == message.author.id && (m.role == "co-owner" || m.role == "admin")));
    if (!group) return message.channel.send("> :x: انت لست إداري في أي قروب !");
    if (!group.activated) return message.channel.send("> :x: هذا القروب غير مفعل !");
    
    if (!message.args[0]) return message.channel.send("> :clipboard: يجب منشن العضو !");
    let member = message.mentions.members.first();
    if (!member) return message.channel.send("> :x: لا يمكنني العثور لا على هذا العضو !");
    if (!message.client.db.filter(c => c.name).find(c => c.members.find(c => c.id == member.user.id))) return message.channel.send("> :x: هذا العضو غير موجود بالقروب !");
    if (group.members.find(m => m.id == member.user.id && (m.role == "owner" || m.role == "co-owner" || m.role == "admin")) && group.owner != message.author.id)
      return message.channel.send("> :x: لا يمكنك طرد أداري من القروب !");
    
    let role = message.guild.roles.find(r => r.name == "group | " + group.name);
    if (role) await message.member.removeRole(role.id);
    await message.client.db.set(group.name, group.members.filter(m => m.id != member.user.id), "members");
    await message.react("✅");
  }
};
