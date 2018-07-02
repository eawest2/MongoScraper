const db = require("../models");
const scrape = require("../scripts/");

module.exports = {
    //scrape using scripts/index.js
    scrapeHeadlines: function (req, res) {
        scrape()
            .then(() => {
                rawArticles.map(item => {
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

    //Select headlines to write to dom
    articleFind: function (req, res) {
        return db.Article.find({})
            .then(function (articlesFound) {
                res.json(articlesFound);
            })
            .catch(function (err) {
                res.json(err);
            });
            


    },
    //Clear all articles from mongo
    articleDelete: function (req, res) {
        db.Article.deleteMany()
            .then(function () {
                res.send('Articles deleted');
            })
            .catch(function (err) {
                res.json(err);
            });
    },

    //find all articles that are saved, to write to dom
    savedArticleFind: function (req, res) {
        // Find all Notes
        db.Article.find({saved:true})
            .then(function (articlesFound) {
                res.json(articlesFound);
            })
            .catch(function (err) {
                res.json(err);
            });


    },
    //add specific article to saved list
    savedArticleAdd: function (req, res) {
        let articleId = req.params.id;
        console.log(req.params);
        console.log(articleId);
        // Find all Notes
        db.Article.findOneAndUpdate({
            _id: articleId
        }, {saved:true} , function (err, res) {
            if (err) console.log(err);
            // Deal with the response data/error
        }).then(function (returnSave) {
            res.json(returnSave);
        });
    },
    //remove article from saved list
    savedArticleDelete: function (req, res) {
        let articleId = req.params.id;
        // Find all Notes
        db.Article.findOneAndUpdate({
            _id: articleId
        }, {saved:false} , function (err, res) {
            if (err) console.log(err);
            // Deal with the response data/error
        }).then(function (returnSave) {
            res.json(returnSave);
        });
    },

    // //notes

    noteFind: function () { },
    noteCreate: function () { },
    noteDelete: function () { }
};
