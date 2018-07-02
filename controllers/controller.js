const db = require("../models");
const scrape = require("../scripts/");

module.exports = {
    //scrape
    scrapeHeadlines: function (req, res) {
        scrape()
            .then(() => {
                rawArticles.map(item => {
                    // Create a new Article using the `result` object built from scraping
                    //db.Article.create(item)
                    // .then(function (dbArticle) {
                    //     // View the added result in the console
                    //     console.log(dbArticle);
                    // })
                    // .catch(function (err) {
                    //     // If an error occurred, send it to the client
                    //     return console.log(err);
                    // });
                    db.Article.findOneAndUpdate({
                        url: item.url
                    }, item, { upsert: true }, function (err, res) {
                        if (err) console.log(err);
                        // Deal with the response data/error
                    });
                });
                res.send('Articles Updated');
            });
    },

    //headlines
    articleFind: function (req, res) {
        var returnArticles = [];
        // Find all Notes
        db.Article.find({})
            .then(function (articlesFound) {
                // If all Notes are successfully found, send them back to the client
                articlesFound.map(()=> {
                    
                });
                res.json(articlesFound);
            })
            .catch(function (err) {
                // If an error occurs, send the error back to the client
                res.json(err);
            });


    },
    articleDelete: function (req, res) {
        db.Article.deleteMany()
            .then(function () {
                res.send('Articles deleted');
            })
            .catch(function (err) {
                // If an error occurs, send the error back to the client
                res.json(err);
            });
    },

    savedArticleFind: function (req, res) {
        // Find all Notes
        db.Article.find({saved:true})
            .then(function (articlesFound) {
                // If all Notes are successfully found, send them back to the client
                res.json(articlesFound);
            })
            .catch(function (err) {
                // If an error occurs, send the error back to the client
                res.json(err);
            });


    },

    // //notes

    noteFind: function () { },
    noteCreate: function () { },
    noteDelete: function () { }
};
