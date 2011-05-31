var colourtool = {
    version: "0.0.2",
    stylesheets: [],
    allrules: [],
    colours: [],
    fonts: [],
    regexPatterns: {
        test: /color:(.)+;/gi,
        hex: /#([0-9abcdef]+?){3,6};/gi,
        rgb: /rgb\([0-9]{1,3}\s?,\s?[0-9]{1,3}\s?,\s?[0-9]{1,3}\)/gi,
        rgba: /rgba\([0-9]{1,3},[0-9]{1,3},[0-9]{1,3},[0-9]{1,3}\)/gi,
        font: /font-family:(.)+;/gi,
        rgbValues: /[0-9]{1,3}/gi
    },
    init: function () {
        if (window.console) {console.log("Init colourTool...")}
        colourtool.getStylesheets()
        colourtool.getColours()
        colourtool.outputColourTool()
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
        $("body").append("<div id='colourtool'><div id='overlay'></div><div id='inner'><h1>Colourtool</h1><div id='closeButton'><a href='#'>close</a></div><p>This tool lists all the colours mentioned within the stylesheets and style elements that are present on the current page. Its intended use is to facilitate checking of CSS for unintended colour variations/diplications.</p><p>All the code is available at <a href='https://github.com/christopherdebeer/colourtool'>GitHub</a>. Version: "+colourtool.version.toString()+".</p></div></div>")
        $("#colourtool #closeButton a").click( function(e) {
            e.preventDefault()
            $("#colourtool").remove()
            return false
        })
        $(colourtool.unique(colourtool.colours)).each( function(i,origColour) {
            var colour = colourtool.RGBList(origColour)
            var hex = colourtool.RGB2hex(colour[0],colour[1],colour[2])
            var whiteDiff = colourtool.lumDiff(parseInt(colour[0],10),parseInt(colour[1],10),parseInt(colour[2],10),255,255,255)
            var blackDiff = colourtool.lumDiff(parseInt(colour[0],10),parseInt(colour[1],10),parseInt(colour[2],10),0,0,0)
            var foreColour = "#000";
            if (whiteDiff > blackDiff) {foreColour = "#fff"} else {foreColour = "#000"} 
            $("#colourtool #inner").append("<p class='colour' style='color: "+foreColour+"; background-color: "+origColour+"'>"+origColour+"<br />"+hex+"</p>")
            
        })
    },
    RGBList: function (cssString) {
        
        // convert an rgb string to an array/list of vlaues ie: rgb(255,0,10) = [255,0,10]
        return cssString.match(colourtool.regexPatterns.rgbValues)
    },
    RGB2hex: function (r,g,b) {
        
        // convert rgb values to an html Hex value ie: [255,0,0] = #ff0000
        var red = parseInt(r,10)
        var green = parseInt(g,10)
        var blue = parseInt(b,10)        
        
        function hex(x) {
            return ("0" + parseInt(x).toString(16)).slice(-2);
        }
        return "#" + hex(red) + hex(green) + hex(blue);

    },
    lumDiff: function (R1,G1,B1,R2,G2,B2) {
        
        // return the luminocity difference between 2 rgb values
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
    },
    unique: function (arrayName) {
        
        // basic function for returning only unique values from an inputted array/list
        var newArray=new Array();
        label:for(var i=0; i<arrayName.length;i++ ) {  
            for(var j=0; j<newArray.length;j++ ) {
                if(newArray[j]==arrayName[i]) 
                continue label;
            }
            newArray[newArray.length] = arrayName[i];
        }
        return newArray;
    }
}
