const TelegramBot = require("node-telegram-bot-api");
const axios = require("axios");
const fs = require("fs");

// Telegram Bot Token
const TELEGRAM_BOT_TOKEN = "6634596657:AAEJk_RkthUhPKKs94OSSWZu7YPpGFehMkg";

// Create a new Telegram bot
const bot = new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: true });

// Handle the /start command
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(
    chatId,
    "Welcome to the Instagram Reels bot! Send me an Instagram post URL, and I will send you a sample video."
  );
});

// Handle incoming text messages
bot.on("text", async (msg) => {
  const chatId = msg.chat.id;
  const messageText = msg.text;

  // Check if the message contains a valid Instagram Reels URL
  if (isValidInstagramReelsURL(messageText)) {
    try {
      // Replace this with logic to extract the Instagram Reels link and fetch the video.
      // For now, we'll send a sample video.
      const sampleVideoUrl = "https://www.example.com/sample_video.mp4";
      const videoFile = await axios.get(sampleVideoUrl, {
        responseType: "arraybuffer",
      });

      // Save the video to a local file
      fs.writeFileSync("sample_video.mp4", Buffer.from(videoFile.data));

      // Send the video file
      await bot.sendDocument(chatId, "sample_video.mp4");
    } catch (error) {
      console.error("Error fetching and sending the video:", error);
      bot.sendMessage(chatId, "Sorry, there was an error fetching the video.");
    }
  } else {
    bot.sendMessage(chatId, "Please send a valid Instagram Reels URL.");
  }
});

// Function to validate Instagram Reels URLs (a basic example)
function isValidInstagramReelsURL(url) {
  // Implement your logic to check if the URL is a valid Instagram Reels link.
  // This may involve regular expressions or other checks depending on the URL format.
  // For simplicity, we'll assume that any URL starting with "https://www.instagram.com/reel/" is valid.
  return url.startsWith("https://www.instagram.com/reel/");
}

// Start the bot
bot.on("polling_error", (error) => {
  console.error("Polling error:", error);
});
