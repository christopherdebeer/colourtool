var colourtool = {
    init: function () {
        if (window.console) {console.log("ColourTool init...");}
        $("body").html("<div id='colourtool'><h1>ColourTool</h1></div>");
        $("link[type='text/css']").each( function(index,stylesheet){
            if (window.console) {console.log(stylesheet.attr("href"));}
            $("#colourtool").append("<p>link found.</p>");
        });
    }
}