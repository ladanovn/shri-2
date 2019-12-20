import { IBlock, IBlockObject, IError, ILocation } from "../../interfaces";

let isExistH1: boolean = false;
let prevLevel: number = 0;
let prevBlockByLevel: {
    value: string,
    location: ILocation,
}[] = [];

function textLinter(block: IBlock): IError[] {
    const ruleErrors: IError[] = [];
    const blockObject: IBlockObject = JSON.parse(block.value);

    if (blockObject.mods) {
        if (blockObject.mods.type) {

            // checks independent of level
            if (blockObject.mods.type === "h1") {
                if (isExistH1) {
                    ruleErrors.push({
                        code: "TEXT.SEVERAL_H1",
                        error: "The 1 level heading on the page should be the only one",
                        location: block.location,
                    });
                } else {
                    isExistH1 = true;
                }
            }

            if (block.level >= prevLevel) {

                if (prevBlockByLevel[block.level]) {

                    switch (blockObject.mods.type) {
                        case "h1":
                            if (prevBlockByLevel[block.level].value === "h2") {
                                ruleErrors.push({
                                    code: "TEXT.INVALID_H2_POSITION",
                                    error: "The heading of the 2 level cannot be before the heading of the 1 level at the same or deeper level of nesting",
                                    location: prevBlockByLevel[block.level].location,
                                });
                            }
                            prevBlockByLevel[block.level].value = "h1";
                            break;

                        case "h2":
                            if (prevBlockByLevel[block.level].value === "h3") {
                                ruleErrors.push({
                                    code: "TEXT.INVALID_H3_POSITION",
                                    error: "The heading of the 3 level cannot be before the heading of the 2 level at the same or deeper level of nesting",
                                    location: prevBlockByLevel[block.level].location,
                                });
                            }
                            prevBlockByLevel[block.level].value = "h2";
                            break;

                        case "h3":
                            prevBlockByLevel[block.level].value = "h3";
                            break;
                    }

                } else {
                    prevBlockByLevel[block.level] = {
                        value: blockObject.mods.type,
                        location: block.location,
                    };
                }

            } else {
                prevBlockByLevel = prevBlockByLevel.slice(0, block.level + 1);
            }

            prevLevel = block.level;
        }
    }

    return ruleErrors;
}

export default [
    textLinter,
];
