(this["webpackJsonpspeech2code.webapp"]=this["webpackJsonpspeech2code.webapp"]||[]).push([[9],{15:function(e,t,o){"use strict";o.r(t);var r=o(1),a=o.n(r),c=o(39),n=(o(189),o(0));t.default=a.a.memo((function(e){return Object(n.jsxs)(a.a.Fragment,{children:[Object(n.jsx)(c.a,{}),Object(n.jsx)("main",{className:"home",children:Object(n.jsxs)("div",{className:"content",children:[Object(n.jsx)("iframe",{width:"560",height:"315",src:"https://www.youtube.com/embed/X61A9e8TuKc",title:"YouTube video player",frameBorder:"0",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",allowFullScreen:!0}),Object(n.jsx)("h1",{children:"Speech2Code"}),Object(n.jsxs)("p",{children:["Speech2Code is an application developed to help programmers suffering from RSI continue to exercise their main activity by using voice commands instead of the hands to type code. The ideia is that instead of typing ",Object(n.jsx)("code",{children:"let value = 7;"})," you can just say ",Object(n.jsx)("span",{children:"\u201cnew variable value equals number 7\u201d"}),"."]}),Object(n.jsxs)("p",{children:["Speech2Code also comes with an extension for VSCode called "," ",Object(n.jsx)("a",{target:"_blank",rel:"noreferrer",href:"https://github.com/pedrooaugusto/speech-to-code/tree/main/spoken-vscode-driver#vscode-spoken-driver",children:"Spoken"})," ",", is through that extension that it can communicate and control VSCode."]}),Object(n.jsx)("p",{children:"Currently, it only has support for the JavaScript programming language in the Visual Studio Code Editor."}),Object(n.jsxs)("p",{children:["Check out the ",Object(n.jsx)("a",{rel:"noreferrer",href:"/webapp",children:"demo"})," to see it working."]})]})})]})}))},189:function(e,t,o){},39:function(e,t,o){"use strict";o.d(t,"a",(function(){return n}));o(1);var r=o(37),a=o(6),c=(o(40),o(0));function n(e){var t=Object(a.a)(),o=t.root,n=t.lang,s=t.route,l=function(e){return"".concat("/speech-to-code","/").concat(o).concat(o?"/":"").concat(e)},d=function(e){return s===e?"selected":""},h=localStorage.getItem("STT")||"azure",p="index"===s?"":s+"/",u=function(e,t){return t.preventDefault(),localStorage.setItem("STT",e),window.location.reload()};return Object(c.jsxs)("nav",{id:"top-nav",children:[Object(c.jsx)("figure",{children:Object(c.jsx)("img",{src:"".concat("/speech-to-code","/logo-purple.png"),alt:"logo",height:"40",title:"Brand logo"})}),Object(c.jsx)("a",{href:l(""),className:d("index"),children:i[n].Home}),Object(c.jsx)("a",{href:l("webapp/"),className:d("webapp"),children:"Demo"}),Object(c.jsx)("a",{rel:"noreferrer",href:"https://pedrooaugusto.github.io/Programming With Voice - Assistive Technology Tool For Programming In JavaScript Using Voice - Pedro Silva.pdf",target:"_blank",children:i[n].Article}),Object(c.jsx)("a",{href:l("about/"),className:d("about"),children:i[n].About}),Object(c.jsxs)("div",{className:"language",children:[Object(c.jsx)("a",{href:"/speech-to-code/en/"+p,className:"en-US"===n?"selected":"",children:"en-US"}),"\xa0/\xa0",Object(c.jsx)("a",{href:"/speech-to-code/pt/"+p,className:"pt-BR"===n?"selected":"",children:"pt-BR"}),Object(c.jsx)("span",{className:"help","data-tip":"This website language","data-for":"header",children:Object(c.jsx)("i",{className:"fa fa-question-circle"})})]}),Object(c.jsxs)("div",{className:"config",children:[Object(c.jsx)("a",{href:"#",className:"azure"===h?"selected":"",onClick:function(e){return u("azure",e)},children:"Azure"}),"\xa0/\xa0",Object(c.jsx)("a",{href:"#",className:"chrome"===h?"selected":"",onClick:function(e){return u("chrome",e)},children:"Chrome"}),Object(c.jsx)("span",{className:"help","data-tip":i[n].help,"data-for":"header",children:Object(c.jsx)("i",{className:"fa fa-question-circle"})})]}),Object(c.jsx)(r.a,{multiline:!0,effect:"solid",className:"custom-tooltip tooltip-header",id:"header"})]})}var i={"en-US":{help:"Which Speech to Text provider should be used ?<br/>\n                Azure is the default option, but since it is a paid service it may not be available all the time.<br/>\n                Chrome is the native Speech to Text provider of your browser, it's a free service and was\n                tested on Google Chrome and MS Edge (it may work on any browser that supports the SpeechRecognition API).",Home:"Home",About:"About",Article:"Article"},"pt-BR":{help:"Qual o provedor de Speech to Text deve ser usado ?<br/>\n        Azure \xe9 a op\xe7\xe3o padr\xe3o, por se tratar de um servi\xe7o pago, pode n\xe3o estar dispon\xedvel a todo momento.<br/>\n        Chrome \xe9 o servi\xe7o nativo de convers\xe3o de fala em texto do seu navegador, \xe9 um servi\xe7o gr\xe1tis e funciona\n            no Google Chrome e no MS Edge (pode funcionar em qualquer browser que suporte a SpeechRecognition API).",Home:"In\xedcio",About:"Sobre",Article:"Artigo"}}},40:function(e,t,o){}}]);
//# sourceMappingURL=9.c45f55b7.chunk.js.map