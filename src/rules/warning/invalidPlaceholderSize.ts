import blockExtractor from "../../helper/blockExtractor";
import { IBlock, IError, IBlockObject } from "../../interfaces";

export const errorCode: string = "WARNING.INVALID_PLACEHOLDER_SIZE";
export const errorMessage: string = "Invalid dimensions for placeholder block";

export function linter(block: IBlock): IError[] {
    const ruleErrors: IError[] = [];
    const blockVal: IBlockObject = JSON.parse(block.value);

    if (blockVal.content.length) {
        const allowedSize: string[] = ["s", "m", "l"];
        const blocks: IBlock[] = blockExtractor(block.value, block.location);

        blocks.forEach((b) => {
            const blockObject = JSON.parse(b.value) as IBlockObject;
            if (blockObject.block === "placeholder") {
                if (blockObject.mods) {
                    if (!allowedSize.includes(blockObject.mods.size)) {
                        ruleErrors.push({
                            code: errorCode,
                            error: errorMessage,
                            location: b.location,
                        });
                    }
                }
            }
        });
    }
    return ruleErrors;
}
