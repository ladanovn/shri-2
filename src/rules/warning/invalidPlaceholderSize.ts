import blockExtractor from "../../helper/blockExtractor";
import { IBlock, IError, IBlockObject } from "../../interfaces";

export default function(block: IBlock): IError[] {
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
