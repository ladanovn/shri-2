import { IBlock, IError, ILocation } from "../../interfaces";   

export default function(block: IBlock, location: ILocation): IError[] {
    const ruleErrors: IError[] = [];

    if (block.content.length) {
        const allowedSize: string[] = ["s", "m", "l"];

        block.content.forEach((child: IBlock) => {
            if (child.block === "placeholder") {
                if (child.mods) {
                    if (!allowedSize.includes(child.mods.size)) {
                        // ruleErrors.push({
                        //     error: "",
                        //     code: "WARNING.INVALID_PLACEHOLDER_SIZE",
                        //     location,
                        // });
                        // TODO:
                    }
                }
            }
        });
    }
    return ruleErrors;
}
