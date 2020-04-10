import { Commands, CommandRouter } from "./CommandRouter.js";

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
let context = {};
context.max_value = 0;
context.max_member = "no one";
context.max_message = undefined;
context.set_value = 0;

// - - - - - DATA STRUCTURES - - - - - - 
// note: this is not the way we want to go for structure, leaving as a placeholder.
context.playerMembersMap = new Map(); // structure: { 'playerName' => DayData{ am : number, pm : number} }

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


client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);

  // do some init things.
  initPlayerMembersMap();

});

//  - - - - -DO FOR EVERY MESSAGE - - - - -
client.on('message', msg => {

  // Make a function that handles everything... entry point.
  CommandRouter.routeMessage(msg, new Commands(command_prefix), context);
  
});

function initPlayerMembersMap() {
  client.guilds.resolve(process.env.GUILD_ID).members.cache.forEach( (m) => {
    m.roles.cache.forEach((r) => {
      if (r.name === 'player') {
        context.playerMembersMap.set(m.user.username, new DayData());
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