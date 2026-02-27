import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';
import { websiteService } from '../services/website.service.js';
import { db } from '../services/database.service.js';
import { buildStatusEmbed } from '../embeds/status.embeds.js';

const startTime = Date.now();

export const data = new SlashCommandBuilder()
  .setName('status')
  .setDescription('Show ForgeRealm system status dashboard');

export async function execute(interaction: ChatInputCommandInteraction) {
  await interaction.deferReply();

  const [site, api, dbConnected, userCount, productCount] = await Promise.all([
    websiteService.checkSiteHealth(),
    websiteService.checkApiHealth(),
    db.isConnected(),
    db.getUserCount().catch(() => 0),
    db.getProductCount().catch(() => 0),
  ]);

  const uptimeMs = Date.now() - startTime;
  const hours = Math.floor(uptimeMs / 3600000);
  const minutes = Math.floor((uptimeMs % 3600000) / 60000);
  const botUptime = hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;

  const embed = buildStatusEmbed({
    siteUp: site.up,
    siteLatency: site.latency,
    apiUp: api.up,
    apiLatency: api.latency,
    dbConnected,
    userCount,
    productCount,
    botUptime,
  });

  await interaction.editReply({ embeds: [embed] });
}
