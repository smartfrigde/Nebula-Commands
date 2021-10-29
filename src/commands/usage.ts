import { NamedCommand } from "onion-lasers-v13";
import {MessageEmbed} from "discord.js";
import ms from "ms";
import os from "os";
import { allowedChannels } from "../utils"
function formatBytes(bytes: any) {
    if (bytes === 0) return "0 Bytes";
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${parseFloat((bytes / Math.pow(1024, i)).toFixed(2))} ${sizes[i]}`;
}
export default new NamedCommand({
  description: "Shows usage.",
  async run({send, guild, client, channel}) {
    if (allowedChannels.includes(channel.id) !== true) {
        send("You are not allowed to use commands here. Please use the commands channel ;)")
      } else {
    const core = os.cpus()[0];
    const embed = new MessageEmbed()
        .setColor(guild?.me?.displayHexColor || "BLUE")
        .addField("System", [
            `**❯ Platform:** ${process.platform}`,
            `**❯ Uptime:** ${ms(os.uptime() * 1000, {
                long: true
            })}`,
            `**❯ CPU:**`,
            `\u3000 • Cores: ${os.cpus().length}`,
            `\u3000 • Model: ${core.model}`,
            `\u3000 • Speed: ${core.speed}MHz`,
            `**❯ Bot Memory:**`,
            `\u3000 • Total: ${formatBytes(process.memoryUsage().heapTotal)}`,
            `\u3000 • Used: ${formatBytes(process.memoryUsage().heapUsed)}`
        ].join("\n"))
        .setTimestamp();
    const avatarURL = client.user?.displayAvatarURL({
        dynamic: true,
        size: 2048
    });
    if (avatarURL) embed.setThumbnail(avatarURL);
    send({embeds: [embed]});
}}
});
