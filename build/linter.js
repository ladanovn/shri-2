!function(e){var t={};function o(s){if(t[s])return t[s].exports;var l=t[s]={i:s,l:!1,exports:{}};return e[s].call(l.exports,l,l.exports,o),l.l=!0,l.exports}o.m=e,o.c=t,o.d=function(e,t,s){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:s})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var s=Object.create(null);if(o.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var l in e)o.d(s,l,function(t){return e[t]}.bind(null,l));return s},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="",o(o.s=1)}([function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t,o=0){const s=[],l=[];let n=t.start.line,r=t.start.column;return e.split("").forEach((t,a)=>{if(r+=1,"\n"===t&&(n+=1,r=0),"{"===t)l.push({value:"{",column:r,line:n,index:a});else if("}"===t){const t=l.slice(-1)[0];if("{"===t.value){const i=e.slice(t.index,a+1);s.push({value:i,location:{start:{line:t.line,column:t.column},end:{line:n,column:r+1}},level:l.length+o}),l.pop()}}}),s}},function(e,t,o){"use strict";(function(e){var s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const l=s(o(0)),n=s(o(3)),r=s(o(8)),a=s(o(9));class i{constructor(e){this.strJSON=e,this.rules={warning:n.default,text:r.default,grid:a.default},this.blockErrors=[],this.stash={}}lint(){return l.default(this.strJSON,{start:{line:1,column:0}}).forEach(e=>{const t=JSON.parse(e.value);t.block&&this.rules[t.block]&&this.rules[t.block].forEach(t=>{const o=t.bind(this)(e);o&&o.forEach(e=>this.blockErrors.push(e))})}),this.blockErrors}}function c(e){return new i(e).lint()}t.default=c,"undefined"!=typeof window?window.lint=c:e.lint=c}).call(this,o(2))},function(e,t){var o;o=function(){return this}();try{o=o||new Function("return this")()}catch(e){"object"==typeof window&&(o=window)}e.exports=o},function(e,t,o){"use strict";var s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const l=s(o(4)),n=s(o(5)),r=s(o(6)),a=s(o(7));t.default=[l.default,n.default,r.default,a.default]},function(e,t,o){"use strict";var s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const l=s(o(0));t.default=function(e){if(JSON.parse(e.value).content.length){let t="";const o=l.default(e.value,e.location);for(const s of o){const o=JSON.parse(s.value);if("text"===o.block&&o.mods){if(!o.mods.size)return[{code:"WARNING.TEXT_SIZES_SHOULD_BE_EQUAL",error:"All texts (blocks of text) in the warning block must be the same size",location:e.location}];if(t||(t=o.mods.size),t!==o.mods.size)return[{code:"WARNING.TEXT_SIZES_SHOULD_BE_EQUAL",error:"All texts (blocks of text) in the warning block must be the same size",location:e.location}]}}}return[]}},function(e,t,o){"use strict";var s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const l=s(o(0)),n=["xxxxxs","xxxxs","xxxs","xxs","xs","s","m","l","xl","xxl","xxxl","xxxxl","xxxxxl"],r=(e,t)=>{return n.findIndex(t=>t===e)>n.findIndex(e=>e===t)};t.default=function(e){const t=[];if(JSON.parse(e.value).content.length){let o="";const s=[];l.default(e.value,e.location).forEach(l=>{const n=JSON.parse(l.value);if("text"!==n.block||o){if("button"===n.block)if(o){const e=n.mods.size;r(e,o)||t.push({code:"WARNING.INVALID_BUTTON_SIZE",error:"The button block size must be 1 step larger than text block",location:l.location})}else s.push(e.location)}else o=n.mods.size,s.forEach(e=>{const s=n.mods.size;r(s,o)||t.push({code:"WARNING.INVALID_BUTTON_SIZE",error:"The button block size must be 1 step larger than text block",location:e})})})}return t}},function(e,t,o){"use strict";var s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const l=s(o(0));t.default=function(e){const t=[],o=[];let s=!1;if(JSON.parse(e.value).content.length){l.default(e.value,e.location).forEach(e=>{const l=JSON.parse(e.value);"placeholder"===l.block?(s=!0,o.forEach(e=>{t.push({code:"WARNING.INVALID_BUTTON_POSITION",error:"The button block in the warning block cannot be in front of the placeholder block",location:e})})):"button"===l.block&&(s||o.push(e.location))})}return t}},function(e,t,o){"use strict";var s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const l=s(o(0));t.default=function(e){const t=[];if(JSON.parse(e.value).content.length){const o=["s","m","l"];l.default(e.value,e.location).forEach(e=>{const s=JSON.parse(e.value);"placeholder"===s.block&&s.mods&&(o.includes(s.mods.size)||t.push({code:"WARNING.INVALID_PLACEHOLDER_SIZE",error:"Invalid dimensions for placeholder block",location:e.location}))})}return t}},function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const s=(e,t)=>"h2"===e&&"h1"===t||"h3"===e&&"h2"===t;t.default=[function(e){this.stash.isExistH1=this.stash.isExistH1||!1,this.stash.prevLevel=this.stash.prevLevel||0,this.stash.prevMaxBlock=this.stash.prevMaxBlock||{value:"",location:{}};const t=[],o=JSON.parse(e.value);if(o.mods&&o.mods.type){if("h1"===o.mods.type&&(this.stash.isExistH1?t.push({code:"TEXT.SEVERAL_H1",error:"The 1 level heading on the page should be the only one",location:e.location}):this.stash.isExistH1=!0),e.level>this.stash.prevLevel)if(this.stash.prevMaxBlock.value)switch(o.mods.type){case"h1":"h2"===this.stash.prevMaxBlock.value&&t.push({code:"TEXT.INVALID_H2_POSITION",error:"The heading of the 2 level cannot be before the heading of the 1 level at the same or deeper level of nesting",location:this.stash.prevMaxBlock.location}),this.stash.prevMaxBlock.value="h1";break;case"h2":"h3"===this.stash.prevMaxBlock.value&&t.push({code:"TEXT.INVALID_H3_POSITION",error:"The heading of the 3 level cannot be before the heading of the 2 level at the same or deeper level of nesting",location:this.stash.prevMaxBlock.location}),this.stash.prevMaxBlock.value="h2";break;case"h3":this.stash.prevMaxBlock.value="h3"}else this.stash.prevMaxBlock={value:o.mods.type,location:e.location};else if(this.stash.prevMaxBlock=s(o.mods.type,this.stash.prevMaxBlock.value)?{value:o.mods.type,location:e.location}:this.stash.prevMaxBlock,s(o.mods.type,this.stash.prevMaxBlock.value))this.stash.prevMaxBlock={value:o.mods.type,location:e.location};else switch(o.mods.type){case"h1":"h2"===this.stash.prevMaxBlock.value&&t.push({code:"TEXT.INVALID_H2_POSITION",error:"The heading of the 2 level cannot be before the heading of the 1 level at the same or deeper level of nesting",location:this.stash.prevMaxBlock.location});break;case"h2":"h3"===this.stash.prevMaxBlock.value&&t.push({code:"TEXT.INVALID_H3_POSITION",error:"The heading of the 3 level cannot be before the heading of the 2 level at the same or deeper level of nesting",location:this.stash.prevMaxBlock.location})}this.stash.prevLevel=e.level}return t}]},function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const s=["payment","warning","product","history","cover","collect","articles","subscribtion","event"],l=["commercial","offer"];t.default=[function(e){const t=[],o=JSON.parse(e.value);let n=0,r=0,a=0;return o.elem||(o.mods&&(n=o.mods["m-columns"]),o.content&&(o.content.forEach(e=>{e.content&&e.content.forEach(t=>{s.includes(t.block)?r+=e.elemMods["m-col"]:l.includes(t.block)&&(a+=e.elemMods["m-col"])})}),a>n/2&&t.push({code:"GRID.TOO_MUCH_MARKETING_BLOCKS",error:"Marketing blocks occupy more than half of all grid block columns",location:e.location}))),t}]}]);