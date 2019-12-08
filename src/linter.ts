interface IError {
    code: string,
    error: string,
    location: {
        start: {
            column: number,
            line: number
        },
        end: {
            column: number,
            line: number
        }
    }
}

interface IBlockRules {
    [block: string]: { (content: object): IError[]; } []
}

interface IBlock {
    block: string,
    content: IBlock[],
    mods: object[],
    elem: string,
    elemMods: object
}

// const sizes = ["xxxs", "xxs", "xs", "s", "m", "l", "xl", "xxl", "xxxl", "xxxxl", "xxxxxl"];
const rules: IBlockRules = {};

const recursiveLint = (block: IBlock) => {
    const blockErrors:IError[] = [];

    rules[block.block].forEach(f => {
        const ruleErrors = f(block.content);
        if (ruleErrors) {
            blockErrors.concat(ruleErrors);
        }
    });

    if (block.content) {
        block.content.forEach(block => {
            const childErrors = recursiveLint(block);
            if (childErrors) {
                blockErrors.concat(childErrors);
            }
        });
    }

    return blockErrors;
};

function linter(str: string): IError[] {
    const json = JSON.parse(str);
    return recursiveLint(json);
}

// if (window) {
//     window.linter = linter;

// } else if (global) {
//     global.linter = linter;
// }