# NODE JS MEME SCRAPER

### This Node.js code scrapes the first 10 meme images from a website and saves them to a local folder.

1. The script checks if the specified local folder for memes exists and creates one if not.

2. It fetches the HTML data of the website and parse the document.

3. The code then loops over the first 10 images, downloads and saves them to a local folder.

4. Each image is named 1-10.jpg with double digits (e.g., "01.jpg", "02.jpg").

5. Success messages are logged for each downloaded image, and a final success message is displayed upon completing the scraping process.

## Packages Used in this script:

### Installed:

- Axios

```
pnpm add axios
```

- Cheerio

```
pnpm add cheerio
```

### Node js Built in Package used:

- fs
