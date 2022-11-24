// api/run.js
import edgeChromium from 'chrome-aws-lambda'

// Importing Puppeteer core as default otherwise
// it won't function correctly with "launch()"
import puppeteer from 'puppeteer-core'

import cheerio from 'cheerio'

export default async function (req, res) {
    if(req.method === 'GET') {
        const executablePath = await edgeChromium.executablePath
        
        const browser = await puppeteer.launch({
          executablePath,
          args: edgeChromium.args,
          headless: false,
        })
    
        // await page.goto('https://animixplay.to/v1/do-it-yourself/ep8', { waitUntil: 'networkidle0' });
    
        const page = await browser.newPage()
        // await page.setUserAgent('Mozilla/5.0 (Windows NT 5.1; rv:5.0) Gecko/20100101 Firefox/5.0')
        await page.goto('https://hxfile.co/embed-11uanpigh2v0.html')
    
        const data = await page.content()
    
        await browser.close();
    
        // const $ = cheerio.load(data)
        // const dummy = $.html()
        
        res.json({data})
    }
    if(req.method === 'POST') {
        const {url} = req.body
        const executablePath = await edgeChromium.executablePath
        
        const browser = await puppeteer.launch({
          executablePath,
          args: edgeChromium.args,
          headless: false,
        })
    
        // await page.goto('https://animixplay.to/v1/do-it-yourself/ep8', { waitUntil: 'networkidle0' });
    
        const page = await browser.newPage()
        await page.setUserAgent('Mozilla/5.0 (Windows NT 5.1; rv:5.0) Gecko/20100101 Firefox/5.0')
        await page.goto(url)
    
        const data = await page.content()
    
        await browser.close();
    
        const $ = cheerio.load(data)
        const dummy = $.html()
        
        res.json({dummy})
    }
  }