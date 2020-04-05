require('dotenv').config()
const Discord = require('discord.js');

const client = new Discord.Client();

//  - - - -INITIAL VALUES - - - - -
let max_value = 0;
let max_member = "no one";
let max_message = "no one";

//  - - - -COMMANDS - - - - -
const price_command = "!price";
const max_command = "!max";

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

//  - - - - -DO FOR EVERY MESSAGE - - - - -
client.on('message', msg => {

  //  - - - - STONK - - - - -
  if (msg.content === 'stonk') {

    msg.reply(`stonks for life maddafaka`);


  //  - - - - PRICE_COMMAND - - - - -
  } else if (msg.content.startsWith(price_command)) {

    // get the price
    const intToParse = msg.content.substring(price_command.length, msg.content.len);

    // parse it to an int
    const parsedInt = parseInt(intToParse);

    // check that we did get a number
    if (isNaN(parsedInt)) {

      msg.reply(`Please input your turnip price as per the following example: "!price 42"`);

    } else {
      // checks if current price entered is greater than max price
      if (parsedInt > max_value) {

        //if so, then set new max price to current price and also set new max member to current member
        max_value = parsedInt;
        max_member = msg.author.username;

        //string message for who's setting new max price
        max_message = `${max_member} set the new max price of ${max_value}`;

        //discord js reply method w complete message that new max price has been set by ...
        msg.reply(`Noting your turnip price to be ${parsedInt}\n${max_message}`);

      } else {
        //simply for UI purposes--acknowledging user input
        // Nice to have: change this to an emoji reaction on the message.
        msg.reply(`Noting your turnip price to be ${parsedInt}`);
      }
    }

  //  - - - - MAX_COMMAND - - - - -
  } else if (msg.content.startsWith(max_command)) {

    //check if max val has been set
    //if so, then return who set it at what price
    //if not, then tell user how to set price
    if (max_message !== "no one") {

      msg.reply(`${max_member} set the max price of ${max_value}.`);

    } else {
      msg.reply(`No one has set a max price yet.\nPlease input your turnip price as per the following example: "!price 42"`)
    }

  }

  //TODO: agregar un "!wipe"--resetear el max price cada dia

  //TODO: Agregar un "!help" que de la lista de comandos y como se usan claramente.

  //TODO: guardar mas los valores de todos en una lista para poder imprimir los valores acumulados de todos.

});

client.login(process.env.TOKEN);
