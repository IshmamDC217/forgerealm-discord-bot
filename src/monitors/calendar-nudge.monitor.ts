import { Client, TextChannel } from 'discord.js';
import { config } from '../config.js';
import { logger } from '../utils/logger.js';

const FOUR_DAYS_MS = 4 * 24 * 60 * 60 * 1000;

const nudges = [
  "hey, it's been a few days — anything coming up you need on the calendar? lmk and i'll sort it",
  "just checking in. got anything for the next couple weeks that needs scheduling? drop it here",
  "calendar check: you two got anything coming up? events, deadlines, whatever — i'll add it",
  "periodic nudge from your favourite bot. anything to throw on the calendar before you forget?",
  "it's that time again. any stalls, meetings, deadlines lurking? tell me and i'll handle it",
  "quick one — need anything added to the calendar? i'm right here, might as well use me",
];

export function startCalendarNudgeMonitor(client: Client) {
  logger.info('Calendar nudge monitor started (every 4 days)');

  // First nudge after 4 days, then every 4 days
  setInterval(() => sendNudge(client), FOUR_DAYS_MS);
}

async function sendNudge(client: Client) {
  try {
    const channel = client.channels.cache.get(config.CHANNEL_GENERAL) as TextChannel;
    if (!channel) return;

    const pick = nudges[Math.floor(Math.random() * nudges.length)];
    await channel.send(pick);
    logger.info('Calendar nudge sent');
  } catch (err) {
    logger.error({ err }, 'Calendar nudge error');
  }
}
