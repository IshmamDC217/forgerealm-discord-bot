import { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } from 'discord.js';
import { db } from '../services/database.service.js';

export const data = new SlashCommandBuilder()
  .setName('users')
  .setDescription('Show ForgeRealm user count and recent signups');

export async function execute(interaction: ChatInputCommandInteraction) {
  await interaction.deferReply();

  const [userCount, recentUsers] = await Promise.all([
    db.getUserCount(),
    db.getRecentUsers(5),
  ]);

  const recentList =
    recentUsers.length > 0
      ? recentUsers
          .map(
            (u) =>
              `**${u.username}** — ${u.email_verified ? 'Verified' : 'Pending'} — ${new Date(u.created_at).toLocaleDateString()}`,
          )
          .join('\n')
      : 'No users yet.';

  const embed = new EmbedBuilder()
    .setColor(0x84a98c)
    .setTitle('ForgeRealm — Users')
    .addFields(
      { name: 'Total Users', value: `${userCount}`, inline: true },
      { name: 'Recent Signups', value: recentList },
    )
    .setFooter({ text: 'ForgeRealm Monitor' })
    .setTimestamp();

  await interaction.editReply({ embeds: [embed] });
}
