import {MessageEmbed, User, GuildMember} from "discord.js";
import {NamedCommand, Command, RestCommand, getUserByNickname} from "onion-lasers-v13";
import moment from "moment";

export default new NamedCommand({
    description: "Command to provide all sorts of info about the current server, a user, etc.",
    async run({send, author, member}) {
        send({embeds: [await getUserInfo(author, member)]});
    },
    id: "user",
    user: new Command({
        description: "Displays info about mentioned user.",
        async run({send, guild, args}) {
            const user = args[0] as User;
            // Transforms the User object into a GuildMember object of the current guild.
            const member = guild?.members.resolve(user);
            send({embeds: [await getUserInfo(user, member)]});
        }
    }),
    any: new RestCommand({
        description: "Displays info about a user by their nickname or username.",
        async run({send, guild, combined}) {
            const user = await getUserByNickname(combined, guild);
            // Transforms the User object into a GuildMember object of the current guild.
            const member = guild?.members.resolve(user);
            if (typeof user !== "string") send({embeds: [await getUserInfo(user, member)]});
            else send(user);
        }
    })
});
function trimArray(arr: any, maxLen = 10) {
    if (arr.length > maxLen) {
        const len = arr.length - maxLen;
        arr = arr.slice(0, maxLen);
        arr.push(`${len} more...`);
    }
    return arr;
}
async function getUserInfo(user: User, member: GuildMember | null | undefined): Promise<MessageEmbed> {
    const userFlags = (await user.fetchFlags()).toArray();

    const embed = new MessageEmbed()
        .setThumbnail(user.displayAvatarURL({dynamic: true, size: 512}))
        .setTitle(`${user.tag}`)
        .setColor("BLUE")
        .setURL(`https://discord.com/users/${user.id}`)
        .addField("User", [
            `**❯ Username:** ${user.username}`,
            `**❯ Discriminator:** ${user.discriminator}`,
            `**❯ ID:** ${user.id}`,
            `**❯ Flags:** ${userFlags.length ? userFlags.join(", ") : "None"}`,
            `**❯ Avatar:** [Link to avatar](${user.displayAvatarURL({
                dynamic: true
            })})`,
            `**❯ Time Created:** ${moment(user.createdTimestamp).format("LT")} ${moment(user.createdTimestamp).format(
                "LL"
            )} ${moment(user.createdTimestamp).fromNow()}`,
            // `**❯ Status:** ${user.presence.status}`,
            // `**❯ Game:** ${user.presence?.activities  "Not playing a game."}`
        ].join("\n"));

    if (member) {
        const roles = member.roles.cache
            .sort((a: {position: number}, b: {position: number}) => b.position - a.position)
            .map((role: {toString: () => any}) => role.toString())
            .slice(0, -1);

        embed
            .setColor(member.displayHexColor)
            .addField("Member", [
                `**❯ Highest Role:** ${
                    member.roles.highest.id === member.guild.id ? "None" : member.roles.highest.name
                }`,
                `**❯ Server Join Date:** ${moment(member.joinedAt).format("LL LTS")}`,
                `**❯ Hoist Role:** ${member.roles.hoist ? member.roles.hoist.name : "None"}`,
                `**❯ Roles:** [${roles.length}]: ${
                    roles.length == 0 ? "None" : roles.length <= 10 ? roles.join(", ") : trimArray(roles).join(", ")
                }`
            ].toString());
    }

    return embed;
}

