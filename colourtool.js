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
        
        // get all stylesheets that dont belong to colourtool
        $(document.styleSheets).each( function(index, stylesheet) {
            if (window.console) {console.log("found stylesheet : " + stylesheet.href)}
            if (stylesheet.href != "https://github.com/christopherdebeer/colourtool/raw/master/colourtool.css") {colourtool.stylesheets.push(stylesheet)}
        })
        // get all the css rules from the stylesheets
        $(colourtool.stylesheets).each(function (i,s){
            $(colourtool.stylesheets[i].cssRules).each(function(x,r){
                //if (window.console) {console.log(colourtool.stylesheets[i].cssRules[x].cssText)}
                colourtool.allrules.push(colourtool.stylesheets[i].cssRules[x].cssText)
            })
        })
    },
    getColours: function () {
        // search for colours
    }   
}
