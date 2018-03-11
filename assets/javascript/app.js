var buttonArray = ["Kate Upton", "Anna Kendrick", "Jessica Alba", "Jennifer Aniston", "Angeline Jolie"];
function showButtons(array) {
    $(".buttons").empty()
    for (var i = 0; i < array.length; i++) {
        var button = $("<button>").text(array[i]).addClass("btns")
        $(".buttons").append(button);
    }
}
function getGifs() {
    var search = $(this).text();
    makeAjaxCall(search);
    //after ajax format the respnse to print to page
    //print to page
    console.log($(this).text());
}
function makeAjaxCall(search) {
    $.ajax({
        url: "https://api.giphy.com/v1/gifs/search?api_key=uDwsbZn4PgFkyJwwbLBcyDfPbiFrPFrb&q=" + search + "&limit=10&offset=0&rating=PG-13&lang=en",
        method: "GET"
    }).then(function (response) {
        formatResponse(response.data)
    });
}

function formatResponse(data) {
    $("#results").empty();
    for (var i = 0; i < data.length; i++) {
        var gifDiv = $("<div>").addClass("pic");
        var pDiv = $("<p>").text("Rating" + data[i].rating);
        var imgDiv = $("<img>").addClass("gif").attr("src", data[i].images.original_still.url);
        gifDiv.append(pDiv);
        gifDiv.append(imgDiv);
        $("#results").append(gifDiv);

    }


}


function playPause() {
    var src = $(this).attr("src");
    if (src.includes("_s.gif")) {
        var newSrc=src.replace(".gif","_s.gif")
        $(this).attr("src",newSrc);
    } else {
        let newSrc=src.replace(".gif","_s.gif")
        $(this).attr("src",newSrc);
    }
}







function addBttn(thingToSearch) {
    buttonArray.push(thingToSearch);
    showButtons(buttonArray);

}

function submitForm(event) {
    event.preventDefault();
    var searchTerm = $("#searchVal").val().trim();
    addBttn(searchTerm);
    $("#searchVal").val("");
}
showButtons(buttonArray);




$(".buttons").on("click", ".btns", getGifs)
$("#submit").on("click", submitForm)
$("#results").on("click", ".gif", playPause)