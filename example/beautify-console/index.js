!function(t,e){if("object"==typeof exports&&"object"==typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var o=e();for(var r in o)("object"==typeof exports?exports:t)[r]=o[r]}}(self,(()=>(()=>{"use strict";var t={943:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.BeautifyConsole=void 0;class o{static getInstance(){return this.instance||(this.instance=new o),this.instance}constructor(){this.infoPadStartText=["%cbeautify-console info: -> ","color: #5D8EF0;"],this.errorPadStartText=["beautify-console error: -> "],this.warnPadStartText=["beautify-console warn: -> "],this.logPadStartText=["%cbeautify-console log: -> ","color: green;"],this.info=console.info.bind(this,...this.infoPadStartText),this.error=console.error.bind(this,...this.errorPadStartText),this.warn=console.warn.bind(this,...this.warnPadStartText),this.log=console.log.bind(this,...this.logPadStartText)}setShowLog(t){t?(this.info=console.info.bind(this,...this.infoPadStartText),this.error=console.error.bind(this,...this.errorPadStartText),this.warn=console.warn.bind(this,...this.warnPadStartText),this.log=console.log.bind(this,...this.logPadStartText)):(this.info=(...t)=>{},this.error=(...t)=>{},this.warn=(...t)=>{},this.log=(...t)=>{})}openLog(){return this.setShowLog(!0),this}closeLog(){return this.setShowLog(!1),this}setPadStartText(t,...e){return{info:()=>{this.info=console.info.bind(this,...e)},error:()=>{this.error=console.error.bind(this,...e)},warn:()=>{this.warn=console.warn.bind(this,...e)},log:()=>{this.log=console.log.bind(this,...e)},undefined:()=>{console.log(void 0)}}[t||void 0](),this}}e.BeautifyConsole=o}},e={};function o(r){var i=e[r];if(void 0!==i)return i.exports;var s=e[r]={exports:{}};return t[r](s,s.exports,o),s.exports}var r={};return(()=>{var t=r;Object.defineProperty(t,"__esModule",{value:!0}),t.BeautifyConsole=void 0;var e=o(943);Object.defineProperty(t,"BeautifyConsole",{enumerable:!0,get:function(){return e.BeautifyConsole}})})(),r})()));
//# sourceMappingURL=index.js.map