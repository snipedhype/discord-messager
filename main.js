const fs = require('fs');
const { Client } = require('discord.js-selfbot-v13');
const client = new Client();

const config = require('./config.json');
const messagesfilePath = './random_messages.txt';

let messages = [];

fs.readFile(messagesfilePath, 'utf8', (err, data) => {
  if (err) {
    console.error(`Error reading the file ${messagesfilePath}:`, err);
    return;
  }

  messages = data.split('\n');
});

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
  console.log('Starting');
  sendMessage();

  channel = client.channels.cache.get(config.channelId);
  if (!channel) {
    console.error(`Couldn't find channel with ID ${config.channelId}`);
    return;
  }
});

// Send the message to the channel
function sendMessage() {
  const randomIntervalMilliseconds = getRandomInterval();
  const randomMessage = messages[Math.floor(Math.random() * messages.length)]; // Get a random message

  console.log(`Waiting ${randomIntervalMilliseconds / 1000} seconds before sending the next message...`);

  setTimeout(() => {
    channel.send(randomMessage);
    const timestamp = new Date().toLocaleString();
    console.log(`Sent message: ${randomMessage} at ${timestamp}`);
    sendMessage();
  }, randomIntervalMilliseconds);
}

// Get a random interval in milliseconds
function getRandomInterval() {
  return Math.floor(Math.random() * (config.maxInterval - config.minInterval + 1)) + config.minInterval;
}

client.login(config.token);