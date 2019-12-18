import { IBlock, IBlockObject, IError } from "../../interfaces";

export default function(block: IBlock): IError[] {
    const ruleErrors: IError[] = [];
    const blockObject = JSON.parse(block.value);

    if (blockObject.content.length) {
        let textSize: string = "";

        blockObject.content.forEach((child: IBlockObject) => {
            if (child.block === "text") {
                if (!textSize) {
                    textSize = child.mods.size;
                }

                if (textSize !== child.mods.size) {
                    ruleErrors.push({
                        error: "",
                        code: "WARNING.TEXT_SIZES_SHOULD_BE_EQUAL",
                        location: block.location,
                    });
                }
            }
        });
    }
    return ruleErrors;
}
