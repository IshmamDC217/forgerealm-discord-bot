import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';
import { db } from '../services/database.service.js';
import { buildStatsEmbed } from '../embeds/status.embeds.js';
import { config } from '../config.js';

export const data = new SlashCommandBuilder()
  .setName('stats')
  .setDescription('Show ForgeRealm project statistics');

export async function execute(interaction: ChatInputCommandInteraction) {
  await interaction.deferReply();

  const [userCount, productCount] = await Promise.all([
    db.getUserCount().catch(() => 0),
    db.getProductCount().catch(() => 0),
  ]);

  const embed = buildStatsEmbed({
    userCount,
    productCount,
    siteUrl: config.FORGEREALM_SITE_URL,
    apiUrl: config.FORGEREALM_API_URL,
  });

  await interaction.editReply({ embeds: [embed] });
}
