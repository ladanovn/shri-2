export interface ILocation {
    start: {
        line: number,
        column: number,
    };
    end?: {
        line: number,
        column: number,
    };
}

export interface IError {
    code: string;
    error: string;
    location: ILocation;
}

export interface IBlockRule {
    rule: string;
    linter: (block: IBlock) => IError[];
}

export interface IBlockRules {
    [block: string]: IBlockRule[];
}

export interface IBlock {
    value: string;
    location: ILocation;
    level?: number;
}

export interface IBlockObject {
    block: string;
    content: IBlockObject[];
    mods: any;
    elem: string;
    elemMods: any;
}
