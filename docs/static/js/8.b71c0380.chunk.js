(this["webpackJsonpspeech2code.webapp"]=this["webpackJsonpspeech2code.webapp"]||[]).push([[8],{16:function(e,t,o){"use strict";o.r(t);var i=o(1),s=o.n(i),c=o(54),r=(o(187),o.p+"static/media/inner-workings-diagram-pr-br.d414e53c.png"),a=o(0);t.default=s.a.memo((function(e){return Object(a.jsxs)(s.a.Fragment,{children:[Object(a.jsx)(c.a,{}),Object(a.jsxs)("main",{className:"about",children:[Object(a.jsxs)("div",{className:"content",children:[Object(a.jsxs)("div",{className:"main-title",children:[Object(a.jsx)("h1",{children:"About"}),Object(a.jsx)("div",{children:"What is this website"})]}),Object(a.jsxs)("p",{children:["Speech2Code is an desktop application that let's you control your favorite IDE using just voice commands, ",Object(a.jsx)("br",{}),"that means you can write programs using just your voice, without typing on the keyboard. It was developed ",Object(a.jsx)("br",{}),"as part of my undergraduate dissertation in Computer Science, in which I proposed and developed",Object(a.jsx)("br",{})," an assistive technology tool to help programmers suffering from Repetitive Strain Injury (RSI)."]}),Object(a.jsxs)("p",{children:["This demo website allows you test Speech2Code in the browser without installing it on your local machine.",Object(a.jsx)("br",{}),"This is possible because this entire application is developed in JavaScript."]}),Object(a.jsxs)("div",{className:"main-title",children:[Object(a.jsx)("h3",{children:"Resources"}),Object(a.jsx)("div",{children:"Useful links"})]}),Object(a.jsxs)("ul",{children:[Object(a.jsx)("li",{children:Object(a.jsx)("a",{href:"https://github.com/pedrooaugusto/speech-to-code/releases",children:"Download Speech2Code Binaries"})}),Object(a.jsx)("li",{children:Object(a.jsx)("a",{href:"https://github.com/pedrooaugusto/speech-to-code/",children:"Github"})}),Object(a.jsx)("li",{children:Object(a.jsx)("a",{href:"https://github.com/pedrooaugusto/speech-to-code/tree/main/spoken/src/modules/typescript",children:"List of Commands"})}),Object(a.jsx)("li",{children:Object(a.jsx)("a",{href:"https://pedrooaugusto.github.io/Programming%20With%20Voice%20-%20Assistive%20Technology%20Tool%20For%20Programming%20In%20JavaScript%20Using%20Voice%20-%20Pedro%20Silva.pdf",children:"Dissertation (pt-br)"})}),Object(a.jsx)("li",{children:Object(a.jsx)("a",{href:"https://www.figma.com/file/glanqRtfVtW2Va1wybr5pkCh/TCC?node-id=18%3A2",children:"Application UI Design (Figma)"})})]})]}),Object(a.jsx)("div",{className:"pic",children:Object(a.jsxs)("figure",{children:[Object(a.jsx)("img",{src:r,alt:"System Inner Workings"}),Object(a.jsx)("figcaption",{children:"How does this application work in a picture."})]})})]})]})}))},187:function(e,t,o){},54:function(e,t,o){"use strict";o.d(t,"a",(function(){return r}));o(1);var i=o(39),s=o(6),c=(o(55),o(0));function r(e){var t=Object(s.a)(),o=t.root,r=t.lang,n=t.route,l=function(e){return"".concat("/speech-to-code","/").concat(o).concat(o?"/":"").concat(e)},d=function(e){return n===e?"selected":""},h=localStorage.getItem("STT")||"azure",p=function(e,t){return t.preventDefault(),localStorage.setItem("STT",e),window.location.reload()};return Object(c.jsxs)("nav",{id:"top-nav",children:[Object(c.jsx)("figure",{children:Object(c.jsx)("img",{src:"".concat("/speech-to-code","/logo-purple.png"),alt:"logo",height:"40",title:"Brand logo"})}),Object(c.jsx)("a",{href:l(""),className:d("home"),children:a[r].Home}),Object(c.jsx)("a",{href:l("webapp/"),className:d("webapp"),children:"Demo"}),Object(c.jsx)("a",{rel:"noreferrer",href:"https://pedrooaugusto.github.io/Programming With Voice - Assistive Technology Tool For Programming In JavaScript Using Voice - Pedro Silva.pdf",target:"_blank",children:a[r].Article}),Object(c.jsx)("a",{href:l("about/"),className:d("about"),children:a[r].About}),Object(c.jsxs)("div",{className:"language",children:[Object(c.jsx)("a",{href:"/speech-to-code/en/webapp/",className:"en-US"===r?"selected":"",children:"en-US"}),"\xa0/\xa0",Object(c.jsx)("a",{href:"/speech-to-code/pt/webapp/",className:"pt-BR"===r?"selected":"",children:"pt-BR"}),Object(c.jsx)("span",{className:"help","data-tip":"This website language","data-for":"header",children:Object(c.jsx)("i",{className:"fa fa-question-circle"})})]}),Object(c.jsxs)("div",{className:"config",children:[Object(c.jsx)("a",{href:"#",className:"azure"===h?"selected":"",onClick:function(e){return p("azure",e)},children:"Azure"}),"\xa0/\xa0",Object(c.jsx)("a",{href:"#",className:"chrome"===h?"selected":"",onClick:function(e){return p("chrome",e)},children:"Chrome"}),Object(c.jsx)("span",{className:"help","data-tip":a[r].help,"data-for":"header",children:Object(c.jsx)("i",{className:"fa fa-question-circle"})})]}),Object(c.jsx)(i.a,{multiline:!0,effect:"solid",className:"custom-tooltip tooltip-header",id:"header"})]})}var a={"en-US":{help:"Which Speech to Text provider should be used ?<br/>\n                Azure is the default option, but since it is a paid service it may not be available all the time.<br/>\n                Chrome is the native Speech to Text provider of your browser, it's a free service and was\n                tested on Google Chrome and MS Edge (it may work on any browser that supports the SpeechRecognition API).",Home:"Home",About:"About",Article:"Article"},"pt-BR":{help:"Qual o provedor de Speech to Text deve ser usado ?<br/>\n        Azure \xe9 a op\xe7\xe3o padr\xe3o, por se tratar de um servi\xe7o pago, pode n\xe3o estar dispon\xedvel a todo momento.<br/>\n        Chrome \xe9 o servi\xe7o nativo de convers\xe3o de fala em texto do seu navegador, \xe9 um servi\xe7o gr\xe1tis e funciona\n            no Google Chrome e no MS Edge (pode funcionar em qualquer browser que suporte a SpeechRecognition API).",Home:"In\xedcio",About:"Sobre",Article:"Artigo"}}},55:function(e,t,o){}}]);
//# sourceMappingURL=8.b71c0380.chunk.js.map