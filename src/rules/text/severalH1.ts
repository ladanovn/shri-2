import { IBlock, IBlockObject, IError } from "../../interfaces";

export default function(block: IBlock): IError[] {
    const ctx = this.ruleContext;
    ctx.isExistH1 = ctx.isExistH1 || false;

    const ruleErrors: IError[] = [];
    const blockObject: IBlockObject = JSON.parse(block.value);

    if (blockObject.mods) {
        if (blockObject.mods.type) {
            if (blockObject.mods.type === "h1") {
                if (ctx.isExistH1) {
                    ruleErrors.push({
                        code: "TEXT.SEVERAL_H1",
                        error: "The 1 level heading on the page should be the only one",
                        location: block.location,
                    });
                } else {
                    ctx.isExistH1 = true;
                }
            }
        }
    }

    return ruleErrors;
}
