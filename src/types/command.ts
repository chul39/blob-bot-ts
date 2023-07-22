import { AutocompleteInteraction, CommandInteraction, SlashCommandBuilder  } from "discord.js";

export interface SlashCommand {
  data: SlashCommandBuilder | any,
  execute: (interaction : CommandInteraction) => void,
  autocomplete?: (interaction: AutocompleteInteraction) => void,
  cooldown?: number
}