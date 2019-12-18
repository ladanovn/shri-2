import { IBlock, IBlockObject, IError } from "../../interfaces";

export default function(block: IBlock): IError[] {
    let prevBlock: string = "";

    return ((): IError[] => {
        const ruleErrors: IError[] = [];
        const blockObject: IBlockObject = JSON.parse(block.value);

        if (blockObject.mods) {
            if (blockObject.mods.type) {
                if (prevBlock) {
                    switch (blockObject.mods.type) {
                        case "h1":
                            ruleErrors.push({
                                code: "TEXT.SEVERAL_H1",
                                error: "...",
                                location: block.location,
                            });
                            prevBlock = "h1";
                            break;

                        case "h2":
                            if (prevBlock === "h1") {
                                ruleErrors.push({
                                    code: "TEXT.INVALID_H2_POSITION",
                                    error: "...",
                                    location: block.location,
                                });
                            }
                            prevBlock = "h2";
                            break;

                        case "h3":
                            if (prevBlock === "h2") {
                                ruleErrors.push({
                                    code: "TEXT.INVALID_H3_POSITION",
                                    error: "...",
                                    location: block.location,
                                });
                            }
                            prevBlock = "h3";
                            break;
                    }
                } else {
                    prevBlock = blockObject.block;
                }
            }
        }
        return [];
    })();
}
