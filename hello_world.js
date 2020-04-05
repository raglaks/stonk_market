require('dotenv').config()
const Discord = require('discord.js');

const client = new Discord.Client();

let max_value = 0;
let max_member = "No one";

const price_command = "!price";

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content === 'stonk') {

    msg.reply(`stonks for life maddafaka`);
  } else if (msg.content.startsWith(price_command)) {
    // get the price
    const intToParse = msg.content.substring(price_command.length, msg.content.len);
    // parse it to an int
    const parsedInt = parseInt(intToParse);

    // check that we did get a number

    if (isNaN(parsedInt)) {
      msg.reply(`Please input your turnip price as per the following example: "!price 42"`);
    } else {
      msg.reply(`Noting your turnip price to be ${parsedInt}`);
    }



    // TODO: compararlo con el max price para ver si es mayor.

    // TODO: si es mayor, actualizar max_value y max_member
    // (el member se obtiene con msg.member)
  }

  // TODO: Agregar handling de comando !max y que regrese el precio y el nombre del member (max_member) para saber quien es

});

client.login(process.env.TOKEN);
