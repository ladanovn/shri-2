import { IBlock, IError } from "../../interfaces"

export default function (block: IBlock): IError[] {
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
                        location: {
                            start: {
                                column: 1,
                                line: 1,
                            },
                            end: {
                                column: 1,
                                line: 1
                            }
                        }
                    });
                }
            }
        });
    }
    return ruleErrors;
}