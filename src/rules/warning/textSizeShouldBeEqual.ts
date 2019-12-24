import blockExtractor from "../../helper/blockExtractor";
import { IBlock, IError, IBlockObject } from "../../interfaces";

export const errorCode: string = "WARNING.TEXT_SIZES_SHOULD_BE_EQUAL";
export const errorMessage: string = "All texts (blocks of text) in the warning block must be the same size";

export function linter(block: IBlock): IError[] {
    const ruleErrors: IError[] = [];
    const blockObject = JSON.parse(block.value);

    if (blockObject.content.length) {
        let textSize: string = "";
        const childBlocks: IBlock[] = blockExtractor(block.value, block.location);

        for (const child of childBlocks) {
            const childBlockObject: IBlockObject = JSON.parse(child.value);

            if (childBlockObject.block === "text") {
                if (childBlockObject.mods) {
                    if (childBlockObject.mods.size) {
                        if (!textSize) {
                            textSize = childBlockObject.mods.size;
                        }

                        if (textSize !== childBlockObject.mods.size) {
                            return [{
                                code: errorCode,
                                error: errorMessage,
                                location: block.location,
                            }];
                        }

                    } else {
                        return [{
                            code: errorCode,
                            error: errorMessage,
                            location: block.location,
                        }];
                    }
                }
            }
        }
    }
    return ruleErrors;
}
