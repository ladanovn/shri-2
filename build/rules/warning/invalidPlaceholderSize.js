"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const blockExtractor_1 = __importDefault(require("../../helper/blockExtractor"));
function default_1(block) {
    const ruleErrors = [];
    const blockVal = JSON.parse(block.value);
    if (blockVal.content.length) {
        const allowedSize = ["s", "m", "l"];
        const blocks = blockExtractor_1.default(block.value, block.location);
        blocks.forEach((b) => {
            const blockObject = JSON.parse(b.value);
            if (blockObject.block === "placeholder") {
                if (blockObject.mods) {
                    if (!allowedSize.includes(blockObject.mods.size)) {
                        ruleErrors.push({
                            error: "",
                            code: "WARNING.INVALID_PLACEHOLDER_SIZE",
                            location: b.location,
                        });
                    }
                }
            }
        });
    }
    return ruleErrors;
}
exports.default = default_1;
//# sourceMappingURL=invalidPlaceholderSize.js.map