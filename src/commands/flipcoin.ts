import { AttachmentBuilder, EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import { SlashCommand } from '../types/command';

interface CoinObject {
  path: string,
  name: string,
  text: string
}

const headObj : CoinObject = {
  path: './assets/images/coin-head.png', 
  name: 'coin-head.png',
  text: 'หัวปลา'
}
  
const tailObj : CoinObject = {
  path: './assets/images/coin-tail.png', 
  name: 'coin-tail.png',
  text: 'หางปลา'
}

export const FlipCoinCommand : SlashCommand = {

  data: new SlashCommandBuilder()
    .setName('flipcoin')
    .setDescription('Flip the coin'),

  execute: interaction => {
    const result : CoinObject = Math.random() < 0.5 ? headObj : tailObj;
    const attachment = new AttachmentBuilder(result.path);
    const embed = new EmbedBuilder()
      .setTitle(`${result.text}`)
      .setImage(`attachment://${result.name}`)
      .setTimestamp();
    interaction.reply({ embeds: [embed], files: [attachment] });
  }

}