const router = require("express").Router();
const controller = require("../controllers/controller.js");
const db = require("../models");

//Handlebars

//Homepage HTML
router.get("/", function (req, res) {
            db.Article.find({})
                .then(function (articlesFound) {
            res.render("index", { articlesObj: articlesFound });
                })
                .catch(function (err) {
                    res.json(err);
                });
});

//Saved HTML
router.get("/saved", function (req, res) {
    db.Article.find({ saved: true })
        .then(function (articlesFound) {
    res.render("saved", { articlesObj: articlesFound });
        })
        .catch(function (err) {
            res.json(err);
        });
});

//API
//scrape
router.get("/api/scrape", controller.scrapeHeadlines);


//headlines
router.delete("/api/delete", controller.articleDelete);

//saves
router.post("/api/saved/:id", controller.savedArticleAdd);
router.delete("/api/saved/:id", controller.savedArticleDelete);

//notes
router.get("/api/note/:id", controller.noteFind);
router.post("/api/note/:id", controller.noteCreate);
router.delete("/api/note/:noteid", controller.noteDelete);

module.exports = router;
