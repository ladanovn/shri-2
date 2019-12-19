import { IBlock, IBlockRules, IBlockObject , IError } from "./interfaces";

import blockExtractor from "./helper/blockExtractor";

import warningRules from "./rules/warning";
import textRules from "./rules/text";
import gridRules from "./rules/grid";

const rules: IBlockRules = {
    warning: warningRules,
    text: textRules,
    grid: gridRules,
};

const testData: string = `
{
    "block": "warning",
    "content": [
        { "block": "button", "mods": { "size": "m" } },
        { "block": "placeholder", "mods": { "size": "m" } }
    ]
}`;

function linter(str: string): IError[] {
    const blockErrors: IError[] = [];
    const blocks: IBlock[] = blockExtractor(str, {
        start: {
            column: 0,
            line: 1,
        },
    });

    blocks.forEach((block) => {
        const blockVal = JSON.parse(block.value) as IBlockObject;

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

// console.log(JSON.stringify(linter(testData)));

// if (window) {
//     window.linter = linter;

// } else if (global) {
//     global.linter = linter;
// }
