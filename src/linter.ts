declare var global: any;
declare var window: any;

import { IBlock, IBlockRules, IBlockObject, IError } from "./interfaces";
import blockExtractor from "./helper/blockExtractor";

import warningRules from "./rules/warning";
import textRules from "./rules/text";
import gridRules from "./rules/grid";

class Linter {
    public strJSON: string;
    private rules: IBlockRules;
    private ruleContext: any;
    private blockErrors: IError[];

    constructor(str: string) {
        this.strJSON = str;
        this.rules = {
            warning: warningRules,
            text: textRules,
            grid: gridRules,
        };
        this.blockErrors = [];
        this.ruleContext = {};
    }

    public lint(): IError[] {
        const blocks: IBlock[] = blockExtractor(this.strJSON, {
            start: {
                line: 1,
                column: 0,
            },
        });

        blocks.forEach((block) => {
            const blockVal = JSON.parse(block.value) as IBlockObject;

            if (blockVal.block) {
                if (this.rules[blockVal.block]) {
                    this.rules[blockVal.block].forEach((f) => this.lintRule(f, block));
                }
            }
        });

        return this.blockErrors;
    }

    private lintRule(f: (block: IBlock) => IError[], block: IBlock) {
        // this.ruleContext = {};
        const ruleErrors = f.bind(this)(block);

        if (ruleErrors) {
            ruleErrors.forEach((e: IError) => this.blockErrors.push(e));
        }
    }
}

export default function lint(str: string): IError[] {
    const linter = new Linter(str);
    return linter.lint();
}

const isBrowser = typeof window !== "undefined";

if (isBrowser) {
    (window as any).lint = lint;

} else {
    (global as any).lint = lint;
}
