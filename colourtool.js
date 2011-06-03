var colourtool = {
    version: "0.0.2",
    stylesheets: [],
    loadedStylesheets: 0,
    loadErrors: [],
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
        
        // display modal
        $("body").append(" \
            <div id='colourtool'> \
                <div id='overlay'></div> \
                <div id='inner'> \
                   <h1>Colourtool</h1> \
                   <div id='closeButton'><a href='#'>close</a></div> \
                   <p>This tool lists all the colours mentioned within the stylesheets and style elements that are present on the current page. Its intended use is to facilitate checking of CSS for unintended colour variations/duplications.</p> \
                   <p>All the code is available at <a href='https://github.com/christopherdebeer/colourtool'>GitHub</a>. Version: "+colourtool.version.toString()+".</p> \
                    <div id='output'> \
                        <div id='stylesheets'></div> \
                        <div id='colours'> \
                            <p id='loading'>Loading stylesheets</p> \
                        </div> \
                        <div id='errors'></div> \
                    </div> \
                    <p id='footer'>Created in 2011 by Christopher de Beer, based on the PHP script by Brian Coit, both of Line Digital.</p> \
                </div> \
            </div>")
        $("#colourtool #closeButton a").click( function(e) {
            e.preventDefault()
            $("#colourtool").remove()
            return false
        })
        colourtool.getStylesheets()
    },
    getStylesheets: function () {
        
        // commented out due to cross-domain restrictions on stylesheets from domains other than the one the script is run on
        
        //// get all stylesheets that dont belong to colourtool
        //$(document.styleSheets).each( function(index, stylesheet) {
        //    if (window.console) {console.log("found stylesheet : " + stylesheet.href)}
        //    if (stylesheet.href != "https://github.com/christopherdebeer/colourtool/raw/master/colourtool.css" ) {
        //        colourtool.stylesheets.push(stylesheet)
        //    }
        //})
        //// get all the css rules from the stylesheets
        //$(colourtool.stylesheets).each( function (i,s){
        //    $(colourtool.stylesheets[i].cssRules).each( function(x,r){
        //        //if (window.console) {console.log(colourtool.stylesheets[i].cssRules[x].cssText)}
        //        colourtool.allrules.push(colourtool.stylesheets[i].cssRules[x].cssText)
        //    })
        //})
        
        $("style").each( function(index,style) {
            colourtool.allrules.push(style.innerHTML)
        })
        $("link[type='text/css'], link[rel='stylesheet']").each ( function(index,link) {
            if (window.console) {console.log("found stylesheet : " + link.href)}
            if (link.href != colBase + "colourtool.css" ) {
                colourtool.stylesheets.push(link.href)
            }
        })
        var linkList = colourtool.unique(colourtool.stylesheets)
        colourtool.stylesheets = linkList
        $(colourtool.stylesheets).each( function (index,stylesheet) {
            $("#colourtool #stylesheets").append("<p><span class='url'>"+stylesheet+"</span> : <span class='status'>Loading</span></p>")
            $.ajax({
                url: stylesheet,
                success: function (data) {
                    colourtool.allrules.push(data)
                    colourtool.loadedStylesheets += 1
                },
                error: function (data) {
                    colourtool.loadErrors.push(stylesheet)
                    $("#colourtool #stylesheets .url:contains('"+stylesheet+"')").parent().find(".status").text("Failed")
                    if (window.console) {console.log("x-domain loading issue, trying proxy for ("+stylesheet+")")}
                    colourtool.yqlLoad(stylesheet)
                },
                complete: function (data) {
                    colourtool.areLoaded()
                }
              });
        })
        if (colourtool.stylesheets.length == 0) {
            colourtool.getColours()
            colourtool.getFonts()
            colourtool.outputColours()
        }
        
    },
    yqlLoad: function (url) {
        if (window.console) {console.log("trying YQL proxy for: " + url)}
        var yqlquery = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D%22"+escape(url)+"%22&format=json&diagnostics=true&callback=colourtool.yqlRecieve"
        if (window.console) {console.log("YQL:" + yqlquery)}
        $.ajax({
            url: yqlquery,
            dataType: "jsonp"
        })
    },
    yqlRecieve: function (data) {
        
        if (window.console) {console.log("Proxy:" + data)}
        if (data.query.count > 0) {
            
            // push the poxied css to the all rules
            colourtool.allrules.push(data.query.results.body.p)
            // try remove the error notification
            var originalURL = data.query.diagnostics.url.content
            if (window.console) {console.log("Resolved x-domain issue with proxy for: "+originalURL+".")}
            $(".error[data-url='"+originalURL+"']").html("Stylesheet error resolved with yql proxy for: " + originalURL).addClass("resolved")
            
            
        }
        colourtool.loadedStylesheets += 1;
        colourtool.areLoaded()
    },
    areLoaded: function (){
        if (colourtool.loadedStylesheets == colourtool.stylesheets.length) {
            colourtool.getColours()
            colourtool.getFonts()
            colourtool.outputColours()
        }
    },
    getColours: function () {
        
        // search allrules for colours
        if (colourtool.allrules.length > 0) {
            $(colourtool.allrules).each( function(i,r){
                
                //// test
                //if (r.search(colourtool.regexPatterns.test) != -1) {
                //    if (window.console) {console.log("Found " + r.match(colourtool.regexPatterns.test).length.toString() + " test(s): " + r.match(colourtool.regexPatterns.test))}
                //}
                
                // #hex
                if (r.search(colourtool.regexPatterns.hex) != -1) {
                    var matches = r.match(colourtool.regexPatterns.hex)
                    $(matches).each( function(index,colour) {
                        if (colour.replace("#","").replace(";","").length == 3) {colour = "#" + colourtool.hexS2hexL(colour).toString()}
                        colourtool.colours.push(colour.replace(";","").toLowerCase())
                    })
                    if (window.console) {console.log("Found " + matches.length.toString() + " hex colour(s): " + matches)}
                }
                
                // rgb()
                if (r.search(colourtool.regexPatterns.rgb) != -1) {
                    var matches = r.match(colourtool.regexPatterns.rgb)
                    $(matches).each( function(index,colour) {colourtool.colours.push(colour.replace(" ","").toLowerCase())})
                    //if (window.console) {console.log("Found " + matches.length.toString() + " rgb colour(s): " + matches)}
                }
            })
        }
    },
    getFonts: function () {
        
        // search allrules for fonts
        $(colourtool.allrules).each( function(i,r){
            if (r.search(colourtool.regexPatterns.font) != -1) {
                var matches = r.match(colourtool.regexPatterns.font)
                $(matches).each( function(index,font) {colourtool.fonts.push(font.replace(" ",""))})
                //if (window.console) {console.log("Found " + matches.length.toString() + " hex colour(s): " + matches)}
            }
        })
    },
    outputColours: function () {
        $("#colourtool #inner #colours").html("");
        $(colourtool.unique(colourtool.colours)).each( function(i,origColour) {
            
            var rgb = []
            var hex = ""
            
            if (origColour[0] == "#") {
                hex = origColour.replace(";","")
                rgb = colourtool.hex2RGB(origColour)
            } else {
                hex = colourtool.RGB2hex(colour[0],colour[1],colour[2])
                rgb = colourtool.RGBList(origColour)
            }
            if (window.console) {console.log("Original Colour: "+ origColour + " rgb: " + rgb + " hex: " + hex)}
            
            var whiteDiff = colourtool.lumDiff(parseInt(rgb[0],10),parseInt(rgb[1],10),parseInt(rgb[2],10),255,255,255)
            var blackDiff = colourtool.lumDiff(parseInt(rgb[0],10),parseInt(rgb[1],10),parseInt(rgb[2],10),0,0,0)
            var foreColour = "#000000";
            if (whiteDiff > blackDiff) {foreColour = "#ffffff"} else {foreColour = "#000000"}
            
            $("#colourtool #inner #colours").append("<p class='colour' style='color: "+foreColour+"; background-color: "+hex+"'>"+rgb+"<br />"+hex+"</p>") 
        })
    },
    RGBList: function (cssString) {
        
        // convert an rgb string to an array/list of vlaues ie: rgb(255,0,10) = [255,0,10]
        return cssString.match(colourtool.regexPatterns.rgbValues)
    },
    hex2RGB: function (hex) {
        hex = hex.replace("#","")
        var rgb = []
        if (hex.length == 3) { hex = colourtool.hexS2hexL(hex)}
        
        var r = parseInt(hex.substring(0,2),16)
        var g = parseInt(hex.substring(2,4),16)
        var b = parseInt(hex.substring(4,6),16)
        rgb.push(r,g,b)
        
        return rgb
    },
    hexS2hexL: function (hex) {
        hex = hex.replace("#","");
        var longhandHex = hex[0].toString() + hex[0].toString() + hex[1].toString() + hex[1].toString() + hex[2].toString() + hex[2].toString()
        return longhandHex
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
