import { config } from '../config.js';
import { hashContent } from '../utils/hash.js';
import { logger } from '../utils/logger.js';

export const websiteService = {
  async fetchPageHash(path: string): Promise<string | null> {
    try {
      const url = `${config.FORGEREALM_SITE_URL}${path}`;
      const res = await fetch(url, {
        headers: { 'User-Agent': 'ForgeRealm-Bot/1.0' },
        signal: AbortSignal.timeout(15000),
      });
      if (!res.ok) return null;
      const html = await res.text();
      return hashContent(html);
    } catch (err) {
      logger.error({ path, err }, 'Failed to fetch page');
      return null;
    }
  },

  async checkApiHealth(): Promise<{ up: boolean; statusCode: number | null; latency: number }> {
    const start = Date.now();
    try {
      const res = await fetch(`${config.FORGEREALM_API_URL}/health`, {
        signal: AbortSignal.timeout(10000),
      });
      return {
        up: res.ok,
        statusCode: res.status,
        latency: Date.now() - start,
      };
    } catch {
      return { up: false, statusCode: null, latency: Date.now() - start };
    }
  },

  async checkSiteHealth(): Promise<{ up: boolean; statusCode: number | null; latency: number }> {
    const start = Date.now();
    try {
      const res = await fetch(config.FORGEREALM_SITE_URL, {
        signal: AbortSignal.timeout(15000),
      });
      return {
        up: res.ok,
        statusCode: res.status,
        latency: Date.now() - start,
      };
    } catch {
      return { up: false, statusCode: null, latency: Date.now() - start };
    }
  },
};
