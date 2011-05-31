var colourtool = {
    init: function () {
        if (window.console) {console.log("ColourTool init...")}
        $("body").html("<div id='colourtool'><h1>ColourTool</h1></div>")
        $("link[type='text/css']").each( function(index,stylesheet){
            if (window.console) {console.log("found linked stylesheet : " + stylesheet)}
            $("#colourtool").append("<p>linked style found.</p>")
        })
        $("style").each( function(index,style){
            if (window.console) {console.log("found linked stylesheet : " + style)}
            $("#colourtool").append("<p>style found.</p>")
        })
    }
}
