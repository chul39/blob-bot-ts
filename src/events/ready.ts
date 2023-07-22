import { Client, Events } from "discord.js";
import { EventHandler } from "../types/event-handler";

export class ReadyEventHandler implements EventHandler {
    
  async execute(client : Client): Promise<void> {
    if (!client.user || !client.application) return;
    console.log(`${client.user.username} is online`);
  }
  
}