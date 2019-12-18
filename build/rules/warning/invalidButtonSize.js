"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(block) {
    const ruleErrors = [];
    const blockObject = JSON.parse(block.value);
    if (blockObject.content.length) {
        let textSize = "";
        blockObject.content.forEach((child) => {
            if (child.block === "text") {
                if (!textSize) {
                    textSize = child.mods.size;
                }
                if (textSize !== child.mods.size) {
                    ruleErrors.push({
                        error: "",
                        code: "WARNING.TEXT_SIZES_SHOULD_BE_EQUAL",
                        location: block.location,
                    });
                }
            }
        });
    }
    return ruleErrors;
}
exports.default = default_1;
//# sourceMappingURL=invalidButtonSize.js.map