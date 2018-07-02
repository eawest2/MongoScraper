const axios = require("axios");
const cheerio = require("cheerio");
//const controller = require("../controllers/controller.js");

const scrape = function () {

    console.log("Scrape Initiating");

    return axios.get("https://www.bbc.com/news").then(function (res) {
        const $ = cheerio.load(res.data);

        const articles = [];

        $("div.gs-c-promo-body").each(function (i, element) {
            //Headline
            const headline = $(this)
                .children()
                .children()
                .children("h3")
                .text()
                .trim();
            //URL
            const url = $(this)
                .children()
                .children("a")
                .attr("href");
            //Summary
            const summary = "PLACEHOLDER, GET A TA'S HELP"


            //Checks to make sure content is present
            //if (headline && summary && url) {
                const result = {
                    headline: headline,
                    summary: summary,
                    url: "https://www.bbc.com" + url,
                    saved: false
                };
                articles.push(result);
            //}
        });
        if (articles.length) {console.log("Scrape completed with data")};
        rawArticles = articles;
        return articles;
    });

};

module.exports = scrape;