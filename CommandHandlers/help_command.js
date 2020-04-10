export function help(msg) {

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

}