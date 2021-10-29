import {client} from "../index";
import {TextChannel} from "discord.js";
client.on("guildMemberAdd", (member: any) => {
    if (Date.now() - member.user.createdAt <= 864000000) {
        member.ban({ days: 7, reason: 'New account' })
        const channel: TextChannel = client.channels.cache.get('896386048458895420') as TextChannel;
        channel.send(`[ALT DETECTED] <@${member.id}> (${member.id}) was banned.`);
    }
});