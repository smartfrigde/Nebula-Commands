import { NamedCommand } from "onion-lasers-v13";
import { allowedChannels } from "../utils"
const EMBED_COLOR = 0x191970;
export default new NamedCommand({
  description: "Shows command list.",
  async run({ send, message, channel }) {
    if (allowedChannels.includes(channel.id) !== true) {
      send("You are not allowed to use commands here. Please use the commands channel ;)")
    } else {
    const user = message.author;

    const embed = {
        color: EMBED_COLOR,
        author: {
          name: user.username,
          icon_url: user.displayAvatarURL({
            format: "png",
            dynamic: true,
          }),
        },
        fields: [
          {
            name: "-status",
            value: "Shows current status of Minecraft Server",
          },
          {
            name: "-help",
            value: "Shows this embed",
          },
          {
            name: "-pat <user>",
            value: "Pet someone.",
          },
          {
            name: "-player <uuid/username>",
            value: "Check player username/uuid.",
          },
          {
            name: "-usage",
            value: "Check information about the server hardware.",
          },
          {
            name: "-8ball <question>",
            value: "Just a simple 8ball command.",
          },
        ],
    };
    send({embeds: [embed]});
  }}
});
