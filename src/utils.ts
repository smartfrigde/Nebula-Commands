//place to store various arrays, variablies, functions that are commonly used all over used in the bot
export const allowedChannels = ["757411373167935519", "868117861497991168", "896386048458895420"]; //nebula commands channel and smartfridge discord bot test channel, nebula dev discord ;P
export function log(msg: string) {
  console.log("%c[Nebula Commands]", "color: purple;", msg);
}
export function error(msg: string) {
  console.error("%c[Nebula Commands]", "color: red;", msg);
}
export function warn(msg: string) {
  console.warn("%c[Nebula Commands]", "color: yellow;", msg);
}
export function random<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}
export const developerIDs = [ '853465143619223602','755682802325913630','388777079455612929','844719224861097997', '244925941036351489', '424639027606585356'];
async function getData(url: string) {
  const response = await fetch(url);

  return response.json();
}