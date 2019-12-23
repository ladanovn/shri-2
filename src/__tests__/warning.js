require("../../build/linter");

const testData1 = `{
    "block": "warning",
    "content": [
        { "block": "placeholder", "mods": { "size": "m" } },
        { 
            "block": "wrapper",
            "content": [
                { "block": "button", "mods": { "size": "m" } }
            ]
        }
    ]
}`;

const testData2 = `{
    "block": "warning",
    "content": [
        { 
            "block": "wrapper",
            "content": [
                { "block": "button", "mods": { "size": "m" } }
            ]
        },
        { "block": "placeholder", "mods": { "size": "m" } }
    ]
}`;

const testData3 = `{
    "block": "wrapper",
    "content": [
        { "block": "text", "mods": { "size": "l" } },
        {
            "block": "warning",
            "content": [
                { "block": "text", "mods": { "size": "l" } },
                { "block": "text", "mods": { "size": "xl" } }
            ]
        }
    ]
}`;

const testData4 = `{
    "block": "warning",
    "content": [
        { "block": "text", "mods": { "size": "l" } },
        { "block": "button", "mods": { "size": "xxl" } }
    ]
}`;

test("button haven't position error", () => {
    const exprectErrors = [];
    const receivedErrors = global.lint(testData1);

    expect(JSON.stringify(receivedErrors)).toBe(JSON.stringify(exprectErrors));
});

test("button have 1 error of invalid positions", () => {
    const exprectErrors = [{
        code: "WARNING.INVALID_BUTTON_POSITION",
        error: "The button block in the warning block cannot be in front of the placeholder block",
        location: {
            start: {
                line: 7,
                column: 17,
            },
            end: {
                line: 7,
                column: 63,
            },
        },
    }];
    const receivedErrors = global.lint(testData2);

    expect(JSON.stringify(receivedErrors)).toBe(JSON.stringify(exprectErrors));
});

test("text block have different size", () => {
    const exprectErrors = [{
        code: "WARNING.TEXT_SIZES_SHOULD_BE_EQUAL",
        error: "All texts (blocks of text) in the warning block must be the same size",
        location: {
            start: {
                line: 5,
                column: 9,
            },
            end: {
                line: 11,
                column: 10,
            },
        },
    }];
    const receivedErrors = global.lint(testData3);

    expect(JSON.stringify(receivedErrors)).toBe(JSON.stringify(exprectErrors));
});

test("button size larger on 2 step than text block", () => {
    const exprectErrors = [{
        code: "WARNING.INVALID_BUTTON_SIZE",
        error: "The button block size must be 1 step larger than text block",
        location: {
            start: {
                line: 5,
                column: 9,
            },
            end: {
                line: 5,
                column: 57,
            },
        },
    }];
    const receivedErrors = global.lint(testData4);

    expect(JSON.stringify(receivedErrors)).toBe(JSON.stringify(exprectErrors));
});
