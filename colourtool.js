var colourtool = {
    stylesheets: [],
    allrules: [],
    colours: [],
    fonts: [],
    regexPatterns: {
        test: /color:(.)+;/i,
        hex: /#([0-9abcdef]+?){3,6};/i,
        rgb: /rgb\([0-9]{1,3}\s?,\s?[0-9]{1,3}\s?,\s?[0-9]{1,3}\)/i,
        rgba: /rgba\([0-9]{1,3},[0-9]{1,3},[0-9]{1,3},[0-9]{1,3}\)/i,
        font: /font-family:(.)+;/i
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
            if (stylesheet.href != "https://github.com/christopherdebeer/colourtool/raw/master/colourtool.css" ) {
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
            
            //// test
            //if (r.search(colourtool.regexPatterns.test) != -1) {
            //    if (window.console) {console.log("Found " + r.match(colourtool.regexPatterns.test).length.toString() + " test(s): " + r.match(colourtool.regexPatterns.test))}
            //}
            
            // #hex
            if (r.search(colourtool.regexPatterns.hex) != -1) {
                var matches = r.match(colourtool.regexPatterns.hex)
                $(matches).each( function(index,colour) {colourtool.colours.push(colour)})
                if (window.console) {console.log("Found " + matches.length.toString() + " hex colour(s): " + matches)}
            }
            
            // rgb()
            if (r.search(colourtool.regexPatterns.rgb) != -1) {
                var matches = r.match(colourtool.regexPatterns.rgb)
                $(matches).each( function(index,colour) {colourtool.colours.push(colour)})
                if (window.console) {console.log("Found " + matches.length.toString() + " rgb colour(s): " + matches)}
            }
        })
    },
    getFonts: function () {
        
        // search allrules for fonts
    }
}
