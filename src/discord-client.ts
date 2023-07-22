import { Client, Message, Events, GatewayIntentBits, Interaction, REST, Routes } from "discord.js";
import { commandCollection } from './commands'
import { eventCollection } from './events'
import { SlashCommand } from "./types/command";

export class DiscordClient {

  client = new Client({ 
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMembers,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent
    ] 
  });

  rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN ?? '');

  async initCommand() {
    const commands: SlashCommand[] = [];
    commandCollection.forEach(command => commands.push(command.data))
    await this.rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID ?? '', process.env.GUILD_ID ?? ''), {
      body: commands
    });
  }

  initEvents() {

    // Client Ready
    this.client.once(Events.ClientReady, async () => {
      const handler = eventCollection.get(Events.ClientReady);
      if (handler) handler.execute(this.client);
    });

    // Message Create
    this.client.on(Events.MessageCreate, async (message : Message) => {
      const handler = eventCollection.get(Events.MessageCreate);
      if (handler) handler.execute(this.client, message);
    });

    // Interaction Create
    this.client.on(Events.InteractionCreate, async(interaction : any) => {
      console.log(interaction);
      const handler = eventCollection.get(Events.InteractionCreate);
      if (handler) handler.execute(this.client, interaction); 
    });

  }

  login() {
    this.client.login(process.env.DISCORD_TOKEN ?? '');
  }
    
}