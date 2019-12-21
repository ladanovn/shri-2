import { IBlock, IBlockObject, IError, ILocation } from "../../interfaces";

const isHeaderLarge = (a: string, b: string): boolean => {
    if ((a === "h2" && b === "h1") ||
        (a === "h3" && b === "h2")) {
        return true;
    } else {
        return false;
    }
};

function textLinter(block: IBlock): IError[] {
    this.stash.isExistH1 = this.stash.isExistH1 || false;
    this.stash.prevLevel = this.stash.prevLevel || 0;
    this.stash.prevMaxBlock = this.stash.prevMaxBlock || {
        value: "",
        location: {},
    };

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

            if (block.level > this.stash.prevLevel) {

                if (this.stash.prevMaxBlock.value) {

                    switch (blockObject.mods.type) {
                        case "h1":
                            if (this.stash.prevMaxBlock.value === "h2") {
                                ruleErrors.push({
                                    code: "TEXT.INVALID_H2_POSITION",
                                    error: "The heading of the 2 level cannot be before the heading of the 1 level at the same or deeper level of nesting",
                                    location: this.stash.prevMaxBlock.location,
                                });
                            }
                            this.stash.prevMaxBlock.value = "h1";
                            break;

                        case "h2":
                            if (this.stash.prevMaxBlock.value === "h3") {
                                ruleErrors.push({
                                    code: "TEXT.INVALID_H3_POSITION",
                                    error: "The heading of the 3 level cannot be before the heading of the 2 level at the same or deeper level of nesting",
                                    location: this.stash.prevMaxBlock.location,
                                });
                            }
                            this.stash.prevMaxBlock.value = "h2";
                            break;

                        case "h3":
                            this.stash.prevMaxBlock.value = "h3";
                            break;
                    }

                } else {
                    this.stash.prevMaxBlock = {
                        value: blockObject.mods.type,
                        location: block.location,
                    };
                }

            } else {

                this.stash.prevMaxBlock = isHeaderLarge(blockObject.mods.type, this.stash.prevMaxBlock.value)
                    ? {
                        value: blockObject.mods.type,
                        location: block.location,
                    }
                    : this.stash.prevMaxBlock;

                if (isHeaderLarge(blockObject.mods.type, this.stash.prevMaxBlock.value)) {
                    this.stash.prevMaxBlock = {
                        value: blockObject.mods.type,
                        location: block.location,
                    };
                } else {
                    switch (blockObject.mods.type) {
                        case "h1":
                            if (this.stash.prevMaxBlock.value === "h2") {
                                ruleErrors.push({
                                    code: "TEXT.INVALID_H2_POSITION",
                                    error: "The heading of the 2 level cannot be before the heading of the 1 level at the same or deeper level of nesting",
                                    location: this.stash.prevMaxBlock.location,
                                });
                            }
                            break;

                        case "h2":
                            if (this.stash.prevMaxBlock.value === "h3") {
                                ruleErrors.push({
                                    code: "TEXT.INVALID_H3_POSITION",
                                    error: "The heading of the 3 level cannot be before the heading of the 2 level at the same or deeper level of nesting",
                                    location: this.stash.prevMaxBlock.location,
                                });
                            }
                            break;
                    }
                }
            }

            this.stash.prevLevel = block.level;
        }
    }

    return ruleErrors;

}

export default [
    textLinter,
];
