export const COLUMN_CHILD = ['COLUMN', 'ROW']

export function ColumnHasRowAndCol(children){
    children.some(child => !COLUMN_CHILD.includes(getNodesType(child)) );
}

export function getNodesType(string){
    return string.split('-')[0]
}