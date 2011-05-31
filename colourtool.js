var colourtool = {
    stylesheets: [],
    allrules: [],
    colours: [],
    fonts: [],
    init: function () {
        if (window.console) {console.log("Init colourTool...")}
        colourtool.getStylesheets()
        colourtool.getColours()
    },
    getStylesheets: function () {
        $(document.styleSheets).each( function(i, stylesheet) {
            if (window.console) {console.log("found stylesheet : " + stylesheet.href)}
            if (stylesheet.href != "https://github.com/christopherdebeer/colourtool/raw/master/colourtool.css") {
                
                // get all stylesheets and rules
                colourtool.stylesheets.push(stylesheet)
                $(colourtool.stylesheets[i].cssRules).each(function(x,r){
                    if (window.console) {console.log(colourtool.stylesheets[i].cssRules[x].cssText)}
                    colourtool.allrules.push(colourtool.stylesheets[i].cssRules[x].cssText)
                })
            }            
        })
    },
    getColours: function () {
        
        // search for colours
    }   
}
