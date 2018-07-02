const router = require("express").Router();
const controller = require("../controllers/controller.js");

//Handlebars
//Homepage
router.get("/", function (req, res) {
    var articlesObj;
    controller.articleFind().then(data => {
        res.render("index", { 'articlesObj': data });
    }).catch(err=>{
		res.render("index", {'errors':'No articles found'})
	});

});
//Saved
router.get("/saved", function (req, res) {
    var articlesObj;
    controller.savedArticleFind().then( data => {
        res.render("saved", { 'articlesObj': data });
    }).catch(err=>{
		res.render("saved", {'errors':'No articles found'})
	});
});

//API
//scrape
router.get("/api/scrape", controller.scrapeHeadlines);


//headlines
router.get("/api", controller.articleFind);
router.get("/api/saved", controller.savedArticleFind);
router.delete("/api/delete", controller.articleDelete);

//notes
router.get("/api/note/:id", controller.noteFind);
router.post("/api/note/", controller.noteCreate);
router.delete("/api/note/:id", controller.noteDelete);

module.exports = router;
