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

      // compararlo con el max price para ver si es mayor
      // si es mayor, actualizar max_value y max_member
      // (el member se obtiene con msg.member)
      //DONE

      if (parsedInt > max_value) {

        max_value = parsedInt;

        max_member = msg.author.username;

        let max_message = `${max_member} set the new max price of ${max_value}`;

        msg.reply(`Noting your turnip price to be ${parsedInt}\n${max_message}`);

      } else {

        msg.reply(`Noting your turnip price to be ${parsedInt}`);

      }
      
    }

  }

  // TODO: Agregar handling de comando !max y que regrese el precio y el nombre del member (max_member) para saber quien es

  //TODO: agregar un "wipe"--resetear el max price cada dia

});

client.login(process.env.TOKEN);
