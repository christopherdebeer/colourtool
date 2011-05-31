var colourtool = {
    stylesheets: [],
    styles: [],
    colours: [],
    fonts: [],
    init: function () {
        //if (window.console) {console.log("ColourTool init...")}
        //$("body").html("<div id='colourtool'><h1>ColourTool</h1></div>")
        //$("link[type='text/css'], link[rel='stylesheet']").each( function(index, stylesheet){
        //    if (window.console) {console.log("found linked stylesheet : " + stylesheet.baseURI)}
        //    colourtool.stylesheets.push(stylesheet.baseURI)
        //})
        //$("style").each( function(index, styletag){
        //    if (window.console) {console.log("found style element : " + styletag)}
        //    colourtool.styles.push(styletag.innerHTML)
        //})
        colourtool.getStylesheets()
    },
    getStylesheets: function () {
        $(document.styleSheets).each( function(index, stylesheet) {
            if (window.console) {console.log("found stylesheet : " + stylesheet.href)}
            if (stylesheet.href != "https://github.com/christopherdebeer/colourtool/raw/master/colourtool.css") {colourtool.stylesheets.push(stylesheet)}
        })
    }
}
