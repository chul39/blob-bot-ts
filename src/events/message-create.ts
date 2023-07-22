import { Client, Events, Message } from "discord.js";
import { EventHandler } from "../types/event-handler";

export class MessageCreateHandler implements EventHandler {
    
  async execute(client: Client, message?: Message): Promise<void> {
    if (!message) return;
    if (message.author.bot) return;
  }

}