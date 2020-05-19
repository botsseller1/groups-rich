module.exports = {
  aliases: ["accept"],
  description: "Accept an invite, to join a Group",
  usage: "< invite >",
  category: "Groups",
  run: async message => {
    let group = message.client.db.filter(c => c.name).find(c => c.members.map(m => m.id).includes(message.author.id));
    if (group) return message.channel.send("> :x: انت بالفعل موجود بـ القروب !");
    let group2 = message.client.db.filter(c => c.name).find(c => c.invites.find(i => i == message.args[0]));
    if (!group2) return message.channel.send("> :x: لم يتم العثور على هذه الدعوة !");
    let invite = group2.invites.find(i => i == message.args[0]);
    
    await message.client.db.remove(group2.name, invite, "invites");
    await message.client.db.push(group2.name, { id: message.author.id, role: "member" }, "members");
    let role = message.guild.roles.find(r => r.name == "group | " + group2.name);
    if (role) await message.member.addRole(role.id);
    await message.react("✅");
  }
};
