import { Client, Message, Interaction } from "discord.js";

export interface EventHandler {
  execute(client: Client) : Promise<void>;
  execute(client: Client, args: any) : Promise<void>;
}