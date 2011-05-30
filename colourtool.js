var colourtool = {
    init: function () {
        if (window.console) {console.log("ColourTool init...");}
        $("body").html("<div id='colourtool'><h1>ColourTool</h1></div>");
        $("link[type='stylesheet']").each( function(stylesheet){
            $("body").append("<p>stylesheet found.</p>");
        });
    }
}