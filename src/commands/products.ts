import { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } from 'discord.js';
import { db } from '../services/database.service.js';

export const data = new SlashCommandBuilder()
  .setName('products')
  .setDescription('List all ForgeRealm shop products');

export async function execute(interaction: ChatInputCommandInteraction) {
  await interaction.deferReply();

  const products = await db.getAllProducts();

  if (products.length === 0) {
    await interaction.editReply('No products in the shop yet.');
    return;
  }

  const embed = new EmbedBuilder()
    .setColor(0x84a98c)
    .setTitle('ForgeRealm — Shop Products')
    .setDescription(
      products
        .map(
          (p) =>
            `**${p.name}** — £${p.price.toFixed(2)} | ${p.stock} in stock\n${p.description?.slice(0, 80) || 'No description'}`,
        )
        .join('\n\n'),
    )
    .setFooter({ text: `${products.length} product(s)` })
    .setTimestamp();

  await interaction.editReply({ embeds: [embed] });
}
