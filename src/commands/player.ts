import { NamedCommand, RestCommand } from "onion-lasers-v13";
import { allowedChannels } from "../utils"
const EMBED_COLOR = 0x191970;
import fetch from "node-fetch";

export default new NamedCommand({
  description: "Checks username/uuid.",
  run: "You need to enter username/uuid for this command to function!",
  any: new RestCommand({
  async run({ send, args, channel}) {
    if (allowedChannels.includes(channel.id) !== true) {
      send("You are not allowed to use commands here. Please use the commands channel ;)")
    } else {
    let url = `https://playerdb.co/api/player/minecraft/${args}`;

    fetch(url)
      .then((res) => res.json())
      .then((out :any) => {
        if(out.code === "player.found") {
            send(out.message);
            var failure = 0;
        } else {
          send("API Failure. Check if you typed everything correctly ;)");
          var failure = 1;
        };
        if (failure === 0){
        const embed = {
            color: EMBED_COLOR,
            author: {
              name: out.data.player.username,
              icon_url: out.data.player.avatar
            },
            fields: [
              {
                name: "UUID:",
                value: out.data.player.id,
              },
            ],
        };
        send({embeds: [embed]});}
      })
      .catch((err) => {
        throw err;
      });
  }}
})});
