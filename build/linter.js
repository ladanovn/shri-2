"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const blockExtractor_1 = __importDefault(require("./helper/blockExtractor"));
const warning_1 = __importDefault(require("./rules/warning"));
const text_1 = __importDefault(require("./rules/text"));
const grid_1 = __importDefault(require("./rules/grid"));
const rules = {
    warning: warning_1.default,
    text: text_1.default,
    grid: grid_1.default,
};
function lint(str) {
    const blockErrors = [];
    const blocks = blockExtractor_1.default(str, {
        start: {
            column: 0,
            line: 1,
        },
    });
    blocks.forEach((block) => {
        const blockVal = JSON.parse(block.value);
        if (blockVal.block) {
            if (rules[blockVal.block]) {
                rules[blockVal.block].forEach((f) => {
                    const ruleErrors = f(block);
                    if (ruleErrors) {
                        ruleErrors.forEach((e) => blockErrors.push(e));
                    }
                });
            }
        }
    });
    return blockErrors;
}
const isBrowser = typeof window !== "undefined";
if (isBrowser) {
    window.lint = lint;
}
else {
    global.lint = lint;
}
//# sourceMappingURL=linter.js.map