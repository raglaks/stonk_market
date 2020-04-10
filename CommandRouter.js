/*
This Class contains logic to route commands to the
appropriate command handlers.

*/
import { help } from "./CommandHandlers/help_command.js";


export class Commands {

    constructor (commandPrefix) {
        this.commandPrefix = commandPrefix;
        this.initCommands();
    }

    initCommands() {
        this.price_command = command_prefix + "price";
        this.amprice_command = command_prefix + "amprice";
        this.pmprice_command = command_prefix + "pmprice";
        this.max_command = command_prefix + "max";
        this.stonk_command = command_prefix + "stonk";
        this.help_command = command_prefix + "help";
        this.buy_command = command_prefix + "buy";
        this.set_command = command_prefix + "set";
        this.wipe_command = command_prefix + "wipe";
        this.list_command = command_prefix + "list";
    }

}

export class CommandRouter {

    // note: commands is a Commands instance
    routeMessage(msg, commands, context) {

        //  - - - - STONK_COMMAND - - - - -
        if (msg.content === commands.stonk_command) {

            msg.reply(`stonks for life maddafaka \n ${msg.createdAt}`);

        //  - - - - PRICE_COMMAND - - - - -
        } else if (msg.content.startsWith(commands.price_command)) {

            const mensaje = `**Warning!** We have stopped using the !price command.\n Please use the **!amprice** and **!pmprice** commands now. Use **!help** for more information.`;

            msg.reply(mensaje);

        //  - - - - AMPRICE_COMMAND - - - - -
        } else if (msg.content.startsWith(commands.amprice_command)) {

            // get the price
            const intToParse = msg.content.substring(amprice_command.length, msg.content.len);

            // parse it to an int
            const parsedInt = parseInt(intToParse);

            // check that we did get a number
            if (isNaN(parsedInt)) {

            msg.reply(`Please input your turnip am price as per the following example: "!amprice 42"`);

            } else {

            // checks if current price entered is greater than max price
            if (parsedInt > context.max_value) {

                //if so, then set new max price to current price and also set new max member to current member
                context.max_value = parsedInt;
                context.max_member = msg.author.username;

                //string message for who's setting new max price
                context.max_message = `${context.max_member} set the new max **AM** price of ${context.max_value}`;

                //discord js reply method w complete message that new max price has been set by ...
                msg.reply(`Noting your **AM** turnip price to be ${parsedInt}\n${context.max_message}`);

            } else {
                //simply for UI purposes--acknowledging user input
                // Nice to have: change this to an emoji reaction on the message.
                msg.reply(`Noting your **AM** turnip price to be ${parsedInt}`);
            }

            // Add the number to the user's AM value.
            context.playerMembersMap.get(msg.author.username).am = parsedInt;
            
            }

        //  - - - - PMPRICE_COMMAND - - - - -
        } else if (msg.content.startsWith(commands.pmprice_command)) {

            // get the price
            const intToParse = msg.content.substring(amprice_command.length, msg.content.len);

            // parse it to an int
            const parsedInt = parseInt(intToParse);

            // check that we did get a number
            if (isNaN(parsedInt)) {

                msg.reply(`Please input your turnip pm price as per the following example: "!pmprice 42"`);

            } else {

            if (parsedInt > context.max_value) {

                //if so, then set new max price to current price and also set new max member to current member
                context.max_value = parsedInt;
                context.max_member = msg.author.username;

                //string message for who's setting new max price
                context.max_message = `${context.max_member} set the new max **PM** price of ${context.max_value}`;

                //discord js reply method w complete message that new max price has been set by ...
                msg.reply(`Noting your **PM** turnip price to be ${parsedInt}\n${context.max_message}`);

            } else {
                //simply for UI purposes--acknowledging user input
                // Nice to have: change this to an emoji reaction on the message.
                msg.reply(`Noting your **PM** turnip price to be ${parsedInt}`);
            }

            // Add the number to the user's PM value.
            context.playerMembersMap.get(msg.author.username).pm = parsedInt;
            
            }

        //  - - - - MAX_COMMAND - - - - -
        } else if (msg.content.startsWith(commands.max_command)) {

            //check if max val has been set
            //if so, then return who set it at what price
            //if not, then tell user how to set price
            if (context.max_message !== undefined) {

            msg.reply(`**${context.max_member}** has the max price of **${context.max_value}**.`);

            } else {
            msg.reply(`No one has set a max price yet.\nPlease input your turnip price as per the following example: "!pmprice 42"`)
            }

            //  - - - - HELP_COMMAND - - - - -
        } else if (msg.content.startsWith(commands.help_command)) {

            help(msg);

            //  - - - - BUY_COMMAND - - - - -
        } else if (msg.content.startsWith(commands.buy_command)) {

            let buy_message;

            if (context.set_value === 0) {
                buy_message = `No one has set the buy price for this week. Please do so as per the following example: "!set 42"`
            } else {
                buy_message = `The buy price for this week is ${context.set_value}`
            }

            msg.reply(buy_message)

            //  - - - - SET_COMMAND - - - - -
        } else if (msg.content.startsWith(commands.set_command)) {

            const intToParse = msg.content.substring(set_command.length, msg.content.len);

            const parsedInt = parseInt(intToParse);

            if (isNaN(parsedInt)) {
                msg.reply(`Please set your turnip buy price as per the following example: "!set 42"`);
            } else {
                context.set_value = parsedInt;
                msg.reply(`The turnip buy price has been set at ${context.set_value}!`)
            }

        //- - - - - -  WIPE_COMMAND - - - - -
        } else if (msg.content.startsWith(commands.wipe_command)) {

            let messagerIsManager = false;

            msg.member.roles.cache.forEach((r) => {
                if (r.name === 'manager') {
                    messagerIsManager = true;
                }
            });

            if (messagerIsManager) {
                initPlayerMembersMap();
                context.max_value = 0;
                context.max_member = "no one";
                context.max_message = undefined;
                msg.reply(`Player data wiped!`);
            } else {
                msg.reply(`I'm sorry, you don't have the necessary permissions to wipe the data. Please contact a manager.`);
            }

        // - - - - - - LIST_COMMAND - - - - 
        } else if (msg.content.startsWith(commands.list_command)) {

            let list = '\n';

            for (const e of context.playerMembersMap) {
            console.log(e);
            list += `**${e[0]}** -- *AM*: **${e[1].am}** *PM:* **${e[1].pm}**\n`;
            }
            
            msg.reply(list);
        }

    }

}