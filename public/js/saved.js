$(function() {
    //Unsave listener
    $(document).on("click", "#unsave", function(event) {
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
    $(document).on("click","#addNote", function(event) {
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
    $(document).on("click", "#deleteNote", function(event) {
        const id = $(this).data("noteId");
        $.ajax("/api/note/"+id, {
            type: "DELETE",
        }). then(
            function() {
            location.reload();
            }
        );
    });
});