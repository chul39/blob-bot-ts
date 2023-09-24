import { AttachmentBuilder, EmbedBuilder, SlashCommandBuilder, User } from 'discord.js';
import { SlashCommand } from '../types/command';
import { createCanvas, loadImage } from '@napi-rs/canvas';

export const ShootCommand : SlashCommand = {

  data: new SlashCommandBuilder()
    .setName("aim")
    .setDescription("Aim a gun to someone")
    .addUserOption(option =>
      option
        .setName('target')
        .setDescription('User you want to aim your gun at')
        .setRequired(true)
    ),

  execute: async (interaction) => {

    // Get user info
    let target = interaction.options.get('target')?.user;
    if (!target) return;

    // Drawing
    const canvas = createCanvas(400, 200);
    const ctx = canvas.getContext('2d');
    const background = await loadImage('./assets/images/blob-gun.png');
    const avatar = await loadImage(target.displayAvatarURL());
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(avatar, 200, 0, 200, 200);
    
    // Create Embed and reply
    const file = new AttachmentBuilder(await canvas.encode('png'), { name: 'blob-shoot.png' });
    const embed = new EmbedBuilder()
      .setTitle("Freeze! Don't move!")
      .setDescription(`You are arrested, <@${target.id}>!`)
	    .setImage('attachment://blob-shoot.png')
      .setTimestamp();
    interaction.reply({ embeds: [embed], files: [file] });

  }

}