module.exports = async client => {
  await console.log("Logged in as " + client.user.tag);
  await client.db.defer;

  let game = client.db.get("settings", "game");
  if (game.name) await client.user.setActivity(game.name, { type: game.type || "PLAYING", url: "https://twitch.tv/julianxdark" });

  await setInterval(async () => {
    let guild = client.guilds.get(client.servers[0]);
    
    
    for (let group of client.db.filter(c => c.activated)) {
      
      group = group[1];
      for (let member of group.members) {
        let mem = guild.members.get(member.id);
        if (mem && mem.voiceChannelID && mem.voiceChannel.name === group.name) await client.db.math(group.name, 'add', Math.floor(Math.random() * 5), 'xp');
      }
      
      let total = 1500 * (Math.pow(2, group.level) - 1);
      if (group.xp >= total) await client.db.math(group.name, "add", 1, "level");
    }
  }, 1 * 60 * 1000);
};