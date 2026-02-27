import { EmbedBuilder } from 'discord.js';

const SAGE = 0x84a98c;

interface StatusData {
  siteUp: boolean;
  siteLatency: number;
  apiUp: boolean;
  apiLatency: number;
  dbConnected: boolean;
  userCount: number;
  productCount: number;
  botUptime: string;
}

export function buildStatusEmbed(data: StatusData): EmbedBuilder {
  const siteStatus = data.siteUp ? `Online (${data.siteLatency}ms)` : 'Down';
  const apiStatus = data.apiUp ? `Online (${data.apiLatency}ms)` : 'Down';
  const dbStatus = data.dbConnected
    ? `Connected — ${data.userCount} users, ${data.productCount} products`
    : 'Disconnected';

  return new EmbedBuilder()
    .setColor(SAGE)
    .setTitle('ForgeRealm — System Status')
    .addFields(
      { name: 'Website', value: siteStatus, inline: true },
      { name: 'API', value: apiStatus, inline: true },
      { name: '\u200b', value: '\u200b', inline: true },
      { name: 'Database', value: dbStatus },
      { name: 'Bot Uptime', value: data.botUptime, inline: true },
    )
    .setFooter({ text: 'ForgeRealm Monitor' })
    .setTimestamp();
}

export function buildStatsEmbed(data: {
  userCount: number;
  productCount: number;
  siteUrl: string;
  apiUrl: string;
}): EmbedBuilder {
  return new EmbedBuilder()
    .setColor(SAGE)
    .setTitle('ForgeRealm — Stats')
    .addFields(
      { name: 'Total Users', value: `${data.userCount}`, inline: true },
      { name: 'Total Products', value: `${data.productCount}`, inline: true },
      { name: 'Website', value: data.siteUrl },
      { name: 'API', value: data.apiUrl },
    )
    .setFooter({ text: 'ForgeRealm Monitor' })
    .setTimestamp();
}
