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

export interface IBlockRules {
    [block: string]: ((block: IBlock) => IError[] ) [];
}

export interface IBlock {
    value: string;
    location: ILocation;
    nestingLevel?: number;
}

export interface IBlockObject {
    block: string;
    content: IBlockObject[];
    mods: any;
    elem: string;
    elemMods: any;
}
