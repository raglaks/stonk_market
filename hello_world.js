require('dotenv').config()
const Discord = require('discord.js');

const client = new Discord.Client();

//https://discordapp.com/oauth2/authorize?client_id=696881559399301220&scope=bot

// Checking for prod environment.
let isProd = false; // let's say it's not.

const myArgs = process.argv.slice(2);
if(myArgs[0] === 'prod') {
  isProd = true;
}

//  - - - -INITIAL VALUES - - - - -
let max_value = 0;
let max_member = "no one";
let max_message = undefined;
let set_value = 0;

// - - - - - DATA STRUCTURES - - - - - - 
// note: this is not the way we want to go for structure, leaving as a placeholder.
let playerMembersMap = new Map(); // structure: { 'playerName' => DayData{ am : number, pm : number} }

class DayData {
  constructor() {
    this.am = 0;
    this.pm = 0;
  }
}

//  - - - -COMMANDS - - - - -
// TODO: If production or testing, change command prefix.
let command_prefix = undefined;

if (isProd) {
  command_prefix = '!';
} else {
  command_prefix = '-';
}

// TODO: clean this shit up... it's dirty but it works...
const price_command = command_prefix + "price";
const amprice_command = command_prefix + "amprice";
const pmprice_command = command_prefix + "pmprice";
const max_command = command_prefix + "max";
const stonk_command = command_prefix + "stonk";
const help_command = command_prefix + "help";
const buy_command = command_prefix + "buy";
const set_command = command_prefix + "set";
const wipe_command = command_prefix + "wipe";
const list_command = command_prefix + "list";

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);

  // do some init things.
  initPlayerMembersMap();

});

//  - - - - -DO FOR EVERY MESSAGE - - - - -
client.on('message', msg => {

  //  - - - - STONK_COMMAND - - - - -
  if (msg.content === stonk_command) {

    msg.reply(`stonks for life maddafaka \n ${msg.createdAt}`);

  //  - - - - PRICE_COMMAND - - - - -
  } else if (msg.content.startsWith(price_command)) {

    const mensaje = `**Warning!** We have stopped using the !price command.\n Please use the **!amprice** and **!pmprice** commands now. Use **!help** for more information.`;

    msg.reply(mensaje);

  //  - - - - AMPRICE_COMMAND - - - - -
  } else if (msg.content.startsWith(amprice_command)) {

    // get the price
    const intToParse = msg.content.substring(amprice_command.length, msg.content.len);

    // parse it to an int
    const parsedInt = parseInt(intToParse);

    // check that we did get a number
    if (isNaN(parsedInt)) {

      msg.reply(`Please input your turnip am price as per the following example: "!amprice 42"`);

    } else {

      // checks if current price entered is greater than max price
      if (parsedInt > max_value) {

        //if so, then set new max price to current price and also set new max member to current member
        max_value = parsedInt;
        max_member = msg.author.username;

        //string message for who's setting new max price
        max_message = `${max_member} set the new max **AM** price of ${max_value}`;

        //discord js reply method w complete message that new max price has been set by ...
        msg.reply(`Noting your **AM** turnip price to be ${parsedInt}\n${max_message}`);

      } else {
        //simply for UI purposes--acknowledging user input
        // Nice to have: change this to an emoji reaction on the message.
        msg.reply(`Noting your **AM** turnip price to be ${parsedInt}`);
      }

      // Add the number to the user's AM value.
      playerMembersMap.get(msg.author.username).am = parsedInt;
      
    }

  //  - - - - PMPRICE_COMMAND - - - - -
  } else if (msg.content.startsWith(pmprice_command)) {

    // get the price
    const intToParse = msg.content.substring(amprice_command.length, msg.content.len);

    // parse it to an int
    const parsedInt = parseInt(intToParse);

    // check that we did get a number
    if (isNaN(parsedInt)) {

      msg.reply(`Please input your turnip pm price as per the following example: "!pmprice 42"`);

    } else {

      if (parsedInt > max_value) {

        //if so, then set new max price to current price and also set new max member to current member
        max_value = parsedInt;
        max_member = msg.author.username;

        //string message for who's setting new max price
        max_message = `${max_member} set the new max **PM** price of ${max_value}`;

        //discord js reply method w complete message that new max price has been set by ...
        msg.reply(`Noting your **PM** turnip price to be ${parsedInt}\n${max_message}`);

      } else {
        //simply for UI purposes--acknowledging user input
        // Nice to have: change this to an emoji reaction on the message.
        msg.reply(`Noting your **PM** turnip price to be ${parsedInt}`);
      }

      // Add the number to the user's PM value.
      playerMembersMap.get(msg.author.username).pm = parsedInt;
      
    }

  //  - - - - MAX_COMMAND - - - - -
  } else if (msg.content.startsWith(max_command)) {

    //check if max val has been set
    //if so, then return who set it at what price
    //if not, then tell user how to set price
    if (max_message !== undefined) {

      msg.reply(`**${max_member}** has the max price of **${max_value}**.`);

    } else {
      msg.reply(`No one has set a max price yet.\nPlease input your turnip price as per the following example: "!pmprice 42"`)
    }

    //  - - - - HELP_COMMAND - - - - -
  } else if (msg.content.startsWith(help_command)) {

    let help_message = `
    Hi @${msg.author.username}! Here are a few commands that you can run:\n
    **!amprice**: Set your AM turnip price as per the following example: "!amprice 42"\n
    **!pmprice**: Set your PM turnip price as per the following example: "!pmprice 96"\n
    **!wipe**: To wipe (reset to zero) the list of users' AM and PM prices.\n
    **!max**: to check the current max price and the user that set it\n
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

  //- - - - - -  WIPE_COMMAND - - - - -
  } else if (msg.content.startsWith(wipe_command)) {

    let messagerIsManager = false;

    msg.member.roles.cache.forEach((r) => {
      if (r.name === 'manager') {
        messagerIsManager = true;
      }
    });

    if (messagerIsManager) {
      initPlayerMembersMap();
      max_value = 0;
      max_member = "no one";
      max_message = undefined;
      msg.reply(`Player data wiped!`);
    } else {
      msg.reply(`I'm sorry, you don't have the necessary permissions to wipe the data. Please contact a manager.`);
    }

  // - - - - - - LIST_COMMAND - - - - 
  } else if (msg.content.startsWith(list_command)) {

    let list = '\n';

    for (const e of playerMembersMap) {
      console.log(e);
      list += `**${e[0]}** -- *AM*: **${e[1].am}** *PM:* **${e[1].pm}**\n`;
    }
    
    msg.reply(list);
  }
});

function initPlayerMembersMap() {
  client.guilds.resolve(process.env.GUILD_ID).members.cache.forEach( (m) => {
    m.roles.cache.forEach((r) => {
      if (r.name === 'player') {
        playerMembersMap.set(m.user.username, new DayData());
      }
    });
  });
}

// start the connection with the correct token depending on the environment.
let token = '';

if (isProd) {
  token = process.env.TOKEN;
} else {
  token = process.env.LOCAL_TOKEN;
}

client.login(token);