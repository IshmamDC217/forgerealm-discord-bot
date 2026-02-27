import { Client, TextChannel } from 'discord.js';
import { config } from '../config.js';
import { websiteService } from '../services/website.service.js';
import { buildApiDownEmbed, buildApiRecoveredEmbed } from '../embeds/website.embeds.js';
import { loadState, saveState } from '../utils/state.js';
import { logger } from '../utils/logger.js';
import type { MonitorState } from '../types.js';

let state: MonitorState;

export function startApiHealthMonitor(client: Client) {
  state = loadState();
  logger.info(`API health monitor started (every ${config.POLL_API_HEALTH_MS / 1000}s)`);

  setTimeout(() => poll(client), 5000);
  setInterval(() => poll(client), config.POLL_API_HEALTH_MS);
}

async function poll(client: Client) {
  try {
    const channel = client.channels.cache.get(config.CHANNEL_GENERAL) as TextChannel;
    if (!channel) return;

    const health = await websiteService.checkApiHealth();

    if (!health.up && state.apiUp) {
      // API just went down
      state.apiUp = false;
      state.apiDownSince = new Date().toISOString();
      await channel.send({ embeds: [buildApiDownEmbed(health.latency)] });
      logger.warn('API is DOWN');
    } else if (health.up && !state.apiUp) {
      // API recovered
      const downtime = state.apiDownSince
        ? formatDuration(Date.now() - new Date(state.apiDownSince).getTime())
        : 'unknown';
      state.apiUp = true;
      state.apiDownSince = null;
      await channel.send({ embeds: [buildApiRecoveredEmbed(health.latency, downtime)] });
      logger.info('API recovered');
    }

    saveState(state);
  } catch (err) {
    logger.error({ err }, 'API health monitor error');
  }
}

function formatDuration(ms: number): string {
  const seconds = Math.floor(ms / 1000);
  if (seconds < 60) return `${seconds}s`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ${seconds % 60}s`;
  const hours = Math.floor(minutes / 60);
  return `${hours}h ${minutes % 60}m`;
}
