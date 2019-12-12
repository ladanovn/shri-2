 /// <reference lib="es2020.string" />

 import { IBlock, IError, ILocation } from "../../interfaces"

export default function (block: IBlock, location: ILocation, strifyBlock: string): IError[] {
    const ruleErrors: IError[] = [];

    const parentheses: {
        value: string,
        column: number,
        line: number,
        index: number
    }[] = [];

    let line: number = location.start.line;
    let column: number = location.start.column;
    let existPlaceholder: Boolean = false;
    const prevButton: ILocation[] = [];
    
    if (block.content.length) {
        strifyBlock.split("").forEach((symbol, index) => {
            column += 1;
        
            if (symbol === '\n') {
                line += 1;
                column = 0
            };
        
            if (symbol === "{") {
                parentheses.push({
                    value: "{",
                    column,
                    line,
                    index
                });
    
            } else if (symbol === "}") {
                const prevParentThese = parentheses.slice(-1)[0];
                
                if (prevParentThese.value === "{") {
                    const strBlock = strifyBlock.slice(prevParentThese.index, index + 1);
                    const block = JSON.parse(strBlock) as IBlock;
    
                    if (block.block === "placeholder") {
                        existPlaceholder = true;
                        prevButton.forEach(btn => {
                            ruleErrors.push({
                                code: "WARNING.INVALID_BUTTON_POSITION",
                                error: "...",
                                location: btn
                            });
                        })

                    } else if (block.block === "button") {
                        if (!existPlaceholder) {
                            prevButton.push({
                                start: {
                                    column: prevParentThese.column,
                                    line: prevParentThese.line
                                },
                                end: {
                                    column,
                                    line
                                }
                            });
                        }
                    }
                    parentheses.pop();
                }
            }
        });
    }
    return ruleErrors;
}
