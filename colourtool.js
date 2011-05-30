var colourtool = {
    init: function () {
        if (window.console) {console.log("ColourTool init...");}
        $("body").html("<div id='colourtool'><h1>ColourTool</h1></div>");
        $("link").each( function(stylesheet){
            console.log(stylesheet);
            $("body").append("<p>link found.(" + stylesheet.attr("href") + ")</p>");
        });
    }
}