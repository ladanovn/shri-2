import { IBlock, IBlockRules, IError } from "./interfaces";
import warningRules from "./rules/warning";

const rules: IBlockRules = {
    warning: warningRules,
};

const testData: string = `
{
    "block": "warning",
    "content": [
        { "block": "placeholder", "mods": { "size": "m" } },
        { "block": "button", "mods": { "size": "m" } }
    ]
}`;

function linter(str: string): IError[] {
    const blockErrors: IError[] = [];
    const parentheses: Array<{
        value: string,
        column: number,
        line: number,
        index: number,
    }> = [];

    let line: number = 1;
    let column: number = 0;

    str.split("").forEach((symbol, index) => {
        column += 1;

        if (symbol === "\n") {
            line += 1;
            column = 0;
        }

        if (symbol === "{") {
            parentheses.push({
                value: "{",
                column,
                line,
                index,
            });

        } else if (symbol === "}") {
            const prevParentThese = parentheses.slice(-1)[0];

            if (prevParentThese.value === "{") {
                const strBlock = str.slice(prevParentThese.index, index + 1);
                const block = JSON.parse(strBlock) as IBlock;

                if (block.block) {

                    if (rules[block.block]) {
                        rules[block.block].forEach((f) => {
                            const ruleErrors = f(block, {
                                start: {
                                    column: prevParentThese.column,
                                    line: prevParentThese.line,
                                },
                                end: {
                                    column,
                                    line,
                                },
                            }, strBlock);
                            if (ruleErrors) {
                                ruleErrors.forEach((e) => blockErrors.push(e));
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
