// Research for libraries
import fs from 'fs';
import axios from 'axios';
import * as cheerio from 'cheerio';

const websiteUrl = 'https://memegen-link-examples-upleveled.netlify.app/';
const memeFolder = './memes';

//  Connect to the current version of the website
async function scrapeMemes() {
  try {
    const response = await axios.get(websiteUrl);
    const $ = cheerio.load(response.data);

    // Iterate through the first 10 images
    for (let i = 0; i < 10; i++) {
      const imgUrl = $('img').eq(i).attr('src');
      const imgName = `${(i + 1).toString().padStart(2, '0')}.jpg`;
      const imgPath = `${memeFolder}/${imgName}`;

      // Download the image
      axios({
        method: 'get',
        url: imgUrl,
        responseType: 'stream',
      }).then((response_1) => {
        response_1.data.pipe(fs.createWriteStream(imgPath));
        console.log(`Downloaded ${imgName}`);
      });
    }

    console.log('Scraping successful.');
  } catch (error) {
    return console.error('Error:', error.message);
  }
}

scrapeMemes();

//  Avoid any caching?
//  Download HTML string from the website and save in a variable
//  Search inside HTML string for <img src="..." /> and extract to array of URLs (strings)
//  Maybe inside of the <section id="images">?
//  Extract first 10 URLs from array
//  Loop over array of first 10 URLs and:
//  Download the image data (string)
//  Generate path in the "memes" folder (eg. ./memes/03.jpg)
//  1-10
//  double digits
//  .jpg
//  Create an empty file with the path
//  Put the image data into the file
