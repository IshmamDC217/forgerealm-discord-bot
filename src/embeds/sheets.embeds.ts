import { EmbedBuilder } from 'discord.js';

export function buildSheetCreatedEmbed(title: string, url: string, rowCount: number): EmbedBuilder {
  return new EmbedBuilder()
    .setColor(0x84a98c)
    .setTitle('Spreadsheet Created')
    .setDescription(`**${title}**`)
    .addFields(
      { name: 'Rows', value: `${rowCount}`, inline: true },
      { name: 'Link', value: `[Open in Google Sheets](${url})`, inline: true },
    )
    .setTimestamp()
    .setFooter({ text: 'Pip Sheets' });
}
