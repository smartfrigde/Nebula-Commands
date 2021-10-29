import * as dotenv from 'dotenv';
import {launch} from "onion-lasers-v13";
import {Client, Intents} from "discord.js";
import path from "path";

import {log} from "./utils"
log("Starting...");

//initiliaze dotenv
dotenv.config();
import './db';
export const client = new Client({
  intents: [
      Intents.FLAGS.GUILDS,
      Intents.FLAGS.GUILD_MEMBERS,
      Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
      Intents.FLAGS.GUILD_VOICE_STATES,
      Intents.FLAGS.GUILD_PRESENCES,
      Intents.FLAGS.GUILD_MESSAGES,
      Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
      Intents.FLAGS.DIRECT_MESSAGES
  ]
});
client.login(process.env.TOKEN);

launch(client, path.join(__dirname, "commands"), {
  getPrefix: () => "-",
  //slashCommandDevServers: process.env.DEV_SERVERS?.split(",") to-do?
});


log(`Welcome to NebulaDiscord ${process.env.npm_package_version}`);
// Initialize Modules
import "./modules/botEvents"
import "./modules/altDetector"
import "./modules/PresenceHack"
log("All modules have been initialized.")