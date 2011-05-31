var colourtool = {
    stylesheets: [],
    colours: [],
    fonts: [],
    init: function () {        
        colourtool.getStylesheets()
        colourtool.getColours()
    },
    getStylesheets: function () {
        $(document.styleSheets).each( function(index, stylesheet) {
            if (window.console) {console.log("found stylesheet : " + stylesheet.href)}
            if (stylesheet.href != "https://github.com/christopherdebeer/colourtool/raw/master/colourtool.css") {colourtool.stylesheets.push(stylesheet)}
        })
    },
    getColours: function () {
        $(colourtool.stylesheets).each(function (i,s){
            $(colourtool.stylesheets[i].cssRules).each(function(x,r){
                if (window.console) {console.log(colourtool.stylesheets[i].cssRules[x].cssText)}
            })
        })
    }   
}
