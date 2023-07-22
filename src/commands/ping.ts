import { SlashCommandBuilder } from 'discord.js';
import { SlashCommand } from '../types/command';

export const PingCommand : SlashCommand = {

  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Reply pong"),

  execute: interaction => {
    interaction.reply('pong!');
  }

}