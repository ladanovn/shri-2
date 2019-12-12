"use strict";
/// <reference lib="es2020.string" />
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(block, location, strifyBlock) {
    const ruleErrors = [];
    const parentheses = [];
    let line = location.start.line;
    let column = location.start.column;
    let existPlaceholder = false;
    const prevButton = [];
    if (block.content.length) {
        strifyBlock.split("").forEach((symbol, index) => {
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
                    const strBlock = strifyBlock.slice(prevParentThese.index, index + 1);
                    const block = JSON.parse(strBlock);
                    if (block.block === "placeholder") {
                        existPlaceholder = true;
                        prevButton.forEach(btn => {
                            ruleErrors.push({
                                code: "WARNING.INVALID_BUTTON_POSITION",
                                error: "...",
                                location: btn
                            });
                        });
                    }
                    else if (block.block === "button") {
                        if (!existPlaceholder) {
                            prevButton.push({
                                start: {
                                    column: prevParentThese.column,
                                    line: prevParentThese.line
                                },
                                end: {
                                    column,
                                    line
                                }
                            });
                        }
                    }
                    parentheses.pop();
                }
            }
        });
    }
    return ruleErrors;
}
exports.default = default_1;
//# sourceMappingURL=invalidButtonPosition.js.map