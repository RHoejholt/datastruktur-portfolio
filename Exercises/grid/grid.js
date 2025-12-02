
export default class Grid {
    constructor(rows, cols) {

        this._rows = Number(rows) || 0;
        this._cols = Number(cols) || 0;
        // only one array, flat row-major
        this._data = new Array(this._rows * this._cols).fill(undefined);

    }

    // lazy helper: accept either (obj) or (row,col)
    _normalizeRC(a, b) {
        if (a == null) return { row: undefined, col: undefined };
        if (typeof a === 'object') {
            return { row: a.row, col: a.col };
        }
        // assume numbers
        return { row: a, col: b };
    }

    // check for bounds, returns true if in bounds
    _inBounds(row, col) {
        return (
            Number.isInteger(row) &&
            Number.isInteger(col) &&
            row >= 0 &&
            col >= 0 &&
            row < this._rows &&
            col < this._cols
        );
    }

    // convert rc -> index, returns undefined if oob
    indexFor(a, b) {
        const { row, col } = this._normalizeRC(a, b);
        if (!this._inBounds(row, col)) return undefined;
        return row * this._cols + col;
    }

    // convert index -> {row, col}, returns undefined if oob
    rowColFor(index) {
        if (!Number.isInteger(index) || index < 0 || index >= this.size()) return undefined;
        const row = Math.floor(index / this._cols);
        const col = index % this._cols;
        return { row, col };
    }

    // set value at rc, ignore if oob
    set(a, b, c) {
        // support set({row,col}, value) and set(row, col, value)
        let row, col, value;
        if (typeof a === 'object') {
            ({ row, col } = a);
            value = b;
        } else {
            row = a;
            col = b;
            value = c;
        }
        const idx = this.indexFor(row, col);
        if (idx === undefined) return; // ignore oob
        this._data[idx] = value;
    }

    // get value at rc, undefined if oob
    get(a, b) {
        const { row, col } = this._normalizeRC(a, b);
        const idx = this.indexFor(row, col);
        if (idx === undefined) return undefined;
        return this._data[idx];

    }

    // return a cell object {row, col, value} or undefined if oob
    _cellAt(row, col) {
        if (!this._inBounds(row, col)) return undefined;
        return { row, col, value: this._data[row * this._cols + col] };
    }

    // neighbors as {row, col} objects (8-neighborhood), skip oob
    neighbours(a, b) {
        const { row, col } = this._normalizeRC(a, b);
        if (!this._inBounds(row, col)) return [];
        const out = [];
        for (let dr = -1; dr <= 1; dr++) {
            for (let dc = -1; dc <= 1; dc++) {
                if (dr === 0 && dc === 0) continue;
                const r = row + dr;
                const c = col + dc;
                if (this._inBounds(r, c)) out.push({ row: r, col: c });
            }
        }
        return out;
    }

    // neighbor values only
    neighbourValues(a, b) {
        const nbs = this.neighbours(a, b);
        return nbs.map(({ row, col }) => this.get(row, col));
    }

    // next in same row to the right, returns cell obj or undefined
    nextInRow(a, b) {
        const { row, col } = this._normalizeRC(a, b);
        if (!this._inBounds(row, col)) return undefined;
        return this._cellAt(row, col + 1);

    }

    // next in same column (downwards)
    nextInCol(a, b) {
        const { row, col } = this._normalizeRC(a, b);
        if (!this._inBounds(row, col)) return undefined;
        return this._cellAt(row + 1, col);
    }

    // cardinal directions
    north(a, b) {
        const { row, col } = this._normalizeRC(a, b);
        return this._cellAt(row - 1, col);
    }
    south(a, b) {
        const { row, col } = this._normalizeRC(a, b);
        return this._cellAt(row + 1, col);
    }
    west(a, b) {
        const { row, col } = this._normalizeRC(a, b);
        return this._cellAt(row, col - 1);

    }
    east(a, b) {
        const { row, col } = this._normalizeRC(a, b);
        return this._cellAt(row, col + 1);
    }

    rows() {
        return this._rows;
    }
    cols() {
        return this._cols;
    }
    size() {
        return this._data.length;
    }

    // fill all cells with value
    fill(value) {
        // simple lazy fill
        for (let i = 0; i < this._data.length; i++) this._data[i] = value;

    }

}
