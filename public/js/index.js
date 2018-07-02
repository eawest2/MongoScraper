$(function() {
    //Scrape listener
    $("#scrapeArticles").on("click", function(event) {
        //req
        $.ajax("/api/scrape",{
            type: "GET",
        }). then(
            function() {
            location.reload();
            }
        );
    });

    //Delete listener
    $("#deleteArticles").on("click", function(event) {
        //req
        $.ajax("/api/delete/", {
            type: "DELETE",
        }). then(
            function() {
            location.reload();
            }
        );
    });

    //save listener
    $(document).on("click", "#save", function(event) {
        let id = $(this).attr("data-id");
        $.ajax("/api/saved/"+id, {
            type: "POST",
        }). then(
            function() {
            location.reload();
            }
        );
    });    

    //Page Load Listener
    $(document).ready(function(event) {
        //req
        $.ajax("/api", {
        type: "GET"
        }).then( function() {
            console.log("Found Articles");
        });
    });
});