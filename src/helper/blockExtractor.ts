import { IBlock, ILocation } from "../interfaces/index";

export default function(str: string, location: ILocation): IBlock[] {
    const result: IBlock[] = [];
    const parentheses: {
        value: string,
        column: number,
        line: number,
        index: number,
    }[] = [];

    let line: number = location.start.line;
    let column: number = location.start.column;

    str.split("").forEach((symbol, index) => {
        column += 1;

        if (symbol === "\n") {
            line += 1;
            column = 0;
        }

        if (symbol === "{") {
            parentheses.push({
                value: "{",
                column,
                line,
                index,
            });

        } else if (symbol === "}") {
            const prevParentThese = parentheses.slice(-1)[0];

            if (prevParentThese.value === "{") {
                const value = str.slice(prevParentThese.index, index + 1);
                result.push({
                    value,
                    location: {
                        start: {
                            column: prevParentThese.column,
                            line: prevParentThese.line,
                        },
                        end: {
                            column,
                            line,
                        },
                    },
                });

                parentheses.pop();
            }
        }
    });

    return result;
}
