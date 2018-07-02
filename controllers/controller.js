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
    // savedArticleFind: function (req, res) {
    //     // Find all Notes
    //     db.Article.find({ saved: true })
    //         .then(function (articlesFound) {
    //             res.json(articlesFound);
    //         })
    //         .catch(function (err) {
    //             res.json(err);
    //         });
    //},

    //add specific article to saved list
    savedArticleAdd: function (req, res) {
        let articleId = req.params.id;
        // Find all Notes
        db.Article.findOneAndUpdate({
            _id: articleId
        }, { saved: true }, function (err, res) {
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
        }, { saved: false }, function (err, res) {
            if (err) console.log(err);
            // Deal with the response data/error
        }).then(function (returnSave) {
            res.json(returnSave);
        });
    },

    // //notes

    noteFind: function (req, res) {
        let articleId = req.params.id;
        let noteSummary = [];
        // Find all Notes
        db.Article.find({
            _id: articleId
        }, function (err, res) {
            if (err) console.log(err);
            // Deal with the response data/error
        }).then(function (noteResults) {
            noteResults.note.map(data => {
                noteSummary.push(data);
            })
            res.json(noteSummary);
        });
    },
    noteCreate: function () {
        let articleId = req.params.id;
        // Find all Notes
        db.Article.find({
            _id: articleId
        }, function (err, res) {
            if (err) console.log(err);
            // Deal with the response data/error
        }).then(function (data) {
            res.json(data);
        });
    },

    noteDelete: function (req, res) {
        let noteNum = req.params.noteid
        // Find all Notes
        db.Note.deleteOne({
            _id: noteNum
        }, function (err, res) {
            if (err) console.log(err);
            // Deal with the response data/error
        }).then(
            console.log(`Note number: ${noteNum} deleted.`)
        );
    }
};
