import { IBlock, IError, ILocation, IBlockObject } from "../../interfaces";

const sizes = ["xxxs", "xxs", "xs", "s", "m", "l", "xl", "xxl", "xxxl", "xxxxl", "xxxxxl"];

const isSizeLarger = (size1: string, size2: string): boolean => {
    const size1Index = sizes.findIndex((size) => size === size1);
    const size2Index = sizes.findIndex((size) => size === size2);

    return size1Index > size2Index;
};

export default function(block: IBlock): IError[] {
    const ruleErrors: IError[] = [];
    const blockVal: IBlockObject = JSON.parse(block.value);

    if (blockVal.content.length) {
        let textSize: string = "";
        const prevBtnLocations: ILocation[] = [];

        blockVal.content.forEach((child: IBlockObject) => {
            if (child.block === "text" && !textSize) {
                textSize = child.mods.size;

                // if exist buttons in front of the text
                prevBtnLocations.forEach((location) => {
                    const buttonSize = child.mods.size;
                    if (!isSizeLarger(buttonSize, textSize)) {
                        ruleErrors.push({
                            error: "",
                            code: "WARNING.INVALID_BUTTON_SIZE",
                            location,
                        });
                    }
                });

            } else if (child.block === "button") {
                if (textSize) {
                    const buttonSize = child.mods.size;
                    if (!isSizeLarger(buttonSize, textSize)) {
                        ruleErrors.push({
                            error: "",
                            code: "WARNING.INVALID_BUTTON_SIZE",
                            location: block.location,
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
