var colourtool = {
    stylesheets: [],
    styles: [],
    colours: [],
    fonts: [],
    init: function () {
        if (window.console) {console.log("ColourTool init...")}
        $("body").html("<div id='colourtool'><h1>ColourTool</h1></div>")
        $("link[type='text/css']").each( function(index, stylesheet){
            if (window.console) {console.log("found linked stylesheet : " + stylesheet.baseURI)}
            colourtool.stylesheets.push(stylesheet.baseURI)
        })
        $("style").each( function(index, styletag){
            if (window.console) {console.log("found style element : " + styletag)}
            colourtool.styles.push(styletag.innerHTML)
        })
    }
}
