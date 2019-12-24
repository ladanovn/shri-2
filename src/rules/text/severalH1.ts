import { IBlock, IBlockObject, IError } from "../../interfaces";

export const errorCode: string = "TEXT.SEVERAL_H1";
export const errorMessage: string = "The 1 level heading on the page should be the only one";

export function linter(block: IBlock): IError[] {
    const ctx = this.rulesContext[errorCode];
    ctx.isExistH1 = ctx.isExistH1 || false;

    const ruleErrors: IError[] = [];
    const blockObject: IBlockObject = JSON.parse(block.value);

    if (blockObject.mods) {
        if (blockObject.mods.type) {
            if (blockObject.mods.type === "h1") {
                if (ctx.isExistH1) {
                    ruleErrors.push({
                        code: errorCode,
                        error: errorMessage,
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
