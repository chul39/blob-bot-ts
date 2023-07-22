import { EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import { SlashCommand } from '../types/command';

export const RandomCommand : SlashCommand = {
  
  data: new SlashCommandBuilder()
    .setName("random")
    .setDescription("Random a number"),

  execute: interaction => {
    const embed = new EmbedBuilder()
      .setTitle("Ramdom!")
      .setDescription(`<@${ interaction.user.id }> rolls a 🎲 ${ Math.floor(Math.random() * 999) }`)
      .setTimestamp();
    interaction.reply({ embeds: [embed] });
  }

}