import { Client, Events } from 'discord.js';
import { logger } from '../utils/logger.js';
import { startAllMonitors } from '../monitors/index.js';

export const name = Events.ClientReady;
export const once = true;

export function execute(client: Client<true>) {
  logger.info(`Logged in as ${client.user.tag}`);
  logger.info(`Serving ${client.guilds.cache.size} guild(s)`);
  startAllMonitors(client);
}
