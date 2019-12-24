require("../../build/linter");

const testData1 = `{
    "block": "payment",
    "content": [
        {
            "block": "text",
            "mods": { "type": "h1" }
        },
        {
            "block": "text",
            "mods": { "type": "h1" }
        }
    ]
}`;

const testData2 = `{
    "block": "payment",
    "content": [
        {
            "block": "text",
            "mods": { "type": "h2" }
        },
        {
            "block": "text",
            "mods": { "type": "h1" }
        }
    ]
}`;

const testData3 = `{
    "block": "payment",
    "content": [
        {
            "block": "text",
            "mods": { "type": "h3" }
        },
        {
            "block": "text",
            "mods": { "type": "h2" }
        }
    ]
}`;

const testData4 = `{
    "block": "payment",
    "content": [
        {
            "block": "payment",
            "content": [
                {
                    "block": "text",
                    "mods": { "type": "h2" }
                }
            ]
        },
        {
            "block": "text",
            "mods": { "type": "h1" }
        }
    ]    
}`;

const testData5 = `{
    "block": "warning",
    "content": [
        {
            "block": "placeholder",
            "mods": { "size": "m" }
        },
        {
            "elem": "content",
            "content": [
                {
                    "block": "text",
                    "mods": { "size": "m" }
                },
                {
                    "block": "text",
                    "mods": { "size": "l" }
                }
            ]
        }
    ]
}`;

test("Several H1", () => {
    const exprectErrors = [{
        code: "TEXT.SEVERAL_H1",
        error: "The 1 level heading on the page should be the only one",
        location: {
            start: {
                line: 8,
                column: 9,
            },
            end: {
                line: 11,
                column: 10,
            },
        },
    }];
    const receivedErrors = lint(testData1);

    expect(JSON.stringify(receivedErrors)).toBe(JSON.stringify(exprectErrors));
});

test("H2 block before H1", () => {
    const exprectErrors = [{
        code: "TEXT.INVALID_H2_POSITION",
        error: "The heading of the 2 level cannot be before the heading of the 1 level at the same or deeper level of nesting",
        location: {
            start: {
                line: 4,
                column: 9,
            },
            end: {
                line: 7,
                column: 10,
            },
        },
    }];
    const receivedErrors = lint(testData2);

    expect(JSON.stringify(receivedErrors)).toBe(JSON.stringify(exprectErrors));
});

test("H3 block before H2", () => {
    const exprectErrors = [{
        code: "TEXT.INVALID_H3_POSITION",
        error: "The heading of the 3 level cannot be before the heading of the 2 level at the same or deeper level of nesting",        location: {
            start: {
                line: 4,
                column: 9,
            },
            end: {
                line: 7,
                column: 10,
            },
        },
    }];
    const receivedErrors = lint(testData3);

    expect(JSON.stringify(receivedErrors)).toBe(JSON.stringify(exprectErrors));
});

test("H2 block before H1 on deeper level of nesting", () => {
    const exprectErrors = [{
        code: "TEXT.INVALID_H2_POSITION",
        error: "The heading of the 2 level cannot be before the heading of the 1 level at the same or deeper level of nesting",        
        location: {
            start: {
                line: 7,
                column: 17,
            },
            end: {
                line: 10,
                column: 18,
            },
        },
    }];
    const receivedErrors = lint(testData4);

    expect(JSON.stringify(receivedErrors)).toBe(JSON.stringify(exprectErrors));
});

test("Text block have different size", () => {
    const exprectErrors = [ {
        code: "WARNING.TEXT_SIZES_SHOULD_BE_EQUAL",
        error: "All texts (blocks of text) in the warning block must be the same size",
        location: {
            start: { line: 1, column: 1 },
            end: { line: 22, column: 2 }
        }
    }];
    const receivedErrors = lint(testData5);

    expect(JSON.stringify(receivedErrors)).toBe(JSON.stringify(exprectErrors));
});

test("Text block have different size, option WARNING.TEXT_SIZES_SHOULD_BE_EQUAL set false", () => {
    const exprectErrors = [];
    const receivedErrors = lint(testData5, {
        "WARNING.TEXT_SIZES_SHOULD_BE_EQUAL": false
    });

    expect(JSON.stringify(receivedErrors)).toBe(JSON.stringify(exprectErrors));
});