const commando = require('discord.js-commando');

const express = require('express');
const fs = require('fs');
const request = require('request');
const cheerio = require('cheerio');
const app = express();

const puppeteer = require('puppeteer');

const BUTTON_SELECTOR = 'input.largebutton:nth-child(1)';
const TITLE_SELECTOR = '.post-title > a:nth-child(1)';
const IMG_SRC_SELECTOR = '#video_jacket_img';

var codeToSearch = 'ipz108';
const searchUrl = `http://www.javlibrary.com/en/vl_searchbyid.php?keyword=${codeToSearch}`;

class ScrapeCommand extends commando.Command
{
    constructor (client)
    {
        super(client, {
            name: 'scrape',
            group: 'test',
            memberName: 'scrape',
            description: 'Scrapes a URL',
            args: [
                {
                    key: 'movieCode',
                    prompt: 'Please enter a movie code identifier',
                    type: 'string'
                }
            ]
        });
    }

    async run (message, { movieCode })
    {
        message.channel.send(movieCode);

        //codeToSearch = movieCode;

        const browser = await puppeteer.launch({headless: false});
        const page = await browser.newPage();

        console.time();

        await page.setRequestInterception(true);
        
        page.on('request', request => {
            if (request.resourceType() === 'image')
                request.abort();
            else
                request.continue();   
        })
       
        await page.goto(searchUrl);

        if (page.$(BUTTON_SELECTOR) !== null)
            await page.click(BUTTON_SELECTOR);
        
        var url = await page.url();

        console.timeEnd();

        console.time();

        request(url, function(error, response, html)
        {
            message.channel.send('error: ' + error);
            message.channel.send('statusCode: ' + response.statusCode);

            //If there's no error
            if (!error)
            {
                var $ = cheerio.load(html);
                
                var title, link;
                var json = { title : "", link : "" };
                
                $('.main').filter(function() {
                    
                    var data = $(this);

                    title = data.find(TITLE_SELECTOR).text();
                    link = data.find(IMG_SRC_SELECTOR).attr('src');

                    json.title = title;
                    json.link = link;

                    console.log("Title: " + title);
                    console.log("Link: " + link);
                    console.log("URL: " + url);
                    //message.channel.send(title);
                    //message.channel.send("http:" + link);
                    //message.channel.send(url);
                })

                console.timeEnd();
            }

            //console.log('statusCode: ' + response.statusCode);
        })

        await browser.close();
        console.log("browser closed");
    }
}

module.exports = ScrapeCommand;
