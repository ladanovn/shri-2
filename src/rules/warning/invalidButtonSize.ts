import { IBlock, IError, ILocation } from "../../interfaces"

export default function (block: IBlock, location: ILocation): IError[] {
    const ruleErrors: IError[] = [];

    if (block.content.length) {
        let textSize: string = "";

        block.content.forEach((child: IBlock) => {
            if (child.block === "text") {
                if (!textSize) {
                    textSize = child.mods.size;
                } 

                if (textSize !== child.mods.size) {
                    ruleErrors.push({
                        error: "",
                        code: "WARNING.TEXT_SIZES_SHOULD_BE_EQUAL",
                        location
                    });
                }
            }
        });
    }
    return ruleErrors;
}