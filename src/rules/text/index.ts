import { IBlock, IBlockObject, IError, ILocation } from "../../interfaces";

function textLinter(block: IBlock): IError[] {
    let isExistH1: boolean = false;
    const prevBlock: {
        value: string,
        level: number,
        location: ILocation,
    } = {
        value: "",
        level: 0,
        location: null,
    };

    return ((): IError[] => {
        const ruleErrors: IError[] = [];
        const blockObject: IBlockObject = JSON.parse(block.value);

        if (blockObject.mods) {
            if (blockObject.mods.type) {

                if (blockObject.mods.type === "h1" && isExistH1) {
                    ruleErrors.push({
                        code: "TEXT.SEVERAL_H1",
                        error: "...",
                        location: block.location,
                    });
                }

                if (prevBlock.value) {
                    if (block.nestingLevel > prevBlock.level) {
                        switch (blockObject.mods.type) {
                            case "h1":
                                isExistH1 = true;
                                prevBlock.value = "h1";
                                break;

                            case "h2":
                                if (prevBlock.value === "h1") {
                                    ruleErrors.push({
                                        code: "TEXT.INVALID_H2_POSITION",
                                        error: "...",
                                        location: prevBlock.location,
                                    });
                                }
                                prevBlock.value = "h2";
                                break;

                            case "h3":
                                if (prevBlock.value === "h2") {
                                    ruleErrors.push({
                                        code: "TEXT.INVALID_H3_POSITION",
                                        error: "...",
                                        location: prevBlock.location,
                                    });
                                }
                                prevBlock.value = "h3";
                                break;
                        }
                    } else {
                        prevBlock.value = blockObject.block;
                        prevBlock.level = block.nestingLevel;
                    }
                } else {
                    prevBlock.value = blockObject.block;
                    prevBlock.level = block.nestingLevel;
                    prevBlock.location = block.location;
                }
            }
        }
        return [];
    })();
}

export default [
    textLinter,
];