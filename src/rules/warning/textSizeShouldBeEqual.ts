import { IBlock, IError, ILocation } from "../../interfaces"

const sizes = ["xxxs", "xxs", "xs", "s", "m", "l", "xl", "xxl", "xxxl", "xxxxl", "xxxxxl"];

const isSizeLarger = (size1: string, size2: string): boolean => {
    const size1Index = sizes.findIndex(size => size === size1);
    const size2Index = sizes.findIndex(size => size === size2);

    return size1Index > size2Index;
};

export default function (block: IBlock, location: ILocation): IError[] {
    const ruleErrors: IError[] = [];

    if (block.content.length) {
        let textSize: string = "";
        const prevButton: IBlock[] = [];

        block.content.forEach((child: IBlock) => {
            if (child.block === "text" && !textSize) {
                textSize = child.mods.size;

                // if exist buttons in front of the text
                prevButton.forEach(btn => {
                    const buttonSize = child.mods.size;
                    if (!isSizeLarger(buttonSize, textSize)) {
                        ruleErrors.push({
                            error: "",
                            code: "WARNING.INVALID_BUTTON_SIZE",
                            location
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
                            location
                        });
                    }
                } else {
                    prevButton.push(child);
                }
            }
        });
    }
    return ruleErrors;
}