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
});