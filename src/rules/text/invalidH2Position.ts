import { IBlock, IBlockObject, IError } from "../../interfaces";

const isHeaderLarge = (a: string, b: string): boolean => {
    if ((a === "h2" && b === "h1") ||
        (a === "h3" && b === "h2")) {
        return true;
    } else {
        return false;
    }
};

export const errorCode: string = "TEXT.INVALID_H2_POSITION";
export const errorMessage: string = "The heading of the 2 level cannot be before the heading of the 1 level at the same or deeper level of nesting";

export function linter(block: IBlock): IError[] {
    const ctx = this.rulesContext[errorCode];

    ctx.prevLevel = ctx.prevLevel || 0;
    ctx.prevMaxBlock = ctx.prevMaxBlock || {
        value: "",
        location: {},
    };

    const ruleErrors: IError[] = [];
    const blockObject: IBlockObject = JSON.parse(block.value);

    if (blockObject.mods) {

        if (blockObject.mods.type) {

            if (block.level > ctx.prevLevel) {

                if (ctx.prevMaxBlock.value) {

                    switch (blockObject.mods.type) {

                        case "h1":
                            if (ctx.prevMaxBlock.value === "h2") {
                                ruleErrors.push({
                                    code: errorCode,
                                    error: errorMessage,
                                    location: ctx.prevMaxBlock.location,
                                });
                            }
                            ctx.prevMaxBlock.value = "h1";
                            break;

                        case "h2":
                            ctx.prevMaxBlock.value = "h2";
                            break;

                        case "h3":
                            ctx.prevMaxBlock.value = "h3";
                            break;
                    }

                } else {
                    ctx.prevMaxBlock = {
                        value: blockObject.mods.type,
                        location: block.location,
                    };
                }

            } else {

                ctx.prevMaxBlock = isHeaderLarge(blockObject.mods.type, ctx.prevMaxBlock.value)
                    ? {
                        value: blockObject.mods.type,
                        location: block.location,
                    }
                    : ctx.prevMaxBlock;

                if (isHeaderLarge(blockObject.mods.type, ctx.prevMaxBlock.value)) {
                    ctx.prevMaxBlock = {
                        value: blockObject.mods.type,
                        location: block.location,
                    };

                } else {

                    if (blockObject.mods.type === "h1") {
                        if (ctx.prevMaxBlock.value === "h2") {
                            ruleErrors.push({
                                code: errorCode,
                                error: errorMessage,
                                location: ctx.prevMaxBlock.location,
                            });
                        }
                    }
                }
            }

            ctx.prevLevel = block.level;
        }
    }

    return ruleErrors;
}
