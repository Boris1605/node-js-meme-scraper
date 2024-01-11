// Import necessary libraries
import fs from 'node:fs';
import axios from 'axios';
import * as cheerio from 'cheerio';

// Define the website URL and the folder where images will be saved
const websiteUrl = 'https://memegen-link-examples-upleveled.netlify.app/';
const memeFolder = './memes';

// Check if folder "memes" exists create one if not
if (!fs.existsSync(memeFolder)) {
  fs.mkdirSync(memeFolder, { recursive: true });
}

// Function to scrape memes
async function scrapeMemes() {
  try {
    const response = await axios.get(websiteUrl);
    // Load the HTML content
    const $ = cheerio.load(response.data);

    // Run through the first 10 images
    for (let i = 0; i < 10; i++) {
      // Get the URL of the current image
      const imgUrl = $('img').eq(i).attr('src');

      // Generate a filename for the image
      const imgName = `${(i + 1).toString().padStart(2, '0')}.jpg`;

      // Generate the full path where the image will be saved
      const imgPath = `${memeFolder}/${imgName}`;

      // Download the image
      const imageResponse = await axios({
        method: 'get',
        url: imgUrl,
        responseType: 'stream',
      });

      imageResponse.data.pipe(fs.createWriteStream(imgPath));

      // Log success message
      console.log(`Downloaded ${imgName}`);
    }

    // Log success message after scraping all images
    console.log('Scraping successful.');
  } catch (error) {
    // Error Message
    console.error('Error:', error.message);
  }
}

// Calling the function to start scraping
scrapeMemes().catch((error) => {
  console.error('Unhandled Promise Rejection:', error.message);
});
