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
        font: /font-family:(.)+;/i,
        rgbValues: /[0-9]{1,3}/i
    },
    init: function () {
        if (window.console) {console.log("Init colourTool...")}
        colourtool.getStylesheets()
        colourtool.getColours()
        colourtool.outputColourTool()
    },
    unique: function (arrayName) {
        var newArray=new Array();
        label:for(var i=0; i<arrayName.length;i++ ) {  
            for(var j=0; j<newArray.length;j++ ) {
                if(newArray[j]==arrayName[i]) 
                continue label;
            }
            newArray[newArray.length] = arrayName[i];
        }
        return newArray;
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
                $(matches).each( function(index,colour) {colourtool.colours.push(colour.replace(" ",""))})
                //if (window.console) {console.log("Found " + matches.length.toString() + " hex colour(s): " + matches)}
            }
            
            // rgb()
            if (r.search(colourtool.regexPatterns.rgb) != -1) {
                var matches = r.match(colourtool.regexPatterns.rgb)
                $(matches).each( function(index,colour) {colourtool.colours.push(colour.replace(" ",""))})
                //if (window.console) {console.log("Found " + matches.length.toString() + " rgb colour(s): " + matches)}
            }
        })
    },
    getFonts: function () {
        
        // search allrules for fonts
    },
    outputColourTool: function () {
        
        // display output
        $("body").append("<div id='colourtool'><div id='inner'><h1>Colourtool</h1></div></div>")
        $(colourtool.unique(colourtool.colours)).each( function(i,colour) {
            var whiteDiff = colourtool.lumDiff()
            var blackDiff = colourtool.lumDiff()
            var foreColour = "";
            if (whiteDiff > blackDiff) {foreColour = "#fff"} else {foreColour = "#000"} 
            $("#colourtool #inner").append("<p class='colour' style='colour: "+foreColour+"; background-color: "+colour+"'>"+colour+"</p>")
        })
    },
    RGBList: function (cssString) {
        var colour = []
        var matches = cssString.match(colourtool.regexPatterns.rgbValues)
        console.log(matches)
        $(matches).each( function (index, value) {
            colour.push(value)
        })
        return colour
    },
    lumDiff: function (R1,G1,B1,R2,G2,B2) {
        var L1 = 0.2126 * Math.pow(R1/255, 2.2) +
              0.7152 * Math.pow(G1/255, 2.2) +
              0.0722 * Math.pow(B1/255, 2.2)
     
        var L2 = 0.2126 * Math.pow(R2/255, 2.2) +
              0.7152 * Math.pow(G2/255, 2.2) +
              0.0722 * Math.pow(B2/255, 2.2)
     
        if(L1 > L2) {
            return (L1+0.05) / (L2+0.05)
        } else {
            return (L2+0.05) / (L1+0.05)
        }
    }
}
