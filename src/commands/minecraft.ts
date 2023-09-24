import { EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import { SlashCommand } from '../types/command';
import { fetchRequest } from '../utils/fetch-request';

export const MinecraftCommand : SlashCommand = {

  data: new SlashCommandBuilder()
    .setName('minecraft')
    .setDescription('Manage Minecraft server')
    .addStringOption(option =>
      option
        .setName('action')
        .setDescription('Action to be done')
        .setRequired(true)
        .addChoices(
          { name: 'start', value: 'start' },
          { name: 'stop', value: 'stop' }
	  )
    ),

  execute: async (interaction) => {

    const action = interaction.options.get('action')?.value;
    let url = null;

    switch (action) {

      case 'start':
        url = process.env?.MC_SERVER_API + 'start-server'
        break;

      case 'stop':
        url = process.env?.MC_SERVER_API + 'stop-server'
        break;

      default:
        break;
    
    }

    if (!url) {
      interaction.reply('Unknown action');
      return;
    }

    try {
      const response : { message: string, status: string } = await fetchRequest(url);
      if (response.status !== 'success') throw new Error(`Failed to ${action} the server`);
      else interaction.reply(response.message);
    } catch (err) {
      console.error(err);
      interaction.reply('Error has occured.');
    }

  },

}