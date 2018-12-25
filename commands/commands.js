module.exports = {
  name: "help",
  description: "List all bot commands.",
  usage:" ",
  execute(message, args,client, prefix) {
    if (!args[0]) {
      message.channel.send(`= Command List =\n\n[Use ${prefix}help <commandname> for details]\n\n${client.commands.map(c=>`${c.name}:: ${c.description}`).join("\n")}`, {code: "asciidoc"});
  } else {
    let command = args[0];
    if(client.commands.has(command)) {
      command = client.commands.get(command);
      message.channel.send(`= ${command.name} = \n${command.description}\n${command.usage}`, {code: "asciidoc"});
    }
  }
    
    // args[0]
  }
};
