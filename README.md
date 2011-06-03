Colourtool bookmarklet
======================

This tool lists all the colours mentioned within the stylesheets and style elements that are present on the current page. Its intended use is to facilitate checking of CSS for unintended colour variations/duplications.

## Install

To install this bookmarklet tool, create a bookmark with the code below as the link/location. Clicking on the bookmark will launch colourTool on whichever site/page you are on at the time.

`javascript:(function(){window.colBase='https://github.com/christopherdebeer/colourtool/raw/master/';var%20a=document.getElementsByTagName('head')[0],b=document.createElement('script');b.type='text/javascript';b.src=colBase+'coltool.js?'+Math.floor(Math.random()*99999);a.appendChild(b);})();%20void%200`


## Changelog

* The bookmarklet now, when encountering a stylsheet/asset that is unreahable (due to cross-domain security restrictions), attempts to resolve it by querying yahoo via YQL.  

## [TODO](/TODO.md) 

