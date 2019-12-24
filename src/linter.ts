declare var global: any;
declare var window: any;

import { IBlock, IBlockRule, IBlockRules, IBlockObject, IError } from "./interfaces";
import blockExtractor from "./helper/blockExtractor";

import warningRules from "./rules/warning";
import textRules from "./rules/text";
import gridRules from "./rules/grid";

class Linter {
    public strJSON: string;
    private blockErrors: IError[];
    private allRules: IBlockRules;
    private rules: {
        [name: string]: boolean,
    };
    private rulesContext: {
        [ruleName: string]: any,
    };

    constructor(str: string, rules?: {
        [name: string]: boolean,
    }) {
        this.strJSON = str;
        this.allRules = {
            warning: warningRules,
            text: textRules,
            grid: gridRules,
        };
        this.blockErrors = [];
        this.rules = {};
        this.rulesContext = {};

        // set all rules by default equal true,
        // change them to custom if defined
        Object.values(this.allRules).flat(1).forEach((rule) => {
            this.rules[rule.rule] = rules ? rules[rule.rule] : true;
        });
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
                if (this.allRules[blockVal.block]) {
                    this.allRules[blockVal.block].forEach((rule) => this.lintRule(rule, block));
                }
            }
        });

        return this.blockErrors;
    }

    private lintRule(rule: IBlockRule, block: IBlock) {
        if (this.rules[rule.rule]) {
            if (!this.rulesContext[rule.rule]) {
                this.rulesContext[rule.rule] = {};
            }
            const ruleErrors = rule.linter.bind(this)(block);

            if (ruleErrors) {
                ruleErrors.forEach((e: IError) => this.blockErrors.push(e));
            }
        }
    }
}

export default function lint(str: string, rules?: {
    [name: string]: boolean,
}): IError[] {
    const linter = new Linter(str, rules);
    return linter.lint();
}

const isBrowser = typeof window !== "undefined";

if (isBrowser) {
    (window as any).lint = lint;

} else {
    (global as any).lint = lint;
}
