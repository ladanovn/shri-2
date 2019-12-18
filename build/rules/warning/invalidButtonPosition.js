"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const blockExtractor_1 = __importDefault(require("../../helper/blockExtractor"));
function default_1(block) {
    const ruleErrors = [];
    const prevButton = [];
    let existPlaceholder = false;
    const blockVal = JSON.parse(block.value);
    if (blockVal.content.length) {
        const blocks = blockExtractor_1.default(block.value, block.location);
        blocks.forEach((b) => {
            const blockObject = JSON.parse(b.value);
            if (blockObject.block === "placeholder") {
                existPlaceholder = true;
                prevButton.forEach((btn) => {
                    ruleErrors.push({
                        code: "WARNING.INVALID_BUTTON_POSITION",
                        error: "...",
                        location: btn,
                    });
                });
            }
            else if (blockObject.block === "button") {
                if (!existPlaceholder) {
                    prevButton.push(b.location);
                }
            }
        });
    }
    return ruleErrors;
}
exports.default = default_1;
//# sourceMappingURL=invalidButtonPosition.js.map