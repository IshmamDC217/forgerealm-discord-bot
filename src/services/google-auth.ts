import { google } from 'googleapis';
import { config } from '../config.js';
import { logger } from '../utils/logger.js';

function createAuth() {
  if (!config.GOOGLE_SERVICE_ACCOUNT) return null;

  try {
    const raw = Buffer.from(config.GOOGLE_SERVICE_ACCOUNT, 'base64').toString('utf-8');
    const cleaned = raw.replace(/[\x00-\x1f\x7f]/g, (ch) =>
      ch === '\n' || ch === '\r' || ch === '\t' ? ch : '',
    );
    const credentials = JSON.parse(cleaned);

    return new google.auth.GoogleAuth({
      credentials,
      scopes: [
        'https://www.googleapis.com/auth/calendar',
        'https://www.googleapis.com/auth/spreadsheets',
        'https://www.googleapis.com/auth/drive.file',
      ],
    });
  } catch (err) {
    logger.error({ err }, 'Failed to parse Google credentials — calendar & sheets disabled');
    return null;
  }
}

export const googleAuth = createAuth();
