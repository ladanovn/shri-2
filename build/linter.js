"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const warning_1 = __importDefault(require("./rules/warning"));
const rules = {
    "warning": warning_1.default
};
const testData = `{
    "block": "warning",
    "content": [
        { "block": "text", "mods": { "size": "l" } },
        { "block": "text", "mods": { "size": "m" } }
    ]
}`;
function linter(str) {
    const blockErrors = [];
    const parentheses = [];
    let line = 1;
    let column = 0;
    str.split("").forEach((symbol, index) => {
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
            const prevParentThese = parentheses.slice(-1)[0];
            if (prevParentThese.value === "{") {
                const strBlock = str.slice(prevParentThese.index, index + 1);
                const block = JSON.parse(strBlock);
                if (block.block) {
                    if (rules[block.block]) {
                        rules[block.block].forEach(f => {
                            const ruleErrors = f(block, {
                                start: {
                                    column: prevParentThese.column,
                                    line: prevParentThese.line
                                },
                                end: {
                                    column,
                                    line
                                }
                            });
                            if (ruleErrors) {
                                ruleErrors.forEach(e => blockErrors.push(e));
                            }
                        });
                    }
                }
                parentheses.pop();
            }
        }
    });
    return blockErrors;
}
console.log(JSON.stringify(linter(testData)));
// if (window) {
//     window.linter = linter;
// } else if (global) {
//     global.linter = linter;
// }
//# sourceMappingURL=linter.js.map