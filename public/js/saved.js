$(function() {
    //Unsave listener
    $("#unsave").on("click", function(event) {
        const id = $(this).data("id");
        $.ajax("/api/saved/"+id, {
            type: "DELETE",
        }). then(
            function() {
            location.reload();
            }
        );
    });

    //Page Load Listener
    $(document).ready(function(event) {
        //req
        $.ajax("/api/saved", {
        type: "GET"
        }).then( function() {
            console.log("Found Articles");
        });
    });

    //Add Note Listener
    $("#addNote").on("click", function(event) {
        const id = $(this).data("id");
        const headline = $("#noteHeadline").text.trim;
        const body = $("#noteBody").text.trim;
        $.ajax("/api/saved/"+id, {
            type: "POST",
            json: {
                headline: headline,
                body: body
            },
        }). then(
            function() {
            location.reload();
            }
        );
    });


    //Remove Note Listener
    $("#deleteNote").on("click", function(event) {
        const id = $(this).data("id");
        $.ajax("/api/note/"+id, {
            type: "DELETE",
        }). then(
            function() {
            location.reload();
            }
        );
    });
});