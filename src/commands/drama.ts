import {NamedCommand, RestCommand} from "onion-lasers-v13";
import { allowedChannels, random } from "../utils"

const people = [
    "0xBit",
    "smartfridge",
    "Spectromeda",
    "Flint",
    "pmkcanadian",
    "Delta",
    "Kevin",
    "Bee"
];

const didwhat = [
    "added pay2win items",
    "gave vip role /tpa",
    "broke the server",
    "raided Discord",
    "stole someone's code",
    "executed rm -rf /* on the server machine",
    "killed all players by mistake",
    "duped gold",
    "was demoted",
    "leaked ips of players",
];

const cry = [
    "ragequit",
    "leave minecraft community",
    "leave the team",
    "break the server on purpose",
    "commit sudoku",
    "cope and cry",
    "report the server to Mojang for violating eula"
];

export default new NamedCommand({
    description: "Sends status of Minecraft Server.",
    async run({ send, message, channel }) {
            if (allowedChannels.includes(channel.id) !== true) {
                send("You are not allowed to use commands here. Please use the commands channel ;)")
              } else {
            send(`${random(people)} ${random(didwhat)} causing ${random(people)} to ${random(cry)}`);}
        }
    })

