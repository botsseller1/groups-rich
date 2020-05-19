module.exports = {
  aliases: ["setrank"],
  description: "Change a member rank",
  usage: "< @member > < co | admin | member >",
  category: "groups",
  run: async message => {
    let group = message.client.db.filter(c => c.name).find(c => c.owner == message.author.id);
    if (!group || group.owner != message.author.id) return message.channel.send("> :x: انت لا تملك قروب !");
    
    if (!message.args[0]) return message.channel.send("> :clipboard: يجب منشن العضو !");
    let member = message.mentions.members.first();
    if (!member) return message.channel.send("> :x: لا يمكنني العثور لا على هذا العضو !");
    let m = message.client.db.filter(c => c.name).find(c => c.members.find(c => c.id == member.user.id));
    if (!m) return message.channel.send("> :x: هذا العضو غير موجود بالقروب !");
    
    if (!message.args[1]) return message.channel.send("> :clipboard: يجب كتابة الرتبة الي تريد اعطائها للعضو , الرتب المتوفرة : `co-owner / admin / member`");
    if (!["co-owner", "admin", "member"].includes(message.args[1].toLowerCase())) return message.channel.send("> :x: الرتب المتوفرة فقط هي : `co-owner / admin / member`");
    if (member.user.id == group.owner || member.user.id == message.author.id) return message.channel.send("> :face_palm: لا يمكنك تغيير رتبتك أو رتبة الأونر !!");

    await message.client.db.remove(group.name, m.members.find(m => m.id == member.user.id), "members");
    await message.client.db.push(group.name, { id: member.user.id, role: message.args[1].toLowerCase() }, "members");
    await message.react("✅");
  }
};
