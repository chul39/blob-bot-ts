import dotenv from 'dotenv';
import { DiscordClient } from './discord-client';

/**
 * Setup dotenv
 */
dotenv.config();

/**
 * Listening to a specific port (should be 8080)
 * to make sure the bot works on Azure App Service
 */
import http from 'http';
const server = http.createServer((req, res)=>{
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('This is the server for blob-bot-discord-ts.');
});
const port = process.env.PORT || '3000';
server.listen(port);

/**
 * Initailize discord bot client
 */
const client = new DiscordClient();
(async () => {
  await client.initCommand();
  client.initEvents();
  client.login();
})();