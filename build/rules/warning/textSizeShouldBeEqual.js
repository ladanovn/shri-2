"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sizes = ["xxxs", "xxs", "xs", "s", "m", "l", "xl", "xxl", "xxxl", "xxxxl", "xxxxxl"];
const isSizeLarger = (size1, size2) => {
    const size1Index = sizes.findIndex(size => size === size1);
    const size2Index = sizes.findIndex(size => size === size2);
    return size1Index > size2Index;
};
function default_1(block) {
    const ruleErrors = [];
    if (block.content.length) {
        let textSize = "";
        const prevButton = [];
        block.content.forEach((child) => {
            if (child.block === "text" && !textSize) {
                textSize = child.mods.size;
                // if exist buttons in front of the text
                prevButton.forEach(btn => {
                    const buttonSize = child.mods.size;
                    if (!isSizeLarger(buttonSize, textSize)) {
                        ruleErrors.push({
                            error: "",
                            code: "WARNING.INVALID_BUTTON_SIZE",
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
                });
            }
            else if (child.block === "button") {
                if (textSize) {
                    const buttonSize = child.mods.size;
                    if (!isSizeLarger(buttonSize, textSize)) {
                        ruleErrors.push({
                            error: "",
                            code: "WARNING.INVALID_BUTTON_SIZE",
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
                else {
                    prevButton.push(child);
                }
            }
        });
    }
    return ruleErrors;
}
exports.default = default_1;
//# sourceMappingURL=textSizeShouldBeEqual.js.map