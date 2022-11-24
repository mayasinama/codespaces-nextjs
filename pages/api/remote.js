// api/run.js
import edgeChromium from 'chrome-aws-lambda'

// Importing Puppeteer core as default otherwise
// it won't function correctly with "launch()"
import puppeteer from 'puppeteer-core'

export default async function (req, res) {
    // Edge executable will return an empty string locally.
    const executablePath = await edgeChromium.executablePath
    
    const browser = await puppeteer.launch({
      executablePath,
      args: edgeChromium.args,
      headless: false,
    })
    const [page] = await browser.pages();

    await page.goto('https://animixplay.to/v1/do-it-yourself/ep8', { waitUntil: 'networkidle0' });

    const data = await page.content()
    console.log(data);

    await browser.close();
    
    res.send(data)
  }