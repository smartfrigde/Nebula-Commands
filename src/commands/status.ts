import { NamedCommand } from "onion-lasers-v13";
import { probe } from "@network-utils/tcp-ping";
import { allowedChannels } from "../utils"
const EMBED_COLOR = 0x62499c;
export default new NamedCommand({
  description: "Sends status of Minecraft Server.",
  async run({ send, message, channel }) {
    if (allowedChannels.includes(channel.id) !== true) {
      send("You are not allowed to use commands here. Please use the commands channel ;)")
    } else {
    const user = message.author;
    
    const hostReachable = await probe(25565, "157.90.65.146", 500);


    if (hostReachable) var status = "Online :green_circle:";
    else var status = "Offline :red_circle:";
    const websiteReachable = await probe(443, "nebulamc.org", 500);
    if (websiteReachable) var website = "Online :green_circle:";
    else var website = "Offline :red_circle:";
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
            name: "Minecraft Server:",
            value: status,
          },
          {
            name: "Website:",
            value: website,
          },
        ],
    };
    send({embeds: [embed]});
  }}
});
