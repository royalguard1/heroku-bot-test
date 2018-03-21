const commando = require('discord.js-commando');

class DiceRollCommand extends commando.Command 
{
    constructor (client)
    {
        super(client, {
            name: 'roll',
            group: 'test',
            memberName: 'roll',
            description: 'Rolls a die'
        });

        
    }

    async run (message, args)
    {
        var roll = Math.floor(Math.random() * 6) + 1;    
        message.channel.send("You rolled a " + roll);

		if (this.client.isOwner(message.author))
			message.channel.send("You are the owner");
        
        message.channel.send("Args Length: " + args.length);
        
        //for (int i=0; i<args.)
    }
}

module.exports = DiceRollCommand;