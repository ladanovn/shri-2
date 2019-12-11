"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(block) {
    const ruleErrors = [];
    if (block.content.length) {
        let textSize = "";
        block.content.forEach((child) => {
            if (child.block === "text") {
                if (!textSize) {
                    textSize = child.mods.size;
                }
                if (textSize !== child.mods.size) {
                    ruleErrors.push({
                        error: "",
                        code: "WARNING.TEXT_SIZES_SHOULD_BE_EQUAL",
                        location: {
                            start: {
                                column: 1,
                                line: 1,
                            },
                            end: {
                                column: 1,
                                line: 1
                            }
                        }
                    });
                }
            }
        });
    }
    return ruleErrors;
}
exports.default = default_1;
//# sourceMappingURL=invalidButtonSize.js.map