import { Collection } from 'discord.js';
import { SlashCommand } from '../types/command';

export const commandCollection = new Collection<string, SlashCommand>();

import { PingCommand } from './ping';
commandCollection.set(PingCommand.data.name, PingCommand);

import { FlipCoinCommand } from './flipcoin';
commandCollection.set(FlipCoinCommand.data.name, FlipCoinCommand);

import { DogCommand } from './dog';
commandCollection.set(DogCommand.data.name, DogCommand);

import { RandomCommand } from './random';
commandCollection.set(RandomCommand.data.name, RandomCommand);

import { HugCommand } from './hug';
commandCollection.set(HugCommand.data.name, HugCommand);

import { ShootCommand } from './shoot';
commandCollection.set(ShootCommand.data.name, ShootCommand);

import { MinecraftCommand } from './minecraft';
commandCollection.set(MinecraftCommand.data.name, MinecraftCommand);