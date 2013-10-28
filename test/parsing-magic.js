var assert = require('assert');
// { host: 'api.clockworksms.com',
  // path: '/http/send.aspx?key=0b377aa9114a3c22a0ba512c6ac7f3af3110b8bb&to=447453847173&content=# What is Lime?\
// n\nI love the [Sublime Text](http://www.sublimetext.com) editor. [I have](https://github.com/quarnster/Sublime
// Clang) [created](https://github.com/quarnster/SublimeJava) [several](https://github.com/quarnster/CompleteShar
// p) [plugins](https://github.com/quarnster/SublimeGDB) [to make](https://github.com/quarnster/ADBView) it even
// better. One thing that scares me though is that it is not open sourced and the [pace of nightly releases](http
// ://www.sublimetext.com/nightly) have recently been anything but nightly, even now that version 3 is out in Bet
// a.\n\nThere was a period of about 6 months after the Sublime Text 2 "stable" version was released where pretty
 // much nothing at all was communicated to the users about what to expect in the future, nor was there much supp
// ort offered in the forums. People including myself were wondering if the product was dead and I personally won
// dered what would happen to all the bugs, crashes and annoyances that still existed in ST2. This lack of commun
// ication is a dealbreaker to me and I decided that I will not spend any more money on that product because of i
// t.\n\nAs none of the other text editors I\'ve tried come close to the love I had for Sublime Text, I decided I
 // had to create my own.\n\nThe frontend(s) are not ready to replace your favourite editor, but the backend itse
// lf I believe isn\'t too far away.\n\n![Screenshot taken Oct 23 2013](http://i.imgur.com/VIpmjau.png)\n\n# Goal
// s\n\n- ? 100% Open source\n- ? Compatible with Textmate color schemes (which is what ST is using)\n- ? Compati
// ble with Textmate syntax definitions (which again is what ST is using)\n- ? Compatible with Textmate snippets\
// n- ? Compatible with Sublime Text's python plugin API. I'll probably never implement this 100%, only the api b
// its I need for the plugins I use.\n- ? Compatible with Sublime Text's keybindings and settings\n- ? Compatible
 // with Sublime Text snippets\n- ? Sublime Text's Goto anything panel\n- ? Multiple cursors\n- ? Regression test
// s (Programming in [Go](http://golang.org) makes it trivial and even fun to write them ;))\n- ? Support for plu
// gging in a custom parser for more advanced syntax highlighting.\n- ? Terminal UI (*Maybe* I'll work on a simpl
// e non-terminal UI at some point)\n- ? Cross platform (It appears to be compiling and running on OSX and Linux
// last I tried, but needs further validation.)\n\n# Why can't I open up an issue?\n\nBecause I'm just a single p
// erson and I don't want to offer up my spare time doing support or dealing with feature requests that I don't c
// are about myself. If you want a feature implemented or a bug fixed, fork it and implement it yourself and subm
// it a pull request when you're happy with the implementation.\n\n# Build instructions\n\n### Install required c
// omponents\n- Go 1.1\n   - Follow the build instructions at [tip.golang.org](http://tip.golang.org/doc/install/
// source)\n- Python3\n   - Python 3 **must** be compiled without [sigaltstack enabled](https://code.google.com/p
// /go/issues/detail?id=5287).\n   - ~~``` sudo apt-get install python3-dev ``` # On Linux~~\n   - ~~``` brew ins
// tall python3 ``` # On Mac~~\n- Oniguruma\n   - ``` sudo apt-get install libonig-dev ``` # On Linux\n   - ``` b
// rew install oniguruma ``` # On Mac\n- qt5 (Optional)\n   - Follow the instructions at [go-qt5](https://github.
// com/salviati/go-qt5)\n\n### Download the needed repositories\n\n```\ngo get code.google.com/p/log4go github.co
// m/quarnster/parser github.com/quarnster/completion github.com/howeyc/fsnotify\ngit clone --recursive git@githu
// b.com:quarnster/lime.git $GOPATH/src/lime\n```\n\n### Modify cgo.go settings\n\n``` open $GOPATH/src/lime/3rdp
// arty/libs/gopy/lib/cgo.go ```\n\nExample of ``` cgo.go ``` settings on my Mac\n\n```\npackage py\n\n// #cgo CF
// LAGS: -I/usr/local/Cellar/python3/3.3.1/Frameworks/Python.framework/Versions/Current/include/python3.3m -I/usr
// /local/Cellar/python3/3.3.1/Frameworks/Python.framework/Versions/Current/include/python3.3m\n// #cgo LDFLAGS:
// -L/usr/local/Cellar/python3/3.3.1/Frameworks/Python.framework/Versions/Current/lib/python3.3/config-3.3m -ldl
// -framework CoreFoundation -lpython3.3\n// #cgo pkg-config: /usr/local/Cellar/libffi/3.0.13/lib/pkgconfig/libff
// i.pc\nimport "C"\n```\n\n### Compile completion\n\n```\ncd $GOPATH/src/github.com/quarnster/completion/build\n
// make\n```\n\n### Compile lime\n\n```\ncd $GOPATH/src/lime/build\ngo run build.go\n```\n\nDone!\n\n# To use ter
// mbox frontend\n\n```\ncd ../frontend/termbox\ngo run main.go\n```\n\n# To use qt5 frontend\n\n```\ncd ../front
// end/qt5\ngo run main.go\n```\n\n# License\n\nThe license of the project is the 2-clause BSD license:\n\n```\nC
// opyright (c) 2013 Fredrik Ehnbom\nAll rights reserved.\n\nRedistribution and use in source and binary forms, w
// ith or without\nmodification, are permitted provided that the following conditions are met:\n\n1. Redistributi
// ons of source code must retain the above copyright notice, this\n   list of conditions and the following discl
// aimer.\n2. Redistributions in binary form must reproduce the above copyright notice,\n   this list of conditio
// ns and the following disclaimer in the documentation\n   and/or other materials provided with the distribution
// .\n\nTHIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND\nANY EXPRESS OR IMPLIED W
// ARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED\nWARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICU
// LAR PURPOSE ARE\nDISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR\nANY DIRECT,
// INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES\n(INCLUDING, BUT NOT LIMITED TO, PROCUREMEN
// T OF SUBSTITUTE GOODS OR SERVICES;\nLOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AN
// D\nON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT\n(INCLUDING NEGLIGENCE OR OTHERW
// ISE) ARISING IN ANY WAY OUT OF THE USE OF THIS\nSOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.\n
// ```\n' }

test('parse shizzle', function(){
	assert.equal(0,0);
});