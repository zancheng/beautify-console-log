!function(e,o){"object"==typeof exports&&"object"==typeof module?module.exports=o():"function"==typeof define&&define.amd?define([],o):"object"==typeof exports?exports.BeautifyConsole=o():e.BeautifyConsole=o()}(self,(()=>(()=>{"use strict";var e={943:(e,o,t)=>{Object.defineProperty(o,"__esModule",{value:!0}),o.BeautifyConsole=void 0;const r=t(377),i=(e={},o,t)=>{const{color:i=r.ColorType.white,bgColor:s=r.ColorType.white}=e,n=(s||0)+10,l=i||0;return"object"==typeof process&&"node"===process.title?`[${n};${l};1m ${t.toUpperCase()} [0m[100;97m ${o}[0m`:`[${n};${l};1m ${t.toUpperCase()} [0m[100;97m ${o}`},s={info:(e="beautify-console-log ",o={bgColor:r.ColorType.blue,color:r.ColorType.white})=>[i(o,e,r.LogType.info)],error:(e="beautify-console-log ",o={bgColor:r.ColorType.red,color:r.ColorType.white})=>[i(o,e,r.LogType.error)],warn:(e="beautify-console-log ",o={bgColor:r.ColorType.yellow,color:r.ColorType.black})=>[i(o,e,r.LogType.warn)],log:(e="beautify-console-log ",o={bgColor:r.ColorType.green,color:r.ColorType.white})=>[i(o,e,r.LogType.log)]};class n{constructor(){this.infoPadStartText=s[r.LogType.info](),this.errorPadStartText=s[r.LogType.error](),this.warnPadStartText=s[r.LogType.warn](),this.logPadStartText=s[r.LogType.log](),this.info=console.info.bind(this,...this.infoPadStartText),this.error=console.error.bind(this,...this.errorPadStartText),this.warn=console.warn.bind(this,...this.warnPadStartText),this.log=console.log.bind(this,...this.logPadStartText)}static getInstance(){return this.instance||(this.instance=new n),this.instance}config(e){const{type:o=[r.LogType.info,r.LogType.error,r.LogType.warn,r.LogType.log],title:t}=e;o.length>0&&(this.setShowLog(!1),o.forEach((e=>this.setShowLog(!0,e)))),t&&o.forEach((e=>this.setPadStartText({logType:e,title:t})))}setShowLog(e,o){const t={info:()=>{this.info=e?console.info.bind(this,...this.infoPadStartText):(...e)=>{}},error:()=>{this.error=e?console.error.bind(this,...this.errorPadStartText):(...e)=>{}},warn:()=>{this.warn=e?console.warn.bind(this,...this.warnPadStartText):(...e)=>{}},log:()=>{this.log=e?console.log.bind(this,...this.logPadStartText):(...e)=>{}}};o?t[o]?t[o]():console.error(`type:${o} not supported`):e?(this.info=console.info.bind(this,...this.infoPadStartText),this.error=console.error.bind(this,...this.errorPadStartText),this.warn=console.warn.bind(this,...this.warnPadStartText),this.log=console.log.bind(this,...this.logPadStartText)):(this.info=(...e)=>{},this.error=(...e)=>{},this.warn=(...e)=>{},this.log=(...e)=>{})}reset(){return this.setShowLog(!0),this}open(e){return this.setShowLog(!0,e),this}close(e){return this.setShowLog(!1,e),this}setPadStartText(e){try{const o={info:()=>{this.info=console.info.bind(this,...s[r.LogType.info](e.title,e.style))},error:()=>{this.error=console.error.bind(this,...s[r.LogType.error](e.title,e.style))},warn:()=>{this.warn=console.warn.bind(this,...s[r.LogType.warn](e.title,e.style))},log:()=>{this.log=console.log.bind(this,...s[r.LogType.log](e.title,e.style))}};o[e.logType]?o[e.logType]():console.error(`type:${e.logType} not supported`)}catch(e){this.error(e)}return this}}o.BeautifyConsole=n},377:(e,o)=>{var t,r;Object.defineProperty(o,"__esModule",{value:!0}),o.LogType=o.ColorType=void 0,function(e){e[e.black=90]="black",e[e.red=91]="red",e[e.green=92]="green",e[e.yellow=93]="yellow",e[e.blue=94]="blue",e[e.purple=95]="purple",e[e.cyan=96]="cyan",e[e.white=97]="white"}(t||(o.ColorType=t={})),function(e){e.info="info",e.warn="warn",e.error="error",e.log="log"}(r||(o.LogType=r={}))},928:(e,o,t)=>{Object.defineProperty(o,"__esModule",{value:!0}),o.formatConsoleStr=void 0,o.formatConsoleStr=(...e)=>{let o=e.slice(1);const r=/%[sdof]/g;if(e.length>1&&"string"==typeof e[0]){let i=0;const s=e[0].split(/(%s|%d|%o|%f)/g),n=e[0].replace(r,(function(r){i++;let n=-1;switch(r){case"%s":return o=o.slice(1),n=s.indexOf("%s"),n>-1&&(s[n]=e[i]?String(e[i]):""),String(e[i]);case"%d":return o=o.slice(1),n=s.indexOf("%d"),n>-1&&(s[n]=e[i]?Number(e[i]):""),Number(e[i]);case"%o":n=s.indexOf("%o");try{return e[i]instanceof Error?(o=o.slice(1),n>-1&&(s[n]=e[i]?JSON.stringify(e[i],["message","stack","type","name"]):""),JSON.stringify(e[i],["message","stack","type","name"])):(o=o.slice(1),n>-1&&(void 0!==t.g&&t.g?s[n]=e[i]?JSON.stringify(e[i]):"":s[n]=e[i]?e[i]:""),e[i])}catch(t){return o=o.slice(1),n=s.indexOf("%o"),n>-1&&(s[n]=e[i]?"[Circular]":""),"[Circular]"}case"%f":return o=o.slice(1),n=s.indexOf("%o"),n>-1&&(s[n]=e[i]?Number.parseFloat(e[i]):""),Number.parseFloat(e[i]);default:return o=o.slice(1),s[n]=e[i]?e[i]:"",e[i]}}));if(o.splice(0,0,n),s.length<e.length)for(let o=s.length;o<e.length;o++)s[o]=e[o];return s}return o}}},o={};function t(r){var i=o[r];if(void 0!==i)return i.exports;var s=o[r]={exports:{}};return e[r](s,s.exports,t),s.exports}t.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}();var r={};return(()=>{var e=r;Object.defineProperty(e,"__esModule",{value:!0}),e.utils=void 0;const o=t(943);e.utils=t(928),e.default=o.BeautifyConsole})(),r})()));
//# sourceMappingURL=index.js.map