import dotenv from 'dotenv';
import { DiscordClient } from './discord-client';

/**
 * Setup dotenv
 */
dotenv.config();

/**
 * Initailize discord bot client
 */
const client = new DiscordClient();
(async () => {
  await client.initCommand();
  client.initEvents();
  client.login();
})();