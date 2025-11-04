export class StaticArray {
    constructor(size) {
        this._array = new Array(size).fill(null);
    }

    get(index) {
        return this._array[index];
    }

    set(index, value) {
        this._array[index] = value;
    }
}
