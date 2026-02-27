import { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } from 'discord.js';
import { websiteService } from '../services/website.service.js';
import { config } from '../config.js';

export const data = new SlashCommandBuilder()
  .setName('site')
  .setDescription('Check ForgeRealm website and API status');

export async function execute(interaction: ChatInputCommandInteraction) {
  await interaction.deferReply();

  const [site, api] = await Promise.all([
    websiteService.checkSiteHealth(),
    websiteService.checkApiHealth(),
  ]);

  const embed = new EmbedBuilder()
    .setColor(site.up && api.up ? 0x84a98c : 0xef4444)
    .setTitle('ForgeRealm — Site Check')
    .addFields(
      {
        name: 'Website',
        value: site.up ? `Online (${site.latency}ms)` : `Down`,
        inline: true,
      },
      {
        name: 'API',
        value: api.up ? `Online (${api.latency}ms)` : `Down`,
        inline: true,
      },
      { name: 'Website URL', value: config.FORGEREALM_SITE_URL },
      { name: 'API URL', value: config.FORGEREALM_API_URL },
    )
    .setFooter({ text: 'ForgeRealm Monitor' })
    .setTimestamp();

  await interaction.editReply({ embeds: [embed] });
}
