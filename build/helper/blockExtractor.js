"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(str, location) {
    const result = [];
    const parentheses = [];
    let line = location.start.line;
    let column = location.start.column;
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
        }
        else if (symbol === "}") {
            const prevParentThese = parentheses.slice(-1)[0];
            if (prevParentThese.value === "{") {
                const value = str.slice(prevParentThese.index, index + 1);
                result.push({
                    value,
                    location: {
                        start: {
                            column: prevParentThese.column,
                            line: prevParentThese.line,
                        },
                        end: {
                            column,
                            line,
                        },
                    },
                });
                parentheses.pop();
            }
        }
    });
    return result;
}
exports.default = default_1;
//# sourceMappingURL=blockExtractor.js.map