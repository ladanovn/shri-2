
import { IBlock, IError } from "../../interfaces";

export default function (block: IBlock): IError[] {
    const ruleErrors: IError[] = [];
    const blockObject = JSON.parse(block.value);

    if (blockObject.content.length) {
        let textSize: string = "";

        for (const child of blockObject.content) {
            if (child.block === "text") {
                if (child.mods) {
                    if (child.mods.size) {
                        if (!textSize) {
                            textSize = child.mods.size;
                        }

                        if (textSize !== child.mods.size) {
                            ruleErrors.push({
                                code: "WARNING.TEXT_SIZES_SHOULD_BE_EQUAL",
                                error: "All texts (blocks of text) in the warning block must be the same size",
                                location: block.location,
                            });
                        }

                    } else {
                        ruleErrors.push({
                            code: "WARNING.TEXT_SIZES_SHOULD_BE_EQUAL",
                            error: "All texts (blocks of text) in the warning block must be the same size",
                            location: block.location,
                        });
                    }
                }
            }
        }
    }
    return ruleErrors;
}
