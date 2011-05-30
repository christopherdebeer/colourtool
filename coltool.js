/*
    Welcome to a ColourTool Bookmarklet...
    by Christopher de Beer & Brian Coit
    v0.1

    jQuery Bookmarklet loader/initialiser
*/

// Loadem Up! 
window.bookmarklet = (function(opts){fullFunc(opts)})({
    css : [colBase + "colourtool.css"],
    js  : [
        colBase + "colourtool.js"
    ],
    ready : function() {

        // Start the show.
        colourtool.init();
        
    }
});

// jQuery bookmarklet magic...
// ... by Brett Barros (& Paul Irish)
// ... http://www.latentmotion.com/downloads/blank-bookmarklet-v1.js
function fullFunc(a){function d(b){if(b.length===0){a.ready();return false}
$.getScript(b[0],function(){d(b.slice(1))})}function e(b){$.each(b,function(c,f){$("<link>")
.attr({href:f,rel:"stylesheet"}).appendTo("head")})}a.jqpath=a.
jqpath||"http://ajax.googleapis.com/ajax/libs/jquery/1.5.2/jquery.min.js";
(function(b){var c=document.createElement("script");c.type="text/javascript";c.src=b;
c.onload=function(){e(a.css);d(a.js)};document.body.appendChild(c)})(a.jqpath)};