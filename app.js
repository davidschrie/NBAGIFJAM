$(document).ready(function () {

    var Team = ["Bulls", "Knicks", "Spurs", "Lakers", "Celtics", "Raptors", "Hornets", "Heat", "Bucks"];
    var newTeam = "";

   

    function makeButtons() {
        $(".one").empty();

        for (var x = 0; x < Team.length; x++) {
            var newButton = $("<button>");
            newButton.attr("class", "btn");
            newButton.text(Team[x])
            newButton.attr("data-team", Team[x])
            $(".one").append(newButton)
        }
        newGif();
    }
    $(".submit").on("click", function (event) {
        event.preventDefault();
        newTeam = $("#new-team").val().trim()
        Team.push(newTeam)
        makeButtons();

    })

    makeButtons();
   
    function newGif() {
    $(".btn").on("click", function () {
        
        var Team = $(this).attr("data-team");
        console.log(Team)
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + Team +"&limit=10&api_key=qACPy3rUyZ5xzDE95zrcykk2D6nG52lc";
   console.log(queryURL)

        $.ajax({
            url: queryURL,
            method: "GET"

        }).then(function (response) {
            $(".nbaDiv").empty();
            console.log(response);
            var results = response.data
            console.log(results)
           
            for (var i = 0; i < results.length; i++) {
               
                var nbaDiv = $("<div>");
                nbaDiv.attr("class", "nbaDiv");
                
                var ratingP = $("<p>");
                ratingP.text("Rating: " + results[i].rating)
                // ratingP.attr("class","rating");
                // ratingP.attr("id","rating"+[i]);

                var NBAGif = $("<img>");
                NBAGif.attr("class", "gif")
                
                
                NBAGif.attr("still-data", results[i].images.fixed_height_still.url)
                NBAGif.attr("animated-data", results[i].images.fixed_height.url)
                NBAGif.attr("status", "still")
                NBAGif.attr("src", results[i].images.fixed_height_still.url)

                nbaDiv.append(NBAGif);
                nbaDiv.append(ratingP);
                $(".team-col").append(nbaDiv);


            }

     $(".gif").on("click", function () {
        var status = $(this).attr("status")
        console.log(this)

        if (status === "still") {
            $(this).attr("src", $(this).attr("animated-data"));
            $(this).attr("status", "animate");
        }
        else {
            $(this).attr("src", $(this).attr("still-data"));
            $(this).attr("status", "still");

        }
        })


    });

    })
}
});