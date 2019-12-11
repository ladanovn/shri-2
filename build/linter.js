"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const warning_1 = __importDefault(require("./rules/warning"));
const rules = {
    "warning": warning_1.default
};
const blockErrors = [];
// const recursiveLint = (block: IBlock) => {
//     const blockErrors:IError[] = [];
//     if (rules[block.block]) {
//         rules[block.block].forEach(f => {
//             const ruleErrors = f(block);
//             if (ruleErrors) {
//                 ruleErrors.forEach(e => blockErrors.push(e));
//             }
//         });
//     }
//     if (block.content) {
//         block.content.forEach(block => {
//             const childErrors = recursiveLint(block);
//             if (childErrors) {
//                 blockErrors.concat(childErrors);
//             }
//         });
//     }
//     return blockErrors;
// };
// function linter(str: string): IError[] {
//     const json = JSON.parse(str);
//     return recursiveLint(json);
// }
const testData = `{
    "block": "warning",
    "content": [
        { "block": "text", "mods": { "size": "l" } },
        { "block": "text", "mods": { "size": "m" } }
    ]
}`;
let line = 1;
let column = 0;
const parentheses = [];
testData.split("").forEach((symbol, index) => {
    column += 1;
    if (symbol === '\n') {
        line += 1;
        column = 1;
    }
    ;
    if (symbol === "{") {
        parentheses.push({
            value: "{",
            column,
            line,
            index
        });
    }
    else if (symbol === "}") {
        if (parentheses.slice(-1)[0].value === "{") {
            const block = JSON.parse(testData.slice(parentheses.slice(-1)[0].index, index + 1));
            if (block.block) {
                if (rules[block.block]) {
                    rules[block.block].forEach(f => {
                        const ruleErrors = f(block);
                        if (ruleErrors) {
                            ruleErrors.forEach(e => blockErrors.push(e));
                        }
                    });
                }
            }
            parentheses.pop();
        }
        else {
            // 
        }
    }
});
console.log(blockErrors);
// console.log([...testData.matchAll(/{\s*"block":\s*"[a-z]+"[("a-z")\s,({("a-z")\s,:\[\]})]* \s*}/gi)])
// console.log(linter(testData))
// if (window) {
//     window.linter = linter;
// } else if (global) {
//     global.linter = linter;
// }
//# sourceMappingURL=linter.js.map