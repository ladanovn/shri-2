
import { IBlock, IError, ILocation, IBlockObject } from "../../interfaces";
import blockExtractor from "../../helper/blockExtractor";

const sizes = ["xxxxxs", "xxxxs", "xxxs", "xxs", "xs", "s", "m", "l", "xl", "xxl", "xxxl", "xxxxl", "xxxxxl"];

const isSizeLarger = (size1: string, size2: string): boolean => {
    const size1Index = sizes.findIndex((size) => size === size1);
    const size2Index = sizes.findIndex((size) => size === size2);

    return size1Index - size2Index === 1;
};

export default function(block: IBlock): IError[] {
    const ruleErrors: IError[] = [];
    const blockObject: IBlockObject = JSON.parse(block.value);

    if (blockObject.content.length) {
        let textSize: string = "";
        const prevBtnLocations: ILocation[] = [];

        const childBlocks: IBlock[] = blockExtractor(block.value, block.location);
        childBlocks.forEach((child: IBlock) => {
            const childBlockObject: IBlockObject = JSON.parse(child.value);

            if (childBlockObject.block === "text" && !textSize) {
                textSize = childBlockObject.mods.size;

                // if exist buttons in front of the text
                prevBtnLocations.forEach((location) => {
                    const buttonSize = childBlockObject.mods.size;
                    if (!isSizeLarger(buttonSize, textSize)) {
                        ruleErrors.push({
                            code: "WARNING.INVALID_BUTTON_SIZE",
                            error: "The button block size must be 1 step larger than text block",
                            location,
                        });
                    }
                });

            } else if (childBlockObject.block === "button") {
                if (textSize) {
                    const buttonSize = childBlockObject.mods.size;
                    if (!isSizeLarger(buttonSize, textSize)) {
                        ruleErrors.push({
                            code: "WARNING.INVALID_BUTTON_SIZE",
                            error: "The button block size must be 1 step larger than text block",
                            location: child.location,
                        });
                    }
                } else {
                    prevBtnLocations.push(block.location);
                }
            }
        });
    }
    return ruleErrors;
}
