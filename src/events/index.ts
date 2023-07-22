import { Client, Collection, Events, Message } from 'discord.js';
import { EventHandler } from '../types/event-handler';

export const eventCollection = new Collection<string, EventHandler>();

import { ReadyEventHandler } from './ready';
eventCollection.set(Events.ClientReady, new ReadyEventHandler());

import { MessageCreateHandler } from './message-create'
eventCollection.set(Events.MessageCreate, new MessageCreateHandler());

import { InteractionCreateHandler } from './interaction-create'
eventCollection.set(Events.InteractionCreate, new InteractionCreateHandler());

// eventCollection.set(Events.MessageCreate, new MessageCreateEventHandler());