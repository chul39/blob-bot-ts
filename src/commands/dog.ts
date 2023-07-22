import { EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import { SlashCommand } from '../types/command';
import { fetchRequest } from '../../utils/fetch-request';

const breedList : string[] = [];

export const DogCommand : SlashCommand = {

  data: new SlashCommandBuilder()
    .setName('dog')
    .setDescription('Send dog image')
    .addStringOption(option =>
	    option
      .setName('breed')
	    .setDescription('Breed of dog')
	  ),

  execute: async (interaction) => {

    try {

      // Initilize breed list
      if (breedList.length === 0) {
        try {
          const response : { message: Object, status: string } = await fetchRequest('https://dog.ceo/api/breeds/list/all');
          if (response.status !== 'success') throw new Error('Failed to get breed list');
          for (const [key, val] of Object.entries(response.message)) {
            if (val.length > 0) val.forEach((subKey: string) => breedList.push(`${subKey} ${key}`));
            breedList.push(key);
          }
        } catch (err) {
          console.error(err);
          interaction.reply('Failed to get breed list');
        }
      }

      // Check user input
      const breed = interaction.options.get('breed')?.value;
      const breedFormatted : string = breed && typeof breed === 'string' ? breed.toLowerCase() : '';
      let url = ''
      if (breed) {
        const params = breedFormatted.split(' ').reverse().join('/')
        if (breedList.includes(breedFormatted)) url = `https://dog.ceo/api/breed/${params}/images/random`;
        else return interaction.reply('Unkown breed');
      } else {
        url = 'https://dog.ceo/api/breeds/image/random';
      }

      // Get image
      const response : { message: string, status: string } = await fetchRequest(url);
      if (response.status !== 'success') throw new Error('Failed to get image');

      // Create embed and reply
      const embed = new EmbedBuilder()
        .setTitle(`Cute Doggo 🐶`)
        .setImage(response.message)
        .setTimestamp();
      interaction.reply({ embeds: [embed] });

    } catch (err) {
      console.error(err);
      interaction.reply('Failed to get image');
    }

  },

}