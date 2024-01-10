// Import necessary modules
import fs from 'fs';
import axios from 'axios';
import * as cheerio from 'cheerio';

// Define the website URL and the folder where images will be saved
const websiteUrl = 'https://memegen-link-examples-upleveled.netlify.app/';
const memeFolder = './memes';

// Function to scrape memes
function scrapeMemes() {
  // Make a GET request to the website
  return (
    axios
      .get(websiteUrl)
      .then((response) => {
        // Load the HTML content into Cheerio
        const $ = cheerio.load(response.data);

        // Iterate through the first 10 images
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
            // Pipe the image data to a writable stream
            response.data.pipe(fs.createWriteStream(imgPath));

            // Log success message
            console.log(`Downloaded ${imgName}`);
          });
        }

        // Log success message after scraping all images
        console.log('Scraping successful.');
      })
      // Handle errors
      .catch((error) => console.error('Error:', error.message))
  );
}

// Call the function to start scraping
scrapeMemes();
