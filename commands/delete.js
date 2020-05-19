module.exports = {
  aliases: ["delete"],
  description: "Delete your group",
  usage: "",
  category: "groups",
  run: async message => {
    let group = message.client.db.filter(c => c.name).find(c => c.owner == message.author.id);
    if (!group) return message.channel.send("> :x: انت لا تملك قروب !");
    
    let mm = await message.channel.send("> أتريد حقاً حذف القروب**؟ للتأكيد اكتب** :\n```تأكيد```\n");
    let filter = m => m.author.id == message.author.id && (m.content == "تاكيد" || m.content == "تأكيد");
    let col = await message.channel.awaitMessages(filter, { max: 1, time: 60000, errors: ["time"] });
    let msg = await message.channel.send("> :repeat: جارِ حذف القروب ..");
    let ch = message.guild.channels.find(c => (c.parentID == message.client.chs.not || c.parentID == message.client.chs.active) && c.name == group.name);
    if (ch) await ch.delete();
    let role = message.guild.roles.find(r => r.name == "group | " + group.name);
    if (role) await role.delete();
    try {
      col.first().delete();
      col.delete();
      mm.delete();
    } catch (_) {}
    await message.client.db.delete(group.name);
    await msg.edit("> :white_check_mark: تم حذف القروب بنجاح !");
  }
};
