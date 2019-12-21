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

    let allColumns: number = 0;
    let countInfoFunctional: number = 0;
    let countMarketing: number = 0;

    if (!blockObject.elem) {
        if (blockObject.mods) {
            allColumns = blockObject.mods["m-columns"];
        }

        if (blockObject.content) {
            blockObject.content.forEach((child) => {
                if (child.content) {
                    child.content.forEach((grandChild) => {
                        if (infoFunctionalBlocks.includes(grandChild.block)) {
                            countInfoFunctional += child.elemMods["m-col"];
                        } else if (marketingBlocks.includes(grandChild.block)) {
                            countMarketing += child.elemMods["m-col"];
                        }
                    });
                }
            });
            if (countMarketing > allColumns / 2 ) {
                ruleErrors.push({
                    code: "GRID.TOO_MUCH_MARKETING_BLOCKS",
                    error: "Marketing blocks occupy more than half of all grid block columns",
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
