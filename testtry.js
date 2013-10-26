var assert = require("assert");
var magic = require("./magic");
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;	

var testText = {
	text : "This is some text of a page that I would have got from the parser"
};

test('Get response from node server', function(){
	var magicStuff = new magic.magic1(testText);
	console.log(magicStuff);
	assert.equal(magicStuff.getPageText(),testText.text);
	
});


function httpGet(theUrl){
    var xmlHttp = null;

    xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false );
    xmlHttp.send( null );
    return xmlHttp.responseText;
}