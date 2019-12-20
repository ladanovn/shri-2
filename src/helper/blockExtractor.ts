import { IBlock, ILocation } from "../interfaces/index";

export default function(str: string, location: ILocation, level: number = 0): IBlock[] {
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
                            line: prevParentThese.line,
                            column: prevParentThese.column,
                        },
                        end: {
                            line,
                            column: column + 1,
                        },
                    },
                    level: parentheses.length + level,
                });

                parentheses.pop();
            }
        }
    });

    return result;
}
