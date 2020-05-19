module.exports = {
  aliases: ["rename"],
  description: "Change your group's name",
  usage: "< new name >",
  category: "groups",
  run: async message => {
    let group = message.client.db.filter(c => c.name).find(c => c.owner == message.author.id || c.members.find(m => m.id == message.author.id && m.role == "co-owner"));
    if (!group) return message.channel.send("> :x: انت لست إداري في أي قروب !");
  
    if (!message.args[0]) return message.channel.send("> :clipboard: يجب كتابة الأسم الجديد للقروب !");
    if (message.client.db.filter(c => c.name).find(c => c.name.toLowerCase() == message.args.join(" ").toLowerCase()))
      return message.channel.send("> :x: يوجد قروب بـ هذا الأسم بالفعل !");
    if (message.args[0].toLowerCase() == "settings") return message.reply(":x:");
    let msg = await message.channel.send("> :repeat: جارِ تغيير اسم القروب ..");
    let ch = message.guild.channels.find(c => (c.parentID == message.client.chs.not || c.parentID == message.client.chs.active) && c.name == group.name);
    if (ch) await ch.setName(message.args.join(" "));
    let role = message.guild.roles.find(r => r.name == "group | " + group.name);
    if (role) await role.setName("group | " + message.args.join(" "));
    await message.client.db.delete(group.name);
    group.name = message.args.join(" ");
    await message.client.db.set(message.args.join(" "), group);
    await message.client.db.set(message.args.join(" "), message.args.join(" "), "name");
    await msg.edit("> :white_check_mark: تم تغيير اسم القروب بنجاح !");
  }
};
