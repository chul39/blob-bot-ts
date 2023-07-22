import { AttachmentBuilder, EmbedBuilder, SlashCommandBuilder, User } from 'discord.js';
import { SlashCommand } from '../types/command';
import { createCanvas, loadImage } from '@napi-rs/canvas';

export const HugCommand : SlashCommand = {

  data: new SlashCommandBuilder()
    .setName("hug")
    .setDescription("Hug someone ❤")
    .addUserOption(option =>
      option
        .setName('target')
        .setDescription('User you want to hug')
        .setRequired(true)
    ),

  execute: async (interaction) => {

    // Get user info
    let target = interaction.options.get('target')?.user;
    if (!target) return;

    // Drawing
    const canvas = createCanvas(250, 257);
    const ctx = canvas.getContext('2d');
    const layer1 = await loadImage('./assets/images/blob-hug-1.png');
    const layer2 = await loadImage(target.displayAvatarURL());
    const layer3 = await loadImage('./assets/images/blob-hug-2.png');
    ctx.drawImage(layer1, 0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.beginPath();
    ctx.arc(128.5, 160.5, 56.5, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(layer2, 72, 104, 113, 113);
    ctx.restore();
    ctx.drawImage(layer3, 0, 0, canvas.width, canvas.height);
    
    // Create Embed and reply
    const file = new AttachmentBuilder(await canvas.encode('png'), { name: 'blob-hug.png' });
    const embed = new EmbedBuilder()
      .setTitle("Let me give you love!")
      .setDescription(`wuv u <@${target.id}> 💗`)
	  .setImage('attachment://blob-hug.png')
      .setTimestamp();
    interaction.reply({ embeds: [embed], files: [file] });

  }

}