module.exports = async (client, old, member) => {
  let ch = member.voiceChannel;
  if (!ch) return undefined;
  
  let group = client.db.filter(c => c.name).find(c => c.name == ch.name);
  let prefix = client.db.get("settings", "prefix");

  if (ch.parentID == client.chs.not) {
    if (group && !group.activated && ch.members.filter(m => !m.user.bot).size >= 5) {
      let owner = member.guild.members.get(group.owner);
      if (owner) {
        await client.db.set(group.name, true, "activated");
        let role = await member.guild.createRole({ name: "group | " + group.name, color: "RANDOM" });
        await ch.edit({
          parent: client.chs.active,
          permissionOverwrites: [{ id: member.guild.id, deny: ["CONNECT"] }, { id: role.id, allow: ["CONNECT"] }]
        });
        await owner.addRole(role.id);
        
        try {
          await owner.send(`> :tada: تم تفعيل كلانك في سيرفر **${member.guild.name}**\nلمعرفة الأوامر المتوفرة يرجى استخدام امر \`${prefix || "c!"}help\` في روم الأوامر.`);
        } catch (_) {}
      } else {
        await client.db.delete(group.name);
        await ch.delete();
        let role = member.guild.roles.find(r => r.name == "group | " + group.name);
        if (role) await role.delete();
      }
    }
  }
};