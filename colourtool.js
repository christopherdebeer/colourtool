var colourtool = {
    stylesheets: [],
    allrules: [],
    colours: [],
    fonts: [],
    regexPatterns: {
        hex: /#([0-9abcdef]+?){3,6}/i,
        rgb: /rgb\([0-9]{1,3},[0-9]{1,3},[0-9]{1,3}\)/i,
        rgba: ""
    },
    init: function () {
        if (window.console) {console.log("Init colourTool...")}
        colourtool.getStylesheets()
        colourtool.getColours()
    },
    getStylesheets: function () {
        
        // get all stylesheets that dont belong to colourtool
        $(document.styleSheets).each( function(index, stylesheet) {
            if (window.console) {console.log("found stylesheet : " + stylesheet.href)}
            if (stylesheet.href != null && stylesheet.href != "https://github.com/christopherdebeer/colourtool/raw/master/colourtool.css" ) {
                colourtool.stylesheets.push(stylesheet)
            }
        })
        // get all the css rules from the stylesheets
        $(colourtool.stylesheets).each( function (i,s){
            $(colourtool.stylesheets[i].cssRules).each( function(x,r){
                //if (window.console) {console.log(colourtool.stylesheets[i].cssRules[x].cssText)}
                colourtool.allrules.push(colourtool.stylesheets[i].cssRules[x].cssText)
            })
        })
    },
    getColours: function () {
        
        // search allrules for colours
        $(colourtool.allrules).each( function(i,r){
            
            // #hex
            if (r.search(colourtool.regexPatterns.hex) != -1) {
                if (window.console) {console.log("Found a colour: " + r.match(colourtool.regexPatterns.hex))}
            }
            
            // rgb()
            if (r.search(colourtool.regexPatterns.rgb) != -1) {
                if (window.console) {console.log("Found a colour: " + r.match(colourtool.regexPatterns.rgb))}
            }
        })
    },
    getFonts: function () {
        
        // search allrules for fonts
    }
}
