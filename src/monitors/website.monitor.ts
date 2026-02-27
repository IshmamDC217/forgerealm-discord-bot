import { Client, TextChannel } from 'discord.js';
import { config } from '../config.js';
import { websiteService } from '../services/website.service.js';
import { buildSiteChangeEmbed } from '../embeds/website.embeds.js';
import { loadState, saveState } from '../utils/state.js';
import { logger } from '../utils/logger.js';
import type { MonitorState } from '../types.js';

const PAGES_TO_MONITOR = ['/', '/shop'];

let state: MonitorState;

export function startWebsiteMonitor(client: Client) {
  state = loadState();
  logger.info(`Website monitor started (every ${config.POLL_WEBSITE_MS / 1000}s)`);

  // Run after a short delay to not spam on startup
  setTimeout(() => poll(client), 10000);
  setInterval(() => poll(client), config.POLL_WEBSITE_MS);
}

async function poll(client: Client) {
  try {
    const channel = client.channels.cache.get(config.CHANNEL_WEBSITE) as TextChannel;
    if (!channel) return;

    for (const page of PAGES_TO_MONITOR) {
      const hash = await websiteService.fetchPageHash(page);
      if (!hash) continue;

      const oldHash = state.pageHashes[page];
      if (oldHash && oldHash !== hash) {
        await channel.send({ embeds: [buildSiteChangeEmbed(page)] });
        logger.info(`Website change detected: ${page}`);
      }
      state.pageHashes[page] = hash;
    }

    saveState(state);
  } catch (err) {
    logger.error({ err }, 'Website monitor error');
  }
}
