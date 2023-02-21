import { IColumnProps } from "./types";

export const caclDeepAndCols = <T>(columns: Array<IColumnProps<T>>, index) => {
    let deep = index;
    let cols = [];
    columns.forEach((col, i) => {
        if (col.children && col.children.length > 0) {
            const res = caclDeepAndCols(col.children, index + 1);
            if (res.deep > deep) {
                deep = res.deep;
            }
            if (res.cols.length > 0) {
                cols = cols.concat(res.cols);
            }
        } else {
            cols.push(col);
        }
    });
    return {
        deep,
        cols,
    }
}

export const getColsDeep = <T>(columns: Array<IColumnProps<T>>) => {
    return caclDeepAndCols(columns, 1);
}

export const setRowSpan = <T>(columns: Array<IColumnProps<T>>, deep, span: number) => {
    let colSpan = 0;
    for (const col of columns) {
        if (col.children && col.children.length > 0) {
            const subColSpan = setRowSpan(col.children, deep, span + 1);
            col.colSpan = subColSpan;
            colSpan += subColSpan;
        } else {
            col.rowSpan = deep - span;
            col.colSpan = 1;
            colSpan += 1;
        }

    }
    return colSpan;
}

export const buildCells = <T>(columns: Array<IColumnProps<T>>, lines = []) => {
    let list = [];
    if (columns.length === 0) {
        return;
    }
    const cells = columns.map((col) => {
        if (col.children && col.children.length > 0) {
            list = list.concat(col.children);
        }
        return col;
    });
    lines.push(cells);
    buildCells(list, lines);
}

export const isHaveChildren = <T>(columns: Array<IColumnProps<T>>) => {
    return columns.some(col => col.children && col.children.length > 0);
}

// function setTrHeight(table, rowHeight) {
//     if (!table) {
//         return;
//     }
//     let trs = table.querySelectorAll('thead tr') as NodeListOf<HTMLTableRowElement>;
//     trs.forEach((tr) => {
//         let rowspan = tr.getAttribute('rowspan');
//         if (!rowspan) {
//             tr.style.height = 'auto';
//         } else {
//             tr.style.height = `${Number(rowspan) * rowHeight}px`;
//         }
//     })
// }

// export const syncTableHeadHeight = (left, right, center, rows: number) => {
//     // 如果有fix列和分组列，容易导致列的高度不一致，
//     // 同步基础表和fix表的高度，取最大高度
//     const els = [left, right, center];
//     let max = els.reduce((pre, el) => {
//         if (!el) {
//             return pre;
//         }
//         let height = el.querySelector('thead').getBoundingClientRect().height;
//         return height > pre ? height : pre;
//     }, 0);
//     let rowHeight = max / rows;
//     if (left) {
//         setTrHeight(left, rowHeight);
//     }
//     if (right) {
//         setTrHeight(right, rowHeight);
//     }
// }
