import blockExtractor from "../../helper/blockExtractor";
import { IBlock, IBlockObject, IError, ILocation } from "../../interfaces";

export default function(block: IBlock): IError[] {
    const ruleErrors: IError[] = [];
    const prevButton: ILocation[] = [];
    let existPlaceholder: boolean = false;

    const blockVal: IBlockObject = JSON.parse(block.value);

    if (blockVal.content.length) {

        const blocks: IBlock[] = blockExtractor(block.value, block.location);
        blocks.forEach((b) => {
            const blockObject = JSON.parse(b.value) as IBlockObject;

            if (blockObject.block === "placeholder") {
                existPlaceholder = true;
                prevButton.forEach((btn) => {
                    ruleErrors.push({
                        code: "WARNING.INVALID_BUTTON_POSITION",
                        error: "The button block in the warning block cannot be in front of the placeholder block",
                        location: btn,
                    });
                });

            } else if (blockObject.block === "button") {
                if (!existPlaceholder) {
                    prevButton.push(b.location);
                }
            }
        });
    }
    return ruleErrors;
}
