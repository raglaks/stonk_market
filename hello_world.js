require('dotenv').config()
const Discord = require('discord.js');

const client = new Discord.Client();

//https://discordapp.com/oauth2/authorize?client_id=696881559399301220&scope=bot

//  - - - -INITIAL VALUES - - - - -
let max_value = 0;
let max_member = "no one";
let max_message = undefined;
let reset_guard_tripped = false; // to make sure reset is called twice.
let set_value = 0;

//  - - - -COMMANDS - - - - -
const price_command = "!price";
const max_command = "!max";
const stonk_command = "!stonk";
const reset_command = "!reset";
const help_command = "!help";
const buy_command = "!buy";
const set_command = "!set";

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

//  - - - - -DO FOR EVERY MESSAGE - - - - -
client.on('message', msg => {

  //  - - - - STONK_COMMAND - - - - -
  if (msg.content === stonk_command) {

    msg.reply(`stonks for life maddafaka \n ${msg.createdAt}`);


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
    if (max_message !== undefined) {

      msg.reply(`**${max_member}** has the max price of **${max_value}**.`);

    } else {
      msg.reply(`No one has set a max price yet.\nPlease input your turnip price as per the following example: "!price 42"`)
    }

  //  - - - - RESET_COMMAND - - - - -
  } else if (msg.content.startsWith(reset_command)) {

    // trip the guard if it isn't tripped.
    if (!reset_guard_tripped) {
      reset_guard_tripped = true;
      msg.reply(`**Please type !reset one more time if you're sure you want to reset the prices**.`);
    } else {
      max_value = 0;
      max_member = "no one";
      max_message = undefined;
      reset_guard_tripped = false;
      msg.reply(`Prices cleared.`);
    }

    //  - - - - HELP_COMMAND - - - - -
  } else if (msg.content.startsWith(help_command)) {

    let help_message = `
    Hi @${msg.author.username}! Here are a few commands that you can run:\n
    **!price**: your turnip price can be set as per the following example: "!price 42"\n
    **!max**: to check the current max price and the user that set it\n
    **!reset**: to reset the current max price--PLEASE RUN THIS TWICE IF YOU'RE ABSOLUTELY SURE ABOUT THE RESET\n
    **!set**: to set the buy price for the week as per the following example: "!set 42"\n
    **!buy**: to check the buy price of the current week\n
    **!stonk**: only for real stonkers\n
    `
    msg.reply(help_message)

    //  - - - - BUY_COMMAND - - - - -
  } else if (msg.content.startsWith(buy_command)) {

    let buy_message;

    if (set_value === 0) {
      buy_message = `No one has set the buy price for this week. Please do so as per the following example: "!set 42"`
    } else {
      buy_message = `The buy price for this week is ${set_value}`
    }

    msg.reply(buy_message)

    //  - - - - SET_COMMAND - - - - -
  } else if (msg.content.startsWith(set_command)) {

    const intToParse = msg.content.substring(set_command.length, msg.content.len);

    const parsedInt = parseInt(intToParse);

    if (isNaN(parsedInt)) {
      msg.reply(`Please set your turnip buy price as per the following example: "!set 42"`);
    } else {
      set_value = parsedInt;
      msg.reply(`The turnip buy price has been set at ${set_value}!`)
    }

  }

  //TODO: Agregar un "!help" que de la lista de comandos y como se usan claramente.

  //TODO: guardar mas los valores de todos en una lista para poder imprimir los valores acumulados de todos.

  //TODO (long-term but would be v cool): start collecting data individually and collectively for future analysis

});

client.login(process.env.LOCAL_TOKEN);
