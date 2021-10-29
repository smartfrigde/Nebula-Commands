import {client} from "../index";
import {TextChannel} from "discord.js";


// Logging which guilds the bot is added to and removed from makes sense since the bot is semi-private.


client.on("guildCreate", (guild) => {
    console.log(
        `[GUILD JOIN] ${guild.name} (${guild.id}) added the bot. Owner: ${guild.fetchOwner().then(owner => owner.user.tag)} (${
            guild.fetchOwner().then(owner => owner.id)
        }).`
    );
    const channel: TextChannel = client.channels.cache.get('896386048458895420') as TextChannel;
    channel.send(`[GUILD JOIN] ${guild.name} (${guild.id}) added the bot. Owner: ${guild.fetchOwner().then(owner => owner.user.tag)} (${
        guild.fetchOwner().then(owner => owner.id)
    }).`);
});

client.on("guildDelete", (guild) => {
    console.log(`[GUILD LEAVE] ${guild.name} (${guild.id}) removed the bot.`);

    const channel: TextChannel = client.channels.cache.get('896386048458895420') as TextChannel;
    channel.send(`[GUILD LEAVE] ${guild.name} (${guild.id}) removed the bot.`);
});
client.once("ready", () => {
    if (client.user) {
client.user.setActivity({
    type: "COMPETING",
    name: `-help | ${client.users.cache.size} users`,
});
}});