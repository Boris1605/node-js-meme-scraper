// Import necessary libraries
import fs from 'node:fs';
import axios from 'axios';
import * as cheerio from 'cheerio';

// Define the website URL and the folder where images will be saved
const websiteUrl = 'https://memegen-link-examples-upleveled.netlify.app/';
const memeFolder = './memes';

// Function to scrape memes
function scrapeMemes() {
  return (
    axios
      .get(websiteUrl)
      .then((response) => {
        // Load the HTML content into Cheerio
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
          axios({
            method: 'get',
            url: imgUrl,
            responseType: 'stream',
          }).then((response) => {
            response.data.pipe(fs.createWriteStream(imgPath));

            // Log success message
            console.log(`Downloaded ${imgName}`);
          });
        }

        // Log success message after scraping all images
        console.log('Scraping successful.');
      })
      // Error Message
      .catch((error) => console.log('Error:', error.message))
  );
}

// Calling the function to start scraping
scrapeMemes();
