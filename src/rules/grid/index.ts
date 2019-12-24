import {linter as gridLinter, errorCode as gridErrorCode} from "./tooMuchMarketingBlocks";

export default [
    {
        rule: gridErrorCode,
        linter: gridLinter,
    },
];
