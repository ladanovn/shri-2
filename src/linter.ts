declare var global: any;
declare var window: any;

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

function lint(str: string): IError[] {
    const blockErrors: IError[] = [];
    const blocks: IBlock[] = blockExtractor(str, {
        start: {
            line: 1,
            column: 0,
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

const isBrowser = typeof window !== "undefined";

if (isBrowser) {
    (window as any).lint = lint;

} else {
    (global as any).lint = lint;
}
