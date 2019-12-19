"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const infoFunctionalBlocks = [
    "payment",
    "warning",
    "product",
    "history",
    "cover",
    "collect",
    "articles",
    "subscribtion",
    "event",
];
const marketingBlocks = [
    "commercial",
    "offer",
];
function gridLinter(block) {
    const ruleErrors = [];
    const blockObject = JSON.parse(block.value);
    let countInfoFunctional = 0;
    let countMarketing = 0;
    if (!blockObject.elem) {
        if (blockObject.content) {
            blockObject.content.forEach((child) => {
                if (child.content) {
                    child.content.forEach((grandChild) => {
                        if (infoFunctionalBlocks.includes(grandChild.block)) {
                            countInfoFunctional += 1;
                        }
                        else if (marketingBlocks.includes(grandChild.block)) {
                            countMarketing += 1;
                        }
                    });
                }
            });
            if (countMarketing > countInfoFunctional) {
                ruleErrors.push({
                    error: "...",
                    code: "GRID.TOO_MUCH_MARKETING_BLOCKS",
                    location: block.location,
                });
            }
        }
    }
    return ruleErrors;
}
exports.default = [
    gridLinter,
];
//# sourceMappingURL=index.js.map