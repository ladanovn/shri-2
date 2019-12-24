import { IBlock, IBlockObject, IError } from "../../interfaces";
import blockExtractor from "../../helper/blockExtractor";

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

export const errorCode: string = "GRID.TOO_MUCH_MARKETING_BLOCKS";
export const errorMessage: string = "Marketing blocks occupy more than half of all grid block columns";

export function linter(block: IBlock): IError[] {
    const ruleErrors: IError[] = [];
    const blockObject: IBlockObject = JSON.parse(block.value);

    let countInfoFunctional: number = 0;
    let countMarketing: number = 0;

    if (!blockObject.elem) {

        const blocks: IBlock[] = blockExtractor(block.value, block.location);
        for (const child of blocks) {
            const childObject: IBlockObject = JSON.parse(child.value);

            if (childObject.content && childObject.elemMods) {
                if (childObject.content.length === 1) {
                    const typeChildObject = childObject.content[0].block;

                    if (infoFunctionalBlocks.includes(typeChildObject)) {
                        countInfoFunctional += Number(childObject.elemMods["m-col"]);
                    } else if (marketingBlocks.includes(typeChildObject)) {
                        countMarketing += Number(childObject.elemMods["m-col"]);
                    }
                }
            }
        }

        if (countMarketing > countInfoFunctional) {
            ruleErrors.push({
                code: errorCode,
                error: errorMessage,
                location: block.location,
            });
        }

    }

    return ruleErrors;
}
