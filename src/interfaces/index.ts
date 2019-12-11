export interface ILocation {
    start: {
        column: number,
        line: number
    },
    end: {
        column: number,
        line: number
    }
}

export interface IError {
    code: string,
    error: string,
    location: ILocation
}

export interface IBlockRules {
    [block: string]: { (block: IBlock, location: ILocation, stringifyBlock?: string): IError[]; } []
}

export interface IBlock {
    block: string,
    content: IBlock[],
    mods: any,
    elem: string,
    elemMods: any
}
