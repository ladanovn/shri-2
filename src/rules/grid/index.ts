import { IBlock, IBlockObject, IError } from "../../interfaces";

const infoFunctionalBlocks: string[] = [
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

const marketingBlocks: string[] = [
    "commercial",
    "offer",
];

function gridLinter(block: IBlock): IError[] {
    const ruleErrors: IError[] = [];
    const blockObject: IBlockObject = JSON.parse(block.value);

    let countInfoFunctional: number = 0;
    let countMarketing: number = 0;

    if (!blockObject.elem) {
        if (blockObject.content) {
            blockObject.content.forEach((child) => {
                if (child.content) {
                    child.content.forEach((grandChild) => {
                        if (infoFunctionalBlocks.includes(grandChild.block)) {
                            countInfoFunctional += 1;
                        } else if (marketingBlocks.includes(grandChild.block)) {
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

export default [
    gridLinter,
];