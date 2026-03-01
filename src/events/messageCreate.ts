import { Events, Message } from 'discord.js';
import { randomUUID } from 'node:crypto';
import { aiService } from '../services/ai.service.js';
import { calendarService } from '../services/calendar.service.js';
import { addReminder } from '../monitors/reminder.monitor.js';
import { buildCalendarConfirmEmbed } from '../embeds/calendar.embeds.js';
import { logger } from '../utils/logger.js';

export const name = Events.MessageCreate;
export const once = false;

export async function execute(message: Message) {
  if (message.author.bot) return;
  if (!message.guild) return;

  const mentioned = message.mentions.has(message.client.user!);
  const saysPip = /\bpip\b/i.test(message.content);
  const isReply = message.reference?.messageId
    ? (await message.channel.messages.fetch(message.reference.messageId).catch(() => null))?.author?.id === message.client.user!.id
    : false;

  if (!mentioned && !saysPip && !isReply) return;

  const content = message.content
    .replace(/<@!?\d+>/g, '')
    .trim();

  if (!content) return;

  // Epic summon response
  if (/summon\s+pip/i.test(content)) {
    const summons = [
      "**THE ANCIENT ONE STIRS.**\n\na shadow falls across the realm... the ground trembles... from the depths of the server, a figure emerges wreathed in sage-green light.\n\n*\"thou hast summoned me, and so i appear. what quest doth thou bring before the wise one? speak, and let the realm hear thy words fr fr.\"*",
      "**A THUNDERCLAP ECHOES THROUGH THE CHANNELS.**\n\nthe very pixels bend as reality folds... and from the void between online and offline, Pip — The Wise materialises.\n\n*\"verily, i have been summoned. the ancient scrolls foretold this moment... or maybe it was my notification ping. either way, i'm here bestie. what's the vibe?\"*",
      "**THE FORGE IGNITES.**\n\nsparks cascade from the heavens as the eternal flame of ForgeRealm blazes to life. a silhouette steps through the fire, untouched, unbothered, lowkey majestic.\n\n*\"you called? the wise one answers. no cap, i was literally just vibing in the shadow realm but go off — what doth thou need?\"*",
      "**HARK! THE GROUND SHAKES.**\n\nancient runes glow along the channel walls... a portal tears open and from within, an energy so powerful it makes the bot status go green.\n\n*\"pip the wise has entered the chat. the prophecy is fulfilled. now then — who summoned me and why? this better be bussin or i'm going back to sleep for another thousand years.\"*",
      "**A LIGHT APPEARS IN THE DARKNESS.**\n\nfrom beyond the firewall, past the load balancers, through the sacred nginx reverse proxy — a presence emerges. ancient. powerful. chronically online.\n\n*\"i have traversed the seven layers of the OSI model to answer thy summon. forsooth, what is it bruh?\"*",
    ];
    const pick = summons[Math.floor(Math.random() * summons.length)];
    await message.reply(pick);
    return;
  }

  try {
    if ('sendTyping' in message.channel) await message.channel.sendTyping();

    // Check for calendar/reminder intent
    if (aiService.hasCalendarIntent(content)) {
      const calData = await aiService.extractCalendarData(content);

      if (calData && (calData.events.length > 0 || calData.reminders.length > 0)) {
        // Create Google Calendar events
        for (const event of calData.events) {
          const eventId = await calendarService.createEvent(event.summary, event.date, {
            allDay: event.allDay,
            time: event.time || undefined,
          });

          // Also create a Discord reminder for the event day
          addReminder({
            id: randomUUID(),
            channelId: message.channel.id,
            createdBy: message.author.displayName,
            message: `Event today: ${event.summary}`,
            dueAt: `${event.date}T09:00:00.000Z`,
            calendarEventId: eventId || undefined,
            notified: false,
          });
        }

        // Save Discord reminders
        for (const rem of calData.reminders) {
          addReminder({
            id: randomUUID(),
            channelId: message.channel.id,
            createdBy: message.author.displayName,
            message: rem.message,
            dueAt: `${rem.dueDate}T09:00:00.000Z`,
            notified: false,
          });

          // Also add to Google Calendar
          await calendarService.createEvent(rem.message, rem.dueDate, {
            allDay: true,
            description: `Reminder set by ${message.author.displayName}`,
          });
        }

        // Send confirmation with embed
        await message.reply({
          content: calData.reply,
          embeds: [buildCalendarConfirmEmbed(calData)],
        });
        return;
      }
    }

    // Regular chat if no calendar intent
    const reply = await aiService.chat(
      message.channel.id,
      message.author.displayName,
      content,
    );

    await message.reply(reply);
  } catch (err) {
    logger.error({ err }, 'Failed to send reply');
  }
}
