!function(o,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.BeautifyConsole=t():o.BeautifyConsole=t()}(self,(()=>(()=>{"use strict";var o={943:(o,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.BeautifyConsole=void 0;const e={black:30,red:31,green:32,yellow:33,blue:34,purple:35,cyan:36,white:37},r=(o={})=>{const{color:t="white",colorBg:r=""}=o;return`[${e[r]?e[r]+10:0};${e[t]||0}m`},s=()=>"object"==typeof process&&"node"===process.title?[r({color:"blue"}),"beautify-console-log info: -> "]:["%cbeautify-console-log info: -> ","color: #5D8EF0;"],i=()=>"object"==typeof process&&"node"===process.title?[r({color:"red"}),"beautify-console-log error: -> "]:["beautify-console-log error: -> "],n=()=>"object"==typeof process&&"node"===process.title?[r({color:"yellow"}),"beautify-console-log warn: -> "]:["beautify-console-log warn: -> "],l=()=>"object"==typeof process&&"node"===process.title?[r({color:"green"}),"beautify-console-log log: -> "]:["%cbeautify-console-log log: -> ","color: green;"];class a{constructor(){this.infoPadStartText=s(),this.errorPadStartText=i(),this.warnPadStartText=n(),this.logPadStartText=l(),this.info=console.info.bind(this,...this.infoPadStartText),this.error=console.error.bind(this,...this.errorPadStartText),this.warn=console.warn.bind(this,...this.warnPadStartText),this.log=console.log.bind(this,...this.logPadStartText)}static getInstance(){return this.instance||(this.instance=new a),this.instance}setShowLog(o,t){const e={info:()=>{this.info=o?console.info.bind(this,...this.infoPadStartText):(...o)=>{}},error:()=>{this.error=o?console.error.bind(this,...this.errorPadStartText):(...o)=>{}},warn:()=>{this.warn=o?console.warn.bind(this,...this.warnPadStartText):(...o)=>{}},log:()=>{this.log=o?console.log.bind(this,...this.logPadStartText):(...o)=>{}}};t?e[t]?e[t]():console.error(`type:${t} not supported`):o?(this.info=console.info.bind(this,...this.infoPadStartText),this.error=console.error.bind(this,...this.errorPadStartText),this.warn=console.warn.bind(this,...this.warnPadStartText),this.log=console.log.bind(this,...this.logPadStartText)):(this.info=(...o)=>{},this.error=(...o)=>{},this.warn=(...o)=>{},this.log=(...o)=>{})}open(o){return this.setShowLog(!0,o),this}close(o){return this.setShowLog(!1,o),this}setPadStartText(o,...t){const e={info:()=>{this.info=console.info.bind(this,...t)},error:()=>{this.error=console.error.bind(this,...t)},warn:()=>{this.warn=console.warn.bind(this,...t)},log:()=>{this.log=console.log.bind(this,...t)}};return e[o]?e[o]():console.error(`type:${o} not supported`),this}}t.BeautifyConsole=a}},t={};function e(r){var s=t[r];if(void 0!==s)return s.exports;var i=t[r]={exports:{}};return o[r](i,i.exports,e),i.exports}var r={};return(()=>{var o=r;Object.defineProperty(o,"__esModule",{value:!0});const t=e(943);o.default=t.BeautifyConsole})(),r})()));
//# sourceMappingURL=index.js.map