import { Client, CommandInteraction, Events, Interaction, InteractionType } from "discord.js";
import { EventHandler } from "../types/event-handler";
import { commandCollection } from "../commands";

export class InteractionCreateHandler implements EventHandler {

  async execute(client: Client, interaction?: CommandInteraction): Promise<void> {
    if (!interaction) return;
    if (interaction.user.bot) return;
    const command = commandCollection.get(interaction.commandName);
    if (!command) return;
    command.execute(interaction);
  }

}