interface errLog {
    [index: number]: {
        code: string,
        error: string,
        location: {
            start: {
                column: number,
                line: number
            },
            end: {
                column: number,
                line: number
            }
        }
    }
}

function linter(str: string): errLog {
    return;
}
// if (window) {
//     window.linter = linter;
    
// } else if (global) {
//     global.linter = linter;
// }