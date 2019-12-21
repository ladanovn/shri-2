import { IBlock, IBlockObject, IError, ILocation } from "../../interfaces";

function textLinter(block: IBlock): IError[] {
    this.stash.isExistH1 = this.stash.isExistH1 || false;
    this.stash.prevLevel = 0;
    this.stash.prevBlockByLevel = this.stash.prevBlockByLevel || [];

    const ruleErrors: IError[] = [];
    const blockObject: IBlockObject = JSON.parse(block.value);

    if (blockObject.mods) {
        if (blockObject.mods.type) {

            // checks independent of level
            if (blockObject.mods.type === "h1") {
                if (this.stash.isExistH1) {
                    ruleErrors.push({
                        code: "TEXT.SEVERAL_H1",
                        error: "The 1 level heading on the page should be the only one",
                        location: block.location,
                    });
                } else {
                    this.stash.isExistH1 = true;
                }
            }

            if (block.level >= this.stash.prevLevel) {

                if (this.stash.prevBlockByLevel[block.level]) {

                    switch (blockObject.mods.type) {
                        case "h1":
                            if (this.stash.prevBlockByLevel[block.level].value === "h2") {
                                ruleErrors.push({
                                    code: "TEXT.INVALID_H2_POSITION",
                                    error: "The heading of the 2 level cannot be before the heading of the 1 level at the same or deeper level of nesting",
                                    location: this.stash.prevBlockByLevel[block.level].location,
                                });
                            }
                            this.stash.prevBlockByLevel[block.level].value = "h1";
                            break;

                        case "h2":
                            if (this.stash.prevBlockByLevel[block.level].value === "h3") {
                                ruleErrors.push({
                                    code: "TEXT.INVALID_H3_POSITION",
                                    error: "The heading of the 3 level cannot be before the heading of the 2 level at the same or deeper level of nesting",
                                    location: this.stash.prevBlockByLevel[block.level].location,
                                });
                            }
                            this.stash.prevBlockByLevel[block.level].value = "h2";
                            break;

                        case "h3":
                            this.stash.prevBlockByLevel[block.level].value = "h3";
                            break;
                    }

                } else {
                    this.stash.prevBlockByLevel[block.level] = {
                        value: blockObject.mods.type,
                        location: block.location,
                    };
                }

            } else {
                this.stash.prevBlockByLevel = this.stash.prevBlockByLevel.slice(0, block.level + 1);
            }

            this.stash.prevLevel = block.level;
        }
    }

    return ruleErrors;
}

export default [
    textLinter,
];
