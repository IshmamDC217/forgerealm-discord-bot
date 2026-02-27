import { EmbedBuilder } from 'discord.js';
import { config } from '../config.js';

const SAGE = 0x84a98c;
const RED = 0xef4444;
const OLIVE = 0xa3b18a;

export function buildSiteChangeEmbed(page: string): EmbedBuilder {
  return new EmbedBuilder()
    .setColor(SAGE)
    .setTitle('Website Updated')
    .setDescription(`A content change was detected on ForgeRealm.`)
    .addFields(
      { name: 'Page', value: page || '/', inline: true },
      { name: 'Link', value: `${config.FORGEREALM_SITE_URL}${page}`, inline: true },
    )
    .setFooter({ text: 'ForgeRealm Monitor' })
    .setTimestamp();
}

export function buildApiDownEmbed(latency: number): EmbedBuilder {
  return new EmbedBuilder()
    .setColor(RED)
    .setTitle('API Down')
    .setDescription(`**${config.FORGEREALM_API_URL}** is not responding.`)
    .addFields(
      { name: 'Response Time', value: `${latency}ms (timeout)`, inline: true },
    )
    .setFooter({ text: 'ForgeRealm Monitor' })
    .setTimestamp();
}

export function buildApiRecoveredEmbed(latency: number, downtime: string): EmbedBuilder {
  return new EmbedBuilder()
    .setColor(OLIVE)
    .setTitle('API Recovered')
    .setDescription(`**${config.FORGEREALM_API_URL}** is back online.`)
    .addFields(
      { name: 'Response Time', value: `${latency}ms`, inline: true },
      { name: 'Downtime', value: downtime, inline: true },
    )
    .setFooter({ text: 'ForgeRealm Monitor' })
    .setTimestamp();
}
