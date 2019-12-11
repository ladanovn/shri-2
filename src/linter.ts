import { IBlock, IError, IBlockRules } from "./interfaces";
import warningRules from "./rules/warning";

const rules: IBlockRules = {
    "warning": warningRules
};

const blockErrors: IError[] = [];

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

const testData: string = `{
    "block": "warning",
    "content": [
        { "block": "text", "mods": { "size": "l" } },
        { "block": "text", "mods": { "size": "m" } }
    ]
}`;

let line: number = 1;
let column: number = 0;
const parentheses: {
    value: string,
    column: number,
    line: number,
    index: number
}[] = [];

testData.split("").forEach((symbol, index) => {
    column += 1;

    if (symbol === '\n') {
        line += 1;
        column = 1
    };

    if (symbol === "{") {

        parentheses.push({
            value: "{",
            column,
            line,
            index
        });

    } else if (symbol === "}") {

        if (parentheses.slice(-1)[0].value === "{") {

            const block = JSON.parse(testData.slice(parentheses.slice(-1)[0].index, index + 1)) as IBlock;
            
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

        } else {
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