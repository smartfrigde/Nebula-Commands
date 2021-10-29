import { NamedCommand, RestCommand } from "onion-lasers-v13";
import { MessageAttachment } from "discord.js";
import nodeHtmlToImage from 'node-html-to-image'
import { allowedChannels } from "../utils"
function makeid(length: number) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() *
      charactersLength));
  }
  return result;
}

export default new NamedCommand({
  run: "You need to enter some text!",
  any: new RestCommand({
    async run({ send, message, channel, guild, author, member, client, combined }) {
      if (allowedChannels.includes(channel.id) !== true) {
        send("You are not allowed to use commands here. Please use the commands channel ;)")
      } else {
        const _htmlTemplate =
          `
<!DOCTYPE html>
    <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <style>
      body {
        font-family: Arial, Helvetica, sans-serif;
        background: rgb(22, 22, 22);
        color: #fff;
      }

      .app {
        padding: 20px;
        display: flex;
        flex-direction: row;
        border-top: 3px solid #ecabff;
        background: rgb(31, 31, 31);
        align-items: center;
      }
      .announcement {
        display: inline-block;
        overflow-wrap: break-word;
        align-items: center;
        hyphens: manual;
      }
      .pfp {
        width: 50px;
        height: 50px;
        margin-right: 20px;
        border-radius: 50%;
        border: 1px solid #fff;
        padding: 5px;
      }
      .logo {
        width: 222px;
        height: 80px;
        padding: 5px;
        display: block;
      margin-left: auto;
      margin-right: auto;
      }
    </style>
  </head>
  <body>
    <div class="app">
      <img class="logo" src="https://media.discordapp.net/attachments/870234276132700170/896384749352919150/full-logo-ip.png?width=1440&height=339" />
      </br>
    </div>
    <div class="announcement">
        <h3>${combined}</h3>
      </div>
      <div class="app">
      <img class="pfp" src="${author.displayAvatarURL({ format: "png", dynamic: true, })}" />

      <h4>Announcement made by ${author.username}</h4>
      </br>
    </div>
  </body>
</html>
`
        const filename = makeid(10);
        await nodeHtmlToImage({
          html: _htmlTemplate,
          quality: 100,
          type: 'jpeg',
          output: `dist/${filename}.png`,
          puppeteerArgs: {
            args: ['--no-sandbox'],
          },
          encoding: 'binary',
        })
        send({ files: [`dist/${filename}.png`] })
      }
    }
  })
});
